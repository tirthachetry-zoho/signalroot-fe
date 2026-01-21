import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, GitBranch, User, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const mockIncident = {
  id: '1',
  title: 'API Gateway High Latency',
  service: 'payment-service',
  severity: 'HIGH',
  status: 'ACTIVE',
  startedAt: '2024-01-20T10:30:00Z',
  summary: 'API Gateway experiencing high latency affecting payment processing',
  description: 'The API Gateway is showing response times exceeding 2 seconds for payment processing endpoints. This is causing timeouts in downstream services and affecting user experience.',
  suggestedChecks: [
    'Check API Gateway health endpoints',
    'Review recent error logs',
    'Verify database connectivity',
    'Check for recent configuration changes',
    'Verify external dependencies are accessible'
  ],
  relatedDeploy: {
    id: 'deploy-1',
    source: 'github',
    commitHash: 'abc123def456',
    branch: 'main',
    deployedBy: 'john.doe',
    deployedAt: '2024-01-20T10:15:00Z'
  },
  similarIncident: {
    id: 'incident-45',
    title: 'API Gateway Latency Spike',
    startedAt: '2024-01-18T14:20:00Z',
    resolvedAt: '2024-01-18T15:30:00Z'
  },
  timeline: [
    {
      timestamp: '2024-01-20T10:15:00Z',
      type: 'deploy',
      message: 'GitHub deploy #123 - payment-service v2.4.1',
      details: 'Deployed to production by john.doe'
    },
    {
      timestamp: '2024-01-20T10:30:00Z',
      type: 'alert',
      message: 'High latency alert triggered for API Gateway',
      severity: 'HIGH'
    },
    {
      timestamp: '2024-01-20T10:32:00Z',
      type: 'correlation',
      message: 'Recent deployment detected (15 mins ago)',
      details: 'GitHub deploy abc123def456 on main branch'
    },
    {
      timestamp: '2024-01-20T10:33:00Z',
      type: 'notification',
      message: 'Enriched alert sent to Slack',
      details: 'Payment service team notified'
    },
    {
      timestamp: '2024-01-20T10:35:00Z',
      type: 'investigation',
      message: 'Team acknowledged incident',
      details: 'Investigation started by oncall engineer'
    }
  ]
}

