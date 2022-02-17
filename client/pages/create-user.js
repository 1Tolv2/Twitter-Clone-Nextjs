import React from "react";
import AlternativeLayout from "../components/AlternativeLayout";

export default function CreateUser({ children }) {
  return <AlternativeLayout>LoginPage{children}</AlternativeLayout>;
}
