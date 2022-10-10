import React from 'react';
import {useState} from "react";
import {ITask} from "./models/todo";

interface ITodoCreatorProps {
    updateData: ITask;
    tasks: ITask[];
    setTasks: (a: ITask[]) => void;
    changing: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    removeUpdating: () => void;
    updateTask: (e: React.SyntheticEvent<HTMLButtonElement> |
        React.SyntheticEvent<HTMLInputElement>) => void;
}

const TodoCreater: React.FC<ITodoCreatorProps> =
    ({updateData, setTasks, tasks, changing, removeUpdating, updateTask}) => {

        /////   Компонент для редактора задач   /////

        const [input, setInput] = useState('')

        // Функция добавления задачи
        const adding = (e: React.SyntheticEvent<any>) => {
            e.preventDefault()
            if (input) {
                const newTask: ITask = {
                    id: tasks.length + 1,
                    title: input,
                    isCompleted: false
                }
                if (newTask) {
                    setTasks([newTask, ...tasks])
                }
                setInput('')
            }
        }

        return (
            <div className='todo-creater'>
                {!updateData ?

                    // СОЗДАНИЕ ЗАДАЧИ

                    (<div className='todo-creater-wrapper'>
                            <h2 style={{color: 'black', textAlign: 'center'}}>Создать задачу</h2>
                            <div className='wrapper'>
                                <div className='todo-input'>
                                    <input
                                        value={input}
                                        type='text'
                                        onChange={event => setInput(event.target.value)}
                                        placeholder='Add a task'
                                        onKeyPress={e => e.key === 'Enter' && adding(e)}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='app-btn'
                                    onClick={(e) => adding(e)}
                                >
                                    Добавить
                                </button>
                            </div>
                        </div>
                    ) :

                    // ИЗМЕНЕНИЕ ЗАДАЧИ

                    (<div className='todo-creater-wrapper'>
                            <h2 style={{color: 'black', textAlign: 'center'}}>Изменить задачу</h2>
                            <div className='wrapper'>
                                <div className='todo-input'>
                                    <input
                                        value={updateData && updateData.title}
                                        type='text'
                                        onChange={(e) => changing(e)}
                                        placeholder='Add a task'
                                        onKeyPress={e => e.key === 'Enter' && updateTask(e)}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='app-btn app-btn-change'
                                    onClick={(e) => updateTask(e)}
                                >
                                    Изменить
                                </button>
                                <button
                                    type='submit'
                                    className='app-btn app-btn-cancel'
                                    onClick={removeUpdating}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    )}
            </div>

        )
    };

export default TodoCreater;