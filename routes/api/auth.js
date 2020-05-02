const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
//@router   /api/auth/
//@desc     Test Route
//@access   Public
router.get('/', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select('-password -__v');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.post(
  '/login',
  [
    check('email', 'Email is required to login').not().isEmpty(),
    check('password', 'Password should be min 6 letters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'email or password wrong' }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'email or password wrong' }] });
    }

    //creating payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    //create token.
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err != null) throw err;
        return res.json({ login: 'success', token: token });
      }
    );
  }
);

module.exports = router;
