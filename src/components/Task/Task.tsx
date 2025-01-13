// src/components/Task/Task.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../types/kanbanTypes';
import './Task.module.css';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
