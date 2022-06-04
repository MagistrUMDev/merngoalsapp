const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");

const getGoals = asyncHandler(async (req, res) => {
  goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const newGoal = asyncHandler(async (req, res) => {
  if (req.body.text) {
    addGoal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(200).json(addGoal);
  } else {
    res.status(400);
    throw new Error("Please add a text field!");
  }
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  //Check for User
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the one, whose goal we want to update
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized!')

  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //Check for User
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the one, whose goal we want to delete
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized!')

  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  newGoal,
  updateGoal,
  deleteGoal,
};
