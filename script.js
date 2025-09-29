// Global State
const state = {
    nodes: [],
    connections: [],
    selectedNode: null,
    draggedNode: null,
    zoom: 1,
    panOffset: { x: 0, y: 0 },
    isPanning: false,
    isConnecting: false,
    connectionStart: null,
    nodeIdCounter: 1
};

// DOM Elements
const elements = {
    canvas: document.getElementById('canvas'),
    canvasContainer: document.getElementById('canvasContainer'),
    connectionsSvg: document.getElementById('connectionsSvg'),
    chatMessages: document.getElementById('chatMessages'),
    chatInput: document.getElementById('chatInput'),
    sendMessage: document.getElementById('sendMessage'),
    testPanel: document.getElementById('testPanel'),
    testInput: document.getElementById('testInput'),
    testResults: document.getElementById('testResults'),
    zoomLevel: document.getElementById('zoomLevel'),
    canvasInfo: document.getElementById('canvasInfo')
};

// Initialize Application
function init() {
    setupEventListeners();
    setupDragAndDrop();
    setupTabSwitching();
    updateCanvasInfo();
}

// Event Listeners Setup
function setupEventListeners() {
    // Header Actions
    document.getElementById('clearWorkflow').addEventListener('click', clearWorkflow);
    document.getElementById('saveWorkflow').addEventListener('click', saveWorkflow);
    document.getElementById('executeWorkflow').addEventListener('click', executeWorkflow);
    
    // Chat
    elements.sendMessage.addEventListener('click', sendChatMessage);
    elements.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });
    
    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            elements.chatInput.value = e.target.textContent;
            sendChatMessage();
        });
    });
    
    // Zoom Controls
    document.getElementById('zoomIn').addEventListener('click', () => adjustZoom(0.1));
    document.getElementById('zoomOut').addEventListener('click', () => adjustZoom(-0.1));
    document.getElementById('fitView').addEventListener('click', fitView);
    
    // Test Panel
    document.getElementById('closeTestPanel').addEventListener('click', () => {
        elements.testPanel.classList.add('hidden');
    });
    
    // Canvas interactions
    elements.canvas.addEventListener('mousedown', handleCanvasMouseDown);
    elements.canvas.addEventListener('mousemove', handleCanvasMouseMove);
    elements.canvas.addEventListener('mouseup', handleCanvasMouseUp);
    
    // Node search
    document.getElementById('nodeSearch').addEventListener('input', handleNodeSearch);
}

// Tab Switching
function setupTabSwitching() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            
            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });
}

// Drag and Drop Setup
function setupDragAndDrop() {
    const nodeItems = document.querySelectorAll('.node-item');
    
    nodeItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const nodeType = item.dataset.nodeType;
            const nodeName = item.dataset.nodeName;
            e.dataTransfer.setData('nodeType', nodeType);
            e.dataTransfer.setData('nodeName', nodeName);
            e.dataTransfer.effectAllowed = 'copy';
        });
    });
    
    elements.canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    
    elements.canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const nodeType = e.dataTransfer.getData('nodeType');
        const nodeName = e.dataTransfer.getData('nodeName');
        
        if (nodeType && nodeName) {
            const rect = elements.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            createNode(nodeType, nodeName, x, y);
        }
    });
}

// Node Creation
function createNode(type, name, x, y) {
    const nodeId = state.nodeIdCounter++;
    
    const node = {
        id: nodeId,
        type: type,
        name: name,
        x: x,
        y: y,
        config: {}
    };
    
    state.nodes.push(node);
    renderNode(node);
    updateCanvasInfo();
    
    return node;
}

