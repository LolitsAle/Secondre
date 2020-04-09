const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/tasks', async (req,res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)

        if(!task) {
            res.status(404).send()
        }

        res.send(task)
    }catch (e) {
        res.status(500).send()
    }
})

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(200).send(task)
    }catch (e) {
        res.status(400)
        res.send(e.message)
    }
})

router.patch('/tasks/:id', async (req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["name"]
    const isUpdateOperation = updates.every((item) => {
        if(allowedUpdates.includes(item)) return true
    })

    if(!isUpdateOperation) {
        res.status(400).send('Invalid Opperation...')
    }

    try { 
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} )
        
        if(!task) {
            res.status(404).send()
        }

        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findByIdAndDelete(_id)

        if(!task){
            res.status(400).send()
        }

        res.send(task)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router