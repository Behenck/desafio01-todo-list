import { Check, Trash } from "phosphor-react";

import styles from './styles.module.css';

interface TaskProps {
  idTask: string;
  isCompleted?: boolean;
  content: string;
  onDeleteTask: (idTask: string) => void;
  onIsCompletedTask: (idTask: string) => void;
}

export function Task({ idTask, isCompleted = false, content, onDeleteTask, onIsCompletedTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(idTask);
  }

  function handleIsCompletedTask() {
    onIsCompletedTask(idTask)
  }

  return (
    <div className={styles.task}>
      <div className={styles.checkbox}>
        <input 
          id={`myCheckbox${idTask}`} 
          type="checkbox" 
          defaultChecked={isCompleted}
        />
        <label htmlFor={`myCheckbox${idTask}`} onClick={handleIsCompletedTask}>
          <Check size={24} />
        </label>
        <p className={isCompleted ? styles.completedTask : ''}>{content}</p>
      </div>
      <button onClick={handleDeleteTask} title="Deletar Tarefa">
        <Trash size={24} />
      </button>
    </div>
  )
}