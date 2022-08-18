import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: nanoid(), content: "Ben İlk Todo'yum", isCompleted: false },
    { id: nanoid(), content: "Ben İkinci Todo'yum", isCompleted: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      let newTodo = {
        id: nanoid(),
        content: action.payload,
        isCompleted: false,
      };
      state.push(newTodo);
    },
    removeTodo: (state, action) => {
      return (state = state.filter((todo) => todo.id !== action.payload));
    },
    isCompletedTodo: (state, action) => {
      state = state.map((todo) => {
        if (todo.id === action.payload) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
    },
    editTodo: (state, action) => {
     return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, content: action.payload.content} ;
        } 
          return todo;
        
      });
    },
  },
});

export default todoSlice.reducer;


export const { addTodo, removeTodo, isCompletedTodo, editTodo } =
  todoSlice.actions;
