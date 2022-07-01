const Todo = require("../models/todoModel")

const createTodo = async(req, res) => {
    const body =  req.body;
    const {title} = req.body

    const todoExist = await Todo.find({title: title}).catch(error => {
        console.log(error.message);
        return res.status(200).json({ success: false, message: "failed to find item"})
    });
    // console.log(todoExist)
    if(todoExist.length > 0){
        return res.status(200).json({ success: false, message: "Item already exists"})
    }

    const newTodo = new Todo({
        ...body,
    })

    let error =  newTodo.validateSync();
    if(error){
        console.log(error.message)
        return res.status(400).json({ success: false, message: "failed to create"})
    }

    newTodo.save();
    res.status(201).json({ success: true, data: newTodo})
}

const getTodos = async(req, res) => {
    const { page = 0, limit = 5 } = req.query;

   const todos = await Todo.find()
   .sort({"createdAt": -1})
   .paginate({ page, limit})
   .catch(error => {
    console.log(error.message);
    return res.status(200).json({ success: false, message: "failed to get data"})
   });
   res.status(200).json({ success: true, data: todos})
}

const updateTodo = async(req, res) => {
    const body = req.body;
    const {id} = req.params;

    const todo = await Todo.findByIdAndUpdate({ _id: id}, body, { new: true, runValidators: true}).catch(error => {
        console.log(error.message);
        return res.status(400).json({ success: false, message: "failed to update"})
    })

    res.status(200).json({ success: true, data: todo})
}

const deleteTodo = async(req, res) => {
   const {id} = req.params;

   const todo = await Todo.findOne({ _id: id }).catch(error => {
    console.log(error.message);
    return res.status(200).json({ success: false, message: 'failed to delete item'})
   })

   if(!todo){
    return res.status(200).json({ success: false, message: 'todo item do not exist'})
   }else{
    todo.delete()
    res.status(200).json({ success: true, title: todo.title, message: 'todo item deleted', })
   }
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}
