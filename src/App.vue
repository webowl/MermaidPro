<template>
  <div class="app-shell">
    <!-- Top Navbar -->
    <nav class="navbar navbar-light bg-light border-bottom">
      <div class="container-fluid px-3 d-flex justify-content-between align-items-center">
        <div class="d-flex gap-2 align-items-center">
          <button class="btn btn-sm btn-outline-secondary" @click="sidebarVisible = !sidebarVisible" :title="t('toggleSidebar')">≡</button>
          <div class="dropdown">
            <a class="btn btn-sm btn-light dropdown-toggle" href="#" role="button" id="fileMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              File
            </a>
            <ul class="dropdown-menu" aria-labelledby="fileMenuDropdown">
              <li><a class="dropdown-item" href="#" @click.prevent="newFile">{{ t('newFile') }}</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="openFileInput">{{ t('openFile') }}</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="saveFile">{{ t('saveFile') }}</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="exportSvg">{{ t('exportSvg') }}</a></li>
            </ul>
          </div>
          <!-- Templates Dropdown with Submenus -->
          <div class="dropdown">
            <a class="btn btn-sm btn-light dropdown-toggle" href="#" role="button" id="templateMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              {{ t('templates') }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="templateMenuDropdown">
              <li v-for="cat in templateCategories" :key="cat.key" class="dropdown-submenu">
                <a class="dropdown-item" href="#">
                  {{ cat.icon }} {{ cat.label[lang] }} <span class="float-end">▸</span>
                </a>
                <ul class="dropdown-menu dropdown-submenu-menu">
                  <li v-for="item in templates[cat.key].items" :key="item.id">
                    <a class="dropdown-item" href="#" @click.prevent="applyTemplate(item)">
                      {{ item.label[lang] || item.label.en }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          </div>
        <div class="d-flex gap-2 align-items-center">
          <select class="form-select form-select-sm" style="width: 80px" v-model="lang" @change="switchLanguage">
            <option value="en">EN</option>
            <option value="zh">中文</option>
          </select>
          <select class="form-select form-select-sm" style="width: 80px" v-model="isDarkMode" @change="switchTheme">
            <option :value="false">Light</option>
            <option :value="true">Dark</option>
          </select>
          <span class="user-icon btn btn-sm btn-outline-secondary">
            <i class="bi bi-person-circle"></i>
          </span>
        </div>
      </div>
    </nav>

    <transition name="fade">
      <div v-if="notification" class="position-fixed top-0 end-0 m-3 alert alert-warning py-2 px-3" role="alert" style="z-index: 1100; min-width: 220px;">
        {{ notification }}
      </div>
    </transition>
    <transition name="fade">
      <div v-if="hasError" class="position-fixed top-0 start-50 translate-middle-x m-3 alert alert-danger py-2 px-4 d-flex align-items-center gap-2" role="alert" style="z-index: 1100; min-width: 320px; max-width: 90vw;">
        <span>{{ errorMessage }}</span>
        <button class="btn-close btn-close-sm" @click="hasError = false; errorMessage = ''"></button>
      </div>
    </transition>

    <!-- Main Layout -->
    <div class="main-container d-flex">
      <!-- Sidebar (Recent Files) -->
      <aside class="sidebar border-end" :class="{ show: sidebarVisible }">
        <div class="p-3">
          <h6 class="mb-2">{{ t('recentFiles') }}</h6>
          <ul class="list-group list-group-flush small">
            <li v-for="file in recentFiles" :key="file.name + file.time" 
                :class="['list-group-item', 'p-2', 'cursor-pointer', { 'fw-bold bg-light': file.name === currentFileName }]"
                @click="loadRecentFile(file)">
              <div class="text-truncate">{{ file.name }}</div>
              <small v-if="file.name === currentFileName" class="text-success">{{ t('current') }}</small>
            </li>
            <li v-if="recentFiles.length === 0" class="list-group-item p-2 text-muted">—</li>
          </ul>
        </div>
      </aside>

      <!-- Editor & Preview -->
      <div class="editor-preview-container">
        <div class="editor-panel" ref="editorPanel">
          <div class="editor-wrapper" ref="editorWrapper"></div>
          <div class="drag-hint small text-muted text-center">{{ t('dragHint') }}</div>
        </div>
        <div class="splitter" @mousedown="startDrag">
          <button
            class="btn btn-sm apply-btn"
            :class="{ 'btn-primary': hasPending, 'btn-secondary': !hasPending }"
            @click.stop.prevent="applyDiagram"
            @mousedown.stop
            :title="t('applyChart')"
          >
            ·
          </button>
        </div>
        <div class="preview-panel" ref="previewPanel">
          <div class="chart-controls chart-controls-top-left">
            <button @click="zoomOut" class="btn btn-sm btn-outline-secondary" :title="t('zoomOut')">−</button>
            <button @click="zoomIn" class="btn btn-sm btn-outline-secondary" :title="t('zoomIn')">+</button>
            <span class="zoom-label">{{ Math.round(zoomLevel * 100) }}%</span>
            <button @click="resetZoom" class="btn btn-sm btn-outline-secondary" :title="t('reset')">⊙</button>
            <button @click="togglePan" class="btn btn-sm" :class="panMode ? 'btn-primary' : 'btn-outline-secondary'" :title="t('pan')">✋</button>
          </div>
          <div id="preview" class="p-2" ref="preview" style="height: 100%; overflow: auto"></div>
        </div>
      </div>
    </div>

    <input type="file" ref="fileInput" class="d-none" accept=".mmd,.mermaid" @change="handleFileOpen" />

    <!-- Template Gallery Modal -->
    <div v-if="showTemplateGallery" class="template-modal-overlay" @click.self="showTemplateGallery = false">
      <div class="template-modal">
        <div class="template-modal-header">
          <h5 class="mb-0">{{ t('selectTemplate') }}</h5>
          <p class="mb-2 text-muted small">{{ t('selectTemplateHint') }}</p>
          <div class="template-search-row">
            <input 
              type="text" 
              class="form-control form-control-sm" 
              :placeholder="t('searchTemplates')"
              v-model="templateSearch"
            />
            <button class="btn btn-sm btn-outline-secondary" @click="showTemplateGallery = false">✕</button>
          </div>
          <!-- Category Tabs -->
          <div class="template-tabs">
            <button 
              class="btn btn-sm template-tab"
              :class="{ 'btn-primary': templateFilter === 'all' }"
              @click="templateFilter = 'all'"
            >{{ t('allTypes') }}</button>
            <button 
              v-for="cat in templateCategories" 
              :key="cat.key"
              class="btn btn-sm template-tab"
              :class="{ 'btn-primary': templateFilter === cat.key }"
              @click="templateFilter = cat.key"
            >{{ cat.icon }} {{ cat.label[lang] }}</button>
          </div>
        </div>
        <div class="template-modal-body">
          <div v-if="filteredTemplates.length === 0" class="text-center text-muted py-4">
            {{ t('noResults') }}
          </div>
          <div class="template-grid">
            <div 
              v-for="item in filteredTemplates" 
              :key="item.id"
              class="template-card"
              @click="applyTemplate(item)"
            >
              <div class="template-card-preview">
                <div class="template-preview-placeholder">
                  <div class="template-preview-icon">{{ diagramTypes.find(d => d.key === Object.keys(templates).find(k => templates[k].items.some(i => i.id === item.id)))?.icon || '📊' }}</div>
                </div>
              </div>
              <div class="template-card-body">
                <div class="template-card-title">{{ item.label[lang] || item.label.en }}</div>
                <div class="template-card-desc">{{ item.desc[lang] || item.desc.en }}</div>
                <button class="btn btn-sm btn-outline-primary template-try-btn">
                  {{ t('tryIt') }} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { autocompletion } from '@codemirror/autocomplete'
import { markdown } from '@codemirror/lang-markdown'
import { indentWithTab } from '@codemirror/commands'
import mermaid from 'mermaid'
import enLocale from './locales/en.json'
import zhLocale from './locales/zh.json'
import { templates, diagramTypes } from './templates.js'

// Mermaid snippet completions
const mermaidCompletions = [
  // Diagram types
  { label: 'graph', type: 'keyword', detail: 'Directed graph', apply: 'graph TD\n    A[Start] --> B[End]' },
  { label: 'graph TD', type: 'keyword', detail: 'Top-down directed graph', apply: 'graph TD\n    A[Start] --> B[End]' },
  { label: 'graph LR', type: 'keyword', detail: 'Left-right directed graph', apply: 'graph LR\n    A[Start] --> B[End]' },
  { label: 'graph BT', type: 'keyword', detail: 'Bottom-top directed graph', apply: 'graph BT\n    A[Start] --> B[End]' },
  { label: 'graph RL', type: 'keyword', detail: 'Right-left directed graph', apply: 'graph RL\n    A[Start] --> B[End]' },
  { label: 'flowchart', type: 'keyword', detail: 'Flowchart syntax', apply: 'flowchart TD\n    A[Start] --> B[End]' },
  { label: 'sequenceDiagram', type: 'keyword', detail: 'Sequence diagram', apply: 'sequenceDiagram\n    participant A\n    participant B\n    A->>B: Hello' },
  { label: 'classDiagram', type: 'keyword', detail: 'Class diagram', apply: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }' },
  { label: 'stateDiagram-v2', type: 'keyword', detail: 'State diagram', apply: 'stateDiagram-v2\n    [*] --> State1\n    State1 --> [*]' },
  { label: 'erDiagram', type: 'keyword', detail: 'Entity-relationship diagram', apply: 'erDiagram\n    CUSTOMER {\n        string name\n        int id\n    }\n    ORDER ||--o{ CUSTOMER : places' },
  { label: 'gantt', type: 'keyword', detail: 'Gantt chart', apply: 'gantt\n    title A Gantt Diagram\n    dateFormat YYYY-MM-DD\n    section Section\n    A task           :a1, 2024-01-01, 30d\n    B task           :a2, 2024-01-05, 20d' },
  { label: 'pie', type: 'keyword', detail: 'Pie chart', apply: 'pie title Pie Chart\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15' },
  { label: 'mindmap', type: 'keyword', detail: 'Mind map', apply: 'mindmap\n    root((Main Topic))\n      Child 1\n      Child 2\n        Grandchild' },
  { label: 'timeline', type: 'keyword', detail: 'Timeline', apply: 'timeline\n    title Timeline Title\n    2024-01 : Event 1\n    2024-02 : Event 2' },
  { label: 'gitGraph', type: 'keyword', detail: 'Git graph', apply: 'gitGraph\n    commit id: "A"\n    commit id: "B"\n    branch feature\n    checkout feature\n    commit id: "C"' },
  // Node shapes
  { label: 'A[...]', type: 'text', detail: 'Rounded rectangle node', apply: 'A[Text]' },
  { label: 'A(...)', type: 'text', detail: 'Stadium/rounded rect', apply: 'A(Text)' },
  { label: 'A{...}', type: 'text', detail: 'Diamond/decision node', apply: 'A{Decision}' },
  { label: 'A((...))', type: 'text', detail: 'Circle node', apply: 'A((Circle))' },
  { label: 'A>{{...}}', type: 'text', detail: 'Hexagon node', apply: 'A>{{Hexagon}}' },
  // Edge styles
  { label: '-->', type: 'operator', detail: 'Arrow line' },
  { label: '---', type: 'operator', detail: 'Plain line' },
  { label: '-.->', type: 'operator', detail: 'Dotted arrow' },
  { label: '==>', type: 'operator', detail: 'Thick arrow' },
  { label: '-.->>', type: 'operator', detail: 'Dotted thick arrow' },
  { label: 'o--', type: 'operator', detail: 'Open circle end' },
  { label: 'x--', type: 'operator', detail: 'Cross end' },
  // Common keywords
  { label: 'subgraph', type: 'keyword', detail: 'Subgraph block' },
  { label: 'end', type: 'keyword', detail: 'End subgraph/block' },
  { label: 'style', type: 'keyword', detail: 'Style a node', apply: 'style A fill:#f9f,stroke:#333,stroke-width:2px' },
  { label: 'classDef', type: 'keyword', detail: 'Define CSS class' },
  { label: 'click', type: 'keyword', detail: 'Add click interaction', apply: 'click A href "https://..."' },
  { label: 'direction', type: 'keyword', detail: 'Set graph direction', apply: 'direction TB' },
  // Comments
  { label: '%%', type: 'comment', detail: 'Comment line' },
  // Mermaid config
  { label: 'init', type: 'keyword', detail: 'Mermaid initialization', apply: '%%{init: {\'theme\': \'default\'}}%%' },
  { label: '%%{', type: 'keyword', detail: 'Mermaid directive block' },
]

// Mermaid autocomplete extension
const mermaidAutocomplete = (context) => {
  const word = context.matchBefore(/\w*|-*|.*/)
  if (!word || (word.from === word.to && !context.explicit)) return null

  // Get current line text before cursor
  const line = context.state.doc.lineAt(context.pos)
  const lineText = line.text.slice(0, context.pos - line.from)

  // Provide completions based on context
  let options = mermaidCompletions

  // If line starts with diagram type keyword, show shape/edge completions
  const startsWithDiagram = /^graph|flowchart|sequenceDi|classDi|stateDi|erDi|gantt|pie|mindmap|timeline|git/i
  if (startsWithDiagram.test(lineText)) {
    options = options.filter(o =>
      ['A[...]', 'A(...)', 'A{...}', 'A((...))', 'A>{{...}}',
       '-->', '---', '-.->', '==>', '-.->>', 'o--', 'x--',
       'subgraph', 'end', 'style', 'classDef', 'click', 'direction'].includes(o.label)
    )
  }

  return {
    from: word.from,
    options,
    validFor: /^[a-zA-Z0-9_%-]*$/
  }
}

const localeData = { en: enLocale, zh: zhLocale }
const lang = ref(localStorage.getItem('mermaidpro-lang') || 'en')
const t = (key) => localeData[lang.value]?.[key] ?? key

const recentFiles = ref(JSON.parse(localStorage.getItem('mermaidpro-recent') || '[]'))
const MAX_RECENT = 8
const currentFileName = ref('')
const isDarkMode = ref(localStorage.getItem('mermaidpro-theme') === 'dark')
const sidebarVisible = ref(false)
const notification = ref('')

// Template Gallery
const showTemplateGallery = ref(false)
const templateFilter = ref('all')
const templateSearch = ref('')
const templateCategories = diagramTypes

const filteredTemplates = computed(() => {
  let items = []
  if (templateFilter.value === 'all') {
    items = Object.values(templates).flatMap(cat => cat.items)
  } else {
    items = templates[templateFilter.value]?.items || []
  }
  if (templateSearch.value.trim()) {
    const q = templateSearch.value.toLowerCase()
    items = items.filter(item =>
      item.label.en.toLowerCase().includes(q) ||
      item.label.zh.toLowerCase().includes(q) ||
      item.desc.en.toLowerCase().includes(q) ||
      item.desc.zh.toLowerCase().includes(q)
    )
  }
  return items
})

const applyTemplate = async (template) => {
  if (!editor) return

  const content = template.code
  const name = `${template.label.en || template.label}.mmd`

  // Validate before applying
  let isValid = false
  try {
    isValid = await isValidMermaid(content)
  } catch (e) {
    isValid = false
  }

  if (!isValid) {
    errorMessage.value = `${t('parseError')}: ${t('syntaxError')}`
    hasError.value = true
    showNotification(t('invalidInitialSource'))
    showTemplateGallery.value = false
    return
  }

  // Valid - apply template
  editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: content } })
  currentFileName.value = name
  addRecent(name, content)
  displaySource.value = content
  hasError.value = false
  errorMessage.value = ''
  renderDiagram()
  showTemplateGallery.value = false
  showNotification(`${t('fromTemplate')}: ${template.label[lang.value] || template.label.en}`)
}

