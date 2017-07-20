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

// Update Contact

router.put('/contact/:id', function(req,res, next){
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.update({_id:req.params.id},function(err, contactus){
        if(err){
            res.json({msg: "Failed to Update Contact"});
        }
        else {
            res.json({msg: "Contact Update successfully."});
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