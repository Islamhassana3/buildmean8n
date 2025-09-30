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
  background: var(--surface-elevated);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.75rem;
  min-width: 180px;
  cursor: move;
  box-shadow: var(--shadow);
  transition: var(--transition-fast);
}

.workflow-node:hover {
  box-shadow: var(--shadow-md);
}

.workflow-node.selected {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow);
}

.workflow-node.trigger {
  border-color: #10B981;
}

.workflow-node.action {
  border-color: var(--primary-color);
}

.workflow-node.logic {
  border-color: #F59E0B;
}

.workflow-node.transform {
  border-color: #8B5CF6;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.node-icon {
  font-size: 1.25rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: 0.375rem;
}

.node-title {
  font-weight: 600;
  color: var(--text-primary);
}

.node-description {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.node-controls {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.node-controls button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.node-controls button:hover {
  background: var(--surface-hover);
  color: var(--text-primary);
}

.connection-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--surface);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  cursor: crosshair;
  z-index: 20;
}

.connection-point.input {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.connection-point.output {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.connection-point:hover {
  background: var(--primary-color);
  transform: translateY(-50%) scale(1.3);
}

.connection-point.input:hover {
  transform: translateY(-50%) scale(1.3);
}

.connection-point.output:hover {
  transform: translateY(-50%) scale(1.3);
}
</style></content>
<parameter name="filePath">/workspaces/buildmean8n/WorkflowNode.vue