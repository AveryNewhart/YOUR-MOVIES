import React from 'react'
// import Navigation from "../components/Nav.js";
import ThePic from "../images/movietheatre.png";
import "../styles/App.css"
import "../styles/Homepage.css"
 
export default function Welcome() {
  return (
    <div className='make-big'>
      <img className='thePic' src={ ThePic } alt='' />
      <div className='theTitle'>
        <h1>YOUR MOVIES</h1>
      </div>
      <div className='theText'>
      <h2 className='h2Text'>Create Your Personal Movie Collection with YOUR MOVIES</h2>
      </div>
      <div className='theMessage'>
        <p className='homepageText'>Are you a movie buff looking for an exciting new way to keep track of your favorite films? 
        Look no further than YOUR MOVIES, the ultimate movie website! And the best part? By creating an account, you can 
        quickly search for any movie you want and add it to your watched or watchlist. Plus, there is the option to write reviews on 
        the movies you've seen. Say goodbye to disorganized movie lists and hello to YOUR MOVIES!</p>
        {/* <br></br>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br> */}
 
      </div>
      <div className='welcome-head'>
        <label className="loginL">
          <a href="/login" className="loginA">
              Login/Create
          </a>
        </label>
        </div>
    </div>
  )
}
