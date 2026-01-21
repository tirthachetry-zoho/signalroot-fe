import React, { useState, useEffect } from 'react';
import { 
  Calendar, GitBranch, Tag, Package, Clock, CheckCircle, 
  AlertCircle, XCircle, ChevronDown, ChevronUp, Download,
  Filter, Search, FileText, Zap, Shield, Bug
} from 'lucide-react';

const Changelog = () => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [expandedVersions, setExpandedVersions] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockVersions = [
        {
          version: '2.0.0',
          releaseDate: '2024-02-15',
          status: 'upcoming',
          changes: [
            {
              type: 'feature',
              description: 'Enterprise-grade security and compliance features',
              component: 'Enterprise',
              breaking: false
            },
            {
              type: 'feature',
              description: 'Advanced analytics and reporting dashboard',
              component: 'Analytics',
              breaking: false
            },
            {
              type: 'feature',
              description: 'Multi-tenant architecture with role-based access control',
              component: 'Architecture',
              breaking: false
            },
            {
              type: 'improvement',
              description: '99.99% uptime SLA guarantee for enterprise customers',
              component: 'Reliability',
              breaking: false
            },
            {
              type: 'feature',
              description: 'SSO integration with SAML and OAuth 2.0',
              component: 'Security',
              breaking: false
            }
          ]
        },
        {
          version: '1.2.0',
          releaseDate: '2024-01-20',
          status: 'stable',
          changes: [
            {
              type: 'feature',
              description: 'Added comprehensive API documentation with Swagger integration',
              component: 'API Documentation',
              breaking: false
            },
            {
              type: 'feature',
              description: 'Enhanced webhook testing with real-time validation',
              component: 'Webhook Integration',
              breaking: false
            },
            {
              type: 'improvement',
              description: 'Improved UI responsiveness and mobile compatibility',
              component: 'UI/UX',
              breaking: false
            },
            {
              type: 'bugfix',
              description: 'Fixed authentication token refresh issues',
              component: 'Authentication',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.2.0',
          checksum: 'sha256:abc123def456789',
          migrationGuide: 'https://docs.signalroot.com/migration/1.2.0'
        },
        {
          version: '1.1.5',
          releaseDate: '2024-01-15',
          status: 'stable',
          changes: [
            {
              type: 'bugfix',
              description: 'Fixed webhook payload parsing for GitHub deployments',
              component: 'Webhook Processing',
              breaking: false
            },
            {
              type: 'improvement',
              description: 'Enhanced error logging and debugging capabilities',
              component: 'Monitoring',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.1.5',
          checksum: 'sha256:def456789abc123'
        },
        {
          version: '1.1.4',
          releaseDate: '2024-01-10',
          status: 'stable',
          changes: [
            {
              type: 'security',
              description: 'Updated dependencies to address security vulnerabilities',
              component: 'Security',
              breaking: false
            },
            {
              type: 'bugfix',
              description: 'Resolved memory leak in long-running webhook processes',
              component: 'Core Engine',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.1.4',
          checksum: 'sha256:ghi789abc123def'
        },
        {
          version: '1.1.3',
          releaseDate: '2024-01-05',
          status: 'stable',
          changes: [
            {
              type: 'feature',
              description: 'Added support for Jenkins CI/CD webhooks',
              component: 'Integration',
              breaking: false
            },
            {
              type: 'improvement',
              description: 'Optimized database query performance',
              component: 'Database',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.1.3',
          checksum: 'sha256:jkl123def456789'
        },
        {
          version: '1.1.2',
          releaseDate: '2023-12-28',
          status: 'stable',
          changes: [
            {
              type: 'bugfix',
              description: 'Fixed duplicate webhook processing issue',
              component: 'Webhook Processing',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.1.2',
          checksum: 'sha256:mno456789abc123'
        },
        {
          version: '1.1.1',
          releaseDate: '2023-12-20',
          status: 'stable',
          changes: [
            {
              type: 'bugfix',
              description: 'Fixed API rate limiting configuration',
              component: 'API Gateway',
              breaking: false
            },
            {
              type: 'improvement',
              description: 'Enhanced monitoring dashboard with real-time metrics',
              component: 'Dashboard',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.1.1',
          checksum: 'sha256:pqr789abc123def'
        },
        {
          version: '1.1.0',
          releaseDate: '2023-12-15',
          status: 'stable',
          changes: [
            {
              type: 'feature',
              description: 'Introduced multi-tenant support',
              component: 'Core Architecture',
              breaking: true
            },
            {
              type: 'feature',
              description: 'Added comprehensive webhook management system',
              component: 'Webhook Integration',
              breaking: false
            },
            {
              type: 'improvement',
              description: 'Redesigned user interface with modern design system',
              component: 'UI/UX',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.1.0',
          checksum: 'sha256:stu123def456789',
          migrationGuide: 'https://docs.signalroot.com/migration/1.1.0'
        },
        {
          version: '1.0.0',
          releaseDate: '2023-11-01',
          status: 'stable',
          changes: [
            {
              type: 'feature',
              description: 'Initial SignalRoot release with core alert enrichment functionality',
              component: 'Core Features',
              breaking: false
            },
            {
              type: 'feature',
              description: 'Basic webhook processing for PagerDuty and Slack',
              component: 'Integration',
              breaking: false
            },
            {
              type: 'feature',
              description: 'API documentation and developer tools',
              component: 'Developer Experience',
              breaking: false
            }
          ],
          downloadUrl: 'https://github.com/signalroot/releases/v1.0.0',
          checksum: 'sha256:vwx456789abc123'
        }
      ];
      
      setVersions(mockVersions);
      setSelectedVersion(mockVersions[0]);
    } catch (err) {
      console.error('Failed to fetch versions:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVersion = (version) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(version)) {
      newExpanded.delete(version);
    } else {
      newExpanded.add(version);
    }
    setExpandedVersions(newExpanded);
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'feature':
        return <Zap className="h-4 w-4 text-blue-600" />;
      case 'improvement':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'bugfix':
        return <Bug className="h-4 w-4 text-red-600" />;
      case 'security':
        return <Shield className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'improvement':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'bugfix':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'security':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const filteredVersions = versions.filter(version => {
    const matchesSearch = version.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.changes.some(change => 
                           change.description.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && version.changes.some(change => change.type === filterType);
  });

  const getStats = () => {
    const stats = {
      total: versions.length,
      features: 0,
      improvements: 0,
      bugfixes: 0,
      security: 0
    };
    
    versions.forEach(version => {
      version.changes.forEach(change => {
        if (change.type === 'feature') stats.features++;
        else if (change.type === 'improvement') stats.improvements++;
        else if (change.type === 'bugfix') stats.bugfixes++;
        else if (change.type === 'security') stats.security++;
      });
    });
    
    return stats;
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <GitBranch className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Changelog</h1>
                <p className="text-sm text-gray-500">Track SignalRoot releases and updates</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.open('https://github.com/signalroot/releases', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="h-4 w-4 text-gray-600" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Releases</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">{stats.features}</p>
                  <p className="text-xs text-blue-500">Features</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-900">{stats.improvements}</p>
                  <p className="text-xs text-green-500">Improvements</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Bug className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-900">{stats.bugfixes}</p>
                  <p className="text-xs text-red-500">Bug Fixes</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-900">{stats.security}</p>
                  <p className="text-xs text-orange-500">Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search changelog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Changes</option>
                <option value="feature">Features</option>
                <option value="improvement">Improvements</option>
                <option value="bugfix">Bug Fixes</option>
                <option value="security">Security</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>{filteredVersions.length} releases found</span>
            </div>
          </div>
        </div>

        {/* Changelog List */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading changelog...</p>
            </div>
          ) : filteredVersions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No releases found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredVersions.map((version) => (
              <div key={version.version} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  {/* Version Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-5 w-5 text-indigo-600" />
                        <h2 className="text-xl font-bold text-gray-900">v{version.version}</h2>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        version.status === 'stable' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {version.status}
                      </span>
                      {version.changes.some(change => change.breaking) && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                          Breaking Changes
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(version.releaseDate).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={() => toggleVersion(version.version)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedVersions.has(version.version) ? (
                          <ChevronUp className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Changes */}
                  {expandedVersions.has(version.version) && (
                    <div className="space-y-4">
                      {version.changes.map((change, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 mt-0.5">
                            {getChangeIcon(change.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`px-2 py-1 text-xs font-medium rounded border ${getChangeColor(change.type)}`}>
                                {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                              </span>
                              <span className="text-xs text-gray-500">{change.component}</span>
                              {change.breaking && (
                                <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800 border border-red-200">
                                  Breaking
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{change.description}</p>
                          </div>
                        </div>
                      ))}

                      {/* Version Actions */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Package className="h-4 w-4" />
                            <span>Checksum: {version.checksum}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {version.migrationGuide && (
                            <button
                              onClick={() => window.open(version.migrationGuide, '_blank')}
                              className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              <FileText className="h-4 w-4 text-gray-600" />
                              <span>Migration Guide</span>
                            </button>
                          )}
                          <button
                            onClick={() => window.open(version.downloadUrl, '_blank')}
                            className="flex items-center space-x-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Changelog;
