import "./List.css";
import { List, Card } from "antd";
import axios from "axios";

import { Button } from "antd";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
const ListComponent = (props) => {
  const { setEnableEditForm, setUserFormInitialValues } =
    useContext(UserContext);
  const removeUserHandler = (item) => {
    const value = confirm("are you sure to delete");
    if (value) {
      axios
        .delete(`http://localhost:5050/users/${item._id}`)
        .then((resp) => alert("user deleted"));
    }
  };

  const modifyUserHandler = (event, item) => {
    event.stopPropagation();
    setEnableEditForm(true);
    axios.get(`http://localhost:5050/users/${item._id}`).then((resp) => {
      setUserFormInitialValues(resp.data);
    });
  };

  return (
    <>
      <List
        grid={{
          gutter: 16,
          column: 2,
        }}
        dataSource={props.data}
        renderItem={(item) => (
          <List.Item style={{ display: "flex", margin: "1rem" }}>
            <Card
              style={{ width: "fit-content" }}
              onClick={() => removeUserHandler(item)}>
              {item.name}{" "}
              <Button
                onClick={(e) => modifyUserHandler(e, item)}
                type="primary">
                Modify User
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListComponent;
