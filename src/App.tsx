// src/App.tsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './App.css';

type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type BoardState = {
  columns: Column[];
};

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>({
    columns: JSON.parse(localStorage.getItem('kanbanBoard') || '[]'),
  });

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('kanbanBoard', JSON.stringify(board.columns));
  }, [board]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = board.columns.find(col => col.id === source.droppableId);
    const destColumn = board.columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceTasks = [...sourceColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedColumns = board.columns.map(col =>
        col.id === sourceColumn.id ? { ...col, tasks: sourceTasks } : col
      );
      setBoard({ columns: updatedColumns });
    } else {
      const destTasks = [...destColumn.tasks];
      destTasks.splice(destination.index, 0, movedTask);
      const updatedColumns = board.columns.map(col =>
        col.id === sourceColumn.id
          ? { ...col, tasks: sourceTasks }
          : col.id === destColumn.id
          ? { ...col, tasks: destTasks }
          : col
      );
      setBoard({ columns: updatedColumns });
    }
  };

  const addColumn = () => {
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      title: `Column ${board.columns.length + 1}`,
      tasks: [],
    };
    setBoard(prev => ({ columns: [...prev.columns, newColumn] }));
  };

  const deleteColumn = (id: string) => {
    setBoard(prev => ({ columns: prev.columns.filter(col => col.id !== id) }));
  };

  const filteredTasks = (tasks: Task[]) =>
    tasks.filter(task => task.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <header className="header">
        <h1>Kanban Board</h1>
        <button onClick={addColumn}>Add Column</button>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {board.columns.map(column => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  className="column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="column-header">
                    <h2>{column.title}</h2>
                    <button onClick={() => deleteColumn(column.id)}>Delete</button>
                  </div>
                  {filteredTasks(column.tasks).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
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
                  ))}
                  {provided.placeholder}
                  <button
                    onClick={() =>
                      setBoard(prev => ({
                        columns: prev.columns.map(col =>
                          col.id === column.id
                            ? {
                                ...col,
                                tasks: [
                                  ...col.tasks,
                                  { id: `task-${Date.now()}`, content: `New Task` },
                                ],
                              }
                            : col
                        ),
                      }))
                    }
                  >
                    Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
