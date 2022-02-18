import React from "react";
import Head from "next/head";

import styled from "styled-components";
import Grid from "../components/Grid";
import MainSection from "../components/MainSection";
// import NavigationBar from "../components/NavigationBar";
import SideSection from "../components/SideSection";

const StyledWrapper = styled.div`
  padding: 20px 0;
  width: 80%;
  max-width: 900px;
  height: 100%;
  margin: auto;
  background-color: white;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <Grid>
          {/* <NavigationBar /> */}
          <MainSection>{children}</MainSection>
          <SideSection />
        </Grid>
      </StyledWrapper>
    </>
  );
}