// Apply first template from a type category (for quick access)
const applyTemplateByType = (typeKey) => {
  const items = templates[typeKey]?.items
  if (items && items.length > 0) {
    applyTemplate(items[0])
  }
}

// Zoom & Pan
const zoomLevel = ref(1)
const panMode = ref(false)
const pan = ref({ x: 0, y: 0 })
let isPanning = false
let panStart = { x: 0, y: 0 }

const showNotification = (message) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

const defaultMermaid = `graph LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Option A]
  B -->|No| D[Option B]
  C --> E[End]
  D --> E`

let editor = null

const displaySource = ref(defaultMermaid)
const hasPending = computed(() => editor && getEditorContent() !== displaySource.value)

// Auto-clear error when content becomes valid again
const clearErrorIfValid = async (content) => {
  if (hasError.value && content.trim() && await isValidMermaid(content)) {
    hasError.value = false
    errorMessage.value = ''
  }
}

const preview = ref(null)
const editorPanel = ref(null)
const previewPanel = ref(null)
const editorWrapper = ref(null)
const fileInput = ref(null)

let isDragging = false

const persistRecent = () => {
  localStorage.setItem('mermaidpro-recent', JSON.stringify(recentFiles.value))
}

const addRecent = (name, content) => {
  if (!name) return
  const item = { name, content, time: Date.now() }
  recentFiles.value = [item, ...recentFiles.value.filter((x) => x.name !== name)].slice(0, MAX_RECENT)
  persistRecent()
}

