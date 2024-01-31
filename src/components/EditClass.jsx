import React, { useState } from "react";

export const EditClass = ({ handleEdit, EditedObject }) => {
  const [formData, setFormData] = useState({
    rollNo: EditedObject?.rollno,
    firstName: EditedObject?.firstname,
    lastName: EditedObject?.lastname,
    dateOfJoining: EditedObject?.dateOfJoining,
  });
  console.log(formData);
  const handleEditText = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(formData);
  };
  return (
    <div>
      <input
        name="rollNo"
        value={formData.rollNo}
        placeholder="Roll No"
        onChange={handleEditText}
      />
      <input
        name="firstName"
        value={formData.firstName}
        placeholder="First Name"
        onChange={handleEditText}
      />
      <input
        name="lastName"
        value={formData.lastName}
        placeholder="Last Name"
        onChange={handleEditText}
      />
      <input
        name="dateOfJoining"
        value={formData.dateOfJoining}
        placeholder="Data of joining"
        onChange={handleEditText}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
