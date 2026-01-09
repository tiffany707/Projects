
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";
function App() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText]  = useState("")
  async function retrieveTodo() {
    try{
      const response = await axios.get("/api/todos");
      const data =  response.data;
      setTodos(data);
    }
    catch(error){
      console.log(error.message);
    }
  }

  const addTodo = async (e) => {
    e.preventDefault();
    if(!newTodo.trim()){
      return;
    }
    try{
      const response = await axios.post("/api/todos", {text:newTodo})
      setTodos([...todos, response.data]);
      setNewTodo("");
    }
    catch(error){
        console.log(error.message)
    }
  }

  const startEditing = (item) =>{
    setEditingTodo(item._id);
    setEditedText(item.text)
  }

  function closeEditing() {
    setEditingTodo(null);
    setEditedText("");
  }

  async function confirmEditing(id){
    try{
      const response = await axios.patch(`/api/todos/${id}`,{
        text: editedText
      });
      setTodos(todos.map((item) => item._id == id ? response.data : item))
      setEditingTodo(null);
      setEditedText("");
    }
    catch(error){
      console.log(error.message);
    }
  }

  async function deleteTodo(id){
    try{
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((item) => item._id !== id ));
    }
    catch(error){
      console.log(error.message);
    }
  }

  async function taskCompleted(item){
    try{
      const response = await axios.patch(`/api/todos/${item._id}`,{
        completed: !item.completed
      });

      setTodos(todos.map((todo)=> todo._id == item._id ? response.data : todo));
    }
    catch(error){
      console.log(error.message);
    }

  }


  useEffect(()=>{
    retrieveTodo();}, []);


  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
         <h1 className="font-bold text-2xl mb-4">Task Manager</h1>
        <form onSubmit={addTodo} className="flex items-center gap-2 border-1 border-gray-200 shadow-sm rounded-2xl p-2">
          <input className="outline-none px-3 py-2 text-gray-800 placeholder-text-gray-500 p-2 flex-1"
            type="text"
            placeholder="What is your task?"
            value={newTodo}
            onChange={(e)=>setNewTodo(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition cursor-pointer">Add Task</button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ? (
            <div></div>
          ):
          (
            <div className="flex flex-col gap-4">
              {todos.map((item) => (
                <div className = "" key={item._id}>{editingTodo === item._id ? (
                  <div className ="flex items-center gap-x-3">
                    <input className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner " type="text" value={editedText} onChange={(e)=>(setEditedText(e.target.value ))}/>
                      <div className="flex gap-x-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer" onClick={() => confirmEditing(item._id)}> <MdOutlineDone/> </button>
                        <button className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 cursor-pointer"onClick={() => closeEditing()}> <IoClose /> </button>
                    </div>
                  </div>) :
                  (<div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-4 overflow-hidden">
                        <button onClick={()=>taskCompleted(item)} className={`flex-shrink-0 flex h-6 w-6 border rounded-full items-center justify-center ${item.completed == true ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"}`}> {item.completed == true && <MdOutlineDone />} </button>
                        <span className=" truncate text-gray-800 font-medium">{item.text}</span>
                      </div>
                      <div className="flex gap-x-3">
                        <button className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 duration-200 rounded-lg" onClick={() => startEditing(item)}> <MdModeEditOutline /> </button>
                        <button className="p-2 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 duration-200" onClick={()=>deleteTodo(item._id)}><FaTrash /></button>
                      </div>
                    </div>
                  </div>)}
                </div>
              ))}
            </div>
          )
          }
        </div>
       </div>
    </div>


  )

}

export default App;