from textblob import TextBlob
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

def analyze(text):
    blob = TextBlob(text)

    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity

    vader = sia.polarity_scores(text)

    # Final decision
    if vader['compound'] > 0.05:
        sentiment = "Positive 😊"
    elif vader['compound'] < -0.05:
        sentiment = "Negative 😡"
    else:
        sentiment = "Neutral 😐"

    return {
        "sentiment": sentiment,
        "polarity": round(polarity, 3),
        "subjectivity": round(subjectivity, 3),
        "vader": vader
    }