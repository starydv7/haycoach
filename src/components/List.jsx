import React, { useState } from 'react';
import axios from 'axios';

const List = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/api/v1/brand/create-brand', formData)
      .then((response) => {
        console.log('Brand created:', response.data);
        // You can add further handling here, such as showing a success message to the user.
      })
      .catch((error) => {
        console.error('Error creating brand:', error);
        // Handle errors here, e.g., show an error message to the user.
      });
  };

  return (
    <div>
      <h1>Create New Restrurent</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Brand</button>
      </form>
    </div>
  );
};

export default List;