const getEditorContent = () => {
  return editor?.state?.doc?.toString() || ''
}

const updateSvgTransform = () => {
  const svg = preview.value?.querySelector('svg');
  if (svg) {
    svg.style.transform = `scale(${zoomLevel.value}) translate(${pan.value.x}px, ${pan.value.y}px)`;
    svg.style.transformOrigin = 'center center';
    svg.style.maxWidth = '100%';
    svg.style.maxHeight = '100%';
  }
}

const renderDiagram = async () => {
  const source = displaySource.value
  const container = preview.value
  if (!container) return

  if (!source.trim()) {
    container.innerHTML = `<div class="text-muted">${t('editorEmpty')}</div>`
    return
  }

  try {
    const id = `mmd-${Date.now()}`
    const { svg } = await mermaid.render(id, source)
    container.innerHTML = svg
    updateSvgTransform();
  } catch (error) {
    container.innerHTML = `<pre style="color: red; font-size: 12px">${t('parseError')}: ${error.message}</pre>`
  }
}

const getErrorLine = (message) => {
  const match = /line\s*(\d+)/i.exec(message)
  return match ? Number(match[1]) : null
}

const isValidMermaid = async (source) => {
  if (!source || typeof source !== 'string' || !source.trim()) {
    return false
  }
  
  // Use a timeout to prevent hanging
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Parse timeout')), 5000)
  })
  
  try {
    const parsePromise = mermaid.parse(source)
    const result = await Promise.race([parsePromise, timeout])
    return result !== false && result !== undefined
  } catch (e) {
    // Silently fail - invalid mermaid syntax
    return false
  }
}

