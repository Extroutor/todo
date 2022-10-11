import {makeAutoObservable} from 'mobx'
import React from "react";
import {ITask} from "../components/models/todo";

class Todos {
    _updateData: ITask = {
        id: null,
        title: '',
        isCompleted: false,
    }
    _input = ''
    todoList = [
        {
            id: 1,
            title: 'Finish the essay before exam',
            isCompleted: false,
        },
        {
            id: 2,
            title: 'Read book',
            isCompleted: true,
        },
        {
            id: 3,
            title: 'Send email',
            isCompleted: false,
        },
        {
            id: 4,
            title: 'Купить хлеб, который скоро испортиться',
            isCompleted: false,
        }
    ]
    isChangeMode = false;

    constructor() {
        makeAutoObservable(this,)
    }

    addTask(e: React.SyntheticEvent<any>) {
        e.preventDefault()
        if (this._input) {
            const newTask = {
                id: this.todoList.length + 1,
                title: this._input,
                isCompleted: false
            }
            if (newTask) {
                this.todoList.push(newTask)
            }
            this._input = ''
        }
    }

    // Работает
    removeTask(id: number | null) {
        this.todoList = [...this.todoList.filter(t => t.id !== id)]
    }

    // Работает
    checkTask(id: number | null) {
        let newTasks = this.todoList.map(item => {
                if (item.id === id)
                    return ({...item, isCompleted: !item.isCompleted})
                return item
            }
        )
        this.todoList = [...newTasks]
    }

    changeTask(e: React.SyntheticEvent<any>) {
        this._updateData = {
            id: this._updateData.id,
            title: e.currentTarget.value,
            isCompleted: this._updateData.isCompleted,
        }
    }

    updateTask(e: React.SyntheticEvent<any>) {
        e.preventDefault()
        let filterRecords = this.todoList.filter(task => task.id !== this._updateData.id)
        // @ts-ignore
        this.todoList = [...filterRecords, this._updateData]
        this._updateData = {
            id: null,
            title: '',
            isCompleted: false,
        }
        this.isChangeMode = false;
    }

    // Работает
    removeUpdating() {
        this._updateData = {
            id: null,
            title: '',
            isCompleted: false,
        }
        this.isChangeMode = false;
    }

    get updateData() {
        return this._updateData;
    }

    //работает
    setUpdateData(value: ITask) {
        this._updateData = value;
        this.isChangeMode = true;
    }

    get input() {
        return this._input;
    }

    setInput(value: string) {
        this._input = value;
    }

}

export default new Todos()