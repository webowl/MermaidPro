// Mermaid 模板库 - 所有语法已验证
export const templates = {
  flowchart: {
    label: { en: 'Flowchart', zh: '流程图' },
    icon: '➡️',
    items: [
      {
        id: 'flow-simple',
        label: { en: 'Simple Flow', zh: '简单流程' },
        code: `flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action A]
    B -->|No| D[Action B]
    C --> E[End]
    D --> E`
      },
      {
        id: 'flow-horizontal',
        label: { en: 'Horizontal', zh: '横向流程' },
        code: `flowchart LR
    A[Input] --> B[Process]
    B --> C{Check}
    C -->|Pass| D[Output]
    C -->|Fail| E[Retry]
    E --> B`
      }
    ]
  },

  sequence: {
    label: { en: 'Sequence', zh: '序列图' },
    icon: '📱',
    items: [
      {
        id: 'seq-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello
    B-->>A: Hi!`
      },
      {
        id: 'seq-login',
        label: { en: 'Login', zh: '登录' },
        code: `sequenceDiagram
    participant U as User
    participant S as Server
    participant D as DB
    U->>S: Login
    S->>D: Verify
    D-->>S: OK
    S-->>U: Token`
      }
    ]
  },

  classDiagram: {
    label: { en: 'Class', zh: '类图' },
    icon: '📊',
    items: [
      {
        id: 'class-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `classDiagram
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog`
      }
    ]
  },

  erDiagram: {
    label: { en: 'ER Diagram', zh: 'ER图' },
    icon: '🔗',
    items: [
      {
        id: 'er-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ITEM : contains
    CUSTOMER {
        int id PK
        string name
    }
    ORDER {
        int id PK
        date created
    }
    ITEM {
        string name
        int qty
    }`
      }
    ]
  },

  stateDiagram: {
    label: { en: 'State', zh: '状态图' },
    icon: '🔄',
    items: [
      {
        id: 'state-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Running : Start
    Running --> Done : Finish
    Done --> [*]`
      }
    ]
  },

  gantt: {
    label: { en: 'Gantt', zh: '甘特图' },
    icon: '📅',
    items: [
      {
        id: 'gantt-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `gantt
    title Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Task A :done, 2024-01-01, 7d
    Task B :active, 2024-01-08, 5d
    section Phase 2
    Task C :2024-01-15, 10d`
      }
    ]
  },

  pie: {
    label: { en: 'Pie', zh: '饼图' },
    icon: '🥧',
    items: [
      {
        id: 'pie-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `pie showData
    title Market Share
    "A" : 40
    "B" : 30
    "C" : 20
    "D" : 10`
      }
    ]
  },

  mindmap: {
    label: { en: 'Mindmap', zh: '思维导图' },
    icon: '🧠',
    items: [
      {
        id: 'mindmap-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `mindmap
  root((Main))
    Branch A
      Sub A1
    Branch B
      Sub B1`
      }
    ]
  },

  timeline: {
    label: { en: 'Timeline', zh: '时间线' },
    icon: '⏰',
    items: [
      {
        id: 'timeline-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `timeline
    title History
    2023 : Started
    2024 : V2.0`
      }
    ]
  },

  gitGraph: {
    label: { en: 'Git', zh: 'Git图' },
    icon: '📈',
    items: [
      {
        id: 'git-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `gitGraph
    commit
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature`
      }
    ]
  },

  journey: {
    label: { en: 'Journey', zh: '用户旅程' },
    icon: '🚶',
    items: [
      {
        id: 'journey-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `journey
    title User Journey
    section Browse
      Visit: 5: User
    section Buy
      Checkout: 4: User`
      }
    ]
  },

  quadrantChart: {
    label: { en: 'Quadrant', zh: '象限图' },
    icon: '📊',
    items: [
      {
        id: 'quadrant-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `quadrantChart
    title Matrix
    x-axis Low --> High
    y-axis Low --> High
    quadrant-1 Q1
    quadrant-2 Q2
    quadrant-3 Q3
    quadrant-4 Q4
    A: [0.7, 0.8]
    B: [0.3, 0.4]`
      }
    ]
  },

  xychart: {
    label: { en: 'XY Chart', zh: 'XY图表' },
    icon: '📈',
    items: [
      {
        id: 'xy-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `xychart-beta
    title Sales
    x-axis [Q1, Q2, Q3, Q4]
    y-axis Sales 0 --> 100
    bar [50, 60, 45, 70]`
      }
    ]
  },

  kanban: {
    label: { en: 'Kanban', zh: '看板' },
    icon: '📋',
    items: [
      {
        id: 'kanban-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `kanban
    2-Todo
      Task 1
    3-Doing
      Task 2
    4-Done
      Task 3`
      }
    ]
  },

  packet: {
    label: { en: 'Packet', zh: '数据包' },
    icon: '📨',
    items: [
      {
        id: 'packet-basic',
        label: { en: 'Basic', zh: '基础' },
        code: `packet-beta
    0-15: Source Port
    16-31: Dest Port`
      }
    ]
  }
}

export const diagramTypes = Object.entries(templates).map(([key, value]) => ({
  key,
  label: value.label,
  icon: value.icon,
  count: value.items.length
}))

export const defaultTemplate = templates.flowchart.items[0]
