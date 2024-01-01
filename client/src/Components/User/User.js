import React, { useEffect, useState } from "react";
import "./User.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Edit_User from "./Edit_User";
const User = () => {
  //States
  const [showUserAddModal, setShowUserAddModal] = useState(false);
  const [editUserAddModal, setEditUserAddModal] = useState(false);

  const [userList, setuserList] = useState([]);
  const [updateData, setupdateData] = useState([]);

  //use Form Hook
  const { register, control, handleSubmit, reset } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_URL}/addUser`, data)
      .then((response) => {
        if (response.data.success) {
          reset();
          setShowUserAddModal(false);
          HandlegetUserList();
        } else {
          setShowUserAddModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandlegetUserList = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/getUserList`)
      .then((response) => {
        if (response.data.success) {
          setuserList(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleDeleteUser = (id) => {
    let confirm = window.confirm("Are you want to sure");
    if (confirm) {
      axios
        .delete(`${process.env.REACT_APP_URL}/deleteUserById/` + id)
        .then((response) => {
          if (response.data.success) {
            HandlegetUserList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const HandleUpdateUser = (id) => {
    setEditUserAddModal(true);
    axios
      .get(`${process.env.REACT_APP_URL}/getUserById/` + id)
      .then((response) => {
        if (response.data.success) {
          setupdateData(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    HandlegetUserList();
  }, []);

  return (
    <>
      <Edit_User
        setEditUserAddModal={setEditUserAddModal}
        editUserAddModal={editUserAddModal}
        updateData={updateData}
      />
      <div className="User">
        <h4 className="text-center">User List</h4>
        {/* <button onClick={handleAdd}>Add New</button> */}
        <div className="addUser">
          <Button variant="primary" onClick={() => setShowUserAddModal(true)}>
            Add Employee
          </Button>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.first_name}</td>
                  <td>{item?.last_name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.address}</td>
                  <td>
                    <i
                      className="fa-regular fa-pen-to-square"
                      style={{ marginRight: "10px" }}
                      onClick={() => HandleUpdateUser(item?._id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => HandleDeleteUser(item?._id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Start  Add User Popup */}

        <Modal
          show={showUserAddModal}
          onHide={() => setShowUserAddModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="addUser" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    {...register("first_name")}
                    type="text"
                    placeholder="Enter First Name"
                  />
                </Form.Group>
              </div>

              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    {...register("last_name")}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
              </div>

              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    {...register("email")}
                    type="email"
                    placeholder="Enter Email"
                  />
                </Form.Group>
              </div>

              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    {...register("phone")}
                    type="number"
                    placeholder="Enter Phone"
                  />
                </Form.Group>
              </div>

              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>DOB</Form.Label>
                  <Form.Control {...register("dob")} type="date" />
                </Form.Group>
              </div>

              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    {...register("address")}
                    as="textarea"
                    placeholder="Enter Your Address Here"
                    style={{ height: "100px" }}
                  />
                </Form.Group>
              </div>

              <div>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Degree</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        {...register(`education.${index}.degree`)}
                      >
                        <option value="B.Tech">B.Tech</option>
                        <option value="BCA">BCA</option>
                        <option value="Diploma">Diploma</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="MCA">MCA</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>College</Form.Label>
                      <Form.Control
                        {...register(`education.${index}.college`)}
                        type="text"
                        placeholder="Enter College"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Start Year</Form.Label>
                      <Form.Control
                        {...register(`education.${index}.startyear`)}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>End Year</Form.Label>
                      <Form.Control
                        {...register(`education.${index}.endyear`)}
                        type="date"
                      />
                    </Form.Group>

                    <Button
                      className="my-2"
                      variant="danger"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button variant="success" onClick={() => append({})}>
                  Add Education
                </Button>
              </div>

              <div className="mt-3">
                {experienceFields?.map((experience, index) => (
                  <div key={experience.id}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Company Name</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        {...register(`experience.${index}.name`)}
                      >
                        <option value="Company 1">Company 1</option>
                        <option value="Company 2">Company 2</option>
                        <option value="Company 3">Company 3</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Start From</Form.Label>
                      <Form.Control
                        {...register(`experience.${index}.start`)}
                        type="date"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Last Day</Form.Label>
                      <Form.Control
                        {...register(`experience.${index}.end`)}
                        type="date"
                      />
                    </Form.Group>

                    <Button
                      className="my-2"
                      variant="danger"
                      onClick={() => removeExperience(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="success" onClick={() => appendExperience({})}>
                  Add Experience
                </Button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUserAddModal(false)}
            >
              Close
            </Button>
            <Button form="addUser" variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default User;
