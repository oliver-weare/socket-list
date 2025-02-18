const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const List = require("../models/List");

router.post("/create", async (request, response) => {
  try {
    const { name, listID, category } = request.body;

    const newItem = new Item({
      name,
      list: listID,
      category,
    });

    const savedItem = await newItem.save();

    const listToUpdate = await List.findById(listID);
    listToUpdate.items.push(savedItem._id);
    await listToUpdate.save();

    request.io.emit("itemAdded", { listID, item: savedItem });

    response.status(201).json(savedItem);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const item = await Item.findById(request.params.id);
    if (!item) {
      return response.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();

    request.io.emit("itemDeleted", { listID: item.list, itemID: item._id });

    response.status(200).json({ message: "Item deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.put("/toggle-picked/:id", async (request, response) => {
  try {
    const item = await Item.findById(request.params.id);
    if (!item) {
      return response.status(404).json({ message: "Item not found" });
    }

    item.pickedUp = !item.pickedUp;

    await item.save();

    request.io.emit("itemToggled", { listID: item.list, item });

    response.status(200).json(item);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.put("/shift/:id", async (request, response) => {
  try {
    const { newListID } = request.body;

    const item = await Item.findById(request.params.id);
    if (!item) {
      return response.status(404).json({ message: "Item not found" });
    }

    const originalItemListID = item.list;

    const originalList = await List.findById(originalItemListID);
    if (originalList) {
      originalList.items.pull(item._id);
      await originalList.save();
    }

    const newList = await List.findById(newListID);
    if (!newList) {
      return response.status(404).json({ message: "New list not found" });
    }
    newList.items.push(item._id);
    await newList.save();

    item.list = newListID;
    await item.save();

    request.io.emit("itemShifted", { item, originalItemListID, newListID });

    response.status(200).json(item);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
