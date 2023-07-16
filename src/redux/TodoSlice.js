import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [], // ###
  },
  reducers: {
    addItem: (state, action) => {
      state.todo.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.todo = state.todo.filter((item) => item.id != action.payload);
    },
    complete: (state, action) => {
      //console.log(action.payload)
      state.todo.map((item) => {
        item.id == action.payload.id
          ? (item.complete = action.payload.bool)
          : "";
      });
    },
    clearCompleted: (state) => {
      state.todo = state.todo.filter((item) => item.complete == false);
    },
    editItem: (state, action) => {
      // console.log(action.payload.newValue, action.payload.id);
      state.todo.map((item) => {
        item.id == action.payload.itemId
          ? (item.task = action.payload.newValue)
          : "";
      });
    },
    lsUpdate : (state, action) => {
      state.todo = action.payload
    }
    /*  incrementByValue : (state, action) => {
      state.count += action.payload
    }
  */
  },
});



export const { addItem, deleteItem, editItem, complete, clearCompleted, lsUpdate } =
  TodoSlice.actions;
export default TodoSlice.reducer;