const IncidentDetailPage = () => {
  const { id } = useParams()
  const [incident, setIncident] = useState(mockIncident)
  const [loading, setLoading] = useState(false)

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'severity-critical'
      case 'HIGH': return 'severity-high'
      case 'MEDIUM': return 'severity-medium'
      case 'LOW': return 'severity-low'
      case 'INFO': return 'severity-info'
      default: return ''
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'status-active'
      case 'RESOLVED': return 'status-resolved'
      case 'ACKNOWLEDGED': return 'status-acknowledged'
      default: return ''
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE': return <XCircle size={20} />
      case 'RESOLVED': return <CheckCircle size={20} />
      case 'ACKNOWLEDGED': return <Clock size={20} />
      default: return <AlertTriangle size={20} />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const eventTime = new Date(timestamp)
    const diffMs = now - eventTime
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays > 0) return `${diffDays} days ago`
    if (diffHours > 0) return `${diffHours} hours ago`
    if (diffMins > 0) return `${diffMins} mins ago`
    return 'Just now'
  }

  const getTimeGap = (current, previous) => {
    const currentMs = new Date(current).getTime()
    const previousMs = new Date(previous).getTime()
    const gapMs = currentMs - previousMs
    const gapMins = Math.floor(gapMs / (1000 * 60))
    return gapMins > 0 ? `+${gapMins}m` : ''
  }

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'deploy': return <GitBranch size={14} style={{ color: '#10b981' }} />
      case 'alert': return <AlertTriangle size={14} style={{ color: '#ef4444' }} />
      case 'correlation': return <CheckCircle size={14} style={{ color: '#3b82f6' }} />
      case 'notification': return <CheckCircle size={14} style={{ color: '#22c55e' }} />
      case 'investigation': return <User size={14} style={{ color: '#6366f1' }} />
      default: return <Clock size={14} style={{ color: '#666' }} />
    }
  }

  const getTimelineColor = (type) => {
    switch (type) {
      case 'deploy': return '#10b981'
      case 'alert': return '#ef4444'
      case 'correlation': return '#3b82f6'
      case 'notification': return '#22c55e'
      case 'investigation': return '#6366f1'
      default: '#666'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return '#dc2626'
      case 'HIGH': return '#ef4444'
      case 'MEDIUM': return '#f59e0b'
      case 'LOW': return '#10b981'
      case 'INFO': return '#3b82f6'
      default: '#666'
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/incidents" style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} />
          Back to Incidents
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {getStatusIcon(incident.status)}
              {incident.title}
            </h1>
            <p style={{ color: '#ccc', margin: '0 0 1rem 0' }}>
              Service: <strong>{incident.service}</strong>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className={`severity-${incident.severity.toLowerCase()}`} style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {incident.severity}
            </span>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={getStatusClass(incident.status)}>
                {incident.status}
              </span>
            </div>
          </div>
        </div>

        <div style={{ color: '#999', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={14} />
          Started: {formatDate(incident.startedAt)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <div className="card">
            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Description</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              {incident.description}
            </p>
          </div>

          <div className="card">
            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Timeline</h2>
            <div className="timeline">
              {incident.timeline.map((item, index) => {
                const timeAgo = formatTimeAgo(item.timestamp)
                const timeGap = index > 0 ? getTimeGap(item.timestamp, incident.timeline[index - 1].timestamp) : ''
                
                return (
                  <div key={index} className="timeline-item">
                    <div className="timeline-time">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                        {getTimelineIcon(item.type)}
                        <span style={{ color: '#999', fontSize: '0.75rem' }}>
                          {timeAgo}
                          {timeGap && <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>{timeGap}</span>}
                        </span>
                      </div>
                      <div style={{ color: '#666', fontSize: '0.75rem' }}>
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                    <div className="timeline-content">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ 
                          backgroundColor: getTimelineColor(item.type), 
                          color: '#fff', 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          fontSize: '0.75rem',
                          fontWeight: 'bold' 
                        }}>
                          {item.type.toUpperCase()}
                        </span>
                        {item.severity && (
                          <span style={{ 
                            backgroundColor: getSeverityColor(item.severity), 
                            color: '#fff', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem',
                            marginLeft: '0.5rem'
                          }}>
                            {item.severity}
                          </span>
                        )}
                      </div>
                      <div style={{ color: '#ccc', lineHeight: '1.4' }}>
                        <strong>{item.message}</strong>
                        {item.details && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#999' }}>
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          {incident.relatedDeploy && (
            <div className="card">
              <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Recent Deployment</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GitBranch size={16} style={{ color: '#666' }} />
                  <span style={{ color: '#ccc' }}>Commit:</span>
                  <code style={{ backgroundColor: '#2a2a2a', padding: '2px 6px', borderRadius: '3px', color: '#fff' }}>
                    {formatCommitHash(incident.relatedDeploy.commitHash)}
                  </code>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GitBranch size={16} style={{ color: '#666' }} />
                  <span style={{ color: '#ccc' }}>Branch:</span>
                  <span style={{ color: '#fff' }}>{incident.relatedDeploy.branch}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={16} style={{ color: '#666' }} />
                  <span style={{ color: '#ccc' }}>Deployed by:</span>
                  <span style={{ color: '#fff' }}>{incident.relatedDeploy.deployedBy}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} style={{ color: '#666' }} />
                  <span style={{ color: '#ccc' }}>Deployed at:</span>
                  <span style={{ color: '#fff' }}>{formatDate(incident.relatedDeploy.deployedAt)}</span>
                </div>
              </div>
            </div>
          )}

          {incident.similarIncident && (
            <div className="card">
              <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Similar Past Incident</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>
                  <strong style={{ color: '#fff' }}>{incident.similarIncident.title}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} style={{ color: '#666' }} />
                  <span style={{ color: '#ccc' }}>Started:</span>
                  <span style={{ color: '#fff' }}>{formatDate(incident.similarIncident.startedAt)}</span>
                </div>
                {incident.similarIncident.resolvedAt && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} style={{ color: '#666' }} />
                    <span style={{ color: '#ccc' }}>Resolved:</span>
                    <span style={{ color: '#fff' }}>{formatDate(incident.similarIncident.resolvedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="card">
            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Suggested Checks</h2>
            <ul style={{ color: '#ccc', paddingLeft: '1.5rem', margin: 0 }}>
              {incident.suggestedChecks.map((check, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncidentDetailPage
