import React, {useState} from 'react';
import todo from "../store/todos";
import {observer} from "mobx-react-lite";

const TodoCreater = observer(() => {

    return (
        <div className='todo-creater'>
            {!todo.isChangeMode ?
                (<div className='todo-creater-wrapper'>
                        <h2 style={{color: 'black', textAlign: 'center'}}>Создать задачу</h2>
                        <div className='wrapper'>
                            <div className='todo-input'>
                                <input
                                    value={todo.input}
                                    type='text'
                                    onChange={event => todo.setInput(event.target.value)}
                                    placeholder='Add a task'
                                    onKeyPress={e => e.key === 'Enter' && todo.addTask(e)}
                                />
                            </div>
                            <button
                                type='submit'
                                className='app-btn'
                                onClick={(e) => todo.addTask(e)}
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                ) :
                (<div className='todo-creater-wrapper'>
                        <h2 style={{color: 'black', textAlign: 'center'}}>Изменить задачу</h2>
                        <div className='wrapper'>
                            <div className='todo-input'>
                                <input
                                    value={todo.updateData && todo.updateData.title}
                                    type='text'
                                    onChange={(e) => todo.changeTask(e)}
                                    placeholder='Add a task'
                                    onKeyPress={e => e.key === 'Enter' && todo.updateTask(e)}
                                />
                            </div>
                            <button
                                type='submit'
                                className='app-btn app-btn-change'
                                onClick={(e) => todo.updateTask(e)}
                            >
                                Изменить
                            </button>
                            <button
                                type='submit'
                                className='app-btn app-btn-cancel'
                                onClick={() => todo.removeUpdating()}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
});

export default TodoCreater;