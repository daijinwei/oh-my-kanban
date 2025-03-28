/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import logo from './logo.svg';
import './App.css';
import KanbanColumn from './KanbanColumn';
import KanbanBoard from './KanbanBoard';
import KanbanCard from './KanbanCard';
import KanbanNewCard from './KanbanNewCard';

export const kanbanCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  &:hover {
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.3), inset 0 1px #fff;
  }
`;
export const kanbanCardTitleStyles = css`
  min-height: 1rem;
`;

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const UPDATE_INTERVAL = MINUTE;
const COLUMN_BG_COLORS = {
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA'
};

const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_onGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2025-03-14 18:15' },
    { title: '开发任务-3', status: '2025-03-14 18:15' },
    { title: '开发任务-5', status: '2025-03-14 18:15' },
    { title: '测试任务-3', status: '2025-03-18 18:15' }
  ]);
  const [ongoingList, setOngoingList ] = useState([
    { title: '开发任务-4', status: '2025-02-22 18:15' },
    { title: '开发任务-6', status: '2025-02-22 18:15' },
    { title: '测试任务-2', status: '2025-02-22 18:15' }
  ]);
  const [doneList, setDoneList ] = useState([
    { title: '开发任务-2', status: '2025-01-24 18:15' },
    { title: '测试任务-1', status: '2025-01-03 18:15' }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedSource, setDragSource] = useState(null);
  const [draggedTarget, setDragTarget] = useState(null);

  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    setTodoList(currentTodoList => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ]);
    setShowAdd(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanColumn 
          bgColor={COLUMN_BG_COLORS.todo} 
          title={
          <>
            待处理<button onClick={handleAdd}
              disabled={showAdd}>&#8853; 添加新卡片</button>
          </>
          }
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
        >
          { showAdd && <KanbanNewCard onSubmit={handleSubmit} /> }
          { todoList.map(props => 
            <KanbanCard key={props.title} 
            onDragStart={()=>setDraggedItem(props)
            }
            {...props} />) 
          }
 
        </KanbanColumn>
        <KanbanColumn 
          bgColor={COLUMN_BG_COLORS.ongoing} 
          title="进行中"
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}       
        >
          { ongoingList.map(props => 
            <KanbanCard key={props.title}
              onDragStart={()=>setDraggedItem(props)
              }
            {...props} />) 
          }
        </KanbanColumn>
        <KanbanColumn 
          bgColor={COLUMN_BG_COLORS.done} 
          title="已完成"
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
        >
          { doneList.map(props => 
            <KanbanCard key={props.title}             
            onDragStart={()=>setDraggedItem(props)
            }
            {...props} />) 
          }

        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
