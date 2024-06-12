import React from 'react';
import "./Header.scss";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <header className='header text-black'>
      <div className='container'>
        <div className='header-cnt'>
          <div className='header-cnt-top fs-13 py-2 flex align-center justify-between'>
            <div className='header-cnt-top-l'>
              <ul className='flex top-links align-center'>
                
                <li className='flex align-center'>
                  <span className='fs-13'>Nurhussein första React Web  ...  Följ oss</span>
                  <ul className='social-links flex align-center'>
                    <li className='mx-2'>
                      <a href = "https://www.facebook.com/nurhussein2003/" className='fs-15'>
                        <i className='fab fa-facebook'></i>
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href = "https://www.instagram.com/nurhussein2003/" className='fs-15'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                    <li>
                  <a href="https://github.com/nurhussein2024" className="fs-15">
                   <i className="fab fa-github"></i>
                   </a>
                    </li>

                  </ul>
                </li>
              </ul>
            </div>
           
          </div>

          <div className='header-cnt-bottom'>
            <Navbar />
            
            
          </div>
        </div>
      </div>
    </header>
  )  
}

export default Header