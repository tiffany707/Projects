
import { useState } from "react";
import axios from "axios";
function App() {
  const [newTodo, setNewTodo] = useState("")
  
  const addTodo = async (e) => {
    e.preventDefault();
    if(!newTodo.trim()){
      return;
    }
    try{
      const response = await axios.post("/api/todos", {text:newTodo})
    }
    catch(error){

    }
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
         <h1 className="font-bold text-2xl mb-4">Task Manager</h1>
        <form className="flex items-center gap-2 border-1 border-gray-200 shadow-sm rounded-2xl p-2">
          <input className="outline-none px-3 py-2 text-gray-800 placeholder-text-gray-500 p-2 flex-1"
            type="text"
            placeholder="What is your task?"
            value={newTodo}
            onChange={(e)=>setNewTodo(e.target.value)}
            required
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition cursor-pointer">Add Task</button>
        </form>
       </div>
    </div>


  )

}

export default App;