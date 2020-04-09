const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.get('/users', async (req, res) => {

    try{
        const user = await User.find({})
        res.send(user)
    }catch(e) {
        res.status(500).send()
    }
})

router.post('/users/login', async (req,res) => {

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    }catch (e) {
        res.status(400).send()
    }
})

router.get('/users/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch(e) {
        res.status(500).send()
    }
})

router.post('/users', async (req,res) =>{
    const user = new User(req.body)
    
    try{
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        res.status(400)
        res.send(e.message)
    }
})

router.patch('/users/:id', async (req,res) => {

    const updates = Object.keys(req.body)
    const validUpdates = ["name","password","email","age"]
    const isUpdatesValid = updates.every((item) => {
        if(validUpdates.includes(item)) return true
    })

    if(!isUpdatesValid) {
        return res.status(400).send('Invalid Update Operation')
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    }catch(e) {
        res.status(400).send(e)
    }

})

router.delete('/users/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const user = await User.findByIdAndDelete(_id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)

    }catch (e) {
        res.status(500).send()
    }
})


module.exports = router