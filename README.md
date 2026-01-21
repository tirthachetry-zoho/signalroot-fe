# SignalRoot Frontend

React-based frontend for SignalRoot alert enrichment platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── WebhookIntegration.jsx
│   │   └── ChangelogDemo.jsx
│   ├── pages/              # Page components
│   │   ├── LoginPage.jsx
│   │   ├── IncidentListPage.jsx
│   │   ├── IncidentDetailPage.jsx
│   │   └── ServiceConfigPage.jsx
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── dist/                   # Build output
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── index.html              # HTML template
```

## 🎨 Features

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for SPA navigation
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful icon library
- **Axios**: HTTP client for API communication
- **Vite**: Fast development server and build tool

## 🛠️ Development

### Environment Setup

1. **Node.js**: Version 16 or higher
2. **npm**: Latest version
3. **Browser**: Chrome, Firefox, Safari, Edge

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint          # Run ESLint
```

### Configuration

- **Development Server**: http://localhost:3003
- **API Base URL**: http://localhost:8080 (configurable)
- **Build Output**: `dist/` directory
- **Environment Variables**: `.env` file support

## 🔗 Integration

### API Communication

```javascript
// Example API call
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get teams
const teams = await api.get('/api/fake-customers/teams');

// Process alert
const result = await api.post('/webhooks/alerts/pagerduty', alertData);
```

### External Links

- **Documentation**: Points to separate documentation site
- **Swagger UI**: Links to backend Swagger interface
- **Backend API**: Communicates with SignalRoot backend

## 🚀 Deployment

### Build Process

```bash
# Create optimized build
npm run build

# Output in dist/
# Ready for static hosting
```

### Deployment Options

1. **Vercel**: Recommended for React apps
2. **Netlify**: Static hosting with CI/CD
3. **AWS S3**: Static file hosting with CloudFront
4. **GitHub Pages**: Free static hosting

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_DOCS_URL=https://docs.signalroot.com
REACT_APP_SWAGGER_URL=http://localhost:8080/swagger-ui.html
```

## 🧪 Testing

### Unit Testing

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### E2E Testing

- **Cypress**: End-to-end testing framework
- **Playwright**: Modern E2E testing
- **Testing Library**: React Testing Library

## 📊 Performance

### Optimization

- **Code Splitting**: Automatic with React.lazy()
- **Tree Shaking**: Dead code elimination
- **Bundle Analysis**: Webpack Bundle Analyzer
- **Caching**: Service worker for offline support

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**: Change Vite port in `vite.config.js`
2. **API Connection**: Check backend server status
3. **Build Errors**: Clear node_modules and reinstall
4. **Environment**: Verify .env file configuration

### Debug Mode

```bash
# Enable debug logging
DEBUG=true npm run dev

# Chrome DevTools
# React DevTools extension
```

## 🤝 Contributing

### Development Workflow

1. **Fork repository**
2. **Create feature branch**
3. **Make changes**
4. **Test thoroughly**
5. **Submit pull request**
6. **Code review process**

### Code Style

- **ESLint**: Configured with React rules
- **Prettier**: Code formatting (optional)
- **Husky**: Git hooks for quality

### Commit Standards

```bash
# Feature branch
git checkout -b feature/new-feature

# Commit with conventional messages
git commit -m "feat: add new feature description"

# Push to remote
git push origin feature/new-feature
```

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

- **Documentation**: [SignalRoot Docs](https://docs.signalroot.com)
- **Issues**: [GitHub Issues](https://github.com/signalroot/signalroot/issues)
- **Discord**: [Community Discord](https://discord.gg/signalroot)
- **Email**: [frontend-support@signalroot.com](mailto:frontend-support@signalroot.com)

---

Built with React 18, Vite, and Tailwind CSS.
