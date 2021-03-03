import React, { useState, useEffect } from "react";
import News from "./News";
import "./index.css";

const NEWS_COUNTER = 5;
const API_URL = "https://newsapi.org/v2/top-headlines?country=gb&apiKey=78b727643ffb437bb2545980643628b4";

const App = () => {
   const [news, setNews] = useState([]);
   const [noOfNews, setNoOfNews] = useState(NEWS_COUNTER);
   const [newsSrc, setNewsSrc] = useState([]);

   const getMoreNews = () => {
      setNoOfNews(noOfNews + NEWS_COUNTER);
   };

   const filterNews = (e) => {
      const filterValue = e.target.value;
      getNews()
         .then(() =>
            setNews((allNews) => {
            return allNews.filter(eachNews => eachNews.source.name === filterValue);
            })
         );
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
               defaultValue="Filter By Source"
               placeholder="Filter by source"
               onChange={filterNews}
            >
               <option value="Filter by Source">Filter By Source</option>
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

               return (
               <News
                  title={title}
                  publishedAt={publishedAt}
                  source={source}
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
