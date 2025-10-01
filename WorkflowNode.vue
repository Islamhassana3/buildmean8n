<template>
  <div
    :class="['workflow-node', node.type, { selected: selected }]"
    :id="`node-${node.id}`"
    :style="{ left: node.x + 'px', top: node.y + 'px' }"
    @mousedown="handleMouseDown"
  >
    <!-- Connection points -->
    <div
      v-for="point in connectionPoints"
      :key="point.id"
      :class="['connection-point', point.type]"
      :data-node-id="node.id"
      :data-point-type="point.type"
      @mousedown.stop="startConnection(point.type)"
    ></div>

    <!-- Node header -->
    <div class="node-header">
      <div class="node-icon">{{ nodeIcon }}</div>
      <div class="node-title">{{ node.name }}</div>
    </div>

    <!-- Node description -->
    <div class="node-description">{{ nodeDescription }}</div>

    <!-- Node controls -->
    <div class="node-controls">
      <button @click="configureNode">⚙️</button>
      <button @click="deleteNode">🗑️</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkflowNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    nodeIcon() {
      // Get icon based on node name - simplified version
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
      return icons[this.node.name] || '📦';
    },
    nodeDescription() {
      const descriptions = {
        'trigger': 'Triggers workflow execution',
        'action': 'Performs an action',
        'logic': 'Controls workflow flow',
        'transform': 'Transforms data'
      };
      return descriptions[this.node.type] || 'Workflow node';
    },
    connectionPoints() {
      const points = [];
      if (this.node.type !== 'trigger') {
        points.push({ id: 'input', type: 'input' });
      }
      points.push({ id: 'output', type: 'output' });
      return points;
    }
  },
  methods: {
    handleMouseDown(e) {
      if (e.target.classList.contains('workflow-node') ||
          e.target.classList.contains('node-header') ||
          e.target.classList.contains('node-title')) {
        this.$emit('node-selected', this.node);
        this.startDrag(e);
      }
    },
    startDrag(e) {
      this.$emit('drag-start', {
        node: this.node,
        offset: {
          x: e.clientX - this.node.x,
          y: e.clientY - this.node.y
        }
      });
    },
    startConnection(pointType) {
      this.$emit('connection-start', {
        nodeId: this.node.id,
        pointType
      });
    },
    configureNode() {
      this.$emit('configure-node', this.node);
    },
    deleteNode() {
      this.$emit('delete-node', this.node);
    }
  }
};
</script>

<style scoped>
.workflow-node {
  position: absolute;
  background-color: #ffffff;
  border: 2px solid #e6e6e6;
  border-radius: 8px; /* n8n standard 8px */
  padding: 16px; /* n8n standard padding */
  min-width: 240px; /* Updated to n8n's min-width */
  cursor: move;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.workflow-node:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-color: #ddd;
  transform: translateY(-1px);
}

.workflow-node.selected {
  border-color: #ff6d5a;
  box-shadow: 0 0 0 3px rgba(255, 109, 90, 0.12), 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Node type-specific colors - matching n8n's color coding */
.workflow-node.trigger {
  border-color: #16A34A; /* green-600 */
}

.workflow-node.trigger.selected {
  border-color: #16A34A;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12), 0 4px 16px rgba(0, 0, 0, 0.15);
}

.workflow-node.action {
  border-color: #2563EB; /* blue-600 */
}

.workflow-node.action.selected {
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12), 0 4px 16px rgba(0, 0, 0, 0.15);
}

.workflow-node.logic {
  border-color: #D97706; /* amber-600 */
}

.workflow-node.logic.selected {
  border-color: #D97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.12), 0 4px 16px rgba(0, 0, 0, 0.15);
}

.workflow-node.transform {
  border-color: #9333EA; /* purple-600 */
}

.workflow-node.transform.selected {
  border-color: #9333EA;
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.12), 0 4px 16px rgba(0, 0, 0, 0.15);
}

.node-header {
  display: flex;
  align-items: center;
  gap: 12px; /* n8n spacing between icon and title */
  margin-bottom: 8px;
}

.node-icon {
  font-size: 18px;
  width: 32px; /* Larger icon like n8n */
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F3F4F6; /* Subtle background */
  border-radius: 6px;
}

.node-title {
  font-size: 0.9375rem; /* 15px - n8n's node title size */
  font-weight: 600;
  color: #333333;
  flex: 1;
  line-height: 1.3;
}

.node-description {
  font-size: 0.75rem; /* 12px */
  color: #666666;
  margin-top: 4px;
  line-height: 1.4;
}

.node-controls {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.workflow-node:hover .node-controls {
  opacity: 1;
}

.node-controls button {
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.node-controls button:hover {
  background-color: #F3F4F6;
  color: #333333;
}

.connection-point {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #999999;
  cursor: crosshair;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.connection-point.input {
  left: -7px;
  top: 50%;
  transform: translateY(-50%);
}

.connection-point.output {
  right: -7px;
  top: 50%;
  transform: translateY(-50%);
}

.connection-point:hover {
  border-color: #ff6d5a;
  border-width: 3px;
  transform: translateY(-50%) scale(1.3);
  box-shadow: 0 0 0 4px rgba(255, 109, 90, 0.15);
}

.connection-point.input:hover {
  transform: translateY(-50%) scale(1.3);
}

.connection-point.output:hover {
  transform: translateY(-50%) scale(1.3);
}
</style></content>
<parameter name="filePath">/workspaces/buildmean8n/WorkflowNode.vue