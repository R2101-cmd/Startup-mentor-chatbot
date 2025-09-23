# 🚀 Startup Mentor Chatbot

---

## ✨ Features

- **Expert Startup Analysis**  
  Paste your idea and get instant feedback:
  - 🧩 Problem  
  - 🎯 Target Audience  
  - 📊 Market Potential  
  - ⚔️ Competitors  
  - ⚠️ Risks  
  - 🚀 Pitch

- **Beautiful, Responsive UI**  
  Neon gradients, glassmorphism, dark/light mode.

- **Local AI Processing**  
  Powered by Ollama and Llama 3 for privacy and speed.

- **Copy and Clear Chat**  
  Easily copy bot analysis or restart your chat.

---

## 🛠️ Setup & Usage

### 1. **Install Ollama**

Download and install for your OS:  
https://ollama.com/download

### 2. **Pull the Llama 3 Model**

```bash
ollama pull llama3
```

### 3. **Run the Model**

```bash
ollama run llama3
```
This starts the Ollama API on `http://localhost:11434`.

---

### 4. **Install Project Dependencies**

Clone this repo and in your project folder:

```bash
npm install
```

---

### 5. **Start the App**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Example Inputs

Paste ideas like:

- `An app that connects local farmers directly to consumers to sell fresh produce.`
- `A wearable device that tracks hydration levels and reminds users to drink water.`
- `A platform for freelancers to collaborate on creative projects and share revenue.`

---

## 📂 Project Structure

```
startup-mentor-chatbot/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 📝 Technologies

- React
- Ollama ([Llama 3](https://ollama.com/library/llama3))
- @phosphor-icons/react

---

## 🐞 Troubleshooting

- **Error: Sorry, I couldn't analyze your idea. Please try again!**  
  Make sure Ollama is running and the Llama 3 model is pulled.

- **CORS error in browser console:**  
  Ensure you have Ollama v0.1.34+.

- **React UI not loading:**  
  Confirm your `App.css` is present and imported in `App.js`.

---

## 📄 License

MIT

---

Made with ❤️ by [Your Name] · Powered by Ollama Llama 3
