// Requirement for creating a routing
const router = require('express').Router();

// Import the mongoose model
let User = require('../models/user.model');

// Handles the get request which is incoming
// Request = incoming, response = outgoing
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error '+ err));
});

// Handles the post request to /add
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error '+ err));
    
});

module.exports = router;