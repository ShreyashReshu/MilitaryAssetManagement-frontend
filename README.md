# Military Asset Management System - Frontend

## Overview
A React-based web application for managing military assets with secure Role-Based Access Control (RBAC). It provides a responsive dashboard for real-time tracking of weapons, vehicles, and ammunition across multiple bases, supporting asset transfers, assignments, and detailed audit logs.

* **Live Demo:** [https://military-asset-management-frontend-iota.vercel.app](https://military-asset-management-frontend-iota.vercel.app)
* **Backend API:** [https://militaryassetmanagement-2tbh.onrender.com](https://militaryassetmanagement-2tbh.onrender.com)

## Tech Stack
- **Framework**: React 18
- **UI Library**: Bootstrap 5 (react-bootstrap)
- **HTTP Client**: Axios (with JWT Interceptors)
- **Router**: React Router v6
- **State Management**: React Context API (AuthContext)
- **Deployment**: Vercel

## Prerequisites
- Node.js 18 or higher
- npm 9 or higher

## Installation & Setup

### 1. Install Dependencies
Navigate to the frontend folder and run:
```bash
npm install

## Project Structure
```
src/
├── components/       # Reusable React components
│   ├── AppNavbar.js              # Navigation bar with user info
│   ├── AssetDetailModal.js        # Asset details popup
│   ├── NetMovementModal.js        # Transfer details popup
│   └── ProtectedRoute.js          # Route protection wrapper
├── pages/           # Page components (full pages)
│   ├── Dashboard.js              # Main dashboard with metrics
│   ├── Login.js                  # Authentication page
│   ├── Purchases.js              # Add assets (ADMIN/LOGISTICS)
│   ├── Transfers.js              # Transfer assets between bases
│   └── Assignments.js            # Assign/expend assets
├── context/
│   └── AuthContext.js            # JWT and role management
├── api.js           # Axios HTTP client configuration
├── App.js           # Main app component with routing
└── index.js         # React entry point
```


