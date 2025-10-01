// AI-powered workflow assistant with advanced capabilities
class AIWorkflowAssistant {
	constructor() {
		this.conversationHistory = [];
		this.workflowContext = {};
		this.suggestedNodes = [];
		this.userPreferences = this.loadUserPreferences();
	}

	// Enhanced natural language processing with context awareness
	async processAdvancedNL(message, context = {}) {
		const lowerMessage = message.toLowerCase();

		// Store conversation history for context
		this.conversationHistory.push({
			type: 'user',
			message: message,
			timestamp: new Date(),
			context: context,
		});

		// Detect workflow patterns and complexity
		const complexity = this.analyzeComplexity(message);
		const intent = this.detectIntent(message);
		const entities = this.extractEntities(message);

		let response = '';
		let action = null;

		switch (intent) {
			case 'create_workflow':
				action = await this.createSmartWorkflow(entities, complexity);
				response = this.generateContextualResponse(action, entities);
				break;

			case 'modify_workflow':
				action = await this.modifyExistingWorkflow(entities);
				response = this.generateModificationResponse(action);
				break;

			case 'optimize_workflow':
				action = await this.optimizeWorkflow();
				response = this.generateOptimizationResponse(action);
				break;

			case 'explain_workflow':
				response = this.explainCurrentWorkflow();
				break;

			case 'troubleshoot':
				action = await this.troubleshootWorkflow(entities);
				response = this.generateTroubleshootResponse(action);
				break;

			case 'suggest_improvements':
				action = await this.suggestImprovements();
				response = this.generateSuggestionResponse(action);
				break;

			default:
				response = await this.handleGenericQuery(message, entities);
		}

		// Store assistant response
		this.conversationHistory.push({
			type: 'assistant',
			message: response,
			timestamp: new Date(),
			action: action,
		});

		return { response, action };
	}

	// Analyze message complexity to determine appropriate response
	analyzeComplexity(message) {
		const complexityIndicators = {
			simple: ['add', 'create', 'make', 'single'],
			medium: ['when', 'if', 'then', 'condition', 'multiple'],
			complex: ['integrate', 'orchestrate', 'parallel', 'sequential', 'error handling'],
		};

		let score = 0;
		Object.entries(complexityIndicators).forEach(([level, indicators]) => {
			const matches = indicators.filter((indicator) =>
				message.toLowerCase().includes(indicator),
			).length;

			if (level === 'simple') score += matches * 1;
			if (level === 'medium') score += matches * 2;
			if (level === 'complex') score += matches * 3;
		});

		if (score <= 2) return 'simple';
		if (score <= 6) return 'medium';
		return 'complex';
	}

	// Detect user intent from message
	detectIntent(message) {
		const intentPatterns = {
			create_workflow: [
				/create.*workflow/i,
				/build.*automation/i,
				/make.*flow/i,
				/set up.*process/i,
				/automate.*task/i,
			],
			modify_workflow: [
				/change.*workflow/i,
				/modify.*flow/i,
				/update.*automation/i,
				/edit.*process/i,
				/alter.*workflow/i,
			],
			optimize_workflow: [
				/optimize.*workflow/i,
				/improve.*performance/i,
				/make.*faster/i,
				/reduce.*time/i,
				/enhance.*efficiency/i,
			],
			explain_workflow: [
				/explain.*workflow/i,
				/how.*work/i,
				/what.*does/i,
				/describe.*process/i,
				/show.*steps/i,
			],
			troubleshoot: [
				/error/i,
				/problem/i,
				/issue/i,
				/bug/i,
				/not working/i,
				/failed/i,
				/broken/i,
				/fix/i,
			],
			suggest_improvements: [
				/suggest.*improvement/i,
				/recommend.*change/i,
				/what.*better/i,
				/how.*improve/i,
				/make.*better/i,
			],
		};

		for (const [intent, patterns] of Object.entries(intentPatterns)) {
			if (patterns.some((pattern) => pattern.test(message))) {
				return intent;
			}
		}

		return 'general_query';
	}

