import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import TodoCreator from "./components/TodoCreator";

const App = () => {
    return (
        <div className='todo-app'>
            <TodoList/>
            <TodoCreator/>
        </div>
    )
}

export default App;
