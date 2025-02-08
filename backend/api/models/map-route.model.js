const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mapRouteSchema = new Schema({
  title: { type: String, required: true },
  coordinates: { type: Array, required: true },
  distance: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  status: { type: Boolean, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("MapRoute", mapRouteSchema);
