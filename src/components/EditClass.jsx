import React, { useEffect, useState } from "react";

export const EditClass = ({
  handleUpdate,
  EditedObject,
  isEdit,
  setFormData,
  formData,
}) => {
  const handleEditText = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (isEdit) {
      setFormData({
        rollno: EditedObject?.rollno || "",
        firstname: EditedObject?.firstname || "",
        lastname: EditedObject?.lastname || "",
        dateOfJoining: EditedObject?.dateOfJoining || "",
      });
    } else {
      setFormData({
        rollno: "",
        firstname: "",
        lastname: "",
        dateOfJoining: "",
      });
    }
  }, [EditedObject, isEdit]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };
  return (
    <div>
      <input
        name="rollno"
        value={formData.rollno}
        placeholder="Roll No"
        onChange={handleEditText}
      />
      <input
        name="firstname"
        value={formData.firstname}
        placeholder="First Name"
        onChange={handleEditText}
      />
      <input
        name="lastname"
        value={formData.lastname}
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
