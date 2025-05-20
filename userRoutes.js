
const express = require("express");
const User = require("./user.js");
const router = express.Router();
const bcrypt = require("bcrypt");

// Retieving All Users In Document

router.get('/', async(req, res) => {

    try {
    const users = await User.find();
    if (users.length > 0) {
        res.status(200).json({message: "Users: ", users});
    }  else {
        res.status(404).json({message: "No user in system"})
    }

} catch (err) {
    res.status(404).json("No User In System");
}
});

// Retieving User By Specified Id

router.get('/:id', async(req, res) => {
    try {

    // const credentials = await User.findById(req.params.id);
 const credentials = await User.findOne({ id: parseInt(req.params.id) }); // by using your custom id

    if (credentials) {
        res.status(200).json(credentials);
    } 
} catch (err) {
    res.status(404).json("Data not found");
}
});

// Login I will continue at school
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user.findOne({ email });
    if (!user) return res.status(404).json({message: "No User Found"});
    const IsMatch = await bcrypt.compare(password, user.password);
    if(!IsMatch) return res.status(200).json("Login Successfully");
  } catch (err) {
    res.status(500).json({message:"Server Error", error: err.message});
  }
    
})

router.post('/add', async(req, res) => {
    try {
    //   console.log("Received data", req.body);
      const salt = await bcrypt.genSalt(10);
      const HashedPass = await bcrypt.hash(req.body.password, salt);
      const NewUser = {
           ...req.body,
           password: HashedPass
      }
      const newUser = await User.create(NewUser);
      res.status(201).json(newUser);

    } catch(err) {
        res.status(404).json({message:"Data Not Inseted",Error: err.message});
    }
});

router.put('/:id', async(req, res) => {
   try {
    // const updated = await User.findByIdAndUpdate(
    const updated = await User.findOneAndUpdate( //by using your custom id
        { id: parseInt(req.params.id) }, 
        req.body,
       {new: true}
    );

    if (updated) {
        res.status(201).json({message :"Data Updated", User});
    } 
} catch (err) {
    res.status(404).json({message:"Id Not Found", Error:err.message});
}
});

router.delete('/:id', async(req, res) => {
    try {

    // const deleted = await User.findByIdAndDelete(req.params.id);
    const deleted = await User.findOneAndDelete({ id: parseInt(req.params.id) });

    if (deleted) {
        res.status(200).json("User Deleted");
    }
    } catch (err) {
        res.status(404).json("User Not found", err);
    }
});

module.exports = router;