const hasError = ref(false)
const errorMessage = ref('')

const applyDiagram = async () => {
  const source = getEditorContent()
  if (!source.trim()) {
    hasError.value = false
    errorMessage.value = ''
    showNotification(t('editorEmpty'))
    return
  }

  if (await isValidMermaid(source)) {
    hasError.value = false
    errorMessage.value = ''
    displaySource.value = source
    renderDiagram()
    showNotification(t('applySuccess'))
  } else {
    // Content is invalid — show error banner, keep previous valid preview
    const msg = `${t('parseError')}: ${t('syntaxError')}`
    errorMessage.value = msg
    hasError.value = true
    // Preview stays on last valid displaySource — don't render invalid content
    // Error clears automatically when user types valid content
  }
}

const resizePanels = (editorWidthPx) => {
  const container = editorPanel.value.parentElement
  const containerWidth = container.clientWidth
  const minWidth = 200
  const splitterWidth = 8
  const maxEditorWidth = containerWidth - minWidth - splitterWidth
  const width = Math.max(minWidth, Math.min(editorWidthPx, maxEditorWidth))
  const percentage = (width / containerWidth) * 100
  editorPanel.value.style.width = `${percentage}%`
  previewPanel.value.style.width = `${((containerWidth - width - splitterWidth) / containerWidth) * 100}%`
}

