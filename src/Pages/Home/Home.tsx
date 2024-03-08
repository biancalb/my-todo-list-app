import { useEffect, useState } from 'react';
import './Home.css';
import Note from '../../Components/Note/Note';
import { INote } from '../../ts/interfaces';
import notes from '../../data/data.json';
import Header from '../../Components/Header/Header';

const Home = () => {
  const [note, setNote] = useState<INote[]>();

  useEffect(() => {
    setNote(notes);
  }, []);

  return (
    <>
      <Header/>
      <div className="date__picker"></div>
      <div className="main__content">
        <div className="notes__list">
          {note?.map((n:INote) =>{
            return (
              <Note key={n.id} note={n}/>
            );
          })}
        </div>
        <div className="addNew__button">
          <a href="">
            <button>+</button>
          </a>
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default Home;