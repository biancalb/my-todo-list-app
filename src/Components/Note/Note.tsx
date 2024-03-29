/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Note.css';
import { INote } from '../../ts/interfaces';
import moment from 'moment';
import { FaCheck, FaPen, FaRegWindowClose, FaTrash } from 'react-icons/fa';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { EActionNames } from '../../ts/enums';
import { ToastContainer, toast } from 'react-toastify';

type Props = {
  note: INote
}

const Note = (props: Props) => {
  const [note, setNote] =  useState(props?.note);
  const [tasks, setTasks] =  useState(note.tasks);
  const [newTask, setNewTask] =  useState(false);
  const [newTaskDescription, setNewTaskDescription] =  useState('');
  const [isChecked, setIsChecked] =  useState(
    note.tasks.map(a => a.completed)
  );
  const [showDialog, setShowDialog] =  useState(false);
  const [action, setAction] =  useState<EActionNames | null>(null);
  const [taskId, setTaskId] =  useState<number | null>(null);
  
  const parts = note.date.split('-').map(p => parseInt(p));
  const objDate = new Date(parts[0], parts[1] - 1, parts[2]);

  useEffect(() => {
  }, [isChecked, tasks]);

  const handleOnChecked = (position: number) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  const onAddNew = () => {
    setTaskId(null);
    setNewTask(true);
  };

  const handleNewTaskSave = () => {
    if (newTaskDescription) {

      if (taskId) {
        const index = tasks.findIndex(t => t.id == taskId);
        tasks[index].title = newTaskDescription;
        toast.success('Task description saved');
      }
      else {
        tasks.push({
          'id': tasks.length + 1,
          'title': newTaskDescription,
          'completed': false
        });
        toast.success('New task saved successfully');
      }
      handleNewTaskClose();
    }
  };
  
  const handleNewTaskClose = () => {
    setNewTask(false);
    setNewTaskDescription('');
  };

  const handleOnDeleteTask = (id: number) => {
    setAction(EActionNames.Delete);
    setShowDialog(true);
    setTaskId(id);
  };

  const handleOnEditTask = (id: number) => {
    setAction(EActionNames.Edit);
    setTaskId(id);
    setNewTaskDescription(tasks.find(t => t.id == id)?.title ?? '');
    setNewTask(true);
  };
    
  const onShowDialog = (isShown: boolean) => isShown;
  
  const handleCloseDialog = (isClosed: boolean = false) => {
    setShowDialog(isClosed);
    setAction(null);
  };
  
  const deleteTask = () => {
    if (taskId) {
      setTasks(tasks.filter(t => t.id != taskId));
      handleCloseDialog();
      toast.success('Task deleted successfully');
    }
  };

  const handleClick = (dialogAction: EActionNames | null, buttonAction: string | undefined) => {
    if (buttonAction == EActionNames.Cancel){
      handleCloseDialog();
    } 
    else 
    {
      switch (dialogAction) {
      case EActionNames.Delete:
        deleteTask();
        break;
          
      default:
        break;
      }
    }
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
            {tasks.map((task, index) => {
              return (
                <li key={task.id}>
                  <div className={`task ${!isChecked[index] ? 'editable' :''}`}>
                    <input type="checkbox" checked={isChecked[index]} onChange={() => handleOnChecked(index)}/>
                    <span className="task-description">{task.title}</span>
                  </div>
                  {!isChecked[index] && <div className='task__btn'>
                    <span><FaPen onClick={() => handleOnEditTask(task.id)}/></span>
                    <span><FaTrash onClick={() => handleOnDeleteTask(task.id)}/></span>
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
          <div className="count-tasks">
            <span data-descr={`Progress: ${note.tasks?.filter(t => t.completed).length}/${note.tasks?.length}`}>
              {note.tasks.length ?? 0} tasks
            </span>
          </div>
          <div className="add-task">
            <button onClick={onAddNew}> Add new + </button>
          </div>
        </div>
      </div>
      <ConfirmationDialog 
        action={action}
        stage='task' 
        show={() => onShowDialog(showDialog)}
        handleClose={handleCloseDialog}
        handleClick={handleClick}
      />
      <ToastContainer 
        autoClose={3000}
        limit={3}
        closeOnClick
      />
    </>
  );
};

export default Note;