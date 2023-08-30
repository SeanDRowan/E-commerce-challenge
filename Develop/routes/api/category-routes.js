const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
      const catData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      })
      if (!catData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(catData);
    } 
    
    catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new category
   try {
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedcat) => {
      res.json(updatedcat);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
 // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
 Category.destroy({
  where: {
    id: req.params.id,
  },
})
  .then((deletedCat) => {
    res.json(deletedCat);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
