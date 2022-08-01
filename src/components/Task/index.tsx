import { Check, Trash } from "phosphor-react";

import styles from './styles.module.css';

interface TaskProps {
  idTask: number;
  isCompleted?: boolean;
  content: string;
  onIsCompletedTask: (idTask: number) => void;
}

export function Task({ idTask, isCompleted = false, content, onIsCompletedTask }: TaskProps) {
  function handleIsCompletedTask() {
    onIsCompletedTask(idTask)
  }

  return (
    <div className={styles.task}>
      <div className={styles.checkbox}>
        <input 
          id="myCheckbox" 
          type="checkbox" 
          defaultChecked={isCompleted}
          onClick={handleIsCompletedTask}
        />
        <label htmlFor="myCheckbox">
          <Check size={24} />
        </label>
      </div>
      <p>{content}</p>
      <Trash size={24} />
    </div>
  )
}