import React, { useState, useEffect } from "react";
import News from "./News";
import "./index.css";

const NEWS_COUNTER = 5;
// const API_URL = "https://newsapi.org/v2/top-headlines?country=gb&apiKey=78b727643ffb437bb2545980643628b4"; //News API
const API_URL = "https://run.mocky.io/v3/eb8b1494-46dc-4d02-8f14-670d918210e7"; // Mock API

const App = () => {
   const [news, setNews] = useState([]);
   const [noOfNews, setNoOfNews] = useState(NEWS_COUNTER);
   const [newsSrc, setNewsSrc] = useState([]);

   const getMoreNews = () => {
      setNoOfNews(noOfNews + NEWS_COUNTER);
   };

   const filterNews = (e) => {
      const filterValue = e.target.value;

      if (e.target.value !== 'Filter by Source') {
         getNews()
            .then(() =>
               setNews((allNews) => {
               return allNews.filter(eachNews => eachNews.source.name === filterValue);
               })
            );
      } else {
         getNews()
            .then((news) => setNews(news))
      }
   };

   const getNews = async () => {
      const res = await fetch(API_URL);
      const news = await res.json();
      setNews(news.articles);
      return news.articles;
   };

   useEffect(() => {
      const getAllNews = async () => {
         const newsRequested = await getNews();

         if (newsSrc.length === 0) {
            const newsSources = new Set();

            setNewsSrc(() => {
               newsRequested.forEach((singleSource) => {
                  const { source } = singleSource;
                  newsSources.add(source.name);
               });

               return [...newsSources];
            });
         }
      };

      getAllNews();
   }, [newsSrc, noOfNews]);

   return (
      <>
         <div className="widget-body">
         <header className="widget-header">
            <h1>News</h1>
            <select
               name="source"
               id="news-filter"
               onChange={filterNews}
            >
               <option value="Filter by Source">Filter by Source</option>
               {newsSrc.map((singleSource) => {
               return (
                  <option className="news-src" value={singleSource}>
                     {singleSource}
                  </option>
                  );
               })}
            </select>
         </header>
         <div className="widget-section">
            {news.slice(0, noOfNews).map((singleNews, index) => {
               const { title, publishedAt, source, url } = singleNews;

               const date = publishedAt.split('T');

               const tag = Object.values(source);
               console.log(tag[1]);

               return (
               <News
                  title={title}
                  publishedAt={date[0]}
                  source={tag[1]}
                  url={url}
                  id={index}
               />
               );
            })}
         </div>
         <div className="show-more-btn">
            <button type="button" onClick={getMoreNews}>
               Show More
            </button>
         </div>
         </div>
      </>
   );
};

export default App;
