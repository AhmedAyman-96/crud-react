import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userForm, setUserForm] = useState(null);
  const [enableEditForm, setEnableEditForm] = useState(false);
  const [userFormInitialValues, setUserFormInitialValues] = useState(null);

  const setUserFormState = (user) => {
    setUserForm(user);
  };

  return (
    <UserContext.Provider
      value={{
        userForm,
        setUserFormState,
        enableEditForm,
        setEnableEditForm,
        userFormInitialValues,
        setUserFormInitialValues,
      }}>
      {children}
    </UserContext.Provider>
  );
};
