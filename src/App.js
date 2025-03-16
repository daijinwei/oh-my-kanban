import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

const todoList = [
  { title: '开发任务-1', status: '22-05-22 18:15' },
  { title: '开发任务-3', status: '22-05-22 18:15' },
  { title: '开发任务-5', status: '22-05-22 18:15' },
  { title: '测试任务-3', status: '22-05-22 18:15' }
];
const ongoingList = [
  { title: '开发任务-4', status: '22-05-22 18:15' },
  { title: '开发任务-6', status: '22-05-22 18:15' },
  { title: '测试任务-2', status: '22-05-22 18:15' }
];
const doneList = [
  { title: '开发任务-2', status: '22-05-22 18:15' },
  { title: '测试任务-1', status: '22-05-22 18:15' }
];

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};

/*
const KanbanNewCard = () => {
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" />
      </div>
    </li>
  );
};
*/

const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  
  /*
  1. evt.target.value
  evt.target 是触发事件的 DOM 元素（在这里是 <input> 输入框）。
  evt.target.value 是输入框的当前值。

  2. setTitle(evt.target.value)
  setTitle 是一个状态更新函数，通常由 useState Hook 生成。它用于更新 title 状态的值。
  在这里，setTitle(evt.target.value) 将 title 的值更新为输入框的当前值。
  */
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  
  /*
  if (evt.key === 'Enter')
  这是一个条件判断，检查用户按下的键是否是回车键（Enter）。
  如果是回车键，则执行 if 语句块中的代码。
  */
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
       onSubmit(title);
    }
  };

 /*
  1. <input> 元素
  <input> 是 HTML 中的输入框元素，type="text" 表示这是一个文本输入框。

  2. value={title}
  value 是输入框的当前值。
  {title} 是一个 JavaScript 表达式，表示输入框的值由变量 title 决定。这是一个受控组件（Controlled Component），输入框的值由 React 状态（title）控制。

  3. onChange={handleChange}
  onChange 是输入框的事件处理函数，当输入框的值发生变化时触发。
  {handleChange} 是一个 JavaScript 表达式，表示事件触发时调用 handleChange 函数。
  通常，handleChange 函数会更新 title 的值，以反映用户输入的内容。

  4. onKeyDown={handleKeyDown}
  onKeyDown 是输入框的事件处理函数，当用户按下键盘上的任意键时触发。
  {handleKeyDown} 是一个 JavaScript 表达式，表示事件触发时调用 handleKeyDown 函数。
  通常，handleKeyDown 函数用于处理特定的键盘事件（如按下回车键）。
 */ 
  return (
    <li className="kanban-card">
        <h3>添加新卡片</h3>
          <div className="card-title">
          <input type="text" value={title}
          onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>
    </li>
  );
};

// 根组件（如 App 组件）类似main() 中的逻辑	
function App() {
    const [showAdd, setShowAdd] = useState(false);
      const handleAdd = (evt) => {
        setShowAdd(true);
      };
    const [todoList, setTodoList] = useState([
      { title: '开发任务-1', status: '22-05-22 18:15' },
      { title: '开发任务-3', status: '22-05-22 18:15' },
      { title: '开发任务-5', status: '22-05-22 18:15' },
      { title: '测试任务-3', status: '22-05-22 18:15' }
  ]);
  // 在新卡片插入同时，“添加新卡片”卡片消失，回到 1 的状态
  // 箭头函数的基本语法如下：
  //  =>：箭头符号，表示这是一个箭头函数。
  //  {}：函数体，包含函数的逻辑代码。
  //  return：如果需要返回值，可以使用 return 语句。如果函数体只有一行代码且是返回值，可以省略 {} 和 return。

  const handleSubmit = (title) => {
    // unshift() 是 JavaScript 数组的一个方法，用于向数组的开头添加一个或多个元素。
    // 它会修改原数组，并返回数组的新长度。
    // todoList.unshift({ title, status: new Date().toDateString() });
    // setShowAdd(false);
    setTodoList(currentTodoList => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="kanban-board">
    <section className="kanban-column column-todo">
    <h2>待处理<button onClick={handleAdd}
      disabled={showAdd}>&#8853; 添加新卡片</button></h2>
       <ul>
       { showAdd && <KanbanNewCard onSubmit={handleSubmit} /> }
        { todoList.map(props => <KanbanCard {...props} />) }
      </ul>
    </section>
    <section className="kanban-column column-ongoing">
      <h2>进行中</h2>
      <ul>

        { ongoingList.map(props => <KanbanCard {...props} />) }
      </ul>
    </section>
    <section className="kanban-column column-done">
      <h2>已完成</h2>
      <ul>
        { doneList.map(props => <KanbanCard {...props} />) }
      </ul>
    </section>
  </main>
    </div>
      );
}


// 用于将 App 组件（或变量、函数等）作为模块的默认导出。这样，其他文件可以通过 import 语句引入并使用 App 组件。
export default App;
