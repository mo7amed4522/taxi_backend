# Contributing to Taxi Backend

Thank you for your interest in contributing to **Taxi Backend**! This document provides guidelines and steps to help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Environment Variables](#environment-variables)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/taxi_backend.git
   cd taxi_backend
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/taxi_backend.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create and configure your environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

---

## Development Setup

### Prerequisites

- **Node.js** v24.19.0 or higher
- **npm** v11+ or **pnpm** v9+
- **PostgreSQL** 13+
- **Redis** (optional, for caching/pub-sub)

### Local Development

1. Start the database and services:
   ```bash
   docker-compose up -d
   ```

2. Run migrations:
   ```bash
   npm run migration:run
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

---

## Branching Strategy

We follow the **[GitHub Flow](https://guides.github.com/introduction/flow/)** model:

| Branch | Purpose |
|--------|---------|
| `master` | Production-ready code |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `hotfix/*` | Urgent production fixes |
| `refactor/*` | Code refactoring |
| `docs/*` | Documentation changes |

**Naming examples:**
- `feature/user-authentication`
- `fix/payment-calculator`
- `hotfix/crash-on-startup`
- `refactor/database-queries`

---

## Commit Guidelines

We follow **[Conventional Commits](https://www.conventionalcommits.org/)**:

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Build scripts, dependencies, CI changes |
| `perf` | Performance improvements |
| `ci` | CI/CD changes |

### Examples

```bash
feat(rider-api): add geolocation tracking for active trips
fix(payment): resolve rounding error in fare calculation
docs: update API endpoint documentation
refactor(order): simplify route matching logic
test(driver-api): add unit tests for driver availability
```

---

## Pull Request Process

1. **Sync your fork** with the latest changes:
   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master
   git push origin master
   ```

2. **Create a new branch** from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit following the guidelines above.

4. **Run tests** before submitting:
   ```bash
   npm run test
   npm run test:e2e
   npm run lint
   ```

5. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** against the `master` branch.

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Tests have been added/updated
- [ ] Documentation has been updated (if applicable)
- [ ] All CI checks pass
- [ ] PR describes what and why (not just what changed)

### PR Template

When opening a PR, fill out the template:

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] `npm run test` passes
- [ ] `npm run test:e2e` passes
- [ ] `npm run lint` passes

## Screenshots (if applicable)
```

---

## Reporting Issues

When opening an issue, please provide:

1. **Clear title** describing the problem
2. **Steps to reproduce** the issue
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (Node version, OS, database version)
6. **Screenshots or logs** (if applicable)

### Bug Report Template

```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Environment
- Node.js: 
- npm/pnpm: 
- Database: 
- OS: 

## Additional Context
Add any other context about the problem here.
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure the required variables:

```bash
cp .env.example .env
```

See [.env.example](./.env.example) for all available variables.

> **⚠️ Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## Development Workflow

### 1. Pull latest changes
```bash
git pull upstream master
```

### 2. Create feature branch
```bash
git checkout -b feature/your-feature
```

### 3. Make changes and commit
```bash
git add .
git commit -m "feat(scope): your change description"
```

### 4. Push and create PR
```bash
git push origin feature/your-feature
```

Then open a PR on GitHub.

---

## Need Help?

- Check existing [Issues](https://github.com/ORIGINAL_OWNER/taxi_backend/issues)
- Open a new [Issue](https://github.com/ORIGINAL_OWNER/taxi_backend/issues/new) for questions or bugs
- Be respectful and patient — contributions are appreciated!

---

Thank you for contributing to **Taxi Backend**! 🚕
