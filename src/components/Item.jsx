import { BiEdit } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useRef } from "react";
export default function Item({
  item,
  handleEditItem,
  handleComplete,
  handleDeleteItem,
  theme,
}) {
  let ref = useRef(null);
  let [complete, setComplete] = useState(item.complete);
  let [edit, setEdit] = useState(false);
  let [value, setValue] = useState(item.task);

  let handleSubmit = (e) => {
    e.preventDefault();
    handleEditItem(item.id, value);
    setEdit(false);
  };
  let handleEdit = () => {
    setEdit(true);
    setTimeout(function() {
      ref.current.focus();
    }, 10);
  };
  return (
    <div
      className={`${
        theme == "dark" ? "bg-[#221f60]" : "bg-[whitesmoke]"
      } p-5 border-b-2 border-[rgba(255,255,255,.4)] flex flex-col justify-start gap-4 lg:text-xl`}
    >
      <div
        className={` flex justify-between
 ${item.complete ? "line-through" : ""} 
    `}
      >
        <div className="flex gap-2 items-center ">
          <input
            type="checkbox"
            className=" "
            checked={complete}
            onClick={() => {
              setComplete(!complete);
              handleComplete(item.id, complete);
            }}
          />
          <p className={`${complete ? "text-[#ccc]" : ""}`}>
            {item.task}
          </p>
        </div>

        <div className="flex gap-2 justify-center items-center ">
          <BiEdit
            size={25}
            onClick={() => handleEdit()}
            fill={`${theme == "dark" ? "rgba(2555,255,255,.6)" : "#ccc"} `}
          />
          <AiOutlineCloseCircle
            size={25}
            fill={`${theme == "dark" ? "rgba(2555,255,255,.6)" : "#ccc"} `}
            onClick={() => handleDeleteItem(item.id)}
          />
        </div>
      </div>

      {edit ? (
        <form className="w-full " onSubmit={(e) => handleSubmit(e)}>
          <input
            type=" "
            placeholder="type your edit ..."
            className="w-full bg-transparent border-2 border-blue-500 rounded-xl p-2"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={ref}
          />
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
