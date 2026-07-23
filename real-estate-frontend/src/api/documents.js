import api from './axios';

export const getDocuments = (bookingId) => api.get(`/bookings/${bookingId}/documents`);

export const uploadDocument = (bookingId, docType, file) => {
  const formData = new FormData();
  formData.append('doc_type', docType);
  formData.append('file', file);

  return api.post(`/bookings/${bookingId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteDocument = (documentId) => api.delete(`/documents/${documentId}`);