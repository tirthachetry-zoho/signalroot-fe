import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Zap, 
  Code, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Users,
  MessageSquare,
  ExternalLink,
  Github,
  Twitter,
  Download,
  Play,
  BarChart3,
  Shield,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  GitBranch,
  Package,
  Rocket,
  Activity,
  Database,
  Terminal,
  Bell,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';

const ChangelogDemo = () => {
  const [selectedVersion, setSelectedVersion] = useState('1.1.0');
  const [expandedSections, setExpandedSections] = useState(new Set(['features']));
  const [activeDemo, setActiveDemo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const versions = [
    {
      version: '1.1.0',
      date: '2024-01-20',
      status: 'current',
      features: 23,
      fixes: 15,
      description: 'Major release with documentation system and enhanced alert enrichment'
    },
    {
      version: '1.0.0',
      date: '2024-01-15',
      status: 'previous',
      features: 8,
      fixes: 5,
      description: 'Initial release with core alert processing and webhook support'
    }
  ];

  const demoScenarios = [
    {
      id: 'alert-enrichment',
      title: 'Alert Enrichment Demo',
      description: 'See how SignalRoot enriches alerts with deployment context',
      icon: Zap,
      color: 'bg-purple-500',
      demo: {
        type: 'interactive',
        steps: [
          'Create a test alert',
          'Watch as SignalRoot correlates with recent deployments',
          'View similar incidents from history',
          'See suggested resolution steps'
        ]
      }
    },
    {
      id: 'webhook-testing',
      title: 'Webhook Testing Playground',
      description: 'Test webhook configurations in real-time',
      icon: Terminal,
      color: 'bg-green-500',
      demo: {
        type: 'playground',
        steps: [
          'Configure webhook endpoint',
          'Send test payload',
          'Monitor delivery status',
          'View enriched results'
        ]
      }
    },
    {
      id: 'notification-preview',
      title: 'Notification Preview',
      description: 'Preview enriched notifications before sending',
      icon: Mail,
      color: 'bg-blue-500',
      demo: {
        type: 'preview',
        steps: [
          'Configure notification channel',
          'Customize message template',
          'Preview enriched alert',
          'Send test notification'
        ]
      }
    }
  ];

  const stats = {
    totalAlerts: 12547,
    enrichmentAccuracy: 94.5,
    avgProcessingTime: '1.2s',
    uptime: '99.97%',
    webhookSuccess: 99.8,
    userSatisfaction: 4.8
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const selectedVersionData = versions.find(v => v.version === selectedVersion);

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">SignalRoot Changelog</h1>
                <p className="text-indigo-100 text-lg mt-2">
                  Version history, updates, and interactive demos
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Toggle dark mode"
              >
                {darkMode ? <Unlock className="w-5 h-5 text-white" /> : <Lock className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={() => window.open('https://github.com/signalroot', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Version Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Version History</h2>
              
              <div className="space-y-3">
                {versions.map((version) => (
                  <button
                    key={version.version}
                    onClick={() => setSelectedVersion(version.version)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedVersion === version.version
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">v{version.version}</div>
                        <div className="text-sm text-gray-500">{version.date}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        version.status === 'current'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {version.status === 'current' ? 'Current' : 'Previous'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{version.description}</div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{version.features} features</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span>{version.fixes} fixes</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Release Notes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Rocket className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    What's New in v{selectedVersion}
                  </h2>
                  <p className="text-gray-600">
                    {selectedVersionData?.description}
                  </p>
                </div>
              </div>

              {selectedVersion === '1.1.0' && (
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Major Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Documentation System</span>
                        </div>
                        <p className="text-sm text-purple-700">
                          Integrated comprehensive documentation directly into UI with Mintlify-style interface
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Smart Correlation</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Enhanced incident correlation with 40% better accuracy and pattern recognition
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Demo Scenarios */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Play className="w-5 h-5 text-blue-500" />
                      Interactive Demos
                    </h3>
                    <div className="space-y-3">
                      {demoScenarios.map((demo) => (
                        <button
                          key={demo.id}
                          onClick={() => setActiveDemo(demo.id)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            activeDemo === demo.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 ${demo.color} rounded-lg`}>
                                <demo.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{demo.title}</div>
                                <div className="text-sm text-gray-500">{demo.description}</div>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                          
                          {activeDemo === demo.id && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="text-sm text-gray-600 mb-2">Demo Steps:</div>
                              <div className="space-y-2">
                                {demo.demo.steps.map((step, index) => (
                                  <div key={index} className="flex items-start space-x-2">
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                      {index + 1}
                                    </div>
                                    <div className="text-sm text-gray-700">{step}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Stats */}
          <div className="lg:col-span-3 lg:row-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Live Statistics</h2>
                  <p className="text-gray-600">Real-time SignalRoot performance metrics</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-gray-900">{stats.totalAlerts.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total Alerts Processed</div>
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-green-600">{stats.enrichmentAccuracy}%</div>
                  <div className="text-sm text-gray-500">Enrichment Accuracy</div>
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-blue-600">{stats.avgProcessingTime}</div>
                  <div className="text-sm text-gray-500">Avg Processing Time</div>
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-purple-600">{stats.uptime}%</div>
                  <div className="text-sm text-gray-500">System Uptime</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Webhook Success Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: `${stats.webhookSuccess}%`}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{stats.webhookSuccess}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">User Satisfaction</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(stats.userSatisfaction)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-900 ml-2">{stats.userSatisfaction}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Demo Modal */}
      {activeDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {demoScenarios.find(d => d.id === activeDemo)?.title}
              </h3>
              <button
                onClick={() => setActiveDemo(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <EyeOff className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className={`p-3 ${
                  demoScenarios.find(d => d.id === activeDemo)?.color || 'bg-gray-500'
                } rounded-lg`}>
                  {React.createElement(
                    demoScenarios.find(d => d.id === activeDemo)?.icon || Play,
                    { className: "w-6 h-6 text-white" }
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {demoScenarios.find(d => d.id === activeDemo)?.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {demoScenarios.find(d => d.id === activeDemo)?.description}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Start Interactive Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangelogDemo;