	// Extract entities (services, actions, conditions) from message
	extractEntities(message) {
		const entities = {
			services: [],
			actions: [],
			conditions: [],
			data_types: [],
			frequencies: [],
		};

		// Service detection
		const services = [
			'email',
			'slack',
			'webhook',
			'database',
			'api',
			'http',
			'calendar',
			'file',
			'sms',
		];
		entities.services = services.filter((service) => message.toLowerCase().includes(service));

		// Action detection
		const actions = [
			'send',
			'create',
			'update',
			'delete',
			'notify',
			'trigger',
			'execute',
			'process',
		];
		entities.actions = actions.filter((action) => message.toLowerCase().includes(action));

		// Condition detection
		const conditions = ['if', 'when', 'unless', 'after', 'before', 'while'];
		entities.conditions = conditions.filter((condition) =>
			message.toLowerCase().includes(condition),
		);

		// Data type detection
		const dataTypes = ['json', 'xml', 'csv', 'text', 'image', 'file'];
		entities.data_types = dataTypes.filter((type) => message.toLowerCase().includes(type));

		// Frequency detection
		const frequencies = ['daily', 'weekly', 'monthly', 'hourly', 'every'];
		entities.frequencies = frequencies.filter((freq) => message.toLowerCase().includes(freq));

		return entities;
	}

	// Create intelligent workflow based on analysis
	async createSmartWorkflow(entities, complexity) {
		const workflow = {
			nodes: [],
			connections: [],
			metadata: {
				complexity: complexity,
				entities: entities,
				created: new Date(),
				ai_generated: true,
			},
		};

		// Smart node selection based on entities
		if (entities.services.includes('webhook') || entities.services.includes('api')) {
			workflow.nodes.push(this.createOptimalNode('trigger', 'Webhook', 150, 100));
		}

		if (entities.frequencies.length > 0) {
			workflow.nodes.push(this.createOptimalNode('trigger', 'Schedule', 150, 100));
		}

		if (entities.conditions.length > 0) {
			workflow.nodes.push(this.createOptimalNode('logic', 'IF', 400, 100));
		}

		if (entities.services.includes('email')) {
			workflow.nodes.push(this.createOptimalNode('action', 'Send Email', 650, 100));
		}

		if (entities.services.includes('slack')) {
			workflow.nodes.push(this.createOptimalNode('action', 'Slack', 650, 100));
		}

		if (entities.services.includes('database')) {
			workflow.nodes.push(this.createOptimalNode('action', 'Database', 650, 100));
		}

		// Auto-connect nodes intelligently
		this.autoConnectNodes(workflow);

		// Apply workflow to canvas
		this.applyWorkflowToCanvas(workflow);

		return workflow;
	}

	// Create optimally positioned node
	createOptimalNode(type, name, x, y) {
		const nodeId = state.nodeIdCounter++;
		return {
			id: nodeId,
			type: type,
			name: name,
			x: x,
			y: y,
			config: {},
			ai_suggested: true,
			confidence: this.calculateNodeConfidence(type, name),
		};
	}

	// Calculate confidence score for AI suggestions
	calculateNodeConfidence(type, name) {
		// Base confidence scores
		const baseConfidence = {
			Webhook: 0.9,
			Schedule: 0.8,
			'Send Email': 0.9,
			Slack: 0.85,
			Database: 0.8,
			IF: 0.7,
			'HTTP Request': 0.8,
		};

		return baseConfidence[name] || 0.6;
	}

	// Intelligent node connection
	autoConnectNodes(workflow) {
		const nodes = workflow.nodes;

		// Connect triggers to actions/logic
		const triggers = nodes.filter((n) => n.type === 'trigger');
		const logic = nodes.filter((n) => n.type === 'logic');
		const actions = nodes.filter((n) => n.type === 'action');

		triggers.forEach((trigger) => {
			if (logic.length > 0) {
				workflow.connections.push({ from: trigger.id, to: logic[0].id });
				if (actions.length > 0) {
					workflow.connections.push({ from: logic[0].id, to: actions[0].id });
				}
			} else if (actions.length > 0) {
				workflow.connections.push({ from: trigger.id, to: actions[0].id });
			}
		});
	}

