// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

//destructuring things...
const { MongoClient, ObjectID } = require('mongodb')

// const id = new ObjectID().toHexString()
// console.log(id.length)


const connectionURL = 'mongodb://127.0.0.1:27017'
const databasename = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to database!!!')
    }
    const db = client.db(databasename)

    console.log('Connectted to database...')

    // db.collection('users').findOne({name:'Tung'},(err,result)=>{
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log(result)
    // })
    

    // db.collection('users').find({name:'Tung'}).toArray((err, result) => {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log(result)

    //     result.filter((value, index) => {
    //         const ob = new ObjectID(value._id)
    //         console.log(ob.getTimestamp())
    //         Date.UTC()
    //     })
    // })

    // db.collection('users').find({name:'Son'}).count((err, result) => {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log( result)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e78f150bef89f1f7c0859d9')
    // }, {
    //     $inc: {
    //         age: 1
    //     },
    //     $set: {
    //         name:'SonDeptrai'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteOne({name:'Linh'}).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
})