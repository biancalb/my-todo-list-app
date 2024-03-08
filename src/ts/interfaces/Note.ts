import {ITask } from './Task'

export interface INote {
    id: number,
    date: string,
    tasks: ITask[]
}