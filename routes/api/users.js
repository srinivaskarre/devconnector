const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@router   /api/user/
//@desc     Save User
//@access   Public
router.post(
  '/save',
  //validation checks
  [
    check('name', 'name is required to signup').not().isEmpty(),
    check('email', 'Email is required to signup').not().isEmpty(),
    check('password', 'Password Should be min 6').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('user entry', req.body);
    try {
      //Validation of request entity
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json(errors);
        return;
      }
      //prepare fields of user
      const { name, email, password } = req.body;
      //check user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(200).json({ errors: [{ msg: 'User already exists' }] });
        return;
      }
      //build avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      //building entity
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      console.log('user built:', user);
      //password hashing
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //persist user
      await user.save();

      //return json token for user to directly login
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          console.log(token);
          if (err != null) {
            return res.json(
              'Unable to generate token, try logging in with username and passowrd'
            );
          }
          return res.status(201).json({ created: 'true', token: token });
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
);

module.exports = router;
