import React from 'react';
import "./Loader.scss";
import {loader} from "../../utils/images";
// jag har gjort en loader som är en div som har en bild jag hämta den från en gratis hamsida för loader bilder  
const Loader = () => {
  return (
    <div className='container'>
      <div className='loader flex justify-center align-center'>
        <img src = {loader} alt = "" />
      </div>
    </div>
  )
}

export default Loader
