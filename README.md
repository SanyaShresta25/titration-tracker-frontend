## 💻 Frontend – Titration Analyzer UI

The frontend is a React application that provides the user interface for uploading titration videos, tracking real-time progress, and visualizing molecular structures.

### 📂 Folder: `titration-tracker-frontend/`

### 🚀 Run Frontend with Docker

```bash
cd titration-tracker-frontend
docker build -t titration-frontend .
docker run -d -p 3000:3000 titration-frontend
```

Access the frontend at: [http://localhost:3000](http://localhost:3000)

---

### 🛠️ Run Frontend in Development Mode (without Docker)

```bash
cd titration-tracker-frontend
npm install
npm run dev   # or npm start, depending on your setup
```

The app will start on: [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173) *(if using Vite)*

---

### ⚙️ Optional: Environment Variable

Create a `.env` file if your app makes backend API calls.

Example:

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

### ✨ Key Features

* 📄 Upload video of titration process
* 📊 View real-time analysis progress
* ⚛️ Visualize molecular structures using SMILES
