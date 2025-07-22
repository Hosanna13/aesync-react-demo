import React, {useState} from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleTranscribe = async () => {
    const formData = new formData();
    formData.append('file', file);

    const res = await fetch('http://127.0.0')
  }
  return (
   
  );
}

export default App;
