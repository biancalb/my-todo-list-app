import React from 'react'
import './Note.css'

interface Props {}

const Note = (props: Props) => {
  return (
    <>
      <div className="cards card1">
        <div className="card-header">
            <span className="weekday">Monday, </span>
            <span className="date">March 14th</span>
        </div>
        <div className="todo-items">
            <ul>
                <li>
                    <input type="checkbox"/>
                    <span className="task-description">Morning run</span>
                </li>
                <li>
                    <input type="checkbox"/>
                    <span className="task-description">Morning run</span>
                </li>
            </ul>
        </div>
        <div className="card-footer">
            <div className="count-tasks">
                5 tasks
            </div>
            <div className="add-task">
                <button> Add new + </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Note