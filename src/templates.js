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
  },

  // ===== 用户旅程图 / Journey =====
  journey: {
    label: { en: 'User Journey', zh: '用户旅程' },
    icon: '🚶',
    items: [
      {
        id: 'journey-shopping',
        label: { en: 'Shopping Experience', zh: '购物体验' },
        desc: { en: 'User journey through e-commerce', zh: '电商用户旅程' },
        code: `journey
    title User Shopping Journey
    section Browse
      User searches for product: 5: User
      User views product details: 3: User
    section Purchase
      User adds to cart: 5: User
      User proceeds to checkout: 4: User
      User enters payment info: 3: User
    section Post-Purchase
      User receives confirmation: 5: System
      User receives product: 4: System
      User leaves review: 2: User`
      },
      {
        id: 'journey-support',
        label: { en: 'Customer Support', zh: '客服体验' },
        desc: { en: 'Support ticket journey', zh: '客服工单流程' },
        code: `journey
    title Customer Support Journey
    section Initial Contact
      Customer submits ticket: 5: Customer
      Agent receives ticket: 4: Agent
    section Investigation
      Agent reviews issue: 3: Agent
      Agent requests info: 2: Customer
      Customer provides details: 3: Customer
    section Resolution
      Agent resolves issue: 4: Agent
      Customer confirms fix: 5: Customer
      Ticket closed: 5: System`
      }
    ]
  },

  // ===== C4 架构图 =====
  c4: {
    label: { en: 'C4 Diagram', zh: 'C4 架构图' },
    icon: '🏗️',
    items: [
      {
        id: 'c4-basic',
        label: { en: 'Basic System', zh: '基础系统' },
        desc: { en: 'Simple C4 container diagram', zh: '简单的 C4 容器图' },
        code: `C4Context
    title System Context Diagram for Internet Banking System

    Person(customer, "Customer", "A customer of the bank")
    System_Boundary("c1", "Internet Banking System") {
      System(webApp, "Web Application", "Allows customers to view accounts and make payments")
      SystemDb(database, "Database", "Stores user and account data")
    }
    System_Ext(mail, "Email System", "Sends email notifications")
    Rel(customer, webApp, "Uses")
    Rel(webApp, database, "Reads/Writes")
    Rel(webApp, mail, "Sends notifications via")`
      }
    ]
  },

  // ===== 方块图 / Block =====
  block: {
    label: { en: 'Block Diagram', zh: '方块图' },
    icon: '📦',
    items: [
      {
        id: 'block-simple',
        label: { en: 'Data Flow', zh: '数据流' },
        desc: { en: 'Simple block diagram', zh: '简单的方块图' },
        code: `block-beta
    block configure
        db[(Database)]
        api[API]
    block process
        process1[Processor 1]
        process2[Processor 2]
    block output
        dashboard[Dashboard]
    db --> api --> process1
    process1 --> process2
    process2 --> dashboard
    style configure fill:#e3f2fd
    style process fill:#fff3e0
    style output fill:#e8f5e9`
      }
    ]
  },

  // ===== 数据包图 / Packet =====
  packet: {
    label: { en: 'Packet Diagram', zh: '数据包图' },
    icon: '📨',
    items: [
      {
        id: 'packet-http',
        label: { en: 'HTTP Request', zh: 'HTTP 请求' },
        desc: { en: 'HTTP packet structure', zh: 'HTTP 数据包结构' },
        code: `packet-beta
    0-15: Source Port (16 bits)
    16-31: Destination Port (16 bits)
    32-63: Sequence Number (32 bits)
    64-95: Acknowledgment (32 bits)
    96-99: Data Offset + Flags
    100-115: Window Size (16 bits)
    116-127: Checksum + Urgent Pointer
    128-159: Options + Padding
    160-: Data (Payload)`
      },
      {
        id: 'packet-ipv4',
        label: { en: 'IPv4 Header', zh: 'IPv4 头部' },
        desc: { en: 'IPv4 packet header', zh: 'IPv4 数据包头部' },
        code: `packet-beta
    0-3: Version (4)
    4-7: IHL (4)
    8-15: TOS (8)
    16-31: Total Length (16)
    32-47: Identification (16)
    48-50: Flags (3)
    51-63: Fragment Offset (13)
    64-71: TTL (8)
    72-79: Protocol (8)
    80-95: Header Checksum (16)
    96-127: Source Address (32)
    128-159: Destination Address (32)
    160-: Options`
      }
    ]
  },

  // ===== 象限图 / Quadrant =====
  quadrant: {
    label: { en: 'Quadrant Chart', zh: '象限图' },
    icon: '📊',
    items: [
      {
        id: 'quadrant-market',
        label: { en: 'Market Analysis', zh: '市场分析' },
        desc: { en: 'Product market positioning', zh: '产品市场定位' },
        code: `quadrantChart
    title Product Market Position
    x-axis Low Market Share --> High Market Share
    y-axis Low Growth --> High Growth
    quadrant-1: Stars
    quadrant-2: Question Marks
    quadrant-3: Dogs
    quadrant-4: Cash Cows
    "Product A": [0.3, 0.6]
    "Product B": [0.7, 0.8]
    "Product C": [0.2, 0.3]
    "Product D": [0.8, 0.4]`
      },
      {
        id: 'quadrant-priority',
        label: { en: 'Priority Matrix', zh: '优先级矩阵' },
        desc: { en: 'Task prioritization', zh: '任务优先级' },
        code: `quadrantChart
    title Task Priority Matrix
    x-axis Low Urgency --> High Urgency
    y-axis Low Impact --> High Impact
    quadrant-1: Do First
    quadrant-2: Schedule
    quadrant-3: Delegate
    quadrant-4: Eliminate
    "Critical Bug": [0.9, 0.9]
    "Feature Request": [0.7, 0.6]
    "Documentation": [0.3, 0.4]
    "Meeting": [0.6, 0.2]`
      }
    ]
  },

  // ===== 需求图 / Requirement =====
  requirement: {
    label: { en: 'Requirement Diagram', zh: '需求图' },
    icon: '📋',
    items: [
      {
        id: 'req-basic',
        label: { en: 'System Requirements', zh: '系统需求' },
        desc: { en: 'Simple requirement diagram', zh: '简单的需求图' },
        code: `requirementDiagram
    requirement login_req {
      id: 1
      text: "User can log in with email and password"
      risk: Medium
      verifymethod: Test
    }
    requirement secure_req {
      id: 2
      text: "Password must be at least 8 characters"
      risk: High
      verifymethod: Inspection
    }
    requirement login_req -- secure_req`
      }
    ]
  },

  // ===== 桑基图 / Sankey =====
  sankey: {
    label: { en: 'Sankey Diagram', zh: '桑基图' },
    icon: '🌊',
    items: [
      {
        id: 'sankey-energy',
        label: { en: 'Energy Flow', zh: '能量流动' },
        desc: { en: 'Energy consumption flow', zh: '能源消耗流向' },
        code: `sankey-beta
    %% Source, Target, Value
    Solar, Electricity, 30
    Wind, Electricity, 25
    Coal, Electricity, 35
    Nuclear, Electricity, 20
    Electricity, Industry, 50
    Electricity, Home, 40
    Electricity, Transport, 20`
      },
      {
        id: 'sankey-website',
        label: { en: 'Website Traffic', zh: '网站流量' },
        desc: { en: 'User traffic flow', zh: '用户流量流向' },
        code: `sankey-beta
    %% Source, Target, Value
    Search, Landing Page, 1000
    Social, Landing Page, 600
    Direct, Landing Page, 400
    Landing Page, Product Page, 700
    Landing Page, Exit, 300
    Product Page, Purchase, 200
    Product Page, Exit, 500`
      }
    ]
  },

  // ===== XY 图表 =====
  xychart: {
    label: { en: 'XY Chart', zh: 'XY 图表' },
    icon: '📈',
    items: [
      {
        id: 'xy-sales',
        label: { en: 'Sales Trend', zh: '销售趋势' },
        desc: { en: 'Monthly sales XY chart', zh: '月度销售 XY 图' },
        code: `xychart-beta
    title "Monthly Sales 2024"
    x-axis [Jan, Feb, Mar, Apr, May, Jun]
    y-axis "Sales ($K)" 0 --> 100
    line [45, 52, 38, 65, 72, 58]`
      },
      {
        id: 'xy-temperature',
        label: { en: 'Temperature', zh: '温度变化' },
        desc: { en: 'Daily temperature', zh: '每日温度' },
        code: `xychart-beta
    title "Weekly Temperature"
    x-axis [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
    y-axis "Temperature (°C)" -5 --> 35
    line [22, 24, 21, 25, 28, 26, 23]`
      }
    ]
  },

  // ===== 韦恩图 / Venn =====
  venn: {
    label: { en: 'Venn Diagram', zh: '韦恩图' },
    icon: '🔴',
    items: [
      {
        id: 'venn-sets',
        label: { en: 'Set Operations', zh: '集合运算' },
        desc: { en: 'Simple venn diagram', zh: '简单韦恩图' },
        code: `venn-beta
    title "User Demographics"
    A: "Mobile Users"
    B: "Desktop Users"
    C: "Tablet Users"
    A: 50
    B: 35
    C: 15
    A&B: 10
    A&C: 5
    B&C: 8
    A&B&C: 3`
      }
    ]
  },

  // ===== 看板 / Kanban =====
  kanban: {
    label: { en: 'Kanban Board', zh: '看板' },
    icon: '📋',
    items: [
      {
        id: 'kanban-sprint',
        label: { en: 'Sprint Board', zh: '冲刺看板' },
        desc: { en: 'Simple kanban board', zh: '简单看板' },
        code: `kanban
    title Sprint 23 Board
    column To Do
      task "User Login"
      task "Password Reset"
    column In Progress
      task "Dashboard Design"
    column Done
      task "Setup Project"
      task "Database Schema"`
      },
      {
        id: 'kanban-content',
        label: { en: 'Content Pipeline', zh: '内容管线' },
        desc: { en: 'Content creation workflow', zh: '内容创建流程' },
        code: `kanban
    title Content Pipeline
    column Ideas
      task "Blog Topic Research"
      task "Competitor Analysis"
    column Writing
      task "Draft Article"
      task "Create Graphics"
    column Review
      task "Internal Review"
      task "SEO Optimization"
    column Published
      task "Social Posts"
      task "Newsletter"`
      }
    ]
  },

  // ===== 架构图 / Architecture =====
  architecture: {
    label: { en: 'Architecture', zh: '架构图' },
    icon: '🏛️',
    items: [
      {
        id: 'arch-cloud',
        label: { en: 'Cloud Architecture', zh: '云架构' },
        desc: { en: 'Simple cloud architecture', zh: '简单云架构' },
        code: `architecture-beta
    group cloud[Cloud Provider]
        service db[Database] in cloud
        service storage[Storage] in cloud
        service compute[Compute] in cloud
    group onprem[On-Premise]
        service gateway[API Gateway] in onprem
    db -> storage
    compute -> db
    compute -> storage
    gateway -> compute`
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
