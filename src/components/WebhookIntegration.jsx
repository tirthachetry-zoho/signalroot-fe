import React, { useState } from 'react';
import { 
  Copy, Check, Send, Shield, Zap, Settings, ChevronRight, 
  ChevronDown, ExternalLink, TestTube, CheckCircle, AlertCircle,
  BookOpen, Code, Key, Globe, ArrowRight, Clock, Activity,
  BarChart3, Users, Database, Server, Terminal
} from 'lucide-react';

const WebhookIntegration = () => {
  const [selectedWebhook, setSelectedWebhook] = useState('pagerduty');
  const [expandedSections, setExpandedSections] = useState(new Set(['overview']));
  const [copiedCode, setCopiedCode] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [isTesting, setIsTesting] = useState(false);

  const webhookGuides = {
    pagerduty: {
      name: 'PagerDuty',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600 border-red-200',
      description: 'PagerDuty provides incident management and alerting for DevOps teams',
      category: 'Alerting',
      status: 'active',
      popularity: 'Most Popular',
      features: ['Real-time Alerts', 'Incident Management', 'Escalation Policies'],
      setup: {
        steps: [
          'Create a PagerDuty account or sign in to existing one',
          'Navigate to Integrations → API Keys in your PagerDuty dashboard',
          'Generate a new API key with appropriate permissions',
          'Copy Integration Key for SignalRoot configuration',
          'Configure SignalRoot webhook URL in PagerDuty settings',
          'Test webhook integration to verify connectivity'
        ],
        configuration: {
          webhookUrl: 'https://events.pagerduty.com/v2/enqueue',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token token=your-integration-key'
          },
          payloadExample: {
            routing_key: 'your-integration-key',
            event_action: 'trigger',
            payload: {
              summary: 'High CPU Usage Alert',
              source: 'monitoring-system',
              severity: 'critical',
              timestamp: '2024-01-20T10:30:00Z'
            }
          }
        },
        testing: {
          endpoint: 'http://localhost:8080/webhooks/alerts/pagerduty',
          samplePayload: {
            webhook: {
              id: 'webhook_123456',
              event: {
                incident: {
                  id: 'INC-123456',
                  title: 'High CPU Usage Alert',
                  severity: 'high',
                  status: 'triggered',
                  created_at: '2024-01-20T10:30:00Z'
                }
              }
            }
          }
        }
    },
    cloudwatch: {
      name: 'AWS CloudWatch',
      icon: Database,
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      description: 'Amazon CloudWatch monitoring and alerting service',
      category: 'Monitoring',
      status: 'active',
      popularity: 'Enterprise Choice',
      features: ['Cloud Monitoring', 'Alarm Management', 'Auto-scaling Integration'],
      setup: {
        steps: [
          'Navigate to AWS CloudWatch console',
          'Create SNS topic for notifications',
          'Configure CloudWatch alarm to publish to SNS',
          'Create HTTP subscription pointing to SignalRoot webhook URL',
          'Confirm subscription to activate webhook',
          'Test alarm configuration'
        ],
        configuration: {
          webhookUrl: 'http://localhost:8080/webhooks/alerts/cloudwatch',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Amz-Sns-Message-Type': 'Notification'
          },
          payloadExample: {
            Message: JSON.stringify({
              AlarmName: 'CPUUtilization',
              StateValue: 'ALARM',
              Timestamp: '2024-01-20T10:30:00Z'
            })
          }
        },
        testing: {
          endpoint: 'http://localhost:8080/webhooks/alerts/cloudwatch',
          samplePayload: {
            Message: JSON.stringify({
              AlarmName: 'CPUUtilization',
              StateValue: 'ALARM',
              Timestamp: '2024-01-20T10:30:00Z'
            })
          }
        }
      }
    },
    github: {
      name: 'GitHub',
      icon: Code,
      color: 'bg-gray-100 text-gray-600 border-gray-200',
      description: 'GitHub webhooks for repository events and CI/CD pipelines',
      category: 'Development',
      status: 'active',
      popularity: 'Developer Favorite',
      features: ['Push Events', 'Pull Requests', 'CI/CD Integration'],
      setup: {
        steps: [
          'Go to repository settings in GitHub',
          'Navigate to Webhooks section',
          'Click "Add webhook"',
          'Enter SignalRoot webhook URL',
          'Select content types to monitor',
          'Add webhook with secret key'
        ],
        configuration: {
          webhookUrl: 'http://localhost:8080/webhooks/deploy/github',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Hub-Signature': 'sha256=signature'
          },
          payloadExample: {
            ref: 'refs/heads/main',
            repository: {
              name: 'signalroot',
              full_name: 'signalroot/signalroot'
            },
            pusher: {
              name: 'developer',
              email: 'dev@signalroot.com'
            }
          }
        },
        testing: {
          endpoint: 'http://localhost:8080/webhooks/deploy/github',
          samplePayload: {
            ref: 'refs/heads/main',
            repository: {
              name: 'signalroot',
              full_name: 'signalroot/signalroot'
            },
            pusher: {
              name: 'developer',
              email: 'dev@signalroot.com'
            }
          }
        }
      }
    },
    jenkins: {
      name: 'Jenkins',
      icon: Settings,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      description: 'Jenkins CI/CD pipeline integration and build notifications',
      category: 'Development',
      status: 'active',
      popularity: 'DevOps Standard',
      features: ['Build Notifications', 'Pipeline Integration', 'Automated Testing'],
      setup: {
        steps: [
          'Install Jenkins webhook plugin if not present',
          'Configure webhook URL in Jenkins job settings',
          'Set trigger events for build notifications',
          'Add authentication headers if required',
          'Test webhook configuration',
          'Monitor build status through SignalRoot'
        ],
        configuration: {
          webhookUrl: 'http://localhost:8080/webhooks/deploy/jenkins',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          payloadExample: {
            name: 'SignalRoot-Build',
            build: {
              number: 123,
              status: 'SUCCESS',
              url: 'https://jenkins.example.com/job/SignalRoot-Build/123/'
            }
          }
        },
        testing: {
          endpoint: 'http://localhost:8080/webhooks/deploy/jenkins',
          samplePayload: {
            name: 'SignalRoot-Build',
            build: {
              number: 123,
              status: 'SUCCESS',
              url: 'https://jenkins.example.com/job/SignalRoot-Build/123/'
            }
          }
        }
      }
    }
  }
};

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const testWebhook = async (webhookType) => {
    setIsTesting(true);
    try {
      const response = await fetch(webhookGuides[webhookType].testing.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookGuides[webhookType].testing.samplePayload)
      });
      
      const result = await response.json();
      setTestResults(prev => ({
        ...prev,
        [webhookType]: {
          success: response.ok,
          message: result.message || 'Test completed successfully',
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [webhookType]: {
          success: false,
          message: error.message || 'Test failed',
          timestamp: new Date().toISOString()
        }
      }));
    } finally {
      setIsTesting(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const currentWebhook = webhookGuides[selectedWebhook];
  const Icon = currentWebhook.icon;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Webhook Integrations</h1>
                  <p className="text-purple-100 text-lg mt-2">
                    Connect SignalRoot with your favorite tools and services
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-purple-100">4 Integrations</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-purple-100">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Integration</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select from our comprehensive collection of webhook integrations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(webhookGuides).map(([key, webhook]) => {
              const WebhookIcon = webhook.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWebhook(key)}
                  className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    selectedWebhook === key
                      ? 'ring-4 ring-purple-500 ring-opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl'
                      : 'bg-white border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white group-hover:scale-110 transition-transform duration-300`}>
                      <WebhookIcon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{webhook.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{webhook.description}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {webhook.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-gray-500">{webhook.popularity}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-6 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white`}>
                  <Icon className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentWebhook.name}</h2>
                  <p className="text-gray-600 text-lg">{currentWebhook.description}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      currentWebhook.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {currentWebhook.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {currentWebhook.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('setup')}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Settings className="w-6 h-6 text-purple-600 mr-4" />
                  <h3 className="text-xl font-bold text-gray-900">Setup Instructions</h3>
                </div>
                {expandedSections.has('setup') ? (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {expandedSections.has('setup') && (
                <div className="px-8 pb-8">
                  <ol className="space-y-4">
                    {currentWebhook.setup.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('config')}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Code className="w-6 h-6 text-purple-600 mr-4" />
                  <h3 className="text-xl font-bold text-gray-900">Configuration</h3>
                </div>
                {expandedSections.has('config') ? (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {expandedSections.has('config') && (
                <div className="px-8 pb-8 space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Webhook URL</h4>
                    <div className="relative">
                      <code className="block bg-gray-900 text-gray-100 p-4 rounded-xl text-sm font-mono">
                        {currentWebhook.setup.configuration.webhookUrl}
                      </code>
                      <button
                        onClick={() => copyToClipboard(currentWebhook.setup.configuration.webhookUrl)}
                        className="absolute top-3 right-3 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        {copiedCode === currentWebhook.setup.configuration.webhookUrl ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Method</h4>
                    <div className="bg-gray-900 text-gray-100 px-4 py-3 rounded-xl text-center">
                      <span className="text-2xl font-bold text-green-400">{currentWebhook.setup.configuration.method}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Headers</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl">
                      {Object.entries(currentWebhook.setup.configuration.headers).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                          <code className="text-sm text-green-400">{key}:</code>
                          <code className="text-sm text-gray-300">{value}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TestTube className="w-8 h-8 mr-3" />
                Test Integration
              </h3>
              <button
                onClick={() => testWebhook(selectedWebhook)}
                disabled={isTesting}
                className="w-full flex items-center justify-center px-6 py-4 bg-white text-purple-600 rounded-xl hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg"
              >
                {isTesting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-purple-300 mr-3"></div>
                    <span>Testing {currentWebhook.name}...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 mr-3" />
                    <span>Test {currentWebhook.name}</span>
                  </>
                )}
              </button>
              
              {testResults[selectedWebhook] && (
                <div className={`mt-6 p-4 rounded-xl ${
                  testResults[selectedWebhook].success 
                    ? 'bg-green-500/20 border border-green-400' 
                    : 'bg-red-500/20 border border-red-400'
                }`}>
                  <div className="flex items-center">
                    {testResults[selectedWebhook].success ? (
                      <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                    ) : (
                      <AlertCircle className="w-6 h-6 mr-3 text-red-400" />
                    )}
                    <div>
                      <span className="font-bold text-white">
                        {testResults[selectedWebhook].success ? 'Success!' : 'Failed!'}
                      </span>
                      <p className="text-white/80 text-sm mt-1">
                        {testResults[selectedWebhook].message}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-white/60 mt-2">
                    {new Date(testResults[selectedWebhook].timestamp).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
              <div className="space-y-4">
                <a
                  href="http://localhost:8080/swagger-ui/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300"
                >
                  <Terminal className="w-6 h-6 mr-3" />
                  <div>
                    <span className="font-bold">Swagger UI</span>
                    <p className="text-sm text-purple-100">Interactive API docs</p>
                  </div>
                </a>
                
                <a
                  href="/api-docs"
                  className="flex items-center p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
                >
                  <BookOpen className="w-6 h-6 mr-3" />
                  <div>
                    <span className="font-bold">API Docs</span>
                    <p className="text-sm text-indigo-100">Complete documentation</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Integration Stats</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center">
                    <Send className="w-6 h-6 text-green-400 mr-3" />
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <div className="text-white/80 text-sm">Active Integrations</div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center">
                    <Activity className="w-6 h-6 text-blue-400 mr-3" />
                    <span className="text-white font-bold text-lg">12.5K</span>
                  </div>
                  <div className="text-white/80 text-sm">Events Today</div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-yellow-400 mr-3" />
                    <span className="text-white font-bold text-lg">99.9%</span>
                  </div>
                  <div className="text-white/80 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebhookIntegration;
