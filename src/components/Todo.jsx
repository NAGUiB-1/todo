import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import {
  clearCompleted,
  addItem,
  deleteItem,
  editItem,
  complete,
} from "../redux/TodoSlice";
import { GiLightBulb } from "react-icons/gi";
import { MdModeNight } from "react-icons/md";
import { toggleTheme } from "../redux/ThemeSlice";
export default function Todo() {
  let [status, setStatus] = useState("all");
  let data = useSelector((state) => state.todo.todo);
  let theme = useSelector((state) => state.theme.theme);
  let [task, setTask] = useState("");
  let dispatch = useDispatch();
  console.log(data);
  console.log(theme);

  let handleAddItem = (e) => {
    e.preventDefault();

    let todoItem = {
      task,
      complete: false,
      id: uuid(),
    };
    setTask("");
    if (task.length) {
      dispatch(addItem(todoItem));
    }
  };
  let handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  let handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  let handleEditItem = (itemId, newValue) => {
    let payload = { itemId, newValue };
    dispatch(editItem(payload));
  };
  let handleComplete = (id, bool) => {
    let obj = { id, bool: !bool };
    dispatch(complete(obj));
  };

  let handleTheme = () => {
    dispatch(toggleTheme());
  };
  useEffect(() => {
    if(theme == 'dark' ) {
      document.querySelectorAll(".app")[0].style.backgroundColor = "#221f39"
    }else {
      document.querySelectorAll(".app")[0].style.backgroundColor = "white"
      
    }
    

  }, [theme]);
  return (
    <div
      className={`z-10 absolute ${
        theme == "dark" ? "text-[#fff]" : "text-[#000]"
      }  w-[90%]  sm:w-[70%] lg:w-[750px] xl:w-[800px]  left-[50%] translate-x-[-50%] top-[10%] sm:top-[20%] drop-shadow-lg`}
    >
      <div className=" flex justify-between items-center mb-5 text-white">
        <h1 className="font-extrabold text-4xl ">TODO </h1>
        {theme == "dark" ? (
          <GiLightBulb onClick={() => handleTheme()} size={25} fill='yellow'/>
        ) : (
          <MdModeNight onClick={() => handleTheme()} size={25} />
        )}
      </div>

      <form className=" " onSubmit={(e) => handleAddItem(e)}>
        <input
          type="text"
          className={`w-full rounded-xl p-4 ${
            theme == "dark" ? "bg-[#221f60]" : "bg-[whitesmoke]"
          } sm:h-[80px] lg:h-[90px] lg:text-xl `}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Your Next Task .."
        />
        {/*
        <input type="submit" className="w-[60%] bg-gray-800 p-2 text-white font-bold text-lg rounded-lg" value="Add" />
        */}
      </form>
      <div className=" flex flex-col mt-3 max-h-[55vh] overflow-y-auto relative rounded-xl ">
        {status == "all"
          ? data.map((item) => (
              <Item
                key={item.id}
                item={item}
                handleEditItem={handleEditItem}
                handleComplete={handleComplete}
                handleDeleteItem={handleDeleteItem}
                theme={theme}
              />
            ))
          : ""}
        {status == "active"
          ? data
              .filter((e) => e.complete == false)
              .map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleComplete={handleComplete}
                  handleDeleteItem={handleDeleteItem}
                  theme={theme}
                />
              ))
          : ""}

        {status == "completed"
          ? data
              .filter((e) => e.complete == true)
              .map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleComplete={handleComplete}
                  handleDeleteItem={handleDeleteItem}
                  theme={theme}
                />
              ))
          : ""}
        <div
          className={`${
            theme == "dark" ? "bg-[#221f60]" : "bg-[whitesmoke]"
          } p-5 border-[#ccc] flex justify-between items-center sticky bottom-0 ${
            theme == "dark" ? "text-[#ccc] " : "text-[#ccc]"
          } `}
        >
          <p className=" ">
            {data.filter((e) => e.complete == false).length} items left
          </p>
          <button className=" " onClick={() => handleClearCompleted()}>
            Clear Completed
          </button>
        </div>
      </div>
      <div
        className={` flex justify-between mt-5 ${
          theme == "dark" ? "bg-[#221f60]" : "bg-[whitesmoke]"
        } p-5 border-[#ccc] rounded-xl`}
      >
        <button
          className={`${status == "all" ? "text-blue-500" : ""}`}
          onClick={() => setStatus("all")}
        >
          All
        </button>
        <button
          className={`${status == "active" ? "text-blue-500" : ""}`}
          onClick={() => setStatus("active")}
        >
          Active
        </button>
        <button
          className={`${status == "completed" ? "text-blue-500" : ""}`}
          onClick={() => setStatus("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
