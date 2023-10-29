import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
const Home = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/brand/get-brand");
      console.log("Received data:", data);
      setProducts(data.banners);
    } catch (error) {
        console.log(error);
        
      toast.error("Something Went Wrong");
    }
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/brand/delete-brand/${productId}`);
      toast.success("Product Deleted Successfully");
      // After deleting, fetch the updated list of products
      getAllProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
  
      <div className="row dashboard">
          <Navbar/>
        <div className="col-md-3">
        
        </div>
        <div className="col-md-9 ">
            
          <h1 className="text-center">Banner</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                 
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <div className="d-flex justify-content-between">
                  <Link to={`/edit/${p._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(p._id)}
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