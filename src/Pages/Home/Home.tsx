import { useEffect, useState } from 'react';
import './Home.css';
import Note from '../../Components/Note/Note';
import { INote } from '../../ts/interfaces';
import notes from '../../data/data.json';
import Header from '../../Components/Header/Header';
import DatePicker from '../../Components/DateSelector/DateSelector';
import { DateRange } from 'rsuite/esm/DateRangePicker';

const Home = () => {
  const [note, setNote] = useState<INote[]>();

  const [value, setValue] =  useState<DateRange | null>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7))
  ]); 

  const handleOnChange = (value:DateRange | null) => {
    // console.log(value);
    setValue(value);
  };

  useEffect(() => {
    setNote(notes);
  }, []);

  return (
    <>
      <Header/>
      <DatePicker value={value} handleOnChange={handleOnChange}/>
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