	// Apply AI-generated workflow to canvas
	applyWorkflowToCanvas(workflow) {
		// Clear existing workflow
		clearWorkflow();

		// Add nodes to state and render
		workflow.nodes.forEach((nodeData) => {
			const node = createNode(nodeData.type, nodeData.name, nodeData.x, nodeData.y);
			// Add AI metadata
			const stateNode = state.nodes.find((n) => n.id === node.id);
			if (stateNode) {
				stateNode.ai_suggested = nodeData.ai_suggested;
				stateNode.confidence = nodeData.confidence;
			}
		});

		// Add connections
		workflow.connections.forEach((conn) => {
			state.connections.push(conn);
		});

		updateConnections();
		updateCanvasInfo();
	}

	// Generate contextual response based on action taken
	generateContextualResponse(action, entities) {
		const responses = [
			`I've created an intelligent workflow based on your request. `,
			`Based on the entities I detected (${entities.services.join(', ')}), I've built a workflow that `,
			`Here's what I've set up for you: `,
		];

		let response = responses[Math.floor(Math.random() * responses.length)];

		if (action && action.nodes) {
			const nodeNames = action.nodes.map((n) => n.name).join(', ');
			response += `includes ${nodeNames}. `;
		}

		response += `\n\n💡 **AI Suggestions:**\n`;
		response += `- This workflow has a confidence score of ${this.calculateOverallConfidence(action)}%\n`;
		response += `- Consider adding error handling for production use\n`;
		response += `- Test with sample data before deploying\n`;

		return response;
	}

	// Calculate overall workflow confidence
	calculateOverallConfidence(action) {
		if (!action || !action.nodes) return 75;

		const avgConfidence =
			action.nodes.reduce((sum, node) => sum + (node.confidence || 0.6), 0) / action.nodes.length;

		return Math.round(avgConfidence * 100);
	}

	// Workflow optimization suggestions
	async optimizeWorkflow() {
		const optimizations = [];

		// Analyze current workflow
		if (state.nodes.length === 0) {
			return { message: 'No workflow to optimize. Create a workflow first!' };
		}

		// Check for common optimization opportunities
		const triggers = state.nodes.filter((n) => n.type === 'trigger');
		const actions = state.nodes.filter((n) => n.type === 'action');

		if (triggers.length > 1) {
			optimizations.push('Consider consolidating multiple triggers if they serve similar purposes');
		}

		if (actions.length > 3) {
			optimizations.push(
				'Large workflows might benefit from breaking into smaller, focused workflows',
			);
		}

		// Check for missing error handling
		const hasErrorHandling = state.nodes.some(
			(n) => n.name.includes('Error') || n.name.includes('Retry'),
		);
		if (!hasErrorHandling && actions.length > 0) {
			optimizations.push('Add error handling nodes to improve reliability');
		}

		return { optimizations };
	}

	// Load user preferences from localStorage
	loadUserPreferences() {
		try {
			return (
				JSON.parse(localStorage.getItem('userPreferences')) || {
					preferredNodeTypes: [],
					workflowTemplates: [],
					aiAssistanceLevel: 'medium',
				}
			);
		} catch {
			return {
				preferredNodeTypes: [],
				workflowTemplates: [],
				aiAssistanceLevel: 'medium',
			};
		}
	}

	// Save user preferences
	saveUserPreferences() {
		localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
	}

	// Learn from user interactions
	learnFromInteraction(interaction) {
		// Track user preferences
		if (interaction.action && interaction.action.nodes) {
			interaction.action.nodes.forEach((node) => {
				if (!this.userPreferences.preferredNodeTypes.includes(node.name)) {
					this.userPreferences.preferredNodeTypes.push(node.name);
				}
			});
		}

		this.saveUserPreferences();
	}
}

// Initialize AI assistant
const aiAssistant = new AIWorkflowAssistant();

