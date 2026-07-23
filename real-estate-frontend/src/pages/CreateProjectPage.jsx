import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/projects';

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    total_units: '',
    status: 'planning',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createProject({ ...formData, total_units: Number(formData.total_units) });
      navigate('/projects');
    } catch (err) {
      const message = err.response?.data?.message || 'Project তৈরি করতে সমস্যা হয়েছে।';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total Units</label>
          <input
            name="total_units"
            type="number"
            value={formData.total_units}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="planning">Planning</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}