import React from "react";
import Layout from "../components/Layout";
import AlternativeLayout from "../components/AlternativeLayout";

export default function Login({ children }) {
  return <AlternativeLayout>LoginPage{children}</AlternativeLayout>;
}
