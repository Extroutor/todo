import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import TodoCreator from "./components/TodoCreator";
import {ITask} from "./components/models/todo";

function App(): JSX.Element {
    const [updateData, setUpdateData] = useState<ITask>({
        id: 0,
        title: '',
        isCompleted: false,
    })
    const [tasks, setTasks] = useState<ITask[]>([
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
    ])

    // Функция изменения задачи для дальнейшей записи его лист
    const changing = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setUpdateData({
            id: updateData.id,
            title: e.currentTarget.value,
            isCompleted: updateData.isCompleted,
        })
    }

    // Функция записи изменения
    const updateTask = (e: React.SyntheticEvent<HTMLButtonElement> |
        React.SyntheticEvent<HTMLInputElement>) => {
        e.preventDefault()
        let filterRecords: ITask[] = [...tasks].filter(task => task.id !== updateData.id)
        let updateObj = [...filterRecords, updateData]
        setTasks(updateObj)
        setUpdateData({id: 0, isCompleted: false, title: ""})
    }

    // Функция отмены изменения
    const removeUpdating = () => {
        setUpdateData({id: 0, isCompleted: false, title: ""})
    }

    return (
        <div className='todo-app'>

            {/*  СПИСОК ЗАДАЧ   */}

            <TodoList
                setUpdateData={setUpdateData}
                tasks={tasks}
                setTasks={setTasks}
            />

            {/*  РЕДАКТИРОВАНИЕ ЗАДАЧ   */}

            <TodoCreator
                updateData={updateData}
                tasks={tasks}
                setTasks={setTasks}
                changing={changing}
                removeUpdating={removeUpdating}
                updateTask={updateTask}
            />
        </div>
    )
}

export default App;
