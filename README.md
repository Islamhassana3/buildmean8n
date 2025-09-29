# Build Mean8n - Natural Language Workflow Builder

A powerful, intuitive workflow builder and editor with natural language capabilities, inspired by n8n. Build automation workflows using drag-and-drop or simply describe what you want in plain English!

## 🌟 Features

### 🤖 Natural Language Interface
- **AI-Powered Chatbot**: Describe your workflow in natural language and watch it come to life
- **Smart Suggestions**: Get contextual suggestions for common workflow patterns
- **Interactive Assistance**: Ask questions and get help building complex automations

### 🎨 Visual Workflow Editor
- **Drag & Drop**: Intuitive drag-and-drop interface for building workflows
- **Rich Node Library**: Pre-built nodes for triggers, actions, logic, and transformations
- **Visual Connections**: Connect nodes with animated connection lines
- **Zoom & Pan**: Navigate large workflows with zoom and pan controls

### 🔧 Comprehensive Node Types

#### Triggers
- 🌐 **Webhook**: Trigger workflows via HTTP requests
- ⏰ **Schedule**: Run workflows on a schedule (cron-like)
- 📧 **Email Trigger**: Start workflows when emails arrive

#### Actions
- 🔗 **HTTP Request**: Make API calls to any service
- ✉️ **Send Email**: Send emails automatically
- 💬 **Slack**: Send messages to Slack channels
- 🗄️ **Database**: Query and update databases

#### Logic
- 🔀 **IF Condition**: Conditional branching
- 🔢 **Switch**: Multiple condition routing
- 🔄 **Loop**: Iterate over data

#### Transform
- 📝 **Set**: Set field values
- 💻 **Code**: Execute custom JavaScript
- ⚡ **Function**: Transform data

### 🧪 Built-in Testing
- **Live Execution**: Test your workflows in real-time
- **Step-by-Step Results**: See execution details for each node
- **Input/Output Preview**: View data flowing through your workflow
- **Error Handling**: Identify and debug issues quickly

## 🚀 Getting Started

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Islamhassana3/buildmean8n.git
   cd buildmean8n
   ```

2. **Start the application**:
   ```bash
   npm start
   ```
   Or simply open `index.html` in your browser.

3. **Start building**:
   - Use the chat panel to describe your workflow
   - Or drag nodes from the "Nodes" tab to the canvas
   - Connect nodes by clicking on connection points
   - Test your workflow with the "Execute" button

## 💡 Usage Examples

### Example 1: Natural Language
In the chat panel, type:
```
"Send email when form submitted"
```

The AI will automatically create a workflow with:
- Webhook trigger (to receive form data)
- Send Email action (to send the notification)

### Example 2: Drag & Drop
1. Switch to the "Nodes" tab
2. Drag a "Schedule" trigger to the canvas
3. Drag an "HTTP Request" action to the canvas
4. Click the output point on Schedule and the input point on HTTP Request to connect them
5. Click "Execute" to test

### Example 3: Complex Workflows
In the chat, try:
```
"Slack notification on new tweet"
```

This creates:
- Schedule trigger (checks for new tweets)
- HTTP Request (calls Twitter API)
- Slack action (sends notification)

## 🎯 Key Features in Detail

### Chat Assistant
The intelligent chat assistant understands common workflow patterns:
- "Send email when..."
- "Slack notification on..."
- "Sync contacts to database"
- "Add a webhook trigger"
- "Add an IF condition"

### Visual Canvas
- **Grid Background**: Aligned grid for precise node placement
- **Responsive Design**: Works on desktop and tablet devices
- **Zoom Controls**: Zoom in/out or fit to view
- **Connection Management**: Click on connections to delete them

### Node Configuration
Each node can be configured with specific settings:
- Click the ⚙️ icon on any node to configure
- Delete nodes with the 🗑️ icon
- Drag nodes to reposition them

### Workflow Management
- **Save**: Export your workflow as JSON
- **Clear**: Start fresh with a clean canvas
- **Execute**: Test your workflow with sample data

## 🏗️ Architecture

### Project Structure
```
buildmean8n/
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive styling
├── script.js           # Application logic
├── package.json        # Project metadata
└── README.md           # This file
```

### Technology Stack
- **Pure HTML/CSS/JavaScript**: No framework dependencies
- **SVG for Connections**: Smooth, scalable connection lines
- **Modern ES6+**: Clean, maintainable code
- **Responsive Design**: Mobile-friendly interface

## 🔮 Future Enhancements

### Planned Features
- [ ] Backend integration for actual workflow execution
- [ ] User authentication and workflow persistence
- [ ] Real API integrations (Slack, Email, etc.)
- [ ] Advanced node configuration modals
- [ ] Workflow templates library
- [ ] Collaboration features (multi-user editing)
- [ ] Version control for workflows
- [ ] Advanced AI capabilities using LLMs
- [ ] Custom node creation
- [ ] Workflow marketplace

## 🛠️ Development

### Local Development
```bash
# Start local server
npm start

# Or use Python
python3 -m http.server 8080

# Then open http://localhost:8080
```

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Workflow JSON Format

Workflows are saved in the following format:
```json
{
  "nodes": [
    {
      "id": 1,
      "type": "trigger",
      "name": "Webhook",
      "x": 150,
      "y": 150,
      "config": {}
    }
  ],
  "connections": [
    {
      "from": 1,
      "to": 2
    }
  ],
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by [n8n](https://n8n.io/) - the workflow automation platform
- Icons from Bootstrap Icons
- Modern UI principles from various design systems

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Happy Automating! 🚀**