import {makeAutoObservable} from 'mobx'
import React from "react";

class Todos {
    _updateData = {
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

    addTask(e) {
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
    removeTask(id) {
        this.todoList = [...this.todoList.filter(t => t.id !== id)]
    }

    // Работает
    checkTask(id) {
        let newTasks = this.todoList.map(item => {
                if (item.id === id)
                    return ({...item, isCompleted: !item.isCompleted})
                return item
            }
        )
        this.todoList = [...newTasks]
    }

    changeTask(e) {
        this._updateData = {
            id: this._updateData.id,
            title: e.currentTarget.value,
            isCompleted: this._updateData.isCompleted,
        }
    }

    updateTask(e) {
        e.preventDefault()
        let filterRecords = this.todoList.filter(task => task.id !== this._updateData.id)
        this.todoList = [...filterRecords, this._updateData]
        this._updateData = {
            id: null,
            title: '',
            isCompleted: false,
        }
    }

    // Работает
    removeUpdating() {
        this._updateData = {}
        this.isChangeMode = false;
    }

    get updateData() {
        return this._updateData;
    }

    //работает
    setUpdateData(value) {
        this._updateData = value;
        this.isChangeMode = true;
    }

    get input() {
        return this._input;
    }

    setInput(value) {
        this._input = value;
    }

}

export default new Todos()