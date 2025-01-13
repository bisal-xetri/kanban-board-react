// src/components/Board/Board.tsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import { BoardState, Column as ColumnType } from '../../types/kanbanTypes';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';
import './Board.module.css';

const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardState>({
    columns: loadFromLocalStorage<ColumnType[]>('kanbanBoard', []),
  });

  useEffect(() => {
    saveToLocalStorage('kanbanBoard', board.columns);
  }, [board]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = board.columns.find(col => col.id === source.droppableId)!;
    const destColumn = board.columns.find(col => col.id === destination.droppableId)!;

    const sourceTasks = [...sourceColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn.id === destColumn.id) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setBoard({
        columns: board.columns.map(col =>
          col.id === sourceColumn.id ? { ...col, tasks: sourceTasks } : col
        ),
      });
    } else {
      const destTasks = [...destColumn.tasks];
      destTasks.splice(destination.index, 0, movedTask);

      setBoard({
        columns: board.columns.map(col =>
          col.id === sourceColumn.id
            ? { ...col, tasks: sourceTasks }
            : col.id === destColumn.id
            ? { ...col, tasks: destTasks }
            : col
        ),
      });
    }
  };

  const addColumn = () => {
    const newColumn: ColumnType = {
      id: `col-${Date.now()}`,
      title: `Column ${board.columns.length + 1}`,
      tasks: [],
    };
    setBoard(prev => ({ columns: [...prev.columns, newColumn] }));
  };

  return (
    <div className="board-container">
      <header className="board-header">
        <h1>Kanban Board</h1>
        <button onClick={addColumn}>Add Column</button>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {board.columns.map(column => (
            <Column key={column.id} column={column} setBoard={setBoard} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
