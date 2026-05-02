from flask import Flask, render_template, request, jsonify
from sentiment import analyze
from database import Session, Record

app = Flask(__name__)

# 🏠 Home route
@app.route('/')
def home():
    return render_template("index.html")


# 🧠 Analyze sentiment
@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json

    text = data.get('text', '').strip()
    auto = data.get('auto', False)  # for real-time typing

    if not text:
        return jsonify({"error": "Empty input"}), 400

    result = analyze(text)

    # 💾 Save only when user clicks button (not auto typing)
    if not auto:
        session = Session()
        record = Record(
            text=text,
            sentiment=result['sentiment'],
            polarity=result['polarity'],
            subjectivity=result['subjectivity']
        )
        session.add(record)
        session.commit()
        session.close()

    return jsonify(result)


# 📜 Get history
@app.route('/history')
def history():
    session = Session()
    records = session.query(Record).all()
    session.close()

    return jsonify([
        {
            "text": r.text,
            "sentiment": r.sentiment,
            "polarity": r.polarity
        } for r in records
    ])


# 🗑️ Clear history
@app.route('/clear_history', methods=['POST'])
def clear_history():
    session = Session()
    session.query(Record).delete()
    session.commit()
    session.close()

    return jsonify({"message": "History cleared"})


# 🚀 Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)