// Node Rendering
function renderNode(node) {
    const nodeEl = document.createElement('div');
    nodeEl.className = `workflow-node ${node.type}`;
    nodeEl.id = `node-${node.id}`;
    nodeEl.style.left = `${node.x}px`;
    nodeEl.style.top = `${node.y}px`;
    
    const icon = getNodeIcon(node.name);
    
    nodeEl.innerHTML = `
        <div class="node-header">
            <div class="node-icon">${icon}</div>
            <div class="node-title">${node.name}</div>
        </div>
        <div class="node-description">${getNodeDescription(node.type, node.name)}</div>
        <div class="node-controls">
            <button onclick="configureNode(${node.id})">⚙️</button>
            <button onclick="deleteNode(${node.id})">🗑️</button>
        </div>
        <div class="connection-point input" data-node-id="${node.id}" data-point-type="input"></div>
        <div class="connection-point output" data-node-id="${node.id}" data-point-type="output"></div>
    `;
    
    // Make node draggable
    nodeEl.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('workflow-node') || e.target.classList.contains('node-header') || e.target.classList.contains('node-title')) {
            state.selectedNode = node;
            state.draggedNode = node;
            state.dragOffset = {
                x: e.clientX - node.x,
                y: e.clientY - node.y
            };
            nodeEl.classList.add('selected');
        }
    });
    
    // Connection points
    const connectionPoints = nodeEl.querySelectorAll('.connection-point');
    connectionPoints.forEach(point => {
        point.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            startConnection(node.id, point.dataset.pointType);
        });
    });
    
    elements.canvas.appendChild(nodeEl);
}

// Get Node Icon
function getNodeIcon(name) {
    const icons = {
        'Webhook': '🌐',
        'Schedule': '⏰',
        'Email': '📧',
        'HTTP Request': '🔗',
        'Send Email': '✉️',
        'Slack': '💬',
        'Database': '🗄️',
        'IF': '🔀',
        'Switch': '🔢',
        'Loop': '🔄',
        'Set': '📝',
        'Code': '💻',
        'Function': '⚡'
    };
    return icons[name] || '📦';
}

// Get Node Description
function getNodeDescription(type, name) {
    const descriptions = {
        'Webhook': 'Trigger via HTTP webhook',
        'Schedule': 'Trigger on schedule',
        'Email': 'Trigger on email received',
        'HTTP Request': 'Make HTTP requests',
        'Send Email': 'Send email messages',
        'Slack': 'Send Slack messages',
        'Database': 'Query database',
        'IF': 'Conditional branching',
        'Switch': 'Multiple conditions',
        'Loop': 'Iterate over items',
        'Set': 'Set field values',
        'Code': 'Execute custom code',
        'Function': 'Transform data'
    };
    return descriptions[name] || 'Workflow node';
}

// Canvas Mouse Handlers
function handleCanvasMouseDown(e) {
    if (e.target === elements.canvas) {
        state.isPanning = true;
        state.panStart = { x: e.clientX, y: e.clientY };
    }
}

function handleCanvasMouseMove(e) {
    if (state.draggedNode) {
        const rect = elements.canvas.getBoundingClientRect();
        state.draggedNode.x = e.clientX - rect.left - state.dragOffset.x;
        state.draggedNode.y = e.clientY - rect.top - state.dragOffset.y;
        
        const nodeEl = document.getElementById(`node-${state.draggedNode.id}`);
        if (nodeEl) {
            nodeEl.style.left = `${state.draggedNode.x}px`;
            nodeEl.style.top = `${state.draggedNode.y}px`;
        }
        
        updateConnections();
    }
}

function handleCanvasMouseUp(e) {
    state.draggedNode = null;
    state.isPanning = false;
    
    // Remove selection from all nodes
    document.querySelectorAll('.workflow-node').forEach(node => {
        if (node.id !== `node-${state.selectedNode?.id}`) {
            node.classList.remove('selected');
        }
    });
}

// Connection Management
function startConnection(nodeId, pointType) {
    state.isConnecting = true;
    state.connectionStart = { nodeId, pointType };
}

function completeConnection(nodeId, pointType) {
    if (state.isConnecting && state.connectionStart) {
        if (state.connectionStart.nodeId !== nodeId && 
            state.connectionStart.pointType !== pointType) {
            
            const connection = {
                from: state.connectionStart.pointType === 'output' ? state.connectionStart.nodeId : nodeId,
                to: state.connectionStart.pointType === 'output' ? nodeId : state.connectionStart.nodeId
            };
            
            state.connections.push(connection);
            updateConnections();
        }
        
        state.isConnecting = false;
        state.connectionStart = null;
    }
}

