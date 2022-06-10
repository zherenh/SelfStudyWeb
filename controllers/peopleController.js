/*
// link to model
// const peopleData = require('../models/peopleModel')

// handle request to get all data
const getAllPeopleData = (req, res) => {
    // send data to browser
    res.render('allData.hbs', {data: peopleData})
    // res.send(peopleData)
}

// handle request to get one data instance
const getDataById = (req, res) => {
    // search the database by ID
    const data = peopleData.find(theData => theData.id === req.params.id)

    // return data if this ID exists
    if (data) {
        res.render('oneData.hbs', {oneItem: data})
    } else {
        // You can decide what to do if the data is not found.
        // Currently, an empty list will be returned.
        res.send('no patient found')
    }
}
*/


const Author = require('../models/author') 

const getAllPeopleData = async (req, res, next) => { 
    try { 
        const authors = await Author.find().lean() 
        return res.render('allData', { data: authors }) 
    } catch (err) { 
        return next(err) 
    } 
} 

const getDataById = async(req, res, next) => { 
    try { 
        const author = await Author.findById(req.params.author_id).lean() 
        if (!author) { 
            // no author found in database
            return res.sendStatus(404) 
        } 
        // found person 
        return res.render('oneData', { oneItem: author }) 
    } catch (err) { 
        return next(err) 
    } 
} 

const insertData = async(req, res, next) => { 
    try { 
        const author = new Author({
            first_name: req.body.firstname,
            last_name: req.body.lastname
        })
        await author.save().catch((err) => res.send(err))
        res.redirect('back')
    } catch (err) { 
        return next(err) 
    } 
}

/*
// add an object to the database
const insertData = (req,res) => {
    const newPeople = {
        "id": req.body.id,
        "first_name": req.body.firstname,
        "last_name": req.body.lastname
    };

    // if(JSON.stringify(newPeople) != "{}") {
    //     if(!peopleData.find(data => data.id == newPeople.id)){
            
    //     }
    // peopleData.push(newPeople)
    // }
    console.log(req.body);
    // push the incoming JSON object to the array. (Note, we are not validating the data - should fix this later.)
    peopleData.push({
        "id": req.body.id,
        "first_name": req.body.firstname,
        "last_name": req.body.lastname
    })
    // return the updated database
    // res.rede(peopleData)
    res.redirect('back')
}
*/

module.exports = {
    getAllPeopleData,
    getDataById,
    insertData
}
