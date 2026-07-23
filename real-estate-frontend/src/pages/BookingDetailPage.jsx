import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooking } from '../api/bookings';
import { getDocuments, uploadDocument, deleteDocument } from '../api/documents';

export default function BookingDetailPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [docType, setDocType] = useState('NID');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBooking();
    loadDocuments();
  }, [id]);

  const loadBooking = async () => {
    const res = await getBooking(id);
    setBooking(res.data);
  };

  const loadDocuments = async () => {
    const res = await getDocuments(id);
    setDocuments(res.data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('একটা ফাইল সিলেক্ট করো।');
      return;
    }
    setError('');
    setUploading(true);
    try {
      await uploadDocument(id, docType, file);
      setFile(null);
      e.target.reset();
      loadDocuments();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload ব্যর্থ হয়েছে।');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId) => {
    await deleteDocument(documentId);
    loadDocuments();
  };

  if (!booking) return <p className="p-8">Loading...</p>;

  const fileBaseUrl = 'http://127.0.0.1:8000/storage/';

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Booking #{booking.id}</h1>
      <p className="text-gray-600 mb-6">
        {booking.unit?.unit_number} — {booking.unit?.project?.name} — Status: {booking.status}
      </p>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Documents</h2>

        {documents.length === 0 && (
          <p className="text-sm text-gray-500">কোনো document upload করা হয়নি এখনো।</p>
        )}

        <ul className="space-y-2 mb-4">
          {documents.map((doc) => {
            const fileUrl = fileBaseUrl + doc.file_path;
            return (
              <li key={doc.id} className="flex justify-between items-center text-sm border-b pb-2">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {doc.doc_type}
                </a>
                <button onClick={() => handleDelete(doc.id)} className="text-red-500 text-xs">
                  Delete
                </button>
              </li>
            );
          })}
        </ul>

        <form onSubmit={handleUpload} className="flex flex-col gap-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <select value={docType} onChange={(e) => setDocType(e.target.value)} className="border p-2 rounded">
            <option value="NID">NID</option>
            <option value="Booking Document">Booking Document</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>
    </div>
  );
}