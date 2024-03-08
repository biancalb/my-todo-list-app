import React, { useState } from 'react';
import './Note.css';
import { INote } from '../../ts/interfaces';
import moment from 'moment';

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

  const handleOnChange = (position:number) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
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
                  <input type="checkbox" checked={isChecked[index]} onChange={() => handleOnChange(index)}/>
                  <span className="task-description">{task.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="card-footer">
          <div className="count-tasks">{note.tasks.length ?? 0} tasks</div>
          <div className="add-task">
            <button> Add new + </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;