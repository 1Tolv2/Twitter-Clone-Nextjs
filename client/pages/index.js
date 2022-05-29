import React, { useEffect, useState, createContext } from "react";
import MainLayout from "../components/layouts/mainLayout";
import { getUserList } from "../components/API";
import BottomNavigationBar from "../components/organisms/BottomNavBar/index";
import Header from "../components/organisms/Header.jsx";
import MessageBoard from "../components/organisms/MessageBoard";
import MessageModal from "../components/organisms/MessageModal";
import SideSection from "../components/organisms/SideSection";
import EditModal from "../components/organisms/EditModal";

export default function Home() {
  const [userList, setUserList] = useState(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    getUserList(setUserList);
  }, []);
  return (
    <>
      <Header></Header>
      <MainLayout>
        <MessageModal></MessageModal>
        {editModal && (
          <EditModal modal={{ editModal, setEditModal }}></EditModal>
        )}
        {userList && <MessageBoard userList={userList} />}
        <SideSection modal={{ editModal, setEditModal }}></SideSection>
      </MainLayout>
      <BottomNavigationBar />
    </>
  );
}
