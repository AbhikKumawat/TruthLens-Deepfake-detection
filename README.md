# TruthLens 🛡️

**TruthLens** is an advanced, enterprise-grade AI Video Authenticity & Deepfake Detection SaaS platform. It leverages state-of-the-art computer vision and machine learning models to detect face swaps, lip-sync anomalies, and voice cloning, providing users with a comprehensive authenticity score and downloadable verification reports.

---

## 🚀 Key Features

*   **Deepfake Detection:** Analyzes videos for face swaps, lip-sync anomalies, and voice manipulation.
*   **Frame-by-Frame Analysis:** Performs deep inspection of micro-inconsistencies missed by the human eye.
*   **Authenticity Scoring:** Provides a clear confidence score (0-100%) indicating manipulation likelihood.
*   **Exportable PDF Reports:** Generates detailed technical analysis reports for compliance and audit trails.
*   **Trust Badges & Sharing:** Integrates directly with publishing platforms (X, YouTube, LinkedIn, TikTok) with verification badges.
*   **Fast Processing:** Optimised pipeline delivering results in under 30 seconds for standard video lengths.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [Next.js 14](https://nextjs.org/) (React 18, App Router, TypeScript)
*   **Styling & Animation:** Tailwind CSS, Framer Motion
*   **State & Query Management:** TanStack React Query, Axios
*   **Data Visualization:** Recharts, Lucide Icons

### Backend
*   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11)
*   **Database & ORM:** SQLite (via `aiosqlite`), SQLAlchemy (asyncio), Alembic for migrations
*   **Processing Libraries:** OpenCV (`opencv-python-headless`), NumPy, Pillow (PIL)
*   **Security:** JWT authentication, Passlib (bcrypt)

---

## 📁 Repository Structure

```text
Truthified/
├── backend/            # FastAPI backend application
│   ├── app/            # Source code (API routes, services, database, seeds, models)
│   ├── alembic/        # Database migrations
│   ├── requirements.txt# Python dependencies
│   └── Dockerfile      # Backend Docker configuration
├── frontend/           # Next.js frontend application
│   ├── src/            # Source code (components, page routes, hooks, libs)
│   ├── package.json    # Frontend dependencies and npm scripts
│   └── Dockerfile      # Frontend Docker configuration
├── TruthLens_Features_and_Tech_Stack.pdf   # Detailed project features & stack
└── TruthLens_System_Architecture_Report.pdf # Detailed system architecture
```

---

## 🏃 Getting Started & How to Run

To run the complete **TruthLens** application, both the frontend and backend services must be running concurrently. You can run them either **locally (for development)** or using **Docker/Docker Compose**.

### 📋 Prerequisites
*   [Python 3.11+](https://www.python.org/downloads/)
*   [Node.js 18+](https://nodejs.org/)
*   [Docker](https://www.docker.com/) (Optional, if running via containers)

---

### 💻 Option 1: Running Locally (Recommended for Development)

You will need to open **two separate terminal windows/sessions**: one for the backend and one for the frontend.

#### 1. Start the Backend
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a Python virtual environment and activate it:
   ```bash
   python -m venv venv
   
   # On Windows (PowerShell):
   .\venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create the environment configuration file:
   ```bash
   cp .env.example .env
   ```
5. Start the FastAPI backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   * **API Endpoint:** `http://localhost:8000`
   * **Swagger API Documentation:** `http://localhost:8000/docs`

#### 2. Start the Frontend
1. Open a **new, separate terminal** and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend Node.js packages:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   * **Web Application URL:** `http://localhost:3000`

---

### 🐳 Option 2: Running with Docker Compose (Easiest Container Setup)

We have provided a root-level `docker-compose.yml` to launch both the frontend and backend with a single command.

1. Ensure Docker Desktop is running.
2. In the root directory of the project, run:
   ```bash
   docker-compose up --build
   ```
3. Once the build and startup are complete:
   * The frontend will be accessible at: `http://localhost:3000`
   * The backend will be accessible at: `http://localhost:8000`

---

### 📦 Option 3: Running Individual Docker Containers

If you prefer to build and run individual Docker containers manually:

#### Run Backend Container
```bash
cd backend
docker build -t truthlens-backend .
docker run -p 8000:8000 truthlens-backend
```

#### Run Frontend Container
```bash
cd frontend
docker build -t truthlens-frontend .
docker run -p 3000:3000 truthlens-frontend
```

---

## 📚 Documentation
For deep technical details, refer to the following documents in the root directory:
*   [Tech Stack Overview](file:///c:/Users/Abhik%20Kumawat/OneDrive/Desktop/Truthified/TruthLens_Features_and_Tech_Stack.pdf)
*   [System Architecture Report](file:///c:/Users/Abhik%20Kumawat/OneDrive/Desktop/Truthified/TruthLens_System_Architecture_Report.pdf)
