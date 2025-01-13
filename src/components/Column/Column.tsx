// src/components/Column/Column.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import { Column as ColumnType, BoardState } from '../../types/kanbanTypes';
import './Column.module.css';

interface ColumnProps {
  column: ColumnType;
  setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
}

const Column: React.FC<ColumnProps> = ({ column, setBoard }) => {
  const addTask = () => {
    const newTask = { id: `task-${Date.now()}`, content: 'New Task' };
    setBoard(prev => ({
      columns: prev.columns.map(col =>
        col.id === column.id ? { ...col, tasks: [...col.tasks, newTask] } : col
      ),
    }));
  };

  const deleteColumn = () => {
    setBoard(prev => ({ columns: prev.columns.filter(col => col.id !== column.id) }));
  };

  return (
    <div className="column">
      <div className="column-header">
        <h2>{column.title}</h2>
        <button onClick={deleteColumn}>Delete</button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Column;
