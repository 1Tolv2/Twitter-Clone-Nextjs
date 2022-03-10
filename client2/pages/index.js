import React from "react";
import MainLayout from "../components/layouts/mainLayout";
import BottomNavigationBar from "../components/organisms/BottomNavBar/index";
import Header from "../components/organisms/Header.jsx";

export default function Home() {
  return (
    <>
      <Header></Header>
      <MainLayout>
        <BottomNavigationBar />
      </MainLayout>
    </>
  );
}
