# ⏱️ TimeTrack Pro

A production-ready time management platform with Keka HR integration, AI-powered timesheet chasing, and MS Teams/Outlook notifications.

---

## 🏗️ Architecture

```
timetrack/
├── frontend/          React + Vite (SPA)
├── backend/           Node.js + Express + Prisma
│   ├── src/
│   │   ├── routes/    REST API endpoints
│   │   ├── services/  Keka sync, AI chaser, auto-log, email, Teams
│   │   ├── middleware/ Auth (JWT), role-based authorization
│   │   ├── prisma/    Schema + migrations
│   │   └── utils/     Date helpers
│   └── Dockerfile
├── docker-compose.yml Local dev stack
└── .env.example       Environment template
```

**Stack:** React · Node.js · Express · PostgreSQL · Prisma · Claude AI · Docker · Azure

---

## 🚀 Local Development (5 minutes)

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### 1. Clone & configure
```bash
git clone <repo>
cd timetrack
cp .env.example backend/.env
# Edit backend/.env with your API keys
```

### 2. Start databases
```bash
docker compose up postgres redis -d
```

### 3. Setup backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed        # Optional: seed demo data
npm run dev            # Starts on :4000
```

### 4. Start frontend
```bash
cd frontend
npm install
npm run dev            # Starts on :3000
```

### 5. Open browser
```
http://localhost:3000
```

### Or: Docker Compose (everything at once)
```bash
docker compose up --build
# Frontend: http://localhost:3000
# API:      http://localhost:4000
# DB:       localhost:5432
```

---

## ☁️ Azure Deployment

### Required Azure Resources
1. **Azure Database for PostgreSQL Flexible Server** (or use Azure SQL)
2. **Azure App Service** (B2 or P1v3 tier minimum)
3. **Azure Container Registry** (for Docker images)
4. **Azure Key Vault** (for secrets management)

### Setup Steps

```bash
# 1. Login
az login

# 2. Create resource group
az group create --name timetrack-rg --location eastus

# 3. Create PostgreSQL
az postgres flexible-server create \
  --resource-group timetrack-rg \
  --name timetrack-db \
  --admin-user timetrack \
  --admin-password <secure-password> \
  --sku-name Standard_B2ms

# 4. Create App Service plan
az appservice plan create \
  --name timetrack-plan \
  --resource-group timetrack-rg \
  --sku P1v3 \
  --is-linux

# 5. Create Web App
az webapp create \
  --resource-group timetrack-rg \
  --plan timetrack-plan \
  --name timetrack-pro \
  --deployment-container-image-name <acr>/timetrack-app:latest

# 6. Set environment variables
az webapp config appsettings set \
  --resource-group timetrack-rg \
  --name timetrack-pro \
  --settings \
    DATABASE_URL="<azure-pg-connection-string>" \
    ANTHROPIC_API_KEY="<key>" \
    KEKA_API_TOKEN="<token>" \
    JWT_SECRET="<strong-secret>"
```

### GitHub Actions CI/CD
Add these secrets to your GitHub repo:
- `AZURE_CREDENTIALS` — Service principal JSON
- `ACR_USERNAME` / `ACR_PASSWORD` — Container registry credentials
- `AZURE_DATABASE_URL` — Azure PostgreSQL connection string

Push to `main` → auto-deploys to Azure.

---

## 🔧 Key Features

### ✅ Core Timesheet
- **Weekly view** with daily hour breakdown
- **Draft → Submit → Approve/Reject** workflow  
- **PM override** with audit trail
- WBS Excel upload → auto-creates tasks/milestones
- Billable / Non-billable mapping per entry

### 🤖 AI Automation (Claude-powered)
| Scenario | Behavior |
|----------|----------|
| Full-time employee on project | 8h auto-logged daily, auto-submitted |
| Part-time employee - no entry | AI generates personalized chase via Teams/Email |
| Employee replies to Teams | Claude parses reply, logs hours automatically |
| 3 chases ignored | Escalates to Project Manager |
| 1 week missing | Incident recorded, compliance dashboard updated |

### 🔗 Keka HR Integration
- Auto-sync employees on schedule (default: daily 6 AM)
- Maps `FullTime / PartTime / Contract` employment types
- Respects Keka `status: Active` filter
- On-demand sync via Settings UI or API

### 📊 Reports
- **Resource Utilization** — hours per employee, billability %
- **Billable vs Non-Billable** — project breakdown
- **Project Budget** — budget vs logged vs remaining hours
- **Compliance** — incidents by employee with incident IDs
- **CSV Export** — any report, any date range

### 🔔 Notifications
- MS Teams Adaptive Cards with inline time entry form
- Outlook email with direct link
- Configurable: tone, channel, frequency, escalation threshold

---

## 📡 API Reference

```
POST   /api/auth/login
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
POST   /api/projects/:id/members
GET    /api/timesheets?weekStart=&userId=&status=
POST   /api/timesheets
PATCH  /api/timesheets/:id
POST   /api/timesheets/submit
POST   /api/timesheets/approve
POST   /api/timesheets/teams-reply     ← Teams bot webhook
POST   /api/timesheets/upload-wbs      ← Excel WBS import
GET    /api/team
POST   /api/team/sync-keka
GET    /api/reports/utilization
GET    /api/reports/project-summary
GET    /api/reports/compliance
GET    /api/reports/export?type=&startDate=&endDate=
GET    /api/notifications
GET    /api/incidents
PATCH  /api/incidents/:id/resolve
GET    /api/health
```

---

## 🔐 Roles & Permissions

| Permission | Admin | PM | Employee |
|---|:---:|:---:|:---:|
| View own timesheet | ✅ | ✅ | ✅ |
| Submit timesheet | ✅ | ✅ | ✅ |
| Approve/Reject timesheets | ✅ | ✅ | ❌ |
| Override any entry | ✅ | ✅ | ❌ |
| View team timesheets | ✅ | ✅ | ❌ |
| Create/manage projects | ✅ | ✅ | ❌ |
| View all reports | ✅ | ✅ | ❌ |
| Manage roles | ✅ | ❌ | ❌ |
| Sync from Keka | ✅ | ✅ | ❌ |

---

## 📋 Phase 2 Roadmap (Project Management)

The app is architected for extension. Planned additions:

- **Gantt Chart** — task timeline visualization from WBS milestones
- **Resource Planning** — capacity planning across projects
- **Risk Register** — project risks linked to timelines
- **Budget Tracking** — cost per hour, burn rate, forecasting
- **Client Portal** — read-only access for clients to view billable hours
- **Leave Integration** — pull approved leaves from Keka, exclude from auto-log

---

## 🐛 Troubleshooting

**Keka sync fails:**  
Check `KEKA_API_TOKEN` and ensure your Keka plan includes API access. Review `/api/keka/sync-log`.

**Teams messages not sending:**  
Verify `TEAMS_WEBHOOK_URL` is an Incoming Webhook URL (not a Bot Framework URL).

**Auto-log not running:**  
Check cron logs. Auto-log runs at 9 AM server time on weekdays. Ensure `NODE_ENV` is set and PM2/container keeps process alive.

**DB migration fails:**  
Run `npx prisma migrate status` to check pending migrations. Ensure `DATABASE_URL` is correct.
