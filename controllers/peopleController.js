// link to model
const peopleData = require('../models/peopleModel')

// handle request to get all data
const getAllPeopleData = (req, res) => {
    // send data to browser
    res.render('allData.hbs', {data: peopleData})
    /* res.send(peopleData) */
}

// handle request to get one data instance
const getDataById = (req, res) => {
    // search the database by ID
    const data = peopleData.find(data => data.id === req.params.id)

    // return data if this ID exists
    if (data) {
        res.render('oneData.hbs', {oneItem: data})
    } else {
        // You can decide what to do if the data is not found.
        // Currently, an empty list will be returned.
        res.send('no patient found')
    }
}


// add an object to the database
const insertData = (req,res) => {
    // const newPeople = req.body
    // if(JSON.stringify(newPeople) != "{}") {
    //     if(!peopleData.find(data => data.id == newPeople.id)){
            
    //     }
    // peopleData.push(newPeople)
    // }


    // push the incoming JSON object to the array. (Note, we are not validating the data - should fix this later.)
    peopleData.push(req.body)
    // return the updated database
    res.send(peopleData)
}

module.exports = {
    getAllPeopleData,
    getDataById,
    insertData
}