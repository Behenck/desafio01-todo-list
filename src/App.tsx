import { v4 as uuidV4 } from 'uuid';

import { Header } from './components/Header';

import ImageClipboard from './assets/Clipboard.svg';
import { Task } from './components/Task';

import './styles/global.css';
import styles from './App.module.css';
import { Check, PlusCircle, Trash } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface AppProps {
  id: string;
  isCompleted: boolean;
  content: string;
}

function App() {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<AppProps[]>([
    {
      id: uuidV4(),
      isCompleted: false,
      content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    },
    {
      id: uuidV4(),
      isCompleted: false,
      content: 'Integers urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    }
  ]);

  const taskExists = tasks.length > 0 ? true : false;

  function deleteTask(idTask: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== idTask;
    });

    setTasks(tasksWithoutDeletedOne);

    const quantityTasksCompleted = tasksWithoutDeletedOne.filter(task => task.isCompleted === true).length;
    setTasksCompleted(quantityTasksCompleted);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newCreateTask = {
      id: uuidV4(),
      isCompleted: false,
      content: newTask
    }

    setTasks([...tasks, newCreateTask]);
    setNewTask("");
  }

  function isCompletedTask(idTask: string) {
    const newTask = tasks.map(task => {
      task.id === idTask ? task.isCompleted = !task.isCompleted : task.isCompleted
      return {...task, isCompleted: task.isCompleted}
    });

    setTasks(newTask);

    const quantityTasksCompleted = tasks.filter(task => task.isCompleted === true).length;
    setTasksCompleted(quantityTasksCompleted);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  const quantityTasksCompleted = tasks.length === 0 ? '0' : tasksCompleted + ' de ' + tasks.length;

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
              <span className={styles.counter}>{quantityTasksCompleted}</span>  
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
