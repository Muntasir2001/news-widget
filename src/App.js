import React, { useState, useEffect } from 'react';
import News from './News';
import './index.css';

const App = () => {
   const [news, setNews] = useState([]);
   const [noOfNews, setNoOfNews] = useState(5);
   const [newsSrc, setNewsSrc] = useState([]);
   const [counter, setCounter] = useState(0);
   
   const getMoreNews = () => {
      setNoOfNews(noOfNews + 5);
   }
   
   const filterNews = (e) => {
      const filterValue = e.target.value;
      
      setNews((allNews) => {
         let newNews = allNews.filter((eachNews) => eachNews.source.name === filterValue);
         return newNews;
      });
   }

   useEffect(() => {
       const getNews = async() => {
         const res = await fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=78b727643ffb437bb2545980643628b4');
         const news = await res.json();
         setNews(news.articles);
         setCounter(counter + 1);
      }
      getNews();

      const setFilterItems = () => {
      let tempItemList = [];
         setNewsSrc(() => {
            news.forEach(singleSource => {
               const {source} = singleSource;
      
               if (tempItemList.indexOf(source.name) === -1) {
                  tempItemList.push(source.name);
               }
            });

            return tempItemList;
         });
      };

      if (counter === 1) {
         setFilterItems();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [noOfNews]);

   return (
      <>
         <div className="widget-body">
            <header className="widget-header">
               <h1>News</h1>
               <select name="source" id="news-filter" defaultValue="Filter By Source" placeholder="Filter by source" onChange={filterNews}>
                  <option value="Filter by Source">Filter By Source</option>
                  {
                     newsSrc.map(singleSource => {
                        return (<option className="news-src" value={singleSource}>{singleSource}</option>)
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