import React, { useEffect, useState } from "react";
import "./User.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Edit_User({ editUserAddModal, setEditUserAddModal, updateData }) {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: updateData,
  });

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
    console.log(data);
    axios
      .put("http://localhost:3001/user/updateByUserId/" + updateData._id, data)
      .then((response) => {
        if (response.data.success) {
          console.log("Data Updated Success");
          setEditUserAddModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    reset(updateData);
  }, [updateData, reset]);

  return (
    <>
      <Modal show={editUserAddModal} onHide={() => setEditUserAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="editUser" onSubmit={handleSubmit(onSubmit)}>
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
            onClick={() => setEditUserAddModal(false)}
          >
            Close
          </Button>
          <Button form="editUser" variant="primary" type="submit">
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit_User;
