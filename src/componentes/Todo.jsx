import React from 'react'

const Todo = ({ todo, deleteTodo, updateTodo, editTodo }) => {
  const { id, title, description, priority, state } = todo

  const handleToggleState = () => {
    updateTodo({
      ...todo,
      state: state === 'pendiente' ? 'completada' : 'pendiente',
    })
  }

  return (
    <li className={`list-group-item ${state === 'completada' ? 'completed' : ''}`}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className={state === 'completada' ? 'completada' : ''}>{title}</h5>
          <p className={state === 'completada' ? 'completada' : ''}>{description}</p>

          <div className="d-flex">
            <button
              className="btn btn-sm btn-danger mr-2"
              onClick={() => deleteTodo(id)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-sm btn-primary mr-2"
              onClick={() => editTodo(todo)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-warning mr-2"
              onClick={handleToggleState}
            >
              {state === 'pendiente' ? "Completar tarea" : "Desmarcar tarea"}
            </button>
          </div>
        </div>
        <span className="badge bg-primary">{priority && "Prioridad"}</span>
      </div>
    </li>
  )
}

export default Todo
