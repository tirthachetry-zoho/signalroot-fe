import React, { useState, useEffect } from 'react';
import { 
  Send, Copy, Check, Code, RefreshCw, AlertCircle, 
  ChevronDown, ChevronRight, Terminal, Globe, Search
} from 'lucide-react';

const APIExplorer = () => {
  const [swaggerSpec, setSwaggerSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState(null);
  const [sending, setSending] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTags, setExpandedTags] = useState(new Set());
  const [backendUrl, setBackendUrl] = useState('http://localhost:8080');

  useEffect(() => {
    fetchSwaggerSpec();
  }, []);

  const fetchSwaggerSpec = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from backend first
      const response = await fetch(`${backendUrl}/v3/api-docs`);
      
      if (response.ok) {
        const spec = await response.json();
        setSwaggerSpec(spec);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Failed to fetch Swagger spec:', err);
      setError(err.message);
      
      // Fallback to a simple mock spec that matches our actual backend
      const fallbackSpec = {
        openapi: '3.0.0',
        info: {
          title: 'SignalRoot API',
          version: '1.1.0',
          description: 'SignalRoot API for alert management and webhook processing'
        },
        servers: [
          {
            url: backendUrl,
            description: 'Development server'
          }
        ],
        paths: {
          '/api/versions': {
            get: {
              summary: 'Get API version information',
              description: 'Get API version information and changelog',
              responses: {
                '200': {
                  description: 'Version information',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          '/api/dogfooding/scenarios': {
            get: {
              summary: 'Get all available dogfooding scenarios',
              description: 'Get all available dogfooding scenarios',
              responses: {
                '200': {
                  description: 'Array of DogfoodingScenario objects',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array'
                      }
                    }
                  }
                }
              }
            }
          },
          '/api/dogfooding/scenarios/{id}': {
            get: {
              summary: 'Get specific dogfooding scenario by ID',
              description: 'Get specific dogfooding scenario by ID',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: {
                    type: 'string'
                  }
                }
              ],
              responses: {
                '200': {
                  description: 'DogfoodingScenario object',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          '/webhooks/alerts/pagerduty': {
            post: {
              summary: 'Process PagerDuty webhook alerts',
              description: 'Process PagerDuty webhook alerts',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object'
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'Success message',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          '/webhooks/alerts/cloudwatch': {
            post: {
              summary: 'Process CloudWatch webhook alerts',
              description: 'Process CloudWatch webhook alerts',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object'
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'Success message',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          '/webhooks/deploy/github': {
            post: {
              summary: 'Process GitHub deployment events',
              description: 'Process GitHub deployment events',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object'
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'Success message',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          '/webhooks/deploy/jenkins': {
            post: {
              summary: 'Process Jenkins deployment events',
              description: 'Process Jenkins deployment events',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object'
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'Success message',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          '/api/safety/stats': {
            get: {
              summary: 'Get safety and idempotency statistics',
              description: 'Get safety and idempotency statistics',
              responses: {
                '200': {
                  description: 'SafetyStats object',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      setSwaggerSpec(fallbackSpec);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag) => {
    const newExpanded = new Set(expandedTags);
    if (newExpanded.has(tag)) {
      newExpanded.delete(tag);
    } else {
      newExpanded.add(tag);
    }
    setExpandedTags(newExpanded);
  };

  const handleEndpointSelect = (path, method) => {
    setSelectedEndpoint({ path, method });
    setRequestBody('');
    setResponse(null);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateCurlCommand = () => {
    if (!selectedEndpoint) return '';
    
    const url = `${backendUrl}${selectedEndpoint.path}`;
    let curlCmd = `curl -X ${selectedEndpoint.method.toUpperCase()} "${url}"`;
    curlCmd += ' -H "Content-Type: application/json"';
    curlCmd += ' -H "Accept: application/json"';
    
    if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method.toUpperCase()) && requestBody) {
      curlCmd += ` -d '${requestBody}'`;
    }
    
    return curlCmd;
  };

  const sendRequest = async () => {
    if (!selectedEndpoint) return;
    
    setSending(true);
    setError(null);
    setResponse(null);
    
    try {
      const url = `${backendUrl}${selectedEndpoint.path}`;
      const options = {
        method: selectedEndpoint.method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      
      if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method.toUpperCase()) && requestBody) {
        options.body = requestBody;
      }
      
      const response = await fetch(url, options);
      const data = await response.json();
      
      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: data,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const getMethodColor = (method) => {
    const colors = {
      get: 'bg-green-100 text-green-800',
      post: 'bg-blue-100 text-blue-800',
      put: 'bg-orange-100 text-orange-800',
      delete: 'bg-red-100 text-red-800',
      patch: 'bg-purple-100 text-purple-800'
    };
    return colors[method.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const filterEndpoints = () => {
    if (!swaggerSpec || !searchTerm) return swaggerSpec?.paths || {};
    
    const filtered = {};
    Object.entries(swaggerSpec.paths).forEach(([path, methods]) => {
      const pathLower = path.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      if (pathLower.includes(searchLower)) {
        filtered[path] = methods;
      } else {
        Object.entries(methods).forEach(([method, details]) => {
          if (details.summary?.toLowerCase().includes(searchLower) || 
              details.description?.toLowerCase().includes(searchLower)) {
            filtered[path] = filtered[path] || {};
            filtered[path][method] = details;
          }
        });
      }
    });
    
    return filtered;
  };

  const filteredPaths = filterEndpoints();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Failed to load API documentation</p>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={fetchSwaggerSpec}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!swaggerSpec) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Terminal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No API documentation available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Terminal className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">API Explorer</h1>
                <p className="text-sm text-gray-500">Test and explore SignalRoot API endpoints</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Globe className="h-4 w-4 text-gray-600" />
                <input
                  type="text"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 w-32 focus:outline-none"
                  placeholder="Backend URL"
                />
              </div>
              <button
                onClick={fetchSwaggerSpec}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 text-gray-600" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Endpoints */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Endpoints</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {Object.entries(filteredPaths).map(([path, methods]) => (
                  <div key={path} className="border-b border-gray-100">
                    <div className="p-3">
                      <p className="text-sm font-mono text-gray-900 mb-2">{path}</p>
                      {Object.entries(methods).map(([method, details]) => (
                        <button
                          key={method}
                          onClick={() => handleEndpointSelect(path, method)}
                          className={`w-full text-left p-2 rounded mb-1 transition-colors ${
                            selectedEndpoint?.path === path && selectedEndpoint?.method === method
                              ? 'bg-indigo-50 border border-indigo-200'
                              : 'hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(method)}`}>
                              {method.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{details.summary}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request/Response Panel */}
          <div className="lg:col-span-2 space-y-6">
            {selectedEndpoint ? (
              <>
                {/* Request Panel */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">
                      {selectedEndpoint.method.toUpperCase()} {selectedEndpoint.path}
                    </h3>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    {/* cURL Command */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">cURL Command</label>
                      <div className="relative">
                        <textarea
                          value={generateCurlCommand()}
                          readOnly
                          className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(generateCurlCommand(), 'curl')}
                          className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedCode === 'curl' ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Request Body */}
                    {['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method.toUpperCase()) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Request Body (JSON)</label>
                        <textarea
                          value={requestBody}
                          onChange={(e) => setRequestBody(e.target.value)}
                          placeholder="Enter JSON request body..."
                          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                        />
                      </div>
                    )}

                    {/* Send Button */}
                    <button
                      onClick={sendRequest}
                      disabled={sending}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Request</span>
                        </>
                      )}
                    </button>

                    {/* Error Display */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Response Panel */}
                {response && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Response</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            response.status >= 200 && response.status < 300
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {response.status}
                          </span>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2), 'response')}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            {copiedCode === 'response' ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      {/* Response Headers */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Headers</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <pre className="text-xs text-gray-800">
                            {JSON.stringify(response.headers, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Response Body */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Body</h4>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-gray-100">
                            {JSON.stringify(response.data, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="text-xs text-gray-500">
                        Request completed at {new Date(response.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Terminal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Endpoint</h3>
                <p className="text-gray-500">Choose an endpoint from the sidebar to start testing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIExplorer;
