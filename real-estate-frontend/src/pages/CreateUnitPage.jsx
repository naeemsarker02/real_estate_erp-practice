import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUnit } from '../api/units';
import { getProjects } from '../api/projects';

export default function CreateUnitPage() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    project_id: '',
    unit_number: '',
    floor: '',
    size: '',
    bedroom: '',
    bathroom: '',
    price: '',
    status: 'available',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createUnit({
        ...formData,
        project_id: Number(formData.project_id),
        floor: Number(formData.floor),
        size: Number(formData.size),
        bedroom: Number(formData.bedroom),
        bathroom: Number(formData.bathroom),
        price: Number(formData.price),
      });
      navigate('/units');
    } catch (err) {
      const message = err.response?.data?.message || 'Unit তৈরি করতে সমস্যা হয়েছে।';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Unit</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Project</label>
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit Number</label>
          <input
            name="unit_number"
            value={formData.unit_number}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Floor</label>
            <input
              name="floor"
              type="number"
              value={formData.floor}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Size (sqft)</label>
            <input
              name="size"
              type="number"
              value={formData.size}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bedroom</label>
            <input
              name="bedroom"
              type="number"
              value={formData.bedroom}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bathroom</label>
            <input
              name="bathroom"
              type="number"
              value={formData.bathroom}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (৳)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
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
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? 'Creating...' : 'Create Unit'}
        </button>
      </form>
    </div>
  );
}