# Todo App — CI/CD & Unit Test Demo

> **Stack**: React 18 + Vite + TypeScript + Vitest + GitHub Actions + Vercel

---

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── __tests__/
│   │   └── todoUtils.test.ts   ← Unit tests (30+ test cases)
│   ├── hooks/
│   │   └── useTodos.ts         ← Custom React hook
│   ├── types/
│   │   └── index.ts            ← TypeScript types
│   ├── utils/
│   │   └── todoUtils.ts        ← Pure functions (fully tested)
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── test-setup.ts
├── .github/
│   └── workflows/
│       └── ci-cd.yml           ← GitHub Actions pipeline
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Run unit tests
npm test

# 4. Run tests with coverage
npm run test:coverage

# 5. Build for production
npm run build
```

---

## 🧪 Unit Tests

Tests are in `src/__tests__/todoUtils.test.ts` covering:

| Function | Cases |
|---|---|
| `createTodo` | text, trim, default priority, unique id |
| `filterTodos` | all / active / completed |
| `toggleTodo` | toggle on/off, immutability |
| `deleteTodo` | remove by id, keep others |
| `clearCompleted` | remove done, keep active |
| `countActive` | count logic |
| `sortByPriority` | high → medium → low |

---

## ⚙️ CI/CD Pipeline

`.github/workflows/ci-cd.yml` — 3 jobs chạy tuần tự:

```
Push to main/develop
        │
        ▼
  ┌─────────────┐
  │  Job 1: Test │  ← lint + vitest + coverage
  └──────┬──────┘
         │ (pass)
         ▼
  ┌─────────────┐
  │ Job 2: Build │  ← vite build
  └──────┬──────┘
         │ (pass + branch == main)
         ▼
  ┌──────────────┐
  │ Job 3: Deploy │  ← vercel --prod
  └──────────────┘
```

### Setup Vercel Secrets

Vào **GitHub → Settings → Secrets and variables → Actions**, thêm:

| Secret | Lấy ở đâu |
|---|---|
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` sau khi `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` sau khi `vercel link` |

---

## 📝 Key Concepts Demonstrated

- **Unit Testing**: Pure functions dễ test, không có side effects
- **Test Coverage**: Report HTML được upload lên GitHub Artifacts
- **CI Gates**: Build chỉ chạy khi test pass
- **CD Condition**: Deploy chỉ trigger khi push vào `main`
- **Immutability**: Tất cả utils return array mới, không mutate
