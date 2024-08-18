import "./Home.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ListComponent from "../../components/List/ListComponent";
import { Button, Flex } from "antd";
import axios from "axios";
import CreationFrom from "../../components/creationForm/CreationForm";
import { UserContext } from "../../context/userContext";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const { userForm, enableEditForm, userFormInitialValues } =
    useContext(UserContext);
  useEffect(() => {
    axios.get("http://localhost:5050/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  useEffect(() => {
    if (userForm) {
      userSubmitHandler();
    }
  }, [userForm]);

  const AddUserHandler = () => {
    setAddUser(!addUser);
  };
  const RemoveUserHandler = () => {
    const newUsers = [...users];
    newUsers.pop();
    setUsers(newUsers);
  };

  const userSubmitHandler = () => {
    if (enableEditForm) {
      console.log(userFormInitialValues);
      const id = userFormInitialValues._id;
      // update
      axios
        .put(`http://localhost:5050/users/${id}`, userForm)
        .then((resp) => {});
    } else {
      // insert
      axios.post("http://localhost:5050/users", userForm).then((resp) => {});
    }
  };
  return (
    <>
      <h1>Home Page</h1>
      <Link to={"/about"}>Go to About</Link>
      <ListComponent data={users}></ListComponent>
      <Flex gap="small" wrap>
        <Button onClick={AddUserHandler} type="primary">
          Add User
        </Button>
        <Button onClick={RemoveUserHandler} type="primary" danger>
          Remove User
        </Button>
      </Flex>
      {addUser || enableEditForm ? <CreationFrom></CreationFrom> : ""}
    </>
  );
};

export default Home;
