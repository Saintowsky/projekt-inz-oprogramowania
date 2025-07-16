import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [totalAdded, setTotalAdded] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:5112/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Error connecting to backend.'));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('messages');
    const storedCount = localStorage.getItem('totalAdded');
    if (stored) setMessages(JSON.parse(stored));
    if (storedCount) setTotalAdded(Number(storedCount));
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('totalAdded', totalAdded.toString());
  }, [messages, totalAdded]);

  const handleAddMessage = () => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      setFeedback('Wiadomość musi mieć co najmniej 3 znaki.');
      return;
    }

    setMessages(prev => [...prev, trimmed]);
    setTotalAdded(prev => prev + 1);
    setInput('');
    setFeedback('Wiadomość dodana pomyślnie.');
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMessage();
    }
  };

  const handleDelete = (index: number) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingValue('');
    }
  };

  const handleClearAll = () => {
    setMessages([]);
    setFeedback('Wszystkie wiadomości usunięte.');
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleEdit = (index: number, value: string) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  const handleEditSave = () => {
    if (editingValue.trim().length < 3) {
      setFeedback('Nowa treść musi mieć min. 3 znaki.');
      return;
    }

    setMessages(prev =>
      prev.map((msg, i) => (i === editingIndex ? editingValue.trim() : msg))
    );
    setEditingIndex(null);
    setEditingValue('');
    setFeedback('Wiadomość zaktualizowana.');
    setTimeout(() => setFeedback(null), 2000);
  };

  const filteredMessages = messages.filter(msg =>
    msg.toLowerCase().includes(filter.toLowerCase())
  );

  const uniqueCount = new Set(messages).size;

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '650px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
      background: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#333' }}>React + .NET Fullstack App</h1>
      <p>{message}</p>

      <hr />

      <h2>Dodaj wiadomość</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Wpisz wiadomość (min. 3 znaki)"
        style={{
          padding: '0.5rem',
          width: '70%',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={handleAddMessage}
        style={{
          marginLeft: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#646cff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >

      </button>

      {feedback && (
        <p style={{
          color: feedback.includes('pomyślnie') || feedback.includes('zaktualizowana') ? 'green' : 'red',
          marginTop: '0.5rem'
        }}>
          {feedback}
        </p>
      )}

      <hr />

      <h3>Filtruj wiadomości</h3>
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Szukaj wiadomości..."
        style={{
          padding: '0.4rem',
          width: '70%',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />

      <h3 style={{ marginTop: '2rem' }}>
        Lista wiadomości ({filteredMessages.length}) / Unikalnych: {uniqueCount} / Dodanych łącznie: {totalAdded}
      </h3>

      {filteredMessages.length === 0 ? (
        <p>Brak wiadomości</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {filteredMessages.map((msg, idx) => (
            <li key={idx} style={{
              marginBottom: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}>
              {editingIndex === idx ? (
                <>
                  <input
                    value={editingValue}
                    onChange={e => setEditingValue(e.target.value)}
                    style={{ padding: '0.3rem', width: '60%' }}
                  />
                  <button
                    onClick={handleEditSave}
                    style={{
                      marginLeft: '0.5rem',
                      padding: '0.3rem 0.6rem',
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    
                  </button>
                </>
              ) : (
                <>
                  {msg}
                  <button
                    onClick={() => handleEdit(idx, msg)}
                    style={{
                      marginLeft: '0.5rem',
                      background: '#2196f3',
                      color: '#fff',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                  
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    style={{
                      marginLeft: '0.5rem',
                      background: '#f44336',
                      color: '#fff',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {messages.length > 0 && (
        <button
          onClick={handleClearAll}
          style={{
            marginTop: '1rem',
            background: '#666',
            color: '#fff',
            padding: '0.5rem 1.2rem',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
        
        </button>
      )}
    </div>
  );
}

export default App;
