<template>
  <div class="node-selector-panel" v-if="visible">
    <div class="panel-header">
      <h6>{{ t('nodeSelector') }}</h6>
      <button class="btn-close btn-close-sm" @click="$emit('close')"></button>
    </div>
    
    <div class="panel-content">
      <div class="shapes-grid">
        <button 
          v-for="shape in nodeShapes" 
          :key="shape.id"
          class="shape-btn"
          :title="shape.label"
          @click="selectShape(shape)"
        >
          <div class="shape-icon">{{ shape.icon }}</div>
          <div class="shape-label">{{ shape.label }}</div>
          <div class="shape-syntax">{{ shape.syntax }}</div>
        </button>
      </div>
    </div>

    <div class="panel-header mt-3">
      <h6>{{ t('connectionSelector') }}</h6>
    </div>

    <div class="panel-content">
      <div class="connections-grid">
        <button 
          v-for="conn in connectionTypes" 
          :key="conn.id"
          class="connection-btn"
          :title="conn.label"
          @click="selectConnection(conn)"
        >
          <div class="conn-icon">{{ conn.icon }}</div>
          <div class="conn-label">{{ conn.label }}</div>
          <div class="conn-syntax">{{ conn.syntax }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nodeShapes, connectionTypes } from '../templates'

defineProps({
  visible: Boolean,
  t: Function
})

const emit = defineEmits(['close', 'selectShape', 'selectConnection'])

const selectShape = (shape) => {
  emit('selectShape', shape)
}

const selectConnection = (conn) => {
  emit('selectConnection', conn)
}
</script>

<style scoped>
.node-selector-panel {
  position: fixed;
  right: 0;
  top: 60px;
  width: 280px;
  height: calc(100vh - 60px);
  background: white;
  border-left: 1px solid #dee2e6;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  overflow-y: auto;
  z-index: 1000;
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.panel-header {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.panel-header h6 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.panel-content {
  padding: 12px;
}

.shapes-grid,
.connections-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.shape-btn,
.connection-btn {
  padding: 12px 8px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  font-size: 12px;
}

.shape-btn:hover,
.connection-btn:hover {
  border-color: #0d6efd;
  background: #f0f7ff;
  transform: translateY(-2px);
}

.shape-icon,
.conn-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.shape-label,
.conn-label {
  font-weight: 500;
  margin-bottom: 2px;
  color: #333;
}

.shape-syntax,
.conn-syntax {
  font-size: 10px;
  color: #999;
  font-family: monospace;
}

:global([data-bs-theme='dark']) .node-selector-panel {
  background: #2d3139;
  color: #f8f9fa;
  border-left-color: #555;
}

:global([data-bs-theme='dark']) .panel-header {
  border-bottom-color: #555;
  background: #2d3139;
}

:global([data-bs-theme='dark']) .shape-btn,
:global([data-bs-theme='dark']) .connection-btn {
  border-color: #555;
  background: #1e1e1e;
  color: #f8f9fa;
}

:global([data-bs-theme='dark']) .shape-btn:hover,
:global([data-bs-theme='dark']) .connection-btn:hover {
  border-color: #0d6efd;
  background: #0d6efd20;
}

:global([data-bs-theme='dark']) .shape-label,
:global([data-bs-theme='dark']) .conn-label {
  color: #f8f9fa;
}
</style>
