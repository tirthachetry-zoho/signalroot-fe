import React, { useState, useEffect } from 'react';

const APIVersioning = () => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/versions');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setVersions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderVersionHistory = () => {
    if (loading) {
      return <div className="loading">Loading version history...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return (
      <div className="version-history">
        <h2>API Version History</h2>
        <div className="version-list">
          {versions.length === 0 ? (
            <div className="no-versions">No version history available</div>
          ) : (
            versions.map((version, index) => (
              <div key={version.id} className={`version-item ${index === 0 ? 'latest' : ''}`}>
                <div className="version-header">
                  <h3>
                    {version.version}
                    {index === 0 && <span className="latest-badge">Latest</span>}
                  </h3>
                  <div className="version-meta">
                    Released: {new Date(version.releasedAt).toLocaleDateString()}
                    {version.isCurrent && <span className="current-badge">Current</span>}
                  </div>
                </div>
                <div className="version-description">
                  <p>{version.description}</p>
                  <ul className="version-changes">
                    {version.changes.map((change, idx) => (
                      <li key={idx}>
                        <strong>{change.type}:</strong> {change.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="api-versioning">
      <div className="header">
        <h1>API Versioning</h1>
        <button onClick={fetchVersions} disabled={loading} className="refresh-button">
          {loading ? 'Refreshing...' : 'Refresh Version History'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {renderVersionHistory()}
    </div>
  );
};

export default APIVersioning;
