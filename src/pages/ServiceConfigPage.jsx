import React, { useState } from 'react'
import { Settings, Plus, Trash2, Edit2 } from 'lucide-react'

const mockServices = [
  {
    id: '1',
    name: 'payment-service',
    description: 'Payment processing service',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'user-service',
    description: 'User management and authentication',
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    name: 'analytics-service',
    description: 'Data analytics and reporting',
    createdAt: '2024-01-08T09:15:00Z'
  }
]

const ServiceConfigPage = () => {
  const [services, setServices] = useState(mockServices)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ))
      setEditingService(null)
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      setServices([...services, newService])
    }
    
    setFormData({ name: '', description: '' })
    setShowAddForm(false)
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description
    })
    setShowAddForm(true)
  }

  const handleDelete = (serviceId) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Services</h1>
        
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingService(null)
            setFormData({ name: '', description: '' })
          }}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '0.5rem' }}>
                Service Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., payment-service"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '0.5rem' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the service"
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingService ? 'Update' : 'Create'} Service
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingService(null)
                  setFormData({ name: '', description: '' })
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="service-list">
        {services.map(service => (
          <div key={service.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Settings size={16} style={{ color: '#666' }} />
                  {service.name}
                </h3>
                <p style={{ color: '#ccc', margin: '0 0 1rem 0' }}>
                  {service.description}
                </p>
                <div style={{ fontSize: '0.875rem', color: '#999' }}>
                  Created: {formatDate(service.createdAt)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(service)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem' }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Settings size={48} style={{ color: '#666', marginBottom: '1rem' }} />
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>No services configured</h3>
            <p style={{ color: '#999', marginBottom: '1rem' }}>
              Add your first service to start monitoring alerts and deployments.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              Add Your First Service
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceConfigPage
