const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 150,
    },
    description: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 500,
    },
    userId: { 
        type: String,
        require: true,
        trim: true
    },
    taskStartTime: [{
      type: Date,
    }],
    taskEndTime: [{
      type: Date,
    }],
    taskDuration: {
      type: Number,
      default: 0, 
    },
    taskStatus: {
      type: String,
      enum: ['Pending', 'Ongoing', 'Paused', 'Completed'],
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.methods.calculateDuration = function() {
  let totalDuration = this.taskDuration;  // Start with the stored duration
  for (let i = 0; i < this.taskStartTime.length; i++) {
    const startTime = new Date(this.taskStartTime[i]).getTime();
    const endTime = this.taskEndTime[i] ? new Date(this.taskEndTime[i]).getTime() : Date.now();
    totalDuration += Math.floor((endTime - startTime) / 1000);
  }
  return totalDuration;
};

module.exports = mongoose.model("Task", taskSchema);