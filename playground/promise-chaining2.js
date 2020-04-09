require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5e7f143a7d7beb2938dc2a0c').then((result) => {
//     console.log('removed task with id: ' + result.id)

//     return Task.countDocuments({ completed: false })
// }).catch((e) => {
//     console.log(e)

//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// })

const taskDeleteAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: completed})

    return count
}

taskDeleteAndCount('5e7f13a278374e277843a0cd', false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})