function updateConnections() {
    elements.connectionsSvg.innerHTML = '';
    
    state.connections.forEach((conn, index) => {
        const fromNode = state.nodes.find(n => n.id === conn.from);
        const toNode = state.nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
            const fromEl = document.getElementById(`node-${fromNode.id}`);
            const toEl = document.getElementById(`node-${toNode.id}`);
            
            if (fromEl && toEl) {
                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();
                const canvasRect = elements.canvas.getBoundingClientRect();
                
                const x1 = fromRect.right - canvasRect.left;
                const y1 = fromRect.top - canvasRect.top + fromRect.height / 2;
                const x2 = toRect.left - canvasRect.left;
                const y2 = toRect.top - canvasRect.top + toRect.height / 2;
                
                const path = createConnectionPath(x1, y1, x2, y2);
                
                const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathEl.setAttribute('d', path);
                pathEl.setAttribute('class', 'connection-line');
                pathEl.setAttribute('data-connection-index', index);
                pathEl.addEventListener('click', () => deleteConnection(index));
                
                elements.connectionsSvg.appendChild(pathEl);
            }
        }
    });
}

function createConnectionPath(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const controlPointOffset = Math.abs(dx) * 0.5;
    
    return `M ${x1} ${y1} C ${x1 + controlPointOffset} ${y1}, ${x2 - controlPointOffset} ${y2}, ${x2} ${y2}`;
}

function deleteConnection(index) {
    if (confirm('Delete this connection?')) {
        state.connections.splice(index, 1);
        updateConnections();
    }
}

// Node Management Functions
window.configureNode = function(nodeId) {
    const node = state.nodes.find(n => n.id === nodeId);
    if (node) {
        alert(`Configuration for ${node.name} would open here.\n\nIn a full implementation, this would show a modal with node-specific settings.`);
    }
};

window.deleteNode = function(nodeId) {
    if (confirm('Delete this node?')) {
        state.nodes = state.nodes.filter(n => n.id !== nodeId);
        state.connections = state.connections.filter(c => c.from !== nodeId && c.to !== nodeId);
        
        const nodeEl = document.getElementById(`node-${nodeId}`);
        if (nodeEl) {
            nodeEl.remove();
        }
        
        updateConnections();
        updateCanvasInfo();
    }
};

// Zoom Controls
function adjustZoom(delta) {
    state.zoom = Math.max(0.5, Math.min(2, state.zoom + delta));
    elements.canvas.style.transform = `scale(${state.zoom})`;
    elements.zoomLevel.textContent = `${Math.round(state.zoom * 100)}%`;
    updateConnections();
}

function fitView() {
    state.zoom = 1;
    elements.canvas.style.transform = `scale(${state.zoom})`;
    elements.zoomLevel.textContent = '100%';
    updateConnections();
}

// Chat Functionality
function sendChatMessage() {
    const message = elements.chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    elements.chatInput.value = '';
    
    // Process the message with AI-like responses
    setTimeout(() => {
        processNaturalLanguage(message);
    }, 500);
}

