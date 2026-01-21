import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AlertTriangle, Settings, List, Terminal, BookOpen } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="navbar-brand">
          <AlertTriangle size={24} style={{ marginRight: '8px' }} />
          SignalRoot
        </Link>
        
        <div className="navbar-nav">
          <Link 
            to="/incidents" 
            className={`nav-link ${isActive('/incidents') ? 'active' : ''}`}
            style={{ color: isActive('/incidents') ? '#fff' : '#ccc' }}
          >
            <List size={16} style={{ marginRight: '4px' }} />
            Incidents
          </Link>
          
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            style={{ color: isActive('/services') ? '#fff' : '#ccc' }}
          >
            <Settings size={16} style={{ marginRight: '4px' }} />
            Services
          </Link>
          
          <a 
            href="https://signalroot-docs.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ color: '#ccc' }}
          >
            <BookOpen size={16} style={{ marginRight: '4px' }} />
            Documentation
          </a>
          
          <a 
            href="http://localhost:8080/swagger-ui/index.html" 
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ color: '#ccc' }}
          >
            <Terminal size={16} style={{ marginRight: '4px' }} />
            Swagger UI
          </a>
          
          <Link 
            to="/changelog" 
            className={`nav-link ${isActive('/changelog') ? 'active' : ''}`}
            style={{ color: isActive('/changelog') ? '#fff' : '#ccc' }}
          >
            <AlertTriangle size={16} style={{ marginRight: '4px' }} />
            Changelog
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
