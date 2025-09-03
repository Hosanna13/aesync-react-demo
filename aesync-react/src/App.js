import React, {useState} from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleTranscribe = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://127.0.0.1:5000/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json(); 
    setTranscript(data.transcript);
  };
  return (
    <>
      <div className="App">
        <h1> AESYNC React Demo</h1>
        <input type="file" accept="audio/*" onChange={handleFileChange}/>
        <button onClick={handleTranscribe} disabled={!file}> transcribe </button>
      </div>

      <div> 
        {transcript.map((line,index) => (
          <div key={index}>
            <strong> {line.start} - {line.end} </strong>: {line.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
