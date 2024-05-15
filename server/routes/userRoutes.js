const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
// Handle user creation endpoint (assuming "/users" route)
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({ name, email, age });
    res.status(201).json(userAdded); // Send created user data
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send error message
  }
});

router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(201).json(showAll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id); // Use findById directly
    if (!singleUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(singleUser); // Respond with singleUser object
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//put pudate
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true,});
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