// Enhanced natural language processing function
async function processNaturalLanguageAdvanced(message) {
	try {
		const result = await aiAssistant.processAdvancedNL(message);

		// Learn from the interaction
		aiAssistant.learnFromInteraction({
			message: message,
			action: result.action,
			timestamp: new Date(),
		});

		return result.response;
	} catch (error) {
		console.error('AI Assistant error:', error);
		return 'I encountered an issue processing your request. Let me try a simpler approach...';
	}
}

// Auto-generate UI improvements based on usage patterns
class UIOptimizer {
	constructor() {
		this.usageData = this.loadUsageData();
		this.startUsageTracking();
	}

	startUsageTracking() {
		// Track button clicks
		document.addEventListener('click', (e) => {
			if (e.target.matches('button')) {
				this.trackAction('button_click', {
					element: e.target.textContent,
					timestamp: new Date(),
				});
			}
		});

		// Track node creation
		const originalCreateNode = window.createNode;
		window.createNode = (...args) => {
			this.trackAction('node_create', {
				type: args[0],
				name: args[1],
				timestamp: new Date(),
			});
			return originalCreateNode.apply(this, args);
		};
	}

	trackAction(action, data) {
		if (!this.usageData[action]) {
			this.usageData[action] = [];
		}
		this.usageData[action].push(data);
		this.saveUsageData();
	}

	loadUsageData() {
		try {
			return JSON.parse(localStorage.getItem('usageData')) || {};
		} catch {
			return {};
		}
	}

	saveUsageData() {
		localStorage.setItem('usageData', JSON.stringify(this.usageData));
	}

	// Generate UI improvement suggestions
	generateUIImprovements() {
		const improvements = [];

		// Analyze most used nodes
		if (this.usageData.node_create) {
			const nodeUsage = {};
			this.usageData.node_create.forEach((item) => {
				nodeUsage[item.name] = (nodeUsage[item.name] || 0) + 1;
			});

			const mostUsed = Object.entries(nodeUsage)
				.sort(([, a], [, b]) => b - a)
				.slice(0, 3)
				.map(([name]) => name);

			improvements.push({
				type: 'quick_access',
				suggestion: `Add quick access buttons for frequently used nodes: ${mostUsed.join(', ')}`,
				nodes: mostUsed,
			});
		}

		return improvements;
	}

	// Auto-implement UI improvements
	implementImprovements() {
		const improvements = this.generateUIImprovements();

		improvements.forEach((improvement) => {
			if (improvement.type === 'quick_access') {
				this.addQuickAccessButtons(improvement.nodes);
			}
		});
	}

	addQuickAccessButtons(nodes) {
		const quickAccessContainer = document.createElement('div');
		quickAccessContainer.className = 'quick-access-nodes';
		quickAccessContainer.innerHTML = `
            <div class="quick-access-header">
                <h4>🚀 Quick Access</h4>
                <small>AI-suggested based on your usage</small>
            </div>
        `;

		nodes.forEach((nodeName) => {
			const button = document.createElement('button');
			button.className = 'quick-node-btn';
			button.textContent = nodeName;
			button.onclick = () => {
				const nodeType = this.getNodeType(nodeName);
				createNode(nodeType, nodeName, 200, 200);
				addMessageToChat('assistant', `Added ${nodeName} node to your workflow!`);
			};
			quickAccessContainer.appendChild(button);
		});

		const sidebar = document.querySelector('.side-panel');
		if (sidebar && !sidebar.querySelector('.quick-access-nodes')) {
			sidebar.insertBefore(quickAccessContainer, sidebar.firstChild);
		}
	}

	getNodeType(nodeName) {
		const nodeTypes = {
			Webhook: 'trigger',
			Schedule: 'trigger',
			Email: 'trigger',
			'HTTP Request': 'action',
			'Send Email': 'action',
			Slack: 'action',
			Database: 'action',
			IF: 'logic',
			Switch: 'logic',
			Loop: 'logic',
			Set: 'transform',
			Code: 'transform',
			Function: 'transform',
		};
		return nodeTypes[nodeName] || 'action';
	}
}

// Initialize UI optimizer
const uiOptimizer = new UIOptimizer();

// Auto-implement improvements after page load
setTimeout(() => {
	uiOptimizer.implementImprovements();
}, 2000);
