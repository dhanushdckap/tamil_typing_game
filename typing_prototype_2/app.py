from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Sample data
scores = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scoreboard', methods=['GET'])
def get_scores():
    return jsonify(scores)

@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.get_json()
    name = data.get('name')
    score = data.get('score')

    if name and score is not None:
        scores.append({"name": name, "score": score})
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "error"}), 400

if __name__ == '__main__':
    app.run(debug=True)
