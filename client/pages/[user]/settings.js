import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "../../components/Grid";
import Messageboard from "../../components/Messageboard";
import NavigationBar from "../../components/NavigationBar";
import SideSection from "../../components/SideSection";

const StyledWrapper = styled.div`
  width: 80%;
  margin: auto;
  outline: 2px blue solid;
  header {
    outline: 2px red solid;
  }
`;

export default function Home() {
  function callAPI() {
    fetch("http://localhost:9000/", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  useEffect(() => {
    callAPI();
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <header>
          <h1>User-settings</h1>
        </header>
        <Grid>
          <NavigationBar />
          <Messageboard />
          <SideSection />
        </Grid>
      </StyledWrapper>
    </div>
  );
}
