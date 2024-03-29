import { useEffect, useState } from 'react';
import './Home.css';
import Note from '../../Components/Note/Note';
import { INote } from '../../ts/interfaces';
import notes from '../../data/data.json';
import Header from '../../Components/Header/Header';
import DateSelector from '../../Components/DateSelector/DateSelector';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'rsuite';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  // NOTES
  const [note, setNote] = useState<INote[]>();
  useEffect(() => {
    setNote(notes);
  }, [notes]);

  //RANGE PICKER
  const [value, setValue] =  useState<DateRange | null>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7))
  ]); 
  const handleOnChange = (value: DateRange | null) => {
    setValue(value);
  };

  // MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setNewNoteDate(null);
  };
  
  // NEW NOTE
  const [newNoteDate, setNewNoteDate] = useState<Date | null>();
  const handleNewNoteDateOnChange = (value: Date | null) => {
    setNewNoteDate(value);
  };

  const onSave = () => {
    if (newNoteDate) {
      notes.push({ 
        'id': 4, 
        'date': moment(newNoteDate).format('yyyy-MM-DD'), 
        'tasks': [] 
      });
      setShow(false);
      toast.success('New note created');
    }
  };

  return (
    <>
      <Header/>
      <DateSelector value={value} handleOnChange={handleOnChange}/>
      <div className="main__content">
        <div className="notes__list">
          {note?.map((n: INote) =>{
            return (
              <Note key={n.id} note={n}/>
            );
          })}
        </div>
        <div className="addNew__button">
          <button onClick={handleShow}>+</button>
        </div>
      </div>
      <footer></footer>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Add new note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='modal-body__label'> Select the date </span>
          <DatePicker
            oneTap
            format="dd/MM/yyyy"
            value={newNoteDate}
            onChange={(value) => handleNewNoteDateOnChange(value) }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => onSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer 
        autoClose={3000}
        limit={3}
        closeOnClick
      />
    </>
  );
};

export default Home;