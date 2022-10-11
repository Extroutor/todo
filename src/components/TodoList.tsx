import React from 'react';
import {useState} from "react";
import TodoItem from "./TodoItem";
import {ITask} from "./models/todo";
import {observer} from "mobx-react-lite";
import todo from "../store/todos";

const TodoList = observer(() => {

        const [searchQuery, setSearchQuery] = useState<string>('')

        const filteredTodos = todo.todoList.filter(todo => {
            return todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        })

        return (
            <div className='todo-list'>
                <h2 style={{color: 'black'}}>Список задач</h2>
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
                            .map((item: ITask) =>
                            <TodoItem
                                item={item}
                                key={item.id}
                            />
                        )}
                    </div>
                }
            </div>
        )
    }
)
export default TodoList