const startDrag = (event) => {
  isDragging = true
  document.body.style.cursor = 'col-resize'
  event.preventDefault()
}

const onDrag = (event) => {
  if (!isDragging) return
  const container = editorPanel.value.parentElement
  const rect = container.getBoundingClientRect()
  const newWidth = event.clientX - rect.left
  resizePanels(newWidth)
}

const stopDrag = () => {
  isDragging = false
  document.body.style.cursor = ''
}

const newFile = () => {
  editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: defaultMermaid } })
  currentFileName.value = ''
  showNotification(t('newFileCreated'))
}

const openFileInput = () => {
  if (!fileInput.value) {
    showNotification('File input not ready')
    return
  }
  fileInput.value.value = null
  fileInput.value.click()
}

const loadFromContent = async (name, content) => {
  if (!editor) {
    showNotification('Editor not ready')
    return
  }

  if (!content || !content.trim()) {
    showNotification(t('editorEmpty'))
    return
  }

  // Validate BEFORE loading
  let isValid = false
  try {
    isValid = await isValidMermaid(content)
  } catch (e) {
    console.warn('Validation error:', e)
    isValid = false
  }

  if (!isValid) {
    // Show error, keep current diagram displayed
    errorMessage.value = `${t('parseError')}: ${t('syntaxError')}`
    hasError.value = true
    showNotification(t('invalidInitialSource'))
    return
  }

  // Content is valid - load it
  try {
    editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: content } })
    currentFileName.value = name
    addRecent(name, content)
    displaySource.value = content
    hasError.value = false
    errorMessage.value = ''
    renderDiagram()
    showNotification(t('fileLoaded'))
  } catch (e) {
    console.error('Failed to load content:', e)
    showNotification('Failed to load file')
  }
}

