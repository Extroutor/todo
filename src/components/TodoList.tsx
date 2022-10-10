import React from 'react';
import {useState} from "react";
import TodoItem from "./TodoItem";
import {ITask} from "./models/todo";

interface ITodoListProps {
    setUpdateData: (a: ITask) => void;
    tasks: ITask[];
    setTasks: (a: ITask[]) => void;
}

const TodoList: React.FC<ITodoListProps> =
    ({setUpdateData, tasks, setTasks}) => {

        const [searchQuery, setSearchQuery] = useState<string>('')

        // Функция удаления задачи
        const removing = (id: number) => {
            setTasks(tasks.filter(t => t.id !== id))
        }

        // Функция смены состояния задачи
        const checking = (id: number) => {
            let newTasks = tasks.map(item => {
                    if (item.id === id)
                        return ({...item, isCompleted: !item.isCompleted})
                    return item
                }
            )
            setTasks(newTasks)
        }

        // Отфильтрованный список задач (требуется для поиска)
        const filteredTodos = tasks.filter(todo => {
            return todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        })

        return (
            <div className='todo-list'>
                <h2 style={{color: 'black'}}>Список задач</h2>

                {/* Поисковая строка */}

                <div className='todo-input'>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder='Поиск...'
                        style={{margin: '20px 0'}}
                    />
                </div>
                {filteredTodos.length < 1 ?
                    <h3 style={{color: 'grey', paddingTop: '10px'}}>Список пуст</h3>
                    :
                    <div className='resizer'>
                        {filteredTodos
                            .sort((a, b) => a.id > b.id ? -1 : 1)
                            .map((item) =>

                                // ОДНА ЗАДАЧА

                                <TodoItem
                                    item={item}
                                    checking={checking}
                                    setUpdateData={setUpdateData}
                                    removing={removing}
                                    key={item.id}
                                />
                            )}
                    </div>
                }
            </div>
        )
    }

export default TodoList