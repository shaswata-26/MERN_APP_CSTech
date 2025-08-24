import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getLists, uploadList } from '../utils/api';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await getLists();
      setLists(response.data);
    } catch (error) {
      toast.error('Failed to fetch lists');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      await uploadList(formData);
      toast.success('List uploaded and distributed successfully');
      setShowModal(false);
      setSelectedFile(null);
      fetchLists();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload list');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lists Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Upload List
        </button>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {lists.length === 0 ? (
                <p className="text-center">No lists found</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Filename</th>
                        <th>Total Items</th>
                        <th>Uploaded By</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lists.map(list => (
                        <tr key={list._id}>
                          <td>{list.originalName}</td>
                          <td>{list.totalItems}</td>
                          <td>{list.uploadedBy?.name}</td>
                          <td>{new Date(list.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-info btn-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload List Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload List</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Select File (CSV, XLSX, XLS)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      required
                    />
                    <div className="form-text">
                      File should contain columns: FirstName, Phone, Notes
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Upload List'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;