# 🌟 wwwords: Internal Setup Guide

> wwwords is TBD

---

## 🚀 Getting Started

Follow these steps to set up wwwords locally for development or production.

### 1. Prerequisites

- **Node.js**: Ensure Node.js v20 is installed. Verify with:

  ```bash
  node -v
  ```

- **Bun**: Install Bun (a fast JavaScript runtime) if not already installed:

  ```bash
  npm install -g bun
  ```

- **Vercel CLI**: Required for environment variable management (see [Environment Variables](#3-environment-variables)).

### 2. Configure Git

Set up your Git configuration to avoid line-ending issues and ensure smooth collaboration:

```bash
git config --global core.autocrlf false  # Recommended for Windows users
git config pull.rebase false            # Use merge instead of rebase for pulls
```

### 3. Environment Variables

wwwords uses Vercel for environment variable management. Sync variables locally using the Vercel CLI.

#### 3.1 Install Vercel CLI

Install the Vercel CLI globally:

```bash
npm install -g vercel
```

#### 3.2 Authenticate and Link

1. Log in to Vercel via the CLI:

   ```bash
   vercel login
   ```

2. Link your local project to the Vercel project:

   ```bash
   vercel link
   ```

#### 3.3 Sync Environment Variables

Pull the latest environment variables for your environment:

```bash
bun env:dev   # For development
bun env:prod  # For production
```

> **Note**: Ensure you have access to the Vercel project. Contact the platform admin if you encounter permission issues.

### 4. Install Dependencies

Install project dependencies using Bun:

```bash
bun i
```

### 5. Run in Development Mode

Start the development server, which builds the app and provides super fast hot-reloading using Turbopack:

```bash
bun dev # Turbopack is enabled by default
```

Access the app at `http://localhost:3000` (or the port specified in your environment).

---

## 🏭 Running in Production Mode

To run wwwords locally in production mode:

### 1. Build the Application

Compile the app for production:

```bash
bun run build
```

### 2. Start the Application

Launch the production server:

```bash
bun start
```

> **Tip**: Verify the production build at `http://localhost:3000` or the configured port.

---

## 🤝 Contributing

We encourage contributions to enhance wwwords! To contribute:

1. **Report Issues**: Open a ticket for bugs or feature suggestions on Linear.
2. **Submit Pull Requests**: Follow our [Contributing Guide](CONTRIBUTING.md) for details.
3. **Code Reviews**: All contributions are reviewed to ensure quality and alignment with project goals.

---

## 🔒 License

This repository is **not licensed**. You may not use, copy, modify, or distribute this code without explicit permission from the project owners.

---

## 🆘 Support

For questions or issues:

- Contact the team via internal channels (e.g., Slack #frontend).

---

## 🙌 Thank You

Thank you for contributing to wwwords! Let's build the ultimate TBD app together!