const handleFileOpen = (event) => {
  try {
    const file = event.target?.files?.[0]
    if (!file) {
      showNotification('No file selected')
      return
    }
    
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!ext || !['mmd', 'mermaid'].includes(ext)) {
      showNotification(t('unsupportedFile'))
      return
    }
    
    const reader = new FileReader()
    reader.onerror = () => {
      showNotification('Failed to read file')
    }
    reader.onload = async () => {
      try {
        const content = reader.result
        if (!content || typeof content !== 'string') {
          showNotification('File is empty or invalid')
          return
        }
        await loadFromContent(file.name, content)
      } catch (e) {
        console.error('Error loading file:', e)
        showNotification('Error loading file')
      }
    }
    reader.readAsText(file, 'utf-8')
  } catch (e) {
    console.error('File open error:', e)
    showNotification('Error opening file')
  }
}

const saveFile = () => {
  const content = getEditorContent()
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'mermaid.mmd'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportSvg = () => {
  const svgContent = preview.value?.querySelector('svg')
  if (!svgContent) {
    showNotification(t('editorEmpty'))
    return
  }
  const blob = new Blob([svgContent.outerHTML], { type: 'image/svg+xml;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'diagram.svg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const loadRecentFile = async (file) => {
  await loadFromContent(file.name, file.content)
}

const switchLanguage = () => {
  localStorage.setItem('mermaidpro-lang', lang.value)
}

const switchTheme = () => {
  localStorage.setItem('mermaidpro-theme', isDarkMode.value ? 'dark' : 'light')
  const html = document.documentElement
  if (isDarkMode.value) {
    html.setAttribute('data-bs-theme', 'dark')
  } else {
    html.removeAttribute('data-bs-theme')
  }
}

// Zoom & Pan methods
const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 3);
  updateSvgTransform();
}
const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.2);
  updateSvgTransform();
}
const resetZoom = () => {
  zoomLevel.value = 1;
  pan.value = { x: 0, y: 0 };
  updateSvgTransform();
}
const togglePan = () => {
  panMode.value = !panMode.value;
  preview.value.style.cursor = panMode.value ? 'grab' : 'default';
}

const onPanStart = (e) => {
  if (!panMode.value) return;
  isPanning = true;
  preview.value.style.cursor = 'grabbing';
  panStart = { x: e.clientX, y: e.clientY };
}

const onPanMove = (e) => {
  if (!isPanning || !panMode.value) return;
  const dx = (e.clientX - panStart.x) / zoomLevel.value;
  const dy = (e.clientY - panStart.y) / zoomLevel.value;
  pan.value.x += dx;
  pan.value.y += dy;
  panStart = { x: e.clientX, y: e.clientY };
  updateSvgTransform();
}

const onPanEnd = () => {
  if (!panMode.value) return;
  isPanning = false;
  preview.value.style.cursor = 'grab';
}

