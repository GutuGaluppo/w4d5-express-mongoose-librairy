const express = require('express');
const router = express.Router();

router.get('/:carrot', (req, res, next) => {
  res.render('hello', {
    name: req.params.carrot
  });
});

module.exports = router;
