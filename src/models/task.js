const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', (next) => {
    const task = this

    console.log('Alterating/creating a task')

    
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task