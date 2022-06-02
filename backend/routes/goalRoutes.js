const express = require("express");
const { getGoals, newGoal, updateGoal, deleteGoal } = require("../controllers/goalController");
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.route("/api/goals").get(protect, getGoals).post(protect, newGoal)
router.route('/api/goals/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router;