function addMessageToChat(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatar = type === 'user' ? '👤' : '🤖';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Enhanced Natural Language Processing with AI
async function processNaturalLanguage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Try advanced AI processing first
    if (typeof processNaturalLanguageAdvanced === 'function') {
        try {
            const aiResponse = await processNaturalLanguageAdvanced(message);
            addMessageToChat('assistant', aiResponse);
            return;
        } catch (error) {
            console.log('Falling back to simple NL processing:', error);
        }
    }
    
    // Fallback to simple pattern matching
    if (lowerMessage.includes('email') && (lowerMessage.includes('form') || lowerMessage.includes('submit'))) {
        createEmailFormWorkflow();
        addMessageToChat('assistant', '✨ I\'ve created an intelligent workflow that sends an email when a form is submitted. The workflow includes a Webhook trigger to receive form data and a Send Email action.');
    }
    else if (lowerMessage.includes('slack') && lowerMessage.includes('tweet')) {
        createSlackTwitterWorkflow();
        addMessageToChat('assistant', '✨ I\'ve created a workflow that sends a Slack notification when there\'s a new tweet. It includes a Schedule trigger to check for tweets and a Slack action to send notifications.');
    }
    else if (lowerMessage.includes('sync') && (lowerMessage.includes('contact') || lowerMessage.includes('database'))) {
        createSyncContactsWorkflow();
        addMessageToChat('assistant', '✨ I\'ve created a workflow that syncs contacts to a database. It includes a Webhook trigger and a Database action to store the data.');
    }
    else if (lowerMessage.includes('schedule') || lowerMessage.includes('cron')) {
        const node = createNode('trigger', 'Schedule', 100, 100);
        addMessageToChat('assistant', '⏰ I\'ve added a Schedule trigger to your canvas. You can configure it to run at specific times or intervals.');
    }
    else if (lowerMessage.includes('webhook') || lowerMessage.includes('api')) {
        const node = createNode('trigger', 'Webhook', 100, 100);
        addMessageToChat('assistant', '🌐 I\'ve added a Webhook trigger to your canvas. This will allow you to trigger the workflow via HTTP requests.');
    }
    else if (lowerMessage.includes('if') || lowerMessage.includes('condition')) {
        const node = createNode('logic', 'IF', 100, 100);
        addMessageToChat('assistant', '🔀 I\'ve added an IF condition node to your canvas. You can use this to create conditional logic in your workflow.');
    }
    else if (lowerMessage.includes('clear') || lowerMessage.includes('reset')) {
        clearWorkflow();
        addMessageToChat('assistant', '🧹 I\'ve cleared the workflow canvas for you.');
    }
    else if (lowerMessage.includes('help')) {
        addMessageToChat('assistant', `🤖 **AI-Powered Workflow Assistant**

Here are some things you can ask me:
            
💡 **Smart Workflows:**
• "Send email when form submitted"
• "Slack notification on new tweet"
• "Sync contacts to database"
• "Create a complex approval workflow"
• "Automate customer onboarding"

⚡ **Quick Actions:**
• "Add a webhook trigger"
• "Add an IF condition"
• "Optimize my workflow"
• "Explain this workflow"
• "Clear the workflow"

🎯 **Advanced Features:**
• I can analyze workflow complexity
• I suggest optimizations automatically
• I learn from your preferences
• I provide contextual help

You can also drag and drop nodes from the Nodes tab to build your workflow manually!`);
    }
    else {
        // Enhanced generic response with suggestions
        const suggestions = generateWorkflowSuggestions(message);
        addMessageToChat('assistant', `🤖 I understand you want to create a workflow related to: "${message}". 

💡 **AI Analysis:** Based on your input, I detected these possibilities:
${suggestions.join('\n')}

🔧 **Try describing your automation using:**
- **Triggers:** webhook, schedule, email, file upload
- **Actions:** send email, slack, database, API calls
- **Logic:** IF conditions, loops, data transformation
- **Services:** Specific tools you want to integrate

Or you can drag nodes from the Nodes tab to build manually!`);
    }
}

// Generate intelligent workflow suggestions
function generateWorkflowSuggestions(message) {
    const suggestions = [];
    const lowerMessage = message.toLowerCase();
    
    // Service-based suggestions
    if (lowerMessage.includes('customer')) {
        suggestions.push('• Customer management workflow with CRM integration');
    }
    if (lowerMessage.includes('order')) {
        suggestions.push('• Order processing automation with notifications');
    }
    if (lowerMessage.includes('backup')) {
        suggestions.push('• Automated backup and sync workflow');
    }
    if (lowerMessage.includes('report')) {
        suggestions.push('• Automated report generation and distribution');
    }
    if (lowerMessage.includes('social')) {
        suggestions.push('• Social media automation and monitoring');
    }
    
    // Default suggestions if no specific patterns found
    if (suggestions.length === 0) {
        suggestions.push('• Data processing and transformation workflow');
        suggestions.push('• Notification and alerting system');
        suggestions.push('• Integration between different services');
    }
    
    return suggestions;
}

