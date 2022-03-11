import React, { useEffect, useState, createContext } from "react";
import MainLayout from "../components/layouts/mainLayout";
import { getUserList, getUserData } from "../components/API";
import BottomNavigationBar from "../components/organisms/BottomNavBar/index";
import Header from "../components/organisms/Header.jsx";
import MessageBoard from "../components/organisms/MessageBoard";

const UserContext = createContext();

export default function Home() {
  const [userList, setUserList] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserList(setUserList);
    getUserData(setUserData);
  }, []);
  return (
    <>
      <Header></Header>
      <UserContext.Provider value={{ userData, setUserData }}>
        <MainLayout>
          {userList && <MessageBoard userList={userList} />}
          <BottomNavigationBar />
        </MainLayout>
      </UserContext.Provider>
    </>
  );
}

export { UserContext };
