# Kanban Board

A Kanban board application with drag-and-drop functionality, built using React, TypeScript, and react-beautiful-dnd. The app allows users to manage tasks across customizable columns.

## Live Demo

[View Demo](https://your-demo-link.netlify.app)

---

## Features

- Drag-and-drop functionality for tasks
- Customizable columns (add/delete)
- Task filtering and search
- Undo/redo functionality
- Local storage persistence
- Responsive design with smooth animations
- Keyboard accessibility

---

## Technologies Used

- **React**: Component-based architecture for UI development.
- **TypeScript**: Strong typing for better code quality and maintainability.
- **react-beautiful-dnd**: Provides a powerful API for drag-and-drop functionality.
- **CSS (or Tailwind CSS)**: Styling and layout.
- **Jest**: Unit and integration tests for core components.
- **LocalStorage API**: Data persistence for tasks and columns.

---

## Rationale for Technology Choices

- **React**: Enables fast development and reusability of components.
- **TypeScript**: Helps avoid runtime errors and enforces type safety.
- **react-beautiful-dnd**: Best-in-class library for drag-and-drop features with keyboard accessibility.
- **Jest**: Ensures robust and bug-free functionality with thorough testing.

---
## Known Limitations / Trade-offs

- **Scaling issues**: The app uses local storage for persistence, which may not handle large datasets well.
- **Undo/redo limitations**: Undo/redo operations are limited to the current session as they're not persisted in local storage.
- **Testing gaps**: Some edge cases may not yet be covered by tests.

---

## Future Improvements

1. **Backend integration**:
   - Replace local storage with a backend database for scalability.
2. **Authentication**:
   - Add user authentication for personal Kanban boards.
3. **Mobile UX enhancements**:
   - Optimize drag-and-drop for touch screens.
4. **Collaboration features**:
   - Allow multiple users to interact with the board in real-time.

---

## Time Spent

| **Task**                      | **Time Spent** |
|-------------------------------|----------------|
| Initial Setup                 | 1 hour         |
| Drag-and-Drop Implementation  | 2 hours        |
| Column Customization          | 1.5 hours      |
| Local Storage Persistence     | 1 hour         |
| Testing                       | 2 hours        |
| Styling and UI Enhancements   | 2 hours        |
| Documentation (README)        | 1 hour         |