// Pre-built Workflow Templates
function createEmailFormWorkflow() {
    clearWorkflow();
    const webhook = createNode('trigger', 'Webhook', 150, 150);
    const sendEmail = createNode('action', 'Send Email', 400, 150);
    
    state.connections.push({ from: webhook.id, to: sendEmail.id });
    updateConnections();
}

function createSlackTwitterWorkflow() {
    clearWorkflow();
    const schedule = createNode('trigger', 'Schedule', 150, 150);
    const http = createNode('action', 'HTTP Request', 400, 150);
    const slack = createNode('action', 'Slack', 650, 150);
    
    state.connections.push({ from: schedule.id, to: http.id });
    state.connections.push({ from: http.id, to: slack.id });
    updateConnections();
}

function createSyncContactsWorkflow() {
    clearWorkflow();
    const webhook = createNode('trigger', 'Webhook', 150, 150);
    const set = createNode('transform', 'Set', 400, 150);
    const database = createNode('action', 'Database', 650, 150);
    
    state.connections.push({ from: webhook.id, to: set.id });
    state.connections.push({ from: set.id, to: database.id });
    updateConnections();
}

// Workflow Actions
function clearWorkflow() {
    state.nodes = [];
    state.connections = [];
    state.selectedNode = null;
    elements.canvas.innerHTML = '';
    elements.connectionsSvg.innerHTML = '';
    updateCanvasInfo();
}

function saveWorkflow() {
    const workflow = {
        nodes: state.nodes,
        connections: state.connections,
        version: '1.0.0',
        timestamp: new Date().toISOString()
    };
    
    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    addMessageToChat('assistant', 'Your workflow has been saved! The JSON file will download shortly.');
}

function executeWorkflow() {
    if (state.nodes.length === 0) {
        alert('Please add some nodes to your workflow first!');
        return;
    }
    
    // Show test panel
    elements.testPanel.classList.remove('hidden');
    
    // Simulate workflow execution
    elements.testResults.innerHTML = '<div class="loading">Executing workflow...</div>';
    
    setTimeout(() => {
        simulateExecution();
    }, 1000);
}

function simulateExecution() {
    let resultsHTML = '';
    
    state.nodes.forEach((node, index) => {
        const status = Math.random() > 0.1 ? 'success' : 'error';
        const duration = Math.floor(Math.random() * 500) + 100;
        
        resultsHTML += `
            <div class="execution-step ${status}">
                <div class="step-name">${index + 1}. ${node.name}</div>
                <div class="step-data">
                    Status: ${status === 'success' ? '✓ Success' : '✗ Error'}<br>
                    Duration: ${duration}ms<br>
                    ${status === 'success' ? 
                        'Output: { "success": true, "data": {...} }' : 
                        'Error: Connection timeout'}
                </div>
            </div>
        `;
    });
    
    resultsHTML += `
        <div class="execution-step success">
            <div class="step-name">Workflow Completed</div>
            <div class="step-data">
                Total nodes: ${state.nodes.length}<br>
                Total duration: ${Math.floor(Math.random() * 2000) + 500}ms<br>
                Status: ✓ Success
            </div>
        </div>
    `;
    
    elements.testResults.innerHTML = resultsHTML;
}

// Node Search
function handleNodeSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const nodeItems = document.querySelectorAll('.node-item');
    
    nodeItems.forEach(item => {
        const nodeName = item.dataset.nodeName.toLowerCase();
        if (nodeName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Update Canvas Info
function updateCanvasInfo() {
    const nodeCount = state.nodes.length;
    const connectionCount = state.connections.length;
    
    if (nodeCount === 0) {
        elements.canvasInfo.textContent = 'Drag nodes from the sidebar or use the chat to build your workflow';
    } else {
        elements.canvasInfo.textContent = `${nodeCount} node${nodeCount !== 1 ? 's' : ''}, ${connectionCount} connection${connectionCount !== 1 ? 's' : ''}`;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
