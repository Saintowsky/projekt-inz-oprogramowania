import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5112/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Error connecting to backend.'));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>React + .NET Fullstack App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