onMounted(async () => {
  const html = document.documentElement
  if (isDarkMode.value) {
    html.setAttribute('data-bs-theme', 'dark')
  }

  // Initialize Mermaid
  mermaid.initialize({
    startOnLoad: false,
    theme: isDarkMode.value ? 'dark' : 'default',
    securityLevel: 'loose'
  })

  // Clear corrupted localStorage data
  try {
    const stored = localStorage.getItem('mermaidpro-recent')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (!Array.isArray(parsed)) {
        localStorage.removeItem('mermaidpro-recent')
        recentFiles.value = []
      }
    }
  } catch (e) {
    localStorage.removeItem('mermaidpro-recent')
    recentFiles.value = []
  }

  // Initialize with default content (don't auto-load recent files)
  displaySource.value = defaultMermaid

  const state = EditorState.create({
    doc: defaultMermaid,
    extensions: [
      basicSetup,
      markdown(),
      keymap.of([indentWithTab]),
      autocompletion({ override: [mermaidAutocomplete] }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          clearErrorIfValid(update.state.doc.toString())
        }
      })
    ]
  })

  editor = new EditorView({
    state,
    parent: editorWrapper.value
  })

  // Render default diagram after DOM is ready
  await renderDiagram()
  resizePanels(window.innerWidth * 0.4)

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  // Drag and drop file
  window.addEventListener('dragover', (e) => e.preventDefault())
  window.addEventListener('drop', async (e) => {
    try {
      e.preventDefault()
      const file = e.dataTransfer?.files?.[0]
      if (!file) return
      
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!ext || !['mmd', 'mermaid'].includes(ext)) return
      
      const reader = new FileReader()
      reader.onerror = () => {
        showNotification('Failed to read file')
      }
      reader.onload = async () => {
        try {
          const content = reader.result
          if (!content || typeof content !== 'string') {
            showNotification('File is empty or invalid')
            return
          }
          await loadFromContent(file.name, content)
        } catch (err) {
          console.error('Error loading dropped file:', err)
          showNotification('Error loading file')
        }
      }
      reader.readAsText(file, 'utf-8')
    } catch (err) {
      console.error('Drop error:', err)
      showNotification('Error processing file')
    }
  });

  // Pan listeners
  preview.value?.addEventListener('mousedown', onPanStart);
  preview.value?.addEventListener('mousemove', onPanMove);
  preview.value?.addEventListener('mouseup', onPanEnd);
  preview.value?.addEventListener('mouseleave', onPanEnd);
})

onUnmounted(() => {
  if (editor) editor.destroy()
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  // Pan listeners
  preview.value?.removeEventListener('mousedown', onPanStart);
  preview.value?.removeEventListener('mousemove', onPanMove);
  preview.value?.removeEventListener('mouseup', onPanEnd);
  preview.value?.removeEventListener('mouseleave', onPanEnd);
})
</script>

<style>
* {
  box-sizing: border-box;
}

.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile browsers */
  overflow: hidden;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1020;
  flex-shrink: 0;
}

.user-icon {
  width: 34px;
  height: 34px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon i {
  font-size: 1.1rem;
}

/* Dropdown submenu styles */
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  display: none;
  position: absolute;
  left: 100%;
  top: -6px;
  margin-left: 0;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu > .dropdown-item::after {
  content: '';
}

:global([data-bs-theme='dark']) .dropdown-submenu > .dropdown-menu {
  background: #2d3139;
  border-color: #444;
}

.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
  display: none;
}

.sidebar.show {
  display: block;
}

.editor-preview-container {
  flex: 1;
  display: flex;
  overflow: hidden;
  /* Ensure full height */
  height: calc(100vh - 57px);
  height: calc(100dvh - 57px);
}

.editor-panel {
  flex: 0 0 auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #dee2e6;
  overflow: hidden;
  height: 100%;
}

.editor-wrapper {
  flex: 1;
  overflow: auto;
  background: #fff;
}

.drag-hint {
  padding: 8px;
  border-top: 1px dashed #ced4da;
  background: #f8f9fa;
  font-size: 12px;
  color: #999;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.splitter {
  width: 8px;
  cursor: col-resize;
  background: #e9ecef;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.splitter:hover {
  background: #dee2e6;
}

