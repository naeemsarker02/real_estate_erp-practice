import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/projects';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setError('Project লোড করতে সমস্যা হয়েছে।'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <p className="text-gray-600 text-sm">{project.location}</p>
            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {project.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}