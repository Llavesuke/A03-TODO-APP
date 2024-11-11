import React, { useState } from 'react'
import Formulario from "./componentes/Formulario"
import Todos from "./componentes/Todos"

// Cargar las tareas desde el localStorage (si existen)
const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('todos')
  return tasks ? JSON.parse(tasks) : []
}

const App = () => {
  const [todos, setTodos] = useState(loadTasksFromLocalStorage)

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('todos', JSON.stringify(tasks))
  }

  const addTodo = todo => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
    saveTasksToLocalStorage(newTodos)
  }

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    saveTasksToLocalStorage(newTodos)
  }

  const updateTodo = updatedTodo => {
    const newTodos = todos.map(todo => 
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    )
    setTodos(newTodos)
    saveTasksToLocalStorage(newTodos)
  }

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    priority: false,
    state: "pendiente",
  })

  const editTodo = (todo) => {
    setFormData({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      state: todo.state,
    })
  }

  return (
    <div className="container mb-2">
      <h1 className="my-4">Formulario</h1>
      <Formulario
        formData={formData}
        setFormData={setFormData}
        addTodo={addTodo}
        updateTodo={updateTodo}
      />
      <Todos
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        editTodo={editTodo}
      />
    </div>
  )
}

export default App
