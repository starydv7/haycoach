import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Modal from "./Modal"; // Import the Modal component

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [editBrand, setEditBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get all restaurant categories
  const getAllBrands = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/brand/get-brand");
      setBrands(data.brand);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Handle opening the modal for editing
  const handleEditClick = (brand) => {
    setEditBrand(brand); // Store the brand being edited
    setShowModal(true); // Open the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setEditBrand(null); // Clear the brand being edited
    setShowModal(false); // Close the modal
  };
// Delete a restaurant category by its ID
const deleteBrand = async (brandId) => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/brand/delete-brand/${brandId}`);
    toast.success("Category Deleted Successfully");
    // After deleting, fetch the updated list of restaurant categories
    getAllBrands();
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete category");
  }
};
  // Handle editing the brand data
  const handleEditBrand = async (brandId, updatedData) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/brand/update-brand/${brandId}`, updatedData);
      toast.success("Category Updated Successfully");
      setShowModal(false); // Close the modal after editing
      getAllBrands(); // Update the brand list
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="row dashboard">
      <Navbar />
      <div className="col-md-3"></div>
      <div className="col-md-9">
        <h1 className="text-center">All Restaurant Categories</h1>
        <div className="d-flex flex-wrap">
          {brands?.map((brand) => (
            <div key={brand._id} className="card m-2">
              <div className="card-body">
                <h5 className="card-title">{brand.name}</h5>
                <p className="card-text"><strong>Address:</strong> {brand.address}</p>
                <p className="card-text"><strong>Contact:</strong> {brand.contact}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => handleEditClick(brand)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteBrand(brand._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="modal-content">
          <h3>Edit Brand Information</h3>
          {editBrand && (
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={editBrand.name}
                  onChange={(e) => setEditBrand({ ...editBrand, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={editBrand.address}
                  onChange={(e) => setEditBrand({ ...editBrand, address: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  value={editBrand.contact}
                  onChange={(e) => setEditBrand({ ...editBrand, contact: e.target.value })}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEditBrand(editBrand._id, editBrand)}
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;
