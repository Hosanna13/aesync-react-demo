from flask import Flask, request, jsonify
from flask_cors import CORS 
import whisper 

app = Flask(__name__)
CORS(app)

model = whisper.load_model("base")

@app.route('/transcribe', methods=['POST'])
def transcribe(): 
    if 'file' not in request.files: 
        return jsonify({'error': 'No file uploaded'}, 400)
    
    audio = request.files['file']
    audio.save("temp.wav")

    result = model.transcribe("temp.wav", verbose=False)
    segments = result.get("segments", [])

    formatted = [
        {
            "start": round(s["start"], 2),
            "end": round(s["end"], 2),
            "text": s["text"].strip()
        }
        for s in segments
    ]

    return jsonify({"transcript": formatted})

if __name__ == '__main__':
    app.run(debug=True, port=5000)