.apply-btn {
  width: 20px;
  height: 20px;
  line-height: 1;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 50%;
  border-width: 1px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-panel {
  flex: 1;
  overflow: hidden;
  background: #fff;
  position: relative;
  height: 100%;
}

#preview {
  cursor: default;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 48px 16px 16px 16px !important; /* Padding top for controls */
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.chart-controls {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
  display: flex;
  gap: 4px;
  background: rgba(255,255,255,0.9);
  padding: 6px 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.cursor-pointer {
  cursor: pointer;
}

:global([data-bs-theme='dark']) .sidebar {
  background-color: #2d3139 !important;
  color: #f8f9fa !important;
}

:global([data-bs-theme='dark']) .editor-wrapper {
  background-color: #1e1e1e !important;
}

:global([data-bs-theme='dark']) .preview-panel {
  background-color: #1e1e1e !important;
  color: #f8f9fa !important;
}

:global([data-bs-theme='dark']) .cm-editor {
  background-color: #1e1e1e !important;
  color: #d4d4d4 !important;
}

:global([data-bs-theme='dark']) .cm-gutters {
  background-color: #252526 !important;
}

:global([data-bs-theme='dark']) .chart-controls {
  background: rgba(40,40,40,0.8);
}

.chart-controls .zoom-label {
  font-size: 11px;
  min-width: 36px;
  text-align: center;
  line-height: 30px;
  color: #666;
  user-select: none;
}

:global([data-bs-theme='dark']) .chart-controls .zoom-label {
  color: #aaa;
}

:global([data-bs-theme='dark']) .btn-outline-secondary {
  border-color: #555;
  color: #aaa;
}

/* CodeMirror autocomplete styling */
.cm-tooltip-autocomplete {
  border: 1px solid #dee2e6 !important;
  border-radius: 6px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
  font-size: 13px !important;
}

:global([data-bs-theme='dark']) .cm-tooltip-autocomplete {
  background: #2d3139 !important;
  border-color: #555 !important;
}

.cm-tooltip-autocomplete > ul > li {
  padding: 4px 8px !important;
  border-radius: 3px !important;
}

.cm-tooltip-autocomplete > ul > li[aria-selected] {
  background: #0d6efd !important;
  color: white !important;
}

:global([data-bs-theme='dark']) .cm-tooltip-autocomplete > ul > li[aria-selected] {
  background: #0d6efd !important;
}

/* Template Gallery Modal */
.template-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.template-modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  overflow: hidden;
}

:global([data-bs-theme='dark']) .template-modal {
  background: #2d3139;
  color: #f8f9fa;
}

.template-modal-header {
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0;
}

:global([data-bs-theme='dark']) .template-modal-header {
  border-color: #444;
}

.template-search-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.template-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.template-tab {
  font-size: 13px;
  padding: 4px 10px;
}

.template-modal-body {
  padding: 16px 20px;
  overflow-y: auto;
  flex: 1;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.template-card {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

:global([data-bs-theme='dark']) .template-card {
  border-color: #444;
  background: #252526;
}

.template-card:hover {
  border-color: #0d6efd;
  box-shadow: 0 4px 16px rgba(13, 110, 253, 0.2);
  transform: translateY(-2px);
}

.template-card-preview {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dee2e6;
}

:global([data-bs-theme='dark']) .template-card-preview {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d3139 100%);
  border-color: #444;
}

.template-preview-icon {
  font-size: 32px;
  opacity: 0.8;
}

.template-card-body {
  padding: 12px;
}

.template-card-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:global([data-bs-theme='dark']) .template-card-title {
  color: #f8f9fa;
}

.template-card-desc {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:global([data-bs-theme='dark']) .template-card-desc {
  color: #aaa;
}

.template-try-btn {
  font-size: 12px;
  padding: 2px 8px;
  width: 100%;
}

.cm-completionLabel {
  font-weight: 600 !important;
}

.cm-completionDetail {
  color: #888 !important;
  font-style: italic !important;
  font-size: 11px !important;
  margin-left: 8px !important;
}

:global([data-bs-theme='dark']) .cm-completionDetail {
  color: #aaa !important;
}
</style>
