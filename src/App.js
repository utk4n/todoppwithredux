import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  isCompletedTodo,
  editTodo,
} from "./features/todoSlice";

import { Home, Contact } from "./components/pages"; // Component Reducer :D

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(0);
  const [newEdit, setNewEdit] = useState("");

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addNewTodo = () => {
    if (newTodo == "") {
      return;
    } else {
      dispatch(addTodo(newTodo));
      setError("Todo Başarıyla Eklendi.");
    }
  };

  const removeTodoHandle = (id) => {
    dispatch(removeTodo(id));
    setError("Todo Başarıyla Silindi.");
  };

  useEffect(() => {
    setNewTodo("");
    return () =>
      setInterval(() => {
        setError("");
      }, 2000);
  }, [error]);

  const isCompletedHandle = (id) => {
    dispatch(isCompletedTodo(id));
  };

  const editMyTodo = (todo) => {
    setEditId(todo.id);
    setNewEdit(todo.content);
    setError("Edit Modu Açık")
  };

  const saveEditMyTodo = (todo) => {
    const newContent = { ...todo, content: newEdit };
    dispatch(editTodo(newContent));
    setEditId(0);
    setError("Edit Modu Kapalı")
  };

  return (
    <div className="App">
      <div className="success"> {error} </div>
      <div className="add_section">
        <input
          type="text"
          value={newTodo}
          placeholder="Add new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="button" disabled={!newTodo} onClick={addNewTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.isCompleted ? "completed" : "uncompleted"}
          >
            {editId === todo.id ? (
              <input
              className="new_edit_input"
                type="text"
                value={newEdit}
                onChange={(e) => setNewEdit(e.target.value)}
              />
            ) : (
              <span> {todo.content} </span>
            )}

            <div className="action_btns">
              {editId === todo.id ? (
                <button
                  className="save"
                  type="button"
                  onClick={() => saveEditMyTodo(todo)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit"
                  type="button"
                  onClick={() => editMyTodo(todo)}
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                className="remove"
                onClick={() => removeTodoHandle(todo.id)}
              >
                Remove
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => isCompletedHandle(todo.id)}
              >
                Complete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
