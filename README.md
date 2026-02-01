# Military Asset Management System – Frontend

## Overview

A React-based web application for managing military assets with secure **Role-Based Access Control (RBAC)**.  
It provides a responsive dashboard for real-time tracking of **weapons, vehicles, and ammunition** across multiple bases, supporting **asset transfers, assignments, purchases, and detailed audit logs**.

- **Live Demo:** https://military-asset-management-frontend-iota.vercel.app  
- **Backend API:** https://militaryassetmanagement-2tbh.onrender.com  

---

## Tech Stack

- **Framework:** React 18  
- **UI Library:** Bootstrap 5 (react-bootstrap)  
- **HTTP Client:** Axios (JWT Interceptors)  
- **Routing:** React Router v6  
- **State Management:** React Context API (AuthContext)  
- **Authentication:** JWT-based RBAC  
- **Deployment:** Vercel  

---

## Admin Access (Global Access)

Use the following credentials to log in as **ADMIN USER (Global Access)**:

- **Username:** `admin_user`
- **Password:** `password123`
- **Role:** `ADMIN`
- **Base Access:** Global (not restricted to any base)

> The ADMIN user has full access across all bases and can manage assets, transfers, assignments, and view audit logs.

---

## Features

- Secure login with JWT authentication  
- Role-Based Access Control (ADMIN, LOGISTICS, COMMANDER)  
- Dashboard with asset metrics and summaries  
- Add and manage assets (Purchases)  
- Transfer assets between bases  
- Assign or expend assets  
- View asset-level movement history  
- Protected routes based on user roles  

---

## Prerequisites

- Node.js **18+**
- npm **9+**

---
