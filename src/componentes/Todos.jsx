import React, { useEffect, useState } from 'react'
import Todo from './Todo.jsx'

const Todos = ({ todos, deleteTodo, updateTodo, editTodo }) => {
  const [filteredTodos, setFilteredTodos] = useState([])

  const filterTodos = (todos) => {
    const altaPrioridadNoCompletada = todos.filter(
      tarea => tarea.priority === true && tarea.state === "pendiente"
    )
    const bajaPrioridadNoCompletada = todos.filter(
      tarea => tarea.priority === false && tarea.state === "pendiente"
    )
    const altaPrioridadCompletada = todos.filter(
      tarea => tarea.priority === true && tarea.state === "completada"
    )
    const bajaPrioridadCompletada = todos.filter(
      tarea => tarea.priority === false && tarea.state === "completada"
    )

    return [
      ...altaPrioridadNoCompletada,
      ...bajaPrioridadNoCompletada,
      ...altaPrioridadCompletada,
      ...bajaPrioridadCompletada
    ]
  }

  useEffect(() => {
    setFilteredTodos(filterTodos(todos))
  }, [todos])

  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul className="list-group">
        {
          filteredTodos.length === 0 ? (
            <li className="list-group-item text-center">No hay tareas</li>
          ) : (
            filteredTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                editTodo={editTodo}
              />
            ))
          )
        }
      </ul>
    </div>
  )
}

export default Todos
