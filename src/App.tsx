import { Header } from './components/Header';

import ImageClipboard from './assets/Clipboard.svg';
import { Task } from './components/Task';

import './styles/global.css';
import styles from './App.module.css';
import { Check, PlusCircle, Trash } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface AppProps {
  id: number;
  isCompleted: boolean;
  content: string;
}

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<AppProps[]>([
    {
      id: 1,
      isCompleted: false,
      content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    },
    {
      id: 2,
      isCompleted: false,
      content: 'Integers urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    }
  ]);

  const taskExists = tasks.length > 0 ? true : false;

  function deleteTask(idTask: number) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== idTask;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newCreateTask = {
      id: tasks.length + 1,
      isCompleted: false,
      content: newTask
    }

    setTasks([...tasks, newCreateTask]);
    setNewTask("");
  }

  function isCompletedTask(idTask: number) {
    console.log(idTask);
    const taskIndex = tasks.findIndex((task) => {
      return task.id === idTask;
    });
    const tempTasks = [...tasks];
      
    tempTasks[taskIndex].isCompleted = !tempTasks[taskIndex].isCompleted;
    setTasks(tempTasks);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  const TasksCompletedLeght = tasks.map(task => {
    const data = 0;
    task.isCompleted === true ?? data + 1;
    return data
  });

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form className={styles.newTask} onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa" 
            value={newTask} 
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.created}>
              <p>Tarefas Criadas</p>
              <span className={styles.counter}>{tasks.length}</span>
            </div>
            <div className={styles.done}>
              <p>Concluídas</p>
              <span className={styles.counter}>{TasksCompletedLeght} de {tasks.length}</span>  
            </div>
          </div>

          {taskExists ? (
            <div className={styles.tasksList}>
            {tasks.map(task => {
              return (
                <Task 
                  key={task.id}
                  idTask={task.id}
                  content={task.content}
                  isCompleted={task.isCompleted}
                  onDeleteTask={deleteTask}
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
