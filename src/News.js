import React from 'react';

const News = (props) => {
   // const tag = Object.values(props.source);  

   //testing
   // console.log(tag);

   //formatting date
   // const date = props.publishedAt.split('T');

   return (
      <>
         <ul className="news-list">
            <li className="news" key={props.id}>
               <a href={props.url} target="-blank"><h2>{props.title}</h2></a>
               <div className="news-bottom">
                  <p className="date">{props.publishedAt}</p>
                  <p className="tag">{props.source}</p>
               </div>
            </li>
         </ul>
      </>
   )
}

export default News;