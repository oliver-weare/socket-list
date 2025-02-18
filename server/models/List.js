const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  expired: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ["grocery", "todo"],
    required: true,
  },
});

ListSchema.methods._updateExpiredField = function () {
  const today = new Date().setHours(0, 0, 0, 0);
  this.expired = this.date < today;
};

const List = mongoose.model("List", ListSchema);

module.exports = List;
