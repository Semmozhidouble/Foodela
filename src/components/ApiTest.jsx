import React, { useEffect, useState } from 'react';
import { checkHealth } from '../services/apiService';

const ApiTest = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await checkHealth();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🔧 API Connection Test</h2>
      {loading && <p>Testing connection...</p>}
      {status && (
        <div style={{ color: 'green' }}>
          <p>✅ Backend Connected!</p>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <p>❌ Connection Failed</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
