// models/publisher.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  name: String,
  website: String,
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;