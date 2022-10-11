import React from 'react';
import {AiFillDelete} from 'react-icons/ai'
import {BsCheckCircleFill, BsFillCircleFill, BsPenFill} from 'react-icons/bs'
import todo from "../store/todos";
import {observer} from "mobx-react-lite";
import {ITask} from "./models/todo";

interface ITodoItemProps {
    item: ITask
}

const TodoItem: React.FC<ITodoItemProps> = observer(({item}) => {

        return (
            <div className={item.isCompleted ? 'todo-item complete' : 'todo-item'}>
                {item.isCompleted ?
                    <BsCheckCircleFill onClick={() => {
                        todo.checkTask(item.id)
                    }} style={{cursor: 'pointer', color: '#018080'}}
                    />
                    :
                    <BsFillCircleFill onClick={() => {
                        todo.checkTask(item.id)
                    }} style={{cursor: 'pointer', color: '#018080'}}
                    />}
                <i
                    className={item.isCompleted ? 'short-text short-text-complete' : 'short-text'}>{item.title}</i>
                <div
                    style={{display: 'flex', width: '45px', justifyContent: 'space-between'}}
                >
                    {item.isCompleted ?
                        <BsPenFill
                            style={{cursor: '', color: '#fff'}}
                            className='rewriter-img'
                        />
                        :
                        <BsPenFill
                            style={{cursor: 'pointer', color: '#018080'}}
                            className='rewriter-img'
                            onClick={() => todo.setUpdateData(item)}
                        />
                    }
                    <AiFillDelete
                        onClick={() => todo.removeTask(item.id)}
                        className='cancel-img'
                        style={{cursor: 'pointer', color: '#018080'}}
                    />
                </div>
            </div>

        );
    }
)
export default TodoItem;