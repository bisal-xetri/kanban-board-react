// src/utils/dragAndDropHelpers.ts

import { Column, Task } from '../types/kanbanTypes';

/**
 * Moves a task within the same column.
 * @param tasks - The list of tasks in the source column.
 * @param fromIndex - The index of the task being moved.
 * @param toIndex - The index where the task is being moved to.
 * @returns A new array of tasks after reordering.
 */
export const reorderTasksInColumn = (
  tasks: Task[],
  fromIndex: number,
  toIndex: number
): Task[] => {
  const updatedTasks = [...tasks];
  const [movedTask] = updatedTasks.splice(fromIndex, 1);
  updatedTasks.splice(toIndex, 0, movedTask);
  return updatedTasks;
};

/**
 * Moves a task between two different columns.
 * @param sourceTasks - The list of tasks in the source column.
 * @param destinationTasks - The list of tasks in the destination column.
 * @param fromIndex - The index of the task in the source column.
 * @param toIndex - The index where the task should be added in the destination column.
 * @returns An object containing updated tasks for both columns.
 */
export const moveTaskToAnotherColumn = (
  sourceTasks: Task[],
  destinationTasks: Task[],
  fromIndex: number,
  toIndex: number
): { updatedSourceTasks: Task[]; updatedDestinationTasks: Task[] } => {
  const sourceCopy = [...sourceTasks];
  const destinationCopy = [...destinationTasks];

  const [movedTask] = sourceCopy.splice(fromIndex, 1);
  destinationCopy.splice(toIndex, 0, movedTask);

  return {
    updatedSourceTasks: sourceCopy,
    updatedDestinationTasks: destinationCopy,
  };
};

/**
 * Handles the drag-and-drop logic based on the source and destination.
 * @param columns - The current list of columns.
 * @param sourceColumnId - The ID of the source column.
 * @param destinationColumnId - The ID of the destination column.
 * @param sourceIndex - The index of the dragged task in the source column.
 * @param destinationIndex - The index of the dragged task in the destination column.
 * @returns A new list of columns after applying the drag-and-drop operation.
 */
export const handleDragAndDrop = (
  columns: Column[],
  sourceColumnId: string,
  destinationColumnId: string,
  sourceIndex: number,
  destinationIndex: number
): Column[] => {
  const sourceColumn = columns.find(col => col.id === sourceColumnId)!;
  const destinationColumn = columns.find(col => col.id === destinationColumnId)!;

  if (sourceColumnId === destinationColumnId) {
    // Reorder within the same column
    const updatedTasks = reorderTasksInColumn(sourceColumn.tasks, sourceIndex, destinationIndex);
    return columns.map(col =>
      col.id === sourceColumnId ? { ...col, tasks: updatedTasks } : col
    );
  } else {
    // Move between different columns
    const { updatedSourceTasks, updatedDestinationTasks } = moveTaskToAnotherColumn(
      sourceColumn.tasks,
      destinationColumn.tasks,
      sourceIndex,
      destinationIndex
    );

    return columns.map(col =>
      col.id === sourceColumnId
        ? { ...col, tasks: updatedSourceTasks }
        : col.id === destinationColumnId
        ? { ...col, tasks: updatedDestinationTasks }
        : col
    );
  }
};
