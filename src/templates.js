// Mermaid diagram templates and wizard configurations
export const templates = {
  flowchart: {
    id: 'flowchart',
    name: 'flowchart',
    icon: '⬜',
    description: 'Create flowcharts and process diagrams',
    examples: [
      {
        name: 'Simple Process',
        code: `flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| E[Retry]
    E --> B`
      },
      {
        name: 'Approval Flow',
        code: `flowchart TD
    A[Submit Request] --> B[Manager Review]
    B --> C{Approved?}
    C -->|Yes| D[Process]
    C -->|No| E[Reject]
    D --> F[Complete]
    E --> G[End]`
      },
      {
        name: 'User Registration',
        code: `flowchart LR
    A[User] --> B[Enter Email]
    B --> C{Valid?}
    C -->|No| B
    C -->|Yes| D[Verify Email]
    D --> E[Create Account]
    E --> F[Success]`
      }
    ]
  },
  sequence: {
    id: 'sequence',
    name: 'sequenceDiagram',
    icon: '📊',
    description: 'Show interactions between entities over time',
    examples: [
      {
        name: 'User Login',
        code: `sequenceDiagram
    participant User
    participant App
    participant Server
    User->>App: Click Login
    App->>Server: Send Credentials
    Server->>Server: Validate
    Server->>App: Return Token
    App->>User: Show Dashboard`
      },
      {
        name: 'Payment Process',
        code: `sequenceDiagram
    participant Customer
    participant Shop
    participant Bank
    Customer->>Shop: Add to Cart
    Customer->>Shop: Checkout
    Shop->>Bank: Process Payment
    Bank->>Bank: Verify
    Bank->>Shop: Approved
    Shop->>Customer: Order Confirmed`
      }
    ]
  },
  class: {
    id: 'class',
    name: 'classDiagram',
    icon: '📦',
    description: 'Define class structures and relationships',
    examples: [
      {
        name: 'Simple Class',
        code: `classDiagram
    class Animal {
        +String name
        +Int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog`
      }
    ]
  },
  state: {
    id: 'state',
    name: 'stateDiagram-v2',
    icon: '🔄',
    description: 'Show state transitions',
    examples: [
      {
        name: 'Order States',
        code: `stateDiagram-v2
    [*] --> Pending
    Pending --> Processing: Confirm
    Processing --> Shipped: Pack
    Shipped --> Delivered: Deliver
    Delivered --> [*]
    Processing --> Cancelled: Cancel`
      }
    ]
  },
  er: {
    id: 'er',
    name: 'erDiagram',
    icon: '🗄️',
    description: 'Entity-relationship diagrams',
    examples: [
      {
        name: 'E-commerce DB',
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    PRODUCT ||--o{ LINE-ITEM : "ordered in"
    CUSTOMER {
        int id
        string email
        string name
    }
    ORDER {
        int id
        string status
        date created
    }`
      }
    ]
  },
  gantt: {
    id: 'gantt',
    name: 'gantt',
    icon: '📅',
    description: 'Project timeline and schedules',
    examples: [
      {
        name: 'Project Plan',
        code: `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Planning
    Requirements :req, 2024-01-01, 10d
    Design :des, 2024-01-05, 15d
    section Development
    Backend :be, 2024-01-15, 20d
    Frontend :fe, 2024-01-20, 20d
    section Testing
    QA :qa, 2024-02-05, 10d`
      }
    ]
  },
  pie: {
    id: 'pie',
    name: 'pie',
    icon: '🥧',
    description: 'Pie charts for data visualization',
    examples: [
      {
        name: 'Market Share',
        code: `pie title Market Share
    "Product A" : 35
    "Product B" : 25
    "Product C" : 20
    "Others" : 20`
      }
    ]
  },
  mindmap: {
    id: 'mindmap',
    name: 'mindmap',
    icon: '🧠',
    description: 'Mind maps for brainstorming',
    examples: [
      {
        name: 'Project Planning',
        code: `mindmap
    root((Project))
      Planning
        Requirements
        Timeline
        Budget
      Development
        Backend
        Frontend
        Database
      Testing
        Unit Tests
        Integration
        UAT`
      }
    ]
  }
}

// Wizard steps for guided diagram creation
export const wizardSteps = {
  flowchart: [
    {
      step: 1,
      title: 'flowchart.wizard.step1',
      description: 'flowchart.wizard.desc1',
      action: 'selectDirection',
      options: [
        { label: 'Top-Down', value: 'TD' },
        { label: 'Left-Right', value: 'LR' },
        { label: 'Bottom-Top', value: 'BT' },
        { label: 'Right-Left', value: 'RL' }
      ]
    },
    {
      step: 2,
      title: 'flowchart.wizard.step2',
      description: 'flowchart.wizard.desc2',
      action: 'addNodes',
      template: 'flowchart {direction}\n    A[Start] --> B[Process]\n    B --> C[End]'
    },
    {
      step: 3,
      title: 'flowchart.wizard.step3',
      description: 'flowchart.wizard.desc3',
      action: 'addConnections',
      template: 'flowchart {direction}\n    A[Start] --> B[Process]\n    B --> C{Decision}\n    C -->|Yes| D[End]\n    C -->|No| E[Retry]'
    }
  ],
  sequence: [
    {
      step: 1,
      title: 'sequence.wizard.step1',
      description: 'sequence.wizard.desc1',
      action: 'addParticipants',
      template: 'sequenceDiagram\n    participant A\n    participant B\n    participant C'
    },
    {
      step: 2,
      title: 'sequence.wizard.step2',
      description: 'sequence.wizard.desc2',
      action: 'addInteractions',
      template: 'sequenceDiagram\n    participant A\n    participant B\n    A->>B: Message\n    B->>A: Response'
    }
  ]
}

// Node shapes for visual selector
export const nodeShapes = [
  { id: 'rect', label: 'Rectangle', syntax: 'A[Text]', icon: '▭' },
  { id: 'round', label: 'Rounded', syntax: 'A(Text)', icon: '◯' },
  { id: 'diamond', label: 'Diamond', syntax: 'A{Text}', icon: '◇' },
  { id: 'circle', label: 'Circle', syntax: 'A((Text))', icon: '●' },
  { id: 'hexagon', label: 'Hexagon', syntax: 'A>{{Text}}', icon: '⬡' },
  { id: 'parallelogram', label: 'Parallelogram', syntax: 'A[/Text/]', icon: '▱' },
  { id: 'trapezoid', label: 'Trapezoid', syntax: 'A[\\Text\\]', icon: '▲' }
]

// Connection types
export const connectionTypes = [
  { id: 'arrow', label: 'Arrow', syntax: '-->', icon: '→' },
  { id: 'line', label: 'Line', syntax: '---', icon: '—' },
  { id: 'dotted', label: 'Dotted', syntax: '-.->', icon: '⋯' },
  { id: 'thick', label: 'Thick', syntax: '==>', icon: '⇒' },
  { id: 'circle', label: 'Circle End', syntax: 'o--', icon: '◯' },
  { id: 'cross', label: 'Cross End', syntax: 'x--', icon: '✕' }
]

// Diagram types for UI
export const diagramTypes = [
  { key: 'flowchart', name: 'Flowchart', icon: '⬜' },
  { key: 'sequence', name: 'Sequence', icon: '📊' },
  { key: 'class', name: 'Class', icon: '📦' },
  { key: 'state', name: 'State', icon: '🔄' },
  { key: 'er', name: 'ER', icon: '🗄️' },
  { key: 'gantt', name: 'Gantt', icon: '📅' },
  { key: 'pie', name: 'Pie', icon: '🥧' },
  { key: 'mindmap', name: 'Mindmap', icon: '🧠' }
]
