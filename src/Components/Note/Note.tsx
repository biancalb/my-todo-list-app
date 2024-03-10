/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Note.css';
import { INote } from '../../ts/interfaces';
import moment from 'moment';
import { FaCheck, FaPen, FaRegWindowClose, FaTrash } from 'react-icons/fa';

type Props = {
  note: INote
}

const Note = (props: Props) => {
  const note = props?.note;
  const parts = note.date.split('-').map(p => parseInt(p));
  const objDate = new Date(parts[0], parts[1] - 1, parts[2]);

  const [isChecked, setIsChecked] =  useState(
    note.tasks.map(a => a.completed)
  );
  const handleOnChange = (position: number) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  useEffect(() => {
    setIsChecked(isChecked);
  }, [isChecked]);

  const [newTask, setNewTask] =  useState(false);
  const [newTaskDescription, setNewTaskDescription] =  useState('');
  
  const onAddNew = () => {
    setNewTask(true);
  };
  const handleNewTaskSave = () => {
    if (newTaskDescription) {
      note.tasks.push({
        'id': note.tasks.length + 1,
        'title': newTaskDescription,
        'completed': false
      });
      handleNewTaskClose();
    }
  };
  const handleNewTaskClose = () => {
    setNewTask(false);
    setNewTaskDescription('');
  };

  return (
    <>
      <div className={`cards card${note.id}`}>
        <div className="card-header">
          <span className="weekday">{moment(objDate).format('dddd')}, </span>
          <span className="date">{moment(objDate).format('MMMM, Do')}</span>
        </div>
        <div className="todo-items">
          <ul>
            {note.tasks?.map((task, index) => {
              return (
                <li key={task.id}>
                  <div className={`task ${!isChecked[index] ? 'editable' :''}`}>
                    <input type="checkbox" checked={isChecked[index]} onChange={() => handleOnChange(index)}/>
                    <span className="task-description">{task.title}</span>
                  </div>
                  {!isChecked[index] && <div className='task__btn'>
                    <span><FaPen/></span>
                    <span><FaTrash/></span>
                  </div>}
                </li>
              );
            })}
          </ul>
          {newTask && 
            <div className='new__task'>
              <input 
                type='text' 
                placeholder="Type here" 
                value={newTaskDescription} 
                onChange={e => setNewTaskDescription(e.target.value)}>
              </input>
              <span className='icon'><FaCheck onClick={handleNewTaskSave} /></span>
              <span className='icon'><FaRegWindowClose onClick={handleNewTaskClose} /></span>
            </div>
          }
        </div>
        <div className="card-footer">
          <div className="count-tasks">{note.tasks.length ?? 0} tasks</div>
          <div className="add-task">
            <button onClick={() => onAddNew()}> Add new + </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;