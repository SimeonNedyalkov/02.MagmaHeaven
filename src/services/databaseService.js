const {Volcano} = require('../models/Volcano')

async function getAllVolcanoes(){
    return Volcano.find().lean()
}

// async function getRecent(){
//     return Volcano.find().sort({$natural:-1}).limit(3).lean()
// }

async function getVolcanoById(id){
    return Volcano.findById(id).lean()
}

async function create(data,authorId){
    const record = new Volcano({
        name : data.name,
        location:data.location,
        elevation:data.elevation,
        lastEruption:data.lastEruption,
        image:data.image,
        typeVolcano:data.typeVolcano,
        description:data.description,
        voteList:data.voteList,
        owner:authorId
    })
    await record.save()
    return record
}

async function vote(volcanoId,userId){
    const record = await Volcano.findById(volcanoId)
    if(!record){
        throw new Error('Volcano not found')
    }
    if(record.owner.toString() == userId){
        throw new Error('Access denied!')
    }
    if(record.voteList.find(l=>l.toString() == userId)){
        return
    }
    
    record.voteList.push(userId)
    
    await record.save()
    return record
}

async function update(volcanoId, data , authorId){
    const record = await Volcano.findById(volcanoId)
    if(!record){
        throw new Error('Volcano not found')
    }
    if(record.owner.toString() != authorId){
        throw new Error('Access denied!')
    }
    
    record.name = data.name
    record.location = data. location
    record.elevation = data.elevation
    record.lastEruption = data.lastEruption
    record.image = data.image
    record.typeVolcano = data.typeVolcano
    record.description = data.description
    console.log(record)
    await record.save()
    return record
}

async function deleteById(id,userId){
    const record = await Volcano.findById(id)
    if(!record){
        throw new ReferenceError(`Record not found ` + id)
    }
    if(record.owner.toString() != userId){
        throw new Error('Access denied')
    }
    await Volcano.findByIdAndDelete(id)
}

module.exports = {
    getAllVolcanoes,
    getVolcanoById,
    create,
    update,
    deleteById,
    vote
}