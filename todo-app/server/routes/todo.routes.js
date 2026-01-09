import express from "express"
import ToDo from "../models/todo.model.js"

const router = express.Router();

//get all todos
router.get("/", async (req,res)=>{
    try{
        const todos = await ToDo.find();
        res.json(todos);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

//add new todo
router.post("/", async (req, res) => {
    const todo = new ToDo({
        text: req.body.text
    });
    try{
        const newToDo = await todo.save();
        res.status(201).json(newToDo);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

//Update todo text text and/or completed 
router.patch('/:id', async (req, res) => {
    try{
        const findToDo = await ToDo.findById(req.params.id);
        if(! findToDo){
            return res.status(404).json({message:"ToDo not found"});
        }
        
        if(req.body.text !== undefined){
            findToDo.text = req.body.text;
        }

        if(req.body.completed != undefined){
            findToDo.completed = req.body.completed;
        }

        const updatedToDo = await findToDo.save();
        res.json(updatedToDo);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }

})

//delete the task
router.delete("/:id", async (req, res) => {
    try{
        const todo = await ToDo.findByIdAndDelete(req.params.id);
        res.json({message:"ToDo updated"})
    }
    catch(error){
         return res.status(500).json({message:error.message})
    }
    
   
})

export default router;