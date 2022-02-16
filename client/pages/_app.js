import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log("passerar alltid mig");
  return <Component {...pageProps} />;
}

export default MyApp;
