
# Personal Finance Tracker

Build a web application that allows users to track their income and expenses, view transaction history, and analyze their financial summary.



## Setup instructions (frontend & backend)

Setup backend

```bash
  1. using file .env.example as .env
  2. Open your database (this project using postgreSQL)
  3. Enter all your database credentials into .env
  4. Before start run "go mod download" to make sure, all module already install.
```

Setup frontend

```bash
  cd frontend
  npm install
  npm run dev
```
    
## Tech Stack

**Client:** Nextjs, Tailwindcss, yup

**Server:** Golang, GORM, Echo, PostgreSQL, jwt, bcrypt, docker.


## Run Locally

Clone the project

```bash
  git clone https://github.com/iqbalpradipta/personal-finance-tracker.git
```

Go to the project directory

```bash
  cd personal-finance-tracker
```

Go to the backend

```bash
  cd backend
  go run main.go || go run *.go
```

Go to the frontend

```bash
  cd frontend
  npm install
  npm run dev
```
