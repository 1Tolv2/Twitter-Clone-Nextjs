import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserList } from "../../components/API";
import MainLayout from "../../components/layouts/mainLayout";
import Header from "../../components/organisms/Header.jsx";
import MessageBoard from "../../components/organisms/MessageBoard";
import SideSection from "../../components/organisms/SideSection";
import EditModal from "../../components/organisms/EditModal";
import ProfileModule from "../../components/organisms/ProfileModule";
import BottomNavigationBar from "../../components/organisms/BottomNavBar";

export default function index() {
  const router = useRouter();
  const [userList, setUserList] = useState(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (router.query.user) {
      getUserList(setUserList);
    }
  }, [router.query.user]);
  return (
    <>
      <Header></Header>
      <MainLayout>
        {editModal && (
          <EditModal modal={{ editModal, setEditModal }}></EditModal>
        )}
        {userList && (
          <MessageBoard userList={userList} modal={{ editModal, setEditModal }}>
            <ProfileModule data={userList} />
          </MessageBoard>
        )}
        <SideSection modal={{ editModal, setEditModal }}></SideSection>
      </MainLayout>
      <BottomNavigationBar />
    </>
  );
}
