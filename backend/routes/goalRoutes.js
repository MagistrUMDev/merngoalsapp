const express = require("express");
const { getGoals, newGoal, updateGoal, deleteGoal } = require("../controllers/goalController");
const router = express.Router();

router.get("/api/goals", (req, res) => {
  getGoals(req, res);
});

router.post("/api/goals", (req, res) => {
  newGoal(req, res);
});

router.put("/api/goals/:id", (req, res) => {
  updateGoal(req, res);
});

router.delete("/api/goals/:id", (req, res) => {
  deleteGoal(req, res);
});

module.exports = router;
