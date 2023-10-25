import React from "react";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import Transfers from "./components/Transfers/Transfers";
import Home from "./components/Home/Home";
import About from "./components/AboutUs/About";
import Contact from "./components/ContactUs/Contact";
import Ucl from "./components/Competitions/Ucl";
import Bundesliga from "./components/Competitions/Bundesliga";
import Premierleague from "./components/Competitions/Premierleague";
import Seria from "./components/Competitions/Seria";
import Laliga from "./components/Competitions/Laliga";
import Ligue1 from "./components/Competitions/Ligue1";
import Signin from "./components/Auth/SignIn/Signin";
import Signup from "./components/Auth/SignUp/Signup";
import PassReset from "./components/Auth/SignIn/PassReset";
import LatestNews from "./components/LatestNews/LatestNews";
import NewsPage from "./components/News/NewsPage/NewsPage";
import MyNews from "./components/News/MyNews/MyNews";
import { NewsProvider } from "./components/Context/NewsContext";
import AddNews from "./components/News/AddNews/AddNews";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <NewsProvider>
              <Home />
            </NewsProvider>
          }
        />
        <Route
          path="/Transfers"
          element={
            <NewsProvider>
              <Transfers />
            </NewsProvider>
          }
        />
        <Route
          path="/LatestNews"
          element={
            <NewsProvider>
              <LatestNews />
            </NewsProvider>
          }
        />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/ContactUs" element={<Contact />} />
        <Route
          path="/Ucl"
          element={
            <NewsProvider>
              <Ucl />
            </NewsProvider>
          }
        />
        <Route
          path="/PremierLeague"
          element={
            <NewsProvider>
              <Premierleague />
            </NewsProvider>
          }
        />
        <Route
          path="/SeriaA"
          element={
            <NewsProvider>
              <Seria />
            </NewsProvider>
          }
        />
        <Route
          path="/LaLiga"
          element={
            <NewsProvider>
              <Laliga />
            </NewsProvider>
          }
        />
        <Route
          path="/Ligue1"
          element={
            <NewsProvider>
              <Ligue1 />
            </NewsProvider>
          }
        />
        <Route
          path="/Bundesliga" 
          element={
            <NewsProvider>
              <Bundesliga />
            </NewsProvider>
          }
        />
        <Route path="/SignIn" element={<Signin />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/PasswordReset" element={<PassReset />} />
        <Route
          path="/News/:id"
          element={
            <NewsProvider>
              <NewsPage />
            </NewsProvider>
          }
        />

        <Route path="/MyNews" element={<MyNews />} />
        <Route path="/AddNews" element={<AddNews />} />
      </Routes>
    </>
  );
};

export default App;
