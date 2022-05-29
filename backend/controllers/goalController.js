const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
})

const newGoal = asyncHandler(async (req, res) => {
    req.body.text ? res.status(200).json({message: 'Set goal'}) : res.status(400); throw new Error('Please add a text field!')
})

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goal with Id ${req.params.id}` });
})

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goal with Id ${req.params.id}` });
})

module.exports = {
    getGoals,
    newGoal,
    updateGoal,
    deleteGoal,
}