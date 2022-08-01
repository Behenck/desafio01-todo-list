import { Header } from './components/Header';

import ImageClipboard from './assets/Clipboard.svg';
import { Task } from './components/Task';

import './styles/global.css';
import styles from './App.module.css';
import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';

interface AppProps {
  id: number;
  isCompleted: boolean;
  content: string;
}

function App() {
  const taskExists = true;

  const [tasks, setTasks] = useState<AppProps[]>([
    {
      id: 1,
      isCompleted: false,
      content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    },
    {
      id: 2,
      isCompleted: true,
      content: 'Integers urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    }
  ]);

  function isCompletedTask(idTask: number) {
    console.log(idTask);
    const taskIndex = tasks.findIndex((task) => {
      return task.id == idTask;
    });
    const tempTasks = [...tasks];
      
    tempTasks[taskIndex].isCompleted = !tempTasks[taskIndex].isCompleted;
    setTasks(tempTasks);
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form className={styles.newTask}>
          <input type="text" placeholder="Adicione uma nova tarefa" />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.created}>
              <p>Tarefas Criadas</p>
              <span className={styles.counter}>0</span>
            </div>
            <div className={styles.done}>
              <p>Concluídas</p>
              <span className={styles.counter}>0</span>
            </div>
          </div>

          {taskExists ? (
            <div className={styles.tasksList}>
              {tasks.map(task => {
                return (
                  <Task 
                    key={task.id}
                    idTask={task.id}
                    isCompleted={task.isCompleted} 
                    content={task.content} 
                    onIsCompletedTask={isCompletedTask}
                  />
                )
              })}
            </div>
          ) : (
            <div className={styles.content}>
              <img src={ImageClipboard} alt="imagem tarefas" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
