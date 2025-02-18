const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pickedUp: { type: Boolean, default: false },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  category: {
    type: String,
    enum: ["grocery", "todo"],
    required: true,
  },
});

ItemSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const list = await this.model("List").findById(this.list);
      if (list) {
        list.items.pull(this._id);
        await list.save();
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
