import { ErrorMessage, Field, Form, Formik } from "formik";
import "./CreationFrom.css";
import * as Yup from "yup";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid Email format")
    .required("Email is required"),
  age: Yup.number()
    .positive("age must be greater than 0")
    .integer("Age must be an integer")
    .required("Age is required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
});

const CreationFrom = () => {
  const { setUserFormState, userFormInitialValues } = useContext(UserContext);
  const formInitalValues = {
    name: "",
    email: "",
    password: "",
    age: 0,
  };
  const [initalValues, setInitalValues] = useState(formInitalValues);
  useEffect(() => {
    if (userFormInitialValues) {
      alert("initalvalueschange");
      const newUserFormInitialValues = { ...userFormInitialValues };
      console.log("userInitialValuesbefore", userFormInitialValues);
      delete newUserFormInitialValues._id;
      delete newUserFormInitialValues.__v;
      console.log("userInitialValuesafter", userFormInitialValues);

      setInitalValues(newUserFormInitialValues);
    }
  }, [userFormInitialValues]);

  const handleSubmit = (values) => {
    setUserFormState({ ...values });
  };

  return (
    <>
      <Formik
        initialValues={initalValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name"></Field>
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}></ErrorMessage>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email"></Field>
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}></ErrorMessage>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password"></Field>
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red" }}></ErrorMessage>
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <Field name="age" id="age" type="number"></Field>
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}></ErrorMessage>
          </div>
          <button type="submit"> Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default CreationFrom;
