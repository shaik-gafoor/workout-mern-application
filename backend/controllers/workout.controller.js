const Workout = require("../models/workout.model.js");
const mongoose = require("mongoose");
// get all workout

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//getting a single workouts

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//create new project

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.staus(400).json({ error: error.message });
  }
};

// delete the particular workout by an id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout to delete" });
    }
    res.status(200).json({ message: "Workout deleted successfully", workout });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workout" });
  }
};

// update particular workout by an id
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true, // returns updated document
      runValidators: true, // re-runs schema validations
    });
    if (!workout) {
      return res.status(404).json({ error: "No such workout to update" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout" });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
