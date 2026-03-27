// Mermaid 模板库 - 精选示例，用户直接改内容就行
export const templates = {
  // ===== 流程图 / Flowchart =====
  flowchart: {
    label: { en: 'Flowchart', zh: '流程图' },
    icon: '➡️',
    items: [
      {
        id: 'flow-leave',
        label: { en: 'Leave Request', zh: '请假审批' },
        desc: { en: 'Leave request approval flow', zh: '请假审批流程图' },
        code: `graph TD
    A[📝 Submit Leave Request] --> B{Is leave > 3 days?}
    B -->|Yes| C[Manager Review]
    B -->|No| D[Auto Approve]
    C --> E{Approved?}
    E -->|Yes| F[✅ Leave Approved]
    E -->|No| G[❌ Leave Rejected]
    D --> F
    style A fill:#e3f2fd
    style F fill:#e8f5e9
    style G fill:#ffebee`
      },
      {
        id: 'flow-ecommerce',
        label: { en: 'E-commerce Order', zh: '电商下单' },
        desc: { en: 'Online shopping order process', zh: '电商下单流程' },
        code: `graph LR
    A[🛒 Browse Products] --> B[Add to Cart]
    B --> C{Checkout?}
    C -->|Yes| D[💳 Payment]
    C -->|No| A
    D --> E{Payment Success?}
    E -->|Yes| F[📦 Order Confirmed]
    E -->|No| G[💔 Payment Failed]
    F --> H[📧 Confirmation Email]
    G --> D
    style A fill:#fff3e0
    style F fill:#e8f5e9
    style G fill:#ffebee`
      },
      {
        id: 'flow-sd',
        label: { en: 'Software Dev', zh: '软件开发' },
        desc: { en: 'Software development lifecycle', zh: '软件开发流程' },
        code: `graph TD
    A[💡 Requirement] --> B[📐 Design]
    B --> C[💻 Development]
    C --> D[🧪 Testing]
    D --> E{Bug Found?}
    E -->|Yes| C
    E -->|No| F[🚀 Deploy]
    F --> G[📊 Monitor]
    G -->|Issue| C
    G -->|Success| H[✅ Done]
    style A fill:#e1bee7
    style H fill:#e8f5e9`
      },
      {
        id: 'flow-decision',
        label: { en: 'Decision Tree', zh: '决策树' },
        desc: { en: 'Yes/No decision making', zh: '是/否决策树' },
        code: `graph TD
    A[Start] --> B{Question 1}
    B -->|Yes| C{Question 2}
    B -->|No| D{Question 3}
    C -->|Yes| E[✅ Option A]
    C -->|No| F[✅ Option B]
    D -->|Yes| G[✅ Option C]
    D -->|No| H[✅ Option D]
    style E fill:#c8e6c9
    style F fill:#c8e6c9
    style G fill:#c8e6c9
    style H fill:#c8e6c9`
      },
      {
        id: 'flow-user-journey',
        label: { en: 'User Journey', zh: '用户旅程' },
        desc: { en: 'User experience journey map', zh: '用户旅程图' },
        code: `graph LR
    A[👤 Discover] --> B[🔍 Research]
    B --> C[🛒 Consideration]
    C --> D{Buy?}
    D -->|Yes| E[💳 Purchase]
    D -->|No| F[💭 Abandon]
    E --> G[📦 Receive]
    G --> H[📝 Review]
    H --> I[🔄 Repeat]
    style A fill:#bbdefb
    style E fill:#c8e6c9
    style I fill:#fff9c4`
      }
    ]
  },

  // ===== 序列图 / Sequence Diagram =====
  sequence: {
    label: { en: 'Sequence', zh: '序列图' },
    icon: '📱',
    items: [
      {
        id: 'seq-login',
        label: { en: 'User Login', zh: '用户登录' },
        desc: { en: 'Login with auth server', zh: '用户登录验证流程' },
        code: `sequenceDiagram
    participant U as 👤 User
    participant B as 🖥️ Browser
    participant A as 🔐 Auth Server
    participant DB as 🗄️ Database

    U->>B: Enter credentials
    B->>A: POST /login
    A->>DB: Verify user
    DB-->>A: User data
    A-->>B: JWT token
    B-->>U: ✅ Login success
    Note over U,A: Secure session established`
      },
      {
        id: 'seq-payment',
        label: { en: 'Payment', zh: '支付流程' },
        desc: { en: 'Online payment process', zh: '在线支付流程' },
        code: `sequenceDiagram
    participant U as 👤 User
    participant S as 🛒 Store
    participant P as 💳 Payment
    participant B as 🏦 Bank

    U->>S: Place order
    S->>P: Initiate payment
    P->>U: Enter card info
    U->>P: Submit payment
    P->>B: Verify & charge
    B-->>P: Success
    P-->>S: Payment confirmed
    S-->>U: Order complete ✅`
      },
      {
        id: 'seq-api',
        label: { en: 'API Call', zh: 'API 调用' },
        desc: { en: 'REST API request flow', zh: 'REST API 调用流程' },
        code: `sequenceDiagram
    participant C as 📱 Client
    participant G as 🚪 Gateway
    participant S as ⚙️ Service
    participant D as 🗄️ DB

    C->>G: GET /api/users/123
    G->>S: Forward request
    S->>D: SELECT * FROM users
    D-->>S: User record
    S-->>G: JSON response
    G-->>C: HTTP 200 + JSON
    Note over C,D: Cached response for 5min`
      },
      {
        id: 'seq-chat',
        label: { en: 'Chat Message', zh: '聊天消息' },
        desc: { en: 'Real-time messaging', zh: '实时消息传递' },
        code: `sequenceDiagram
    participant A as 👤 Alice
    participant S as 🖥️ Server
    participant B as 👤 Bob

    A->>S: Send message
    S->>S: Store message
    S->>B: Deliver message
    B-->>S: Read receipt
    S-->>A: ✓ Delivered
    Note over A,B: End-to-end encrypted`
      },
      {
        id: 'seq-micro',
        label: { en: 'Microservices', zh: '微服务' },
        desc: { en: 'Microservice communication', zh: '微服务调用链' },
        code: `sequenceDiagram
    participant C as 📱 Client
    participant G as 🚪 API Gateway
    participant O as 📦 Order Service
    participant P as 📦 Payment Service
    participant I as 📦 Inventory Service

    C->>G: POST /orders
    G->>O: Create order
    O->>I: Check stock
    I-->>O: Stock available
    O->>P: Process payment
    P-->>O: Paid ✅
    O-->>G: Order created
    G-->>C: 201 Created`
      }
    ]
  },

  // ===== 类图 / Class Diagram =====
  class: {
    label: { en: 'Class Diagram', zh: '类图' },
    icon: '📊',
    items: [
      {
        id: 'class-ecommerce',
        label: { en: 'E-commerce DB', zh: '电商数据库' },
        desc: { en: 'E-commerce database schema', zh: '电商数据库结构' },
        code: `classDiagram
    class User {
        +int id
        +string name
        +string email
        +login()
        +logout()
    }
    class Order {
        +int id
        +DateTime date
        +float total
        +create()
        +cancel()
    }
    class Product {
        +int id
        +string name
        +float price
        +updateStock()
    }
    class OrderItem {
        +int quantity
        +float subtotal
    }

    User "1" o-- "0..*" Order : places
    Order "1" *-- "1..*" OrderItem : contains
    Product "1" o-- "0..*" OrderItem : appears in`
      },
      {
        id: 'class-blog',
        label: { en: 'Blog System', zh: '博客系统' },
        desc: { en: 'Blog system data model', zh: '博客系统数据模型' },
        code: `classDiagram
    class User {
        +int id
        +string username
        +string email
        +publishPost()
        +comment()
    }
    class Post {
        +int id
        +string title
        +string content
        +DateTime created
        +publish()
        +delete()
    }
    class Comment {
        +int id
        +string content
        +DateTime created
    }
    class Tag {
        +int id
        +string name
    }

    User "1" --> "0..*" Post : writes
    Post "1" --> "0..*" Comment : has
    User "1" --> "0..*" Comment : writes
    Post "0..*" --> "0..*" Tag : tagged as`
      },
      {
        id: 'class-animal',
        label: { en: 'Animal Classes', zh: '动物类继承' },
        desc: { en: 'OOP inheritance example', zh: '面向对象继承示例' },
        code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
        +eat()
    }
    class Dog {
        +String breed
        +bark()
        +fetch()
    }
    class Cat {
        +boolean indoor
        +meow()
        +scratch()
    }
    class Bird {
        +String color
        +fly()
        +sing()
    }

    Animal <|-- Dog : inherits
    Animal <|-- Cat : inherits
    Animal <|-- Bird : inherits
    Dog ..> Animal : polymorphism`
      }
    ]
  },

  // ===== ER 图 =====
  er: {
    label: { en: 'ER Diagram', zh: 'ER 图' },
    icon: '🔗',
    items: [
      {
        id: 'er-school',
        label: { en: 'School System', zh: '学校系统' },
        desc: { en: 'School management ER', zh: '学校管理系统' },
        code: `erDiagram
    STUDENT ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : receives
    TEACHER ||--o{ COURSE : teaches
    STUDENT {
        int id PK
        string name
        string email
        date birthdate
    }
    COURSE {
        int id PK
        string title
        int credits
    }
    ENROLLMENT {
        date enrolled
        string grade
    }
    TEACHER {
        int id PK
        string name
        string department
    }`
      },
      {
        id: 'er-hospital',
        label: { en: 'Hospital', zh: '医院系统' },
        desc: { en: 'Hospital management ER', zh: '医院管理系统' },
        code: `erDiagram
    DOCTOR ||--o{ VISIT : conducts
    PATIENT ||--o{ VISIT : has
    DOCTOR {
        int id PK
        string name
        string specialty
    }
    PATIENT {
        int id PK
        string name
        date dob
        string phone
    }
    VISIT {
        date visit_date
        string diagnosis
        string prescription
    }`
      }
    ]
  },

  // ===== 甘特图 / Gantt =====
  gantt: {
    label: { en: 'Gantt Chart', zh: '甘特图' },
    icon: '📅',
    items: [
      {
        id: 'gantt-project',
        label: { en: 'Project Plan', zh: '项目计划' },
        desc: { en: 'Software project timeline', zh: '软件开发项目计划' },
        code: `gantt
    title Software Project Roadmap
    dateFormat YYYY-MM-DD
    section Planning
    Requirements Analysis :done, 2024-01-01, 14d
    System Design         :done, 2024-01-15, 10d
    section Development
    Backend Development   :active, 2024-01-25, 21d
    Frontend Development   :active, 2024-01-25, 21d
    section Testing
    Unit Testing          :2024-02-15, 7d
    Integration Testing   :2024-02-22, 7d
    section Launch
    Deployment            :2024-03-01, 3d
    Release               :2024-03-04, 1d`
      },
      {
        id: 'gantt-marketing',
        label: { en: 'Marketing Campaign', zh: '营销活动' },
        desc: { en: 'Marketing calendar', zh: '营销推广日历' },
        code: `gantt
    title Product Launch Campaign
    dateFormat YYYY-MM-DD
    section Pre-Launch
    Market Research       :done, 2024-01-01, 14d
    Competitor Analysis    :done, 2024-01-08, 10d
    section Content
    Website Update         :active, 2024-01-18, 7d
    Social Media Posts     :active, 2024-01-18, 14d
    section Launch
    Press Release          :2024-02-01, 2d
    Email Campaign         :2024-02-01, 7d
    section Follow-up
    Analytics Review       :2024-02-15, 7d
    Customer Feedback      :2024-02-15, 14d`
      },
      {
        id: 'gantt-sprint',
        label: { en: 'Dev Sprint', zh: '开发冲刺' },
        desc: { en: '2-week sprint plan', zh: '两周敏捷冲刺' },
        code: `gantt
    title Sprint 23 Timeline
    dateFormat YYYY-MM-DD
    section Week 1
    Sprint Planning       :done, 2024-01-15, 1d
    Feature A Dev          :active, 2024-01-16, 3d
    Feature B Dev          :active, 2024-01-16, 2d
    section Week 2
    Feature A Testing     :2024-01-22, 2d
    Feature B Testing     :2024-01-22, 2d
    Bug Fixes             :2024-01-24, 2d
    Sprint Review         :2024-01-26, 1d`
      }
    ]
  },

  // ===== 状态图 / State =====
  state: {
    label: { en: 'State Diagram', zh: '状态图' },
    icon: '🔄',
    items: [
      {
        id: 'state-order',
        label: { en: 'Order Status', zh: '订单状态' },
        desc: { en: 'Order lifecycle', zh: '订单生命周期' },
        code: `stateDiagram-v2
    [*] --> Pending
    Pending --> Processing : Pay
    Processing --> Shipped : Pack
    Shipped --> Delivered : Deliver
    Delivered --> [*] : Receive
    Processing --> Cancelled : Cancel
    Pending --> Cancelled : Cancel
    Shipped --> Returned : Return
    Returned --> Refunded : Refund
    note right of Pending
        Wait for payment
    end note`
      },
      {
        id: 'state-fsm',
        label: { en: 'Traffic Light', zh: '红绿灯' },
        desc: { en: 'Traffic light FSM', zh: '交通灯状态机' },
        code: `stateDiagram-v2
    [*] --> Red
    Red --> Green : Timer
    Green --> Yellow : Timer
    Yellow --> Red : Timer
    note as N1
        Simple traffic light
        cycle: 30s per state
    end note
    Green : Cars can go
    Yellow : Cars should stop
    Red : All cars stop`
      },
      {
        id: 'state-server',
        label: { en: 'Server Status', zh: '服务器状态' },
        desc: { en: 'Server state machine', zh: '服务器状态机' },
        code: `stateDiagram-v2
    [*] --> Starting
    Starting --> Running : Init complete
    Running --> Busy : Request received
    Busy --> Running : Request completed
    Running --> Stopping : Shutdown signal
    Stopping --> [*] : Cleanup done
    Busy --> Error : Exception
    Running --> Error : Exception
    Error --> Starting : Restart
    note "Health check every 30s" as N1`
      }
    ]
  },

  // ===== 饼图 / Pie =====
  pie: {
    label: { en: 'Pie Chart', zh: '饼图' },
    icon: '🥧',
    items: [
      {
        id: 'pie-budget',
        label: { en: 'Budget Allocation', zh: '预算分配' },
        desc: { en: 'Annual budget breakdown', zh: '年度预算分配' },
        code: `pie title Annual Budget 2024
    "Engineering" : 45
    "Marketing" : 20
    "Sales" : 15
    "Operations" : 12
    "HR" : 8`
      },
      {
        id: 'pie-market',
        label: { en: 'Market Share', zh: '市场份额' },
        desc: { en: 'Competitor market share', zh: '竞争对手市场份额' },
        code: `pie title Market Share
    "Company A" : 35
    "Company B" : 25
    "Company C" : 20
    "Others" : 20`
      },
      {
        id: 'pie-time',
        label: { en: 'Time Usage', zh: '时间分配' },
        desc: { en: 'Daily time allocation', zh: '每日时间分配' },
        code: `pie title Daily Time Distribution
    "Work" : 8
    "Sleep" : 7
    "Commute" : 2
    "Meals" : 2
    "Leisure" : 3
    "Exercise" : 1
    "Other" : 1`
      }
    ]
  },

  // ===== 思维导图 / Mind Map =====
  mindmap: {
    label: { en: 'Mind Map', zh: '思维导图' },
    icon: '🧠',
    items: [
      {
        id: 'mind-brainstorm',
        label: { en: 'Brainstorm', zh: '头脑风暴' },
        desc: { en: 'Project brainstorming', zh: '项目头脑风暴' },
        code: `mindmap
  root((🧠 Project Ideas))
    Product
      MVP Features
      User Research
      Competitors
    Technology
      Frontend
      Backend
      Database
    Marketing
      Social Media
      SEO
      Ads
    Timeline
      Week 1-2
      Week 3-4
      Week 5+`
      },
      {
        id: 'mind-reading',
        label: { en: 'Book Summary', zh: '读书笔记' },
        desc: { en: 'Book chapter summary', zh: '书籍章节总结' },
        code: `mindmap
  root((📚 Book Title))
    Chapter 1
      Key Point A
      Key Point B
      Quote
    Chapter 2
      Key Point C
      Key Point D
      Action Item
    Chapter 3
      Key Point E
      Key Point F
      Summary`
      }
    ]
  },

  // ===== 时间线 / Timeline =====
  timeline: {
    label: { en: 'Timeline', zh: '时间线' },
    icon: '⏰',
    items: [
      {
        id: 'timeline-history',
        label: { en: 'Company History', zh: '公司发展史' },
        desc: { en: 'Company milestones', zh: '公司里程碑' },
        code: `timeline
    title Company Journey
    2018 : Founded
         : First product launch
    2019 : 100 customers
         : Seed funding
    2020 : Team grows to 20
         : New office
    2021 : 1000 customers
         : Series A funding
    2022 : International expansion
         : 50 team members
    2023 : 10K customers
         : Global presence
    2024 : IPO preparation
         : Looking ahead`
      },
      {
        id: 'timeline-product',
        label: { en: 'Product Roadmap', zh: '产品路线图' },
        desc: { en: 'Product release timeline', zh: '产品发布计划' },
        code: `timeline
    title Product Roadmap 2024
    Q1 : Version 1.0
       : User authentication
       : Basic dashboard
    Q2 : Version 2.0
       : Advanced analytics
       : API integration
    Q3 : Version 3.0
       : Mobile app
       : Real-time sync
    Q4 : Version 4.0
       : AI features
       : Enterprise features`
      }
    ]
  },

  // ===== Git 图 =====
  git: {
    label: { en: 'Git Graph', zh: 'Git 图' },
    icon: '📈',
    items: [
      {
        id: 'git-feature',
        label: { en: 'Feature Branch', zh: '功能分支' },
        desc: { en: 'Feature branch workflow', zh: '功能分支工作流' },
        code: `gitGraph
    commit "init"
    commit "add README"
    branch feature
    checkout feature
    commit "feature A"
    commit "feature B"
    checkout main
    commit "hotfix"
    merge feature
    checkout feature
    commit "feature C"
    checkout main
    commit "v1.0.0"
    tag v1.0.0`
      }
    ]
  }
}

// 获取所有图表类型
export const diagramTypes = Object.entries(templates).map(([key, value]) => ({
  key,
  label: value.label,
  icon: value.icon,
  count: value.items.length
}))

// 默认模板代码（打开 App 时显示）
export const defaultTemplate = templates.flowchart.items[0]
