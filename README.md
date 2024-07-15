# Notes

## Installation

1. Clone Repo

``` git clone https://github.com/hanan-abdelmaseh/PMS-System.git ```

2. install Dependencies

``` npm install ```

---

## For Each Task
- Create New Branch by task name
``` git branch -b [task name] ```
- Stage Changes
``` git add . ```
- Commit Changes
``` git commit -m "msg" ```
- Pull Request to Remote
``` git push origin [branch name] ```

> keep in mind commiting with understandable message

---

# Architecture

## Core Module
- Core Services
- Interceptors

## Shared Module
- Shared Components
- Shared Modules

## Major Modules

### Auth Module
- Auth Components
    - Login
    - Register
    - Verify
    - Request Reset
    - Reset
- Auth Service
- Auth Models

### Dashboard Module

Contain Dashboard Sub-Modules

#### Manager Modules
- Users Module
- Projects Module
- Tasks Module

#### Employee Modules
- Project Module
- Tasks Module

---
# Folders Structures

```bash
.
├── core
│   ├── services
│   └── interceptors
├── Modules
│   ├── auth
│   │   ├── models
│   │   ├── services
│   │   └── components
│   └── dashboard
│       └── subModules
│           ├── manager
│           │   ├── Users
│           │   ├── managerProjects
│           │   └── managerTasks
│           └── employee
│               ├── employeeProjects
│               └── employeeTasks
├── shared
│   └── components
└── README.md
```