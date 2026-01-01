import Task from "../model/task.model"

//create task
export const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get all tasks
export const getTasks = async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.status(200).json(tasks)
}

//update task
export const updateTask = async (req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true })
        res.status(200).json(task)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete task
export const deleteTask = async (req,res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Task deleted successfully" })
}