import React from 'react'
import './Home.css'
import Note from '../../Components/Note/Note'

interface Props {}

const Home = (props: Props) => {
  return (
    <>
      <div className="header__navigation"></div>
      <div className="date__picker"></div>
      <div className="main__content">
        <div className="notes__list">
          <Note/>
        </div>
        <div className="addNew__button">
            <a href="">
                <button>+</button>
            </a>
        </div>
      </div>
      <footer></footer>
    </>
  )
}

export default Home