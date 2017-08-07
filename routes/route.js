const express = require('express');
const router = express.Router();

const Contact = require('../models/contactus');

// retriving data
router.get('/contactus', function(req,res, next){
     //res.send('Retriving Contact List');
     Contact.find(function(err, contactus){
         res.json(contactus);
     })
});

// add contact

/* Save Request*/
router.post('/contact', function(req,res, next){
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save(function(err, contactus){
        if(err){
            res.json({msg: "Failed to add Contact"});
        }
        else {
            res.json({msg: "Contact Added successfully."});
        }

    });

    
});

// Edit data
router.get('/contact/edit/:id', function(req,res, next){
     //res.send('Retriving Contact List');
     Contact.findOne({_id:req.params.id},function(err, contactus){
         res.json(contactus);
     })
});

// Update Contact

/*router.put('/contact/update/:id', function(req, res, next) {
    Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});*/


router.put('/contact/update/:id', function(req,res, next){

    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });
   
    Contact.findById(req.params.id, function (err, todo) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
      todo.first_name = req.body.first_name;
      todo.last_name= req.body.last_name;
      todo.phone = req.body.phone; 

      /*todo.first_name = 'James1';
      todo.last_name= 'Anderson1';
      todo.phone = '89988998891'; */



      todo.save(function (err, contactus) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.json({msg: "Contact Updated successfully."});
        }
       // res.send('Success' + req.body.first_name);
      });
       
    }
    });
});

// delete contact
router.delete('/contact/:id', function(req,res, next){
    Contact.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;