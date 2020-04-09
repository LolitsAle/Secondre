require('../src/db/mongoose')
const User = require('../src/models/user')



// User.findByIdAndUpdate('5e7df09483b4072464b128b8',{ age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age : 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age })
    
    return count
}

updateAgeAndCount('5e7f1024ff4fba2bb4d97a76', 5).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
}) 