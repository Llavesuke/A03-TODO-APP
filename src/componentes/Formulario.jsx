import React, { useState, useEffect } from "react"
import Swal from "sweetalert2"

const Formulario = ({
  formData,
  setFormData,
  addTodo,
  updateTodo,
}) => {

    const [todo, setTodo] = useState({
        title: "",
        description: "",
        priority: false,
        state: "pending", 
        id: null, // `null` for new task, number for editing an existing task.
    })
    
    
  // This effect launchs when the formData is changed
  useEffect(() => {
    if (formData && formData.id) {
      setTodo({
        ...formData,
      })
    } else {
      setTodo({
        title: "",
        description: "",
        priority: false,
        state: "pendiente",
        id: null,
      })
    }
  }, [formData]) 

  const { title, description, priority, state, id } = todo

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Título y descripción son obligatorios",
      })
    }

    if (id) {
      updateTodo({
        id,
        title,
        description,
        priority,
        state,
      })

      Swal.fire({
        icon: "success",
        title: "Tarea editada correctamente!",
      })

      setFormData({
        id: null,
        title: "",
        description: "",
        priority: false,
        state: "pendiente",
      })

      setTodo({
        title: "",
        description: "",
        priority: false,
        state: "pendiente",
        id: null,
      })

      return 

    } 

    addTodo({
    id: Date.now(), 
    title,
    description,
    priority,
    state,
    })

    Swal.fire({
    icon: "success",
    title: "Tarea añadida correctamente!",
    })

    setTodo({
    title: "",
    description: "",
    priority: false,
    state: "pendiente", 
    id: null,
    })
    
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value, 
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Introduce la tarea"
        className="form-control mb-2"
        value={title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Introduce la descripción"
        className="form-control mb-2"
        value={description}
        onChange={handleChange}
      ></textarea>

      <select
        name="state"
        className="form-control mb-2"
        value={state}
        onChange={handleChange}
      >
        <option value="pendiente">Pendiente</option>
        <option value="completada">Completada</option>
      </select>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="priority"
          id="inputCheck"
          checked={priority}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputCheck">
          Prioridad
        </label>
      </div>

      <button type="submit" className={ id ? "btn btn-success" : "btn btn-primary"}>
        {id ? "Editar" : "Añadir"}
      </button>
    </form>
  )
}

export default Formulario
