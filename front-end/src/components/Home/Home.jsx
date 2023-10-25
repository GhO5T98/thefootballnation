import React from "react";
import Hero from "../Hero/Hero";
import HomeNews from "../HomeNews/HomeNews";
import Footer from "../Footer/Footer";
import "./home.scss"

const Home = () => {
  return (
    <>
      <Hero />
      <HomeNews />
      <Footer/>
    </>
  );
};

export default Home;
