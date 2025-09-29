// N8N Service Integration
class N8NServiceConnector {
    constructor(options = {}) {
        // Handle environment variables for both browser and Node.js
        const getEnvVar = (name, defaultValue) => {
            if (typeof process !== 'undefined' && process.env) {
                return process.env[name] || defaultValue;
            }
            return defaultValue;
        };
        
        this.apiUrl = options.apiUrl || getEnvVar('N8N_API_URL', 'http://localhost:5678');
        this.apiKey = options.apiKey || getEnvVar('N8N_API_KEY', '');
        this.webhookUrl = options.webhookUrl || getEnvVar('N8N_WEBHOOK_URL', this.apiUrl);
        this.connected = false;
        
        this.init();
    }

    async init() {
        try {
            await this.checkConnection();
            console.log('✅ Connected to n8n service at', this.apiUrl);
        } catch (error) {
            console.warn('⚠️ Failed to connect to n8n service:', error.message);
            console.log('Running in simulation mode...');
        }
    }

    // Check if n8n service is available
    async checkConnection() {
        try {
            const response = await this.makeRequest('/healthz', 'GET');
            this.connected = response.ok;
            return this.connected;
        } catch (error) {
            this.connected = false;
            throw error;
        }
    }

    // Make HTTP request to n8n API
    async makeRequest(endpoint, method = 'GET', data = null) {
        const url = `${this.apiUrl}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(this.apiKey && { 'X-N8N-API-KEY': this.apiKey })
            }
        };

        if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`n8n API request failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    // Create workflow in n8n
    async createWorkflow(workflowData) {
        if (!this.connected) {
            return this.simulateWorkflowCreation(workflowData);
        }

        try {
            return await this.makeRequest('/api/v1/workflows', 'POST', {
                name: workflowData.name || 'BuildMean8n Workflow',
                nodes: this.transformNodesToN8N(workflowData.nodes),
                connections: workflowData.connections,
                active: workflowData.active || false,
                tags: ['buildmean8n']
            });
        } catch (error) {
            console.error('Failed to create workflow in n8n:', error);
            return this.simulateWorkflowCreation(workflowData);
        }
    }

    // Execute workflow in n8n
    async executeWorkflow(workflowId, inputData = {}) {
        if (!this.connected) {
            return this.simulateWorkflowExecution(workflowId, inputData);
        }

        try {
            return await this.makeRequest(`/api/v1/workflows/${workflowId}/execute`, 'POST', {
                input: inputData
            });
        } catch (error) {
            console.error('Failed to execute workflow in n8n:', error);
            return this.simulateWorkflowExecution(workflowId, inputData);
        }
    }

    // Get workflow from n8n
    async getWorkflow(workflowId) {
        if (!this.connected) {
            return this.simulateGetWorkflow(workflowId);
        }

        try {
            return await this.makeRequest(`/api/v1/workflows/${workflowId}`);
        } catch (error) {
            console.error('Failed to get workflow from n8n:', error);
            return this.simulateGetWorkflow(workflowId);
        }
    }

    // List all workflows
    async listWorkflows() {
        if (!this.connected) {
            return this.simulateListWorkflows();
        }

        try {
            return await this.makeRequest('/api/v1/workflows');
        } catch (error) {
            console.error('Failed to list workflows from n8n:', error);
            return this.simulateListWorkflows();
        }
    }

    // Transform BuildMean8n nodes to n8n format
    transformNodesToN8N(nodes) {
        return nodes.map(node => ({
            id: node.id.toString(),
            name: node.name,
            type: this.mapNodeTypeToN8N(node.type, node.name),
            position: [node.x || 0, node.y || 0],
            parameters: node.config || {},
            ...this.getN8NNodeDefaults(node.type, node.name)
        }));
    }

    // Map BuildMean8n node types to n8n node types
    mapNodeTypeToN8N(type, name) {
        const mapping = {
            'trigger': {
                'Webhook': 'n8n-nodes-base.webhook',
                'Schedule': 'n8n-nodes-base.cron',
                'Email': 'n8n-nodes-base.emailReadImap'
            },
            'action': {
                'HTTP Request': 'n8n-nodes-base.httpRequest',
                'Send Email': 'n8n-nodes-base.emailSend',
                'Slack': 'n8n-nodes-base.slack',
                'Database': 'n8n-nodes-base.postgres'
            },
            'logic': {
                'IF': 'n8n-nodes-base.if',
                'Switch': 'n8n-nodes-base.switch',
                'Loop': 'n8n-nodes-base.loop'
            },
            'transform': {
                'Set': 'n8n-nodes-base.set',
                'Code': 'n8n-nodes-base.code',
                'Function': 'n8n-nodes-base.function'
            }
        };

        return mapping[type]?.[name] || 'n8n-nodes-base.noOp';
    }

    // Get default node configuration for n8n
    getN8NNodeDefaults(type, name) {
        const defaults = {
            typeVersion: 1,
            disabled: false,
            continueOnFail: false,
            retryOnFail: false,
            maxTries: 3,
            waitBetweenTries: 1000
        };

        // Add specific defaults based on node type
        if (type === 'trigger' && name === 'Webhook') {
            defaults.webhookId = `webhook_${Date.now()}`;
        }

        return defaults;
    }

    // Simulation methods for fallback when n8n is not available
    simulateWorkflowCreation(workflowData) {
        return {
            id: `sim_wf_${Date.now()}`,
            name: workflowData.name || 'Simulated Workflow',
            active: false,
            nodes: workflowData.nodes,
            connections: workflowData.connections,
            createdAt: new Date().toISOString(),
            simulation: true
        };
    }

    simulateWorkflowExecution(workflowId, inputData) {
        return {
            id: `sim_exec_${Date.now()}`,
            workflowId,
            status: 'completed',
            data: {
                ...inputData,
                simulatedOutput: true,
                executedAt: new Date().toISOString()
            },
            simulation: true
        };
    }

    simulateGetWorkflow(workflowId) {
        return {
            id: workflowId,
            name: 'Simulated Workflow',
            active: false,
            nodes: [],
            connections: {},
            simulation: true
        };
    }

    simulateListWorkflows() {
        return {
            data: [
                {
                    id: 'sim_wf_1',
                    name: 'Sample Workflow 1',
                    active: true,
                    simulation: true
                },
                {
                    id: 'sim_wf_2', 
                    name: 'Sample Workflow 2',
                    active: false,
                    simulation: true
                }
            ],
            simulation: true
        };
    }

    // Register webhook with n8n
    async registerWebhook(workflowId, nodeId, config = {}) {
        const webhookUrl = `${this.webhookUrl}/webhook/${workflowId}/${nodeId}`;
        
        if (!this.connected) {
            return {
                id: `sim_webhook_${Date.now()}`,
                url: webhookUrl,
                workflowId,
                nodeId,
                simulation: true
            };
        }

        try {
            // In real n8n, webhooks are automatically registered when workflow is activated
            return {
                id: `webhook_${workflowId}_${nodeId}`,
                url: webhookUrl,
                workflowId,
                nodeId,
                active: true
            };
        } catch (error) {
            console.error('Failed to register webhook:', error);
            return this.registerWebhook(workflowId, nodeId, config);
        }
    }
}

// Export for use in backend automation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = N8NServiceConnector;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.N8NServiceConnector = N8NServiceConnector;
}