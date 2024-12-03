const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mapRouteSchema = new Schema({
  title: { type: String, required: true },
  coordinates: { type: Array, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("MapRoute", mapRouteSchema);
