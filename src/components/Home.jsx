import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [brands, setBrands] = useState([]);

  // Get all restaurant categories
  const getAllBrands = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/brand/get-brand");
      console.log("Received data:", data);

      setBrands(data.brand); // Update the state with the "brand" array
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
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
            <div
              key={brand._id}
              className="card m-2"
              style={{
                width: "18rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "1.5rem" }}>
                  {brand.name}
                </h5>
                <p className="card-text" style={{ fontSize: "1.2rem" }}>
                  <strong>Address:</strong> {brand.address}
                </p>
                <p className="card-text" style={{ fontSize: "1.2rem" }}>
                  <strong>Contact:</strong> {brand.contact}
                </p>
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${brand._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBrand(brand._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
