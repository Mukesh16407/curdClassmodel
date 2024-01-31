import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditClass } from "./EditClass";
export const Class = () => {
  const [classData, setClassData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [EditedObject, setEditedObject] = useState("");
  const [formData, setFormData] = useState({
    rollno: "",
    firstname: "",
    lastname: "",
    dateOfJoining: "",
  });
  console.log(EditedObject, "EditedObject");
  useEffect(() => {
    getDataFromServer();
  }, []);

  const getDataFromServer = () => {
    axios.get("http://localhost:3001/class").then(({ data }) => {
      setClassData(data);
    });
  };
  const getPostInServer = (formData) => {
    axios.post("http://localhost:3001/class", formData).then(({ data }) => {
      getDataFromServer();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/class/${id}`).then((data) => {
      getDataFromServer();
      //console.log("suceesfully Delete");
    });
    const filterData = classData.filter((item) => item.id !== id);
    setClassData(filterData);
  };

  const handleEdit = (id) => {
    setIsEdit(true);

    const findActualObject = classData.find((item) => item.id === id);
    setEditedObject(findActualObject);
  };

  const handleUpdate = (data) => {
    if (isEdit) {
      axios
        .put(`http://localhost:3001/class/${EditedObject.id}`, {
          rollno: data.rollno,
          firstname: data.firstname,
          lastname: data.lastname,
          dateOfJoining: data.dateOfJoining,
        })
        .then(() => {
          getDataFromServer();
          setEditedObject("");
          setIsEdit(false);
          setFormData({
            // Reset formData to empty state
            rollno: "",
            firstname: "",
            lastname: "",
            dateOfJoining: "",
          });
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      getPostInServer(data);
      setFormData({
        // Reset formData to empty state after posting
        rollno: "",
        firstname: "",
        lastname: "",
        dateOfJoining: "",
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <h4>Id</h4>
        <h4>Roll No</h4>
        <h4>First Name</h4>
        <h4>Last Name</h4>
        <h4>Date Of Joining</h4>
      </div>
      {classData &&
        classData.map((data) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "70%",
                  marginLeft: "0px",
                }}
              >
                <p>{data.id}</p>
                <p>{data.rollno}</p>
                <p>{data.firstname}</p>
                <p>{data.lastname}</p>
                <p>{data.dateOfJoining}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(data.id)}>Edit</button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      <EditClass
        handleUpdate={handleUpdate}
        EditedObject={EditedObject}
        isEdit={isEdit}
        setFormData={setFormData}
        formData={formData}
      />
    </div>
  );
};
