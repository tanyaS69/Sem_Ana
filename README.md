# 💬 Sentiment Analyzer Pro

A full-stack **Sentiment Analysis Web Application** built using Flask that analyzes user-entered text and classifies it as **Positive, Negative, or Neutral**.

The application uses both **TextBlob** and **VADER** for more reliable sentiment analysis and provides real-time feedback with an interactive UI.

---

## 🚀 Features

* 🧠 Dual sentiment analysis using TextBlob + VADER
* ⚡ Real-time sentiment detection (while typing)
* 📊 Interactive charts using Chart.js
* 🎨 Dynamic UI (background changes based on sentiment)
* 📜 History storage using SQLite
* 🔍 Search and filter previous results
* 🗑️ Clear history functionality
* ✍️ Typing indicator + character counter
* 🎚️ Emoji mood selector

---

## 🛠️ Tech Stack

* Backend: Flask
* NLP: TextBlob, NLTK (VADER)
* Frontend: HTML, CSS, JavaScript
* Database: SQLite (via SQLAlchemy)
* Visualization: Chart.js

---

## 📂 Project Structure

```
sentiment-app/
│── app.py
│── sentiment.py
│── database.py
│── templates/
│     └── index.html
│── static/
│     ├── script.js
│     └── style.css
│── requirements.txt
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/sentiment-analyzer.git
cd sentiment-analyzer
```

### 2. Create virtual environment (recommended)

```
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3. Install dependencies

```
pip install -r requirements.txt
```

### 4. Download NLP resources

```
python -m textblob.download_corpora
python -c "import nltk; nltk.download('vader_lexicon')"
```

### 5. Run the application

```
python app.py
```

### 6. Open in browser

```
http://127.0.0.1:8000
```

---

## 🧠 How It Works

1. User enters text
2. Flask API processes input
3. Sentiment is analyzed using TextBlob and VADER
4. Results are returned and displayed instantly
5. Data is stored in SQLite for history tracking

---

## 💡 Key Concepts Used

* REST API design with Flask
* Real-time UI updates using JavaScript (Fetch API)
* Debouncing for optimized API calls
* Client-side filtering for efficient search
* Data visualization with Chart.js

---

## 📸 Demo

(Add screenshots here before submission)

---

## 🚀 Future Improvements

* 🔐 User authentication system
* 🌍 Multi-language sentiment analysis
* 🤖 Transformer-based models (BERT)
* ☁️ Deployment on cloud (Render / Vercel)

---

## 👨‍💻 Author

Tanya Sinha
