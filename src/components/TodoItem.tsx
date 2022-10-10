import React from 'react';
import {AiFillDelete} from 'react-icons/ai'
import {BsCheckCircleFill, BsFillCircleFill, BsPenFill} from 'react-icons/bs'
import {ITask} from "./models/todo";

interface ITodoItemProps {
    item: {
        id: number;
        title: string;
        isCompleted: boolean;
    };
    checking: (id: number) => void;
    setUpdateData: (a: ITask) => void;
    removing: (id: number) => void;
}


const TodoItem: React.FC<ITodoItemProps> = ({item, checking, setUpdateData, removing}) => {

    /////   Компонент для одной задачи   /////

    return (
        <div className={item.isCompleted ? 'todo-item complete' : 'todo-item'}>
            {item.isCompleted ?
                <BsCheckCircleFill onClick={() => {
                    checking(item.id)
                }} style={{cursor: 'pointer', color: '#018080'}}
                />
                :
                <BsFillCircleFill onClick={() => {
                    checking(item.id)
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
                        onClick={() => setUpdateData({
                            id: item.id,
                            title: item.title,
                            isCompleted: item.isCompleted
                        })}
                    />
                }
                <AiFillDelete
                    onClick={() => removing(item.id)}
                    className='cancel-img'
                    style={{cursor: 'pointer', color: '#018080'}}
                />
            </div>
        </div>

    );
}


export default TodoItem;