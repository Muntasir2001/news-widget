import React from 'react';
import News from './News';
import './index.css';

const App = () => {

   return (
      <>
         <div className="widget-body">
            <header className="widget-header">
               <h1>News</h1>
               <select name="source" id="news-source">
                  <option value="null" disabled selected hidden>Filter By Source</option>
                  <option value="CNN">CNN</option>
                  <option value="BBC">BBC</option>
                  <option value="The Guardian">The Guardian </option>
               </select>
            </header>
            <div className="widget-section">
               <News />
            </div>
         </div>
      </>
   )

}

export default App;