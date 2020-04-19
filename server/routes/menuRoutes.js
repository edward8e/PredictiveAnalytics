const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Category = mongoose.model('categories');
const MenuItem = mongoose.model("menuItems");


module.exports = app => {
  app.post("/api/menu/item", requireLogin, async (req, res) => {
    const { itemName, description, category, price } = req.body;

    const menuItem = new MenuItem({
      itemName,
      description,
      category,
      price,
      _user: req.user.id,
      dateCreated: Date.now(),
      dateUpdated: new Date()
    });

    try {
      await menuItem.save();
      res.send("success");
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/menu/item", async (req, res) => {
    const menuItems = await MenuItem.find({}).populate("category").populate("_user");
    res.send(menuItems);
  });
  app.post("/api/menu/item/delete", requireLogin, async (req, res) => {
    const { _id } = req.body;
    try {
      await MenuItem.updateOne({ _id: _id },{active: false});
      const menuItems = await MenuItem.find();
      res.send(menuItems);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/menu/item/toggle", requireLogin, async (req, res) => {
    const { _id, toggle } = req.body;
    try {
      await MenuItem.updateOne({ _id: _id },{active: toggle});
    } catch (err) {
      res.status(422).send(err);
    }
    res.send("success");
  });

  app.post("/api/menu/item/update", requireLogin, async (req, res) => {
    const { _id, category, description, itemName, price } = req.body;
    const response = await MenuItem.updateMany({}, { active: true })
    console.log(response.n)
    
    try {
      await MenuItem.updateOne(
        { _id: _id },
        {
          category,
          description,
          itemName,
          price,
          dateUpdated: new Date()
        }
      );
      res.send("success");
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/menu/category", requireAdmin, async (req, res) => {
    const {categoryName, description} = req.body;
    const category = new Category({
      categoryName,
      description,
      _user: req.user.id,
      dateCreated: Date.now(),
      dateUpdated: new Date()
    })
    try {
      await category.save();
      res.send("success");
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.get("/api/menu/category", async (req, res) => {
    const category = await Category.find({}).populate("_user");
    try {
      res.send(category);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/api/menu/category/update",requireAdmin, async (req, res) => {
    const {_id, categoryName, description}= req.body;
    await Category.updateOne({_id:_id},{
      categoryName,
      description,
      dateUpdated: new Date()
    })
    try {
      res.send("success");
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/api/menu/category/delete",requireAdmin, async (req, res) => {
    const {_id}= req.body;
    await Category.updateOne({ _id: _id },{active: false});
    try {
      res.send("success");
    } catch (err) {
      res.status(422).send(err);
    }
  });

};
