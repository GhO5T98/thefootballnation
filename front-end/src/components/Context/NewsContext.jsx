import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const NewsContext = createContext();

// Create the data provider component
export const NewsProvider = ({ children }) => {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    // Fetch the data and update the state
    const fetchData = async () => {
        await axios
          .get("http://localhost:5000/getNews")
          .then((res) => {
            setAllNews(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
  }, []);

  return (
    <NewsContext.Provider value={allNews}>
      {children}
    </NewsContext.Provider>
  );
};