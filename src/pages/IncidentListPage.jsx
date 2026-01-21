import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, Clock, CheckCircle, XCircle, Search, Filter,
  Calendar, User, Activity, RefreshCw, Eye, Edit, Trash2,
  TrendingUp, Server, Database, Zap, Shield, ChevronRight,
  Bell, BarChart3, Users, Settings, CreditCard
} from 'lucide-react';

const mockIncidents = [
  {
    id: '1',
    title: 'API Gateway High Latency',
    service: 'payment-service',
    severity: 'HIGH',
    status: 'ACTIVE',
    startedAt: '2024-01-20T10:30:00Z',
    summary: 'API Gateway experiencing high latency affecting payment processing',
    assignee: 'john.doe',
    tags: ['performance', 'api-gateway'],
    impact: 'High - Payment processing affected',
    resolution: null,
    metrics: {
      responseTime: '2.3s',
      errorRate: '12%',
      affectedUsers: '1,234'
    }
  },
  {
    id: '2',
    title: 'Database Connection Pool Exhausted',
    service: 'user-service',
    severity: 'CRITICAL',
    status: 'RESOLVED',
    startedAt: '2024-01-20T09:15:00Z',
    summary: 'Database connection pool exhausted, causing service failures',
    assignee: 'jane.smith',
    tags: ['database', 'infrastructure'],
    impact: 'Critical - User authentication failures',
    resolution: 'Increased connection pool size and added monitoring',
    resolvedAt: '2024-01-20T11:30:00Z',
    metrics: {
      responseTime: '5.1s',
      errorRate: '45%',
      affectedUsers: '5,678'
    }
  },
  {
    id: '3',
    title: 'Memory Usage Spike',
    service: 'analytics-service',
    severity: 'MEDIUM',
    status: 'ACTIVE',
    startedAt: '2024-01-20T08:45:00Z',
    summary: 'Memory usage spike detected in analytics service',
    assignee: 'mike.jones',
    tags: ['performance', 'monitoring'],
    impact: 'Medium - Analytics processing delays',
    resolution: null,
    metrics: {
      responseTime: '1.8s',
      errorRate: '8%',
      affectedUsers: '456'
    }
  },
  {
    id: '4',
    title: 'SSL Certificate Expiration',
    service: 'web-frontend',
    severity: 'HIGH',
    status: 'MONITORING',
    startedAt: '2024-01-19T14:20:00Z',
    summary: 'SSL certificate expiring in 7 days',
    assignee: 'sarah.wilson',
    tags: ['security', 'infrastructure'],
    impact: 'High - Service may become unavailable',
    resolution: null
  },
  {
    id: '5',
    title: 'Third-party API Rate Limit',
    service: 'notification-service',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    startedAt: '2024-01-19T12:00:00Z',
    summary: 'Third-party notification API rate limit exceeded',
    assignee: 'alex.brown',
    tags: ['external-api', 'notifications'],
    impact: 'Medium - Notification delivery delays',
    resolution: 'Implemented retry logic with exponential backoff',
    resolvedAt: '2024-01-19T15:45:00Z'
  }
];

const IncidentListPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('startedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIncidents(mockIncidents);
    } catch (error) {
      console.error('Failed to fetch incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'MONITORING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <XCircle className="h-4 w-4" />;
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4" />;
      case 'MONITORING':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityIcon = (severity) => {
    return <AlertTriangle className="h-4 w-4" />;
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => {
      const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
      const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
      return matchesSearch && matchesStatus && matchesSeverity;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'startedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const duration = Math.floor((end - start) / 1000 / 60); // minutes
    
    if (duration < 60) {
      return `${duration}m`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
                <p className="text-sm text-gray-500">Monitor and manage system incidents</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchIncidents}
                className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 text-gray-600" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="RESOLVED">Resolved</option>
                <option value="MONITORING">Monitoring</option>
              </select>
              
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>{filteredAndSortedIncidents.length} incidents found</span>
            </div>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading incidents...</p>
            </div>
          ) : filteredAndSortedIncidents.length === 0 ? (
            <div className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('title')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Incident</span>
                        {sortBy === 'title' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('service')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Service</span>
                        {sortBy === 'service' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('severity')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Severity</span>
                        {sortBy === 'severity' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Status</span>
                        {sortBy === 'status' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('startedAt')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Started</span>
                        {sortBy === 'startedAt' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="relative px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedIncidents.map((incident) => (
                    <tr key={incident.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {getStatusIcon(incident.status)}
                          </div>
                          <div>
                            <Link
                              to={`/incidents/${incident.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                            >
                              {incident.title}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">{incident.summary}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{incident.service}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(incident.severity)}`}>
                          {getSeverityIcon(incident.severity)}
                          <span className="ml-1">{incident.severity}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${getStatusColor(incident.status)}`}>
                          {getStatusIcon(incident.status)}
                          <span className="ml-1">{incident.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(incident.startedAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {formatDuration(incident.startedAt, incident.resolvedAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{incident.assignee}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/incidents/${incident.id}`}
                            className="p-1 text-gray-400 hover:text-indigo-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button className="p-1 text-gray-400 hover:text-indigo-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentListPage;
