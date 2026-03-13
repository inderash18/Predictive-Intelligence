# PredictX AI – Predictive Analytics Platform

PredictX AI is a modern, high-performance full-stack web platform designed to demonstrate real-world AI prediction modules used in the industry. It features a minimalist SaaS dashboard, real-time analytics, and advanced machine learning models for infrastructure monitoring.

## 🚀 Features

- **Electricity Demand Prediction**: Forecasts energy consumption based on historical data and environmental factors.
- **Server Sentinel**: Predicts infrastructure failure risks using CPU, RAM, and network telemetry.
- **PC Health & Crash Predictor**: Monitors hardware thermals and load to prevent system instability.
- **Interactive Dashboard**: Modern analytics with glassmorphism cards and real-time alerts.
- **JWT Authentication**: Secure user login and registration system.
- **Real-time Updates**: WebSocket integration for instant risk notifications.

## 🛠 Tech Stack

- **Frontend**: Next.js (JSX), Tailwind CSS 4.0, Framer Motion, Recharts
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **ML Service**: Python FastAPI, Scikit-learn, Pandas, NumPy
- **Orchestration**: Root-level concurrency for multi-service execution

## 📂 Project Structure

```text
├── frontend/        # Next.js web application
├── backend/         # Node.js REST API & WebSocket server
├── ml-service/      # Python FastAPI for AI models
├── datasets/        # Training data and samples
└── database/        # MongoDB configurations/seeds
```

## 🚥 Quick Start

### 1. Installation

Install dependencies for all services:
```bash
npm run install:all
```

### 2. Configure Environment

Ensure you have a MongoDB instance running. Update the `.env` file in `backend/`:
```env
MONGO_URI=mongodb://localhost:27017/predictx
JWT_SECRET=your_secret_key
```

### 3. Run Platform

Start all services (Frontend, Backend, ML) concurrently:
```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:8000

---
Created with ❤️ by PredictX AI Team
