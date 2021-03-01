import React, { useState, useEffect } from 'react';
import News from './News';
import './index.css';

const App = () => {
   const [news, setNews] = useState([]);
   const [noOfNews, setNoOfNews] = useState(5);

   const getNews = async() => {
      const res = await fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=a1587530f84d42d2a9cc34a6b790a95d');
      const news = await res.json();
      setNews(news.articles);
   }

   const getMoreNews = (e) => {
      setNoOfNews(noOfNews + 5);
   }

   const filterNews = (sourceName) => {
      setNews((allNews) => {
         let newNews = allNews.filter((eachNews) => eachNews.source.name === sourceName)
         return newNews;
      });
   }

   useEffect(() => {
      getNews();
   }, [noOfNews]);

   return (
      <>
         <div className="widget-body">
            <header className="widget-header">
               <h1>News</h1>
               <select name="source" id="news-filter" defaultValue="Filter By Source">
                  <option value="null">Filter By Source</option>
                  {
                     news.map(singleSource => {
                       {
                        const {source} = singleSource;
                        return (<option className="news-src" value={source.name} onClick={() => filterNews(source.name)}>{source.name}</option>)
                        }
                     })
                  }
               </select>
            </header>
            <div className="widget-section">
               {
                  news.slice(0, noOfNews).map((singleNews, index) => {
                     const {title, publishedAt, source, url} = singleNews;

                     return <News title={title} publishedAt={publishedAt} source={source} url={url} id={index} />
                  })
               }
               
            </div>
            <div className="show-more-btn">
               <button type="button" onClick={getMoreNews}>Show More</button>
            </div>
         </div>
      </>
   )

}

export default App;