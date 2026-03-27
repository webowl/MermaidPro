<template>
  <div class="wizard-modal" v-if="visible" @click.self="close">
    <div class="wizard-dialog">
      <div class="wizard-header">
        <h5>{{ t('wizard') }}: {{ currentDiagramName }}</h5>
        <button class="btn-close" @click="close"></button>
      </div>
      
      <div class="wizard-body">
        <div class="wizard-progress">
          <div class="progress" style="height: 4px;">
            <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <small class="text-muted">{{ t('step') }} {{ currentStep + 1 }} {{ t('of') }} {{ totalSteps }}</small>
        </div>

        <div class="wizard-content">
          <h6>{{ t(currentStepData.title) }}</h6>
          <p class="text-muted">{{ t(currentStepData.description) }}</p>

          <!-- Step 1: Direction Selection -->
          <div v-if="currentStepData.action === 'selectDirection'" class="step-options">
            <button 
              v-for="opt in currentStepData.options" 
              :key="opt.value"
              class="btn btn-outline-primary btn-sm m-2"
              :class="{ active: wizardState.direction === opt.value }"
              @click="wizardState.direction = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>

          <!-- Step 2: Add Nodes -->
          <div v-if="currentStepData.action === 'addNodes'" class="step-editor">
            <small class="text-muted d-block mb-2">{{ t('addNode') }}</small>
            <div class="node-shapes-mini">
              <button 
                v-for="shape in nodeShapes" 
                :key="shape.id"
                class="btn btn-sm btn-outline-secondary"
                :title="shape.label"
                @click="insertNode(shape)"
              >
                {{ shape.icon }}
              </button>
            </div>
          </div>

          <!-- Step 3: Add Connections -->
          <div v-if="currentStepData.action === 'addConnections'" class="step-editor">
            <small class="text-muted d-block mb-2">{{ t('addConnection') }}</small>
            <div class="connection-types-mini">
              <button 
                v-for="conn in connectionTypes" 
                :key="conn.id"
                class="btn btn-sm btn-outline-secondary"
                :title="conn.label"
                @click="insertConnection(conn)"
              >
                {{ conn.icon }}
              </button>
            </div>
          </div>

          <!-- Step 1: Add Participants -->
          <div v-if="currentStepData.action === 'addParticipants'" class="step-editor">
            <input 
              v-model="wizardState.participant" 
              type="text" 
              class="form-control form-control-sm mb-2"
              :placeholder="t('addNode')"
              @keyup.enter="addParticipant"
            >
            <button class="btn btn-sm btn-primary" @click="addParticipant">{{ t('addNode') }}</button>
            <div class="mt-2">
              <span v-for="(p, i) in wizardState.participants" :key="i" class="badge bg-info me-1">
                {{ p }}
                <button class="btn-close btn-close-white ms-1" @click="removeParticipant(i)"></button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="wizard-footer">
        <button class="btn btn-sm btn-secondary" @click="close">{{ t('cancelWizard') }}</button>
        <div class="btn-group" role="group">
          <button 
            class="btn btn-sm btn-outline-secondary" 
            @click="prevStep"
            :disabled="currentStep === 0"
          >
            {{ t('prevStep') }}
          </button>
          <button 
            class="btn btn-sm btn-primary" 
            @click="isLastStep ? finish : nextStep"
          >
            {{ isLastStep ? t('finishWizard') : t('nextStep') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { wizardSteps, nodeShapes, connectionTypes } from '../templates'

const props = defineProps({
  visible: Boolean,
  diagramType: String,
  t: Function
})

const emit = defineEmits(['close', 'finish'])

const currentStep = ref(0)
const wizardState = ref({
  direction: 'TD',
  participant: '',
  participants: []
})

const steps = computed(() => wizardSteps[props.diagramType] || [])
const totalSteps = computed(() => steps.value.length)
const currentStepData = computed(() => steps.value[currentStep.value] || {})
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)
const progressPercent = computed(() => ((currentStep.value + 1) / totalSteps.value) * 100)

const currentDiagramName = computed(() => {
  const names = {
    flowchart: props.t('flowchart.name'),
    sequence: props.t('sequence.name')
  }
  return names[props.diagramType] || props.diagramType
})

const nextStep = () => {
  if (currentStep.value < totalSteps.value - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const addParticipant = () => {
  if (wizardState.value.participant.trim()) {
    wizardState.value.participants.push(wizardState.value.participant)
    wizardState.value.participant = ''
  }
}

const removeParticipant = (index) => {
  wizardState.value.participants.splice(index, 1)
}

const insertNode = (shape) => {
  emit('insertNode', shape)
}

const insertConnection = (conn) => {
  emit('insertConnection', conn)
}

const finish = () => {
  emit('finish', wizardState.value)
  close()
}

const close = () => {
  currentStep.value = 0
  wizardState.value = { direction: 'TD', participant: '', participants: [] }
  emit('close')
}
</script>

<style scoped>
.wizard-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.wizard-dialog {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.wizard-header {
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wizard-header h5 {
  margin: 0;
  font-size: 18px;
}

.wizard-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.wizard-progress {
  margin-bottom: 16px;
}

.wizard-content {
  margin-top: 16px;
}

.wizard-content h6 {
  margin-bottom: 8px;
  font-weight: 600;
}

.step-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.step-options .btn.active {
  background-color: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.step-editor {
  margin-top: 12px;
}

.node-shapes-mini,
.connection-types-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.node-shapes-mini .btn,
.connection-types-mini .btn {
  padding: 6px 10px;
  font-size: 14px;
}

.wizard-footer {
  padding: 12px 16px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.wizard-footer .btn-group {
  display: flex;
  gap: 4px;
}

:global([data-bs-theme='dark']) .wizard-dialog {
  background: #2d3139;
  color: #f8f9fa;
}

:global([data-bs-theme='dark']) .wizard-header,
:global([data-bs-theme='dark']) .wizard-footer {
  border-color: #555;
}
</style>
