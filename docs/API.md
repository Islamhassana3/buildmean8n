# API Reference

> This documentation is auto-generated. Last updated: 2025-09-29T20:04:22.845Z

## JavaScript API

### Core Workflow Functions

#### `createNode(type, name, x, y)`

Creates a new workflow node on the canvas.

**Parameters:**

- `type` (string): Node type ('trigger', 'action', 'logic', 'transform')
- `name` (string): Node name (e.g., 'Webhook', 'Send Email', 'IF')
- `x` (number): X coordinate on canvas
- `y` (number): Y coordinate on canvas

**Returns:** Node object with id, type, name, position, and configuration

**Example:**

```javascript
const webhookNode = createNode('trigger', 'Webhook', 100, 100);
const emailNode = createNode('action', 'Send Email', 300, 100);
```

#### `processNaturalLanguage(message)`

Processes natural language input and creates corresponding workflow.

**Parameters:**

- `message` (string): Natural language description of desired workflow

**Example:**

```javascript
await processNaturalLanguage('Send email when form is submitted');
```

#### `executeWorkflow()`

Executes the current workflow and displays results in the testing panel.

**Returns:** Promise that resolves when execution completes

#### `saveWorkflow()`

Saves the current workflow as a JSON file for download.

**Returns:** Triggers download of workflow JSON file

#### `clearWorkflow()`

Clears all nodes and connections from the canvas.

### AI Assistant API

#### `AIWorkflowAssistant`

Advanced AI-powered workflow creation and optimization.

**Methods:**

- `processAdvancedNL(message, context)`: Enhanced natural language processing
- `analyzeComplexity(message)`: Determines workflow complexity level
- `detectIntent(message)`: Identifies user intent from input
- `extractEntities(message)`: Extracts services, actions, conditions
- `createSmartWorkflow(entities, complexity)`: Generates intelligent workflows
- `optimizeWorkflow()`: Provides optimization suggestions

### Testing Framework API

#### `WorkflowTestingBot`

Automated testing and validation system.

**Methods:**

- `generateTestCases(workflow)`: Creates comprehensive test suite
- `runAllTests()`: Executes all generated tests
- `generateTestReport(results)`: Creates detailed test report
- `testNodeConnectivity(workflow)`: Validates node connections
- `testDataFlow(workflow)`: Tests data flow simulation

### Backend Automation API

#### `BackendAutomationManager`

Complete backend automation and workflow execution system.

**Methods:**

- `executeWorkflow(workflowId, inputData)`: Execute workflow with monitoring
- `generateAPIFromWorkflows()`: Auto-generate REST API endpoints
- `performHealthCheck()`: System health monitoring
- `backupSystem.performBackup()`: Manual backup trigger

## REST API Endpoints

### Workflow Management

- `GET /api/workflows` - List all workflows
- `GET /api/workflows/{id}` - Get specific workflow
- `POST /api/workflows/{id}/execute` - Execute workflow
- `GET /api/workflows/{id}/status` - Get execution status

### Webhook Endpoints

- `POST /api/webhooks/{workflowId}/{nodeId}` - Trigger workflow via webhook

### Health & Monitoring

- `GET /api/health` - System health status
- `GET /api/metrics` - Performance metrics

## State Management

### Global State Object

```javascript
const state = {
	nodes: [], // Array of workflow nodes
	connections: [], // Array of node connections
	selectedNode: null, // Currently selected node
	zoom: 1, // Canvas zoom level
	panOffset: { x: 0, y: 0 }, // Canvas pan position
	nodeIdCounter: 1, // Auto-incrementing node ID
};
```

### Node Object Structure

```javascript
{
    id: number,          // Unique node identifier
    type: string,        // Node type (trigger|action|logic|transform)
    name: string,        // Node name (Webhook, Send Email, etc.)
    x: number,           // X position on canvas
    y: number,           // Y position on canvas
    config: object,      // Node-specific configuration
    ai_suggested: boolean, // Whether node was AI-generated
    confidence: number   // AI confidence score (0-1)
}
```

### Connection Object Structure

```javascript
{
    from: number,        // Source node ID
    to: number          // Target node ID
}
```

## Event System

### Custom Events

- `nodeCreated`: Fired when a new node is created
- `nodeDeleted`: Fired when a node is deleted
- `workflowExecuted`: Fired when workflow execution completes
- `aiSuggestion`: Fired when AI provides workflow suggestions

### Event Listeners

```javascript
document.addEventListener('nodeCreated', (event) => {
	console.log('New node created:', event.detail);
});
```

---

_This API reference is automatically generated and updated with each release._
