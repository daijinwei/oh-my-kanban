import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
       <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>待处理</h2>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
        </section>
       </main>
    </div>
      );
    }


export default App;
