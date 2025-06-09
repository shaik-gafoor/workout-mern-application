const express = require("express");
const Workout = require("../models/workout.model.js");
const router = express.Router();
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workout.controller.js");

// Get all workouts
router.get("/", getWorkouts);

// Get a single workout
router.get("/:id", getWorkout);

// Create a new workout
router.post("/", createWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
