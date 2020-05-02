const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

//@route /api/profile/me
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    console.log(profile);
    if (!profile) {
      return res
        .status(404)
        .json({ errors: [{ msg: "profile doesn't exist" }] });
    }
    res.json(profile.populate('user', ['name', 'avatar']));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/save',
  auth,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json(errors);
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      console.log(profileFields);
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    return res.status(201).json(profile);
  }
);

//@router   /api/profile/
//@desc     Test Route
//@access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).send('server error');
  }
});

//@route /api/profile/me
router.get('/user/:user_id', async (req, res) => {
  const userid = req.param('user_id');
  try {
    const profile = await Profile.findOne({
      user: userid,
    });
    console.log(profile);
    if (!profile) {
      return res
        .status(404)
        .json({ errors: [{ msg: "profile doesn't exist" }] });
    }
    res.json(profile.populate('user', ['name', 'avatar']));
  } catch (err) {
    console.error(err);
    res.status(500).send("Id doesn't exist");
  }
});

router.delete('/delete', auth, async (req, res) => {
  //@ToDo delete posts as well
  try {
    console.log(req.user.id);
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    return res.json('Profile and user deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('server error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const expId = req.params.exp_id;
    const profile = await Profile.findOne({ user: req.user.id });
    console.log('profile:', profile);
    profile.experience = profile.experience.filter(exp => exp.id != expId);
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      edu => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
// router.get('/github/:username', async (req, res) => {
//   try {
//     const uri = encodeURI(
//       `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
//     );
//     const headers = {
//       'user-agent': 'node.js',
//       Authorization: `token ${config.get('githubToken')}`,
//     };

//     const gitHubResponse = await axios.get(uri, { headers });
//     return res.json(gitHubResponse.data);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(404).json({ msg: 'No Github profile found' });
//   }
// });

router.get('/github/:username', (req, res) => {
  const options = {
    uri: encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    ),
    method: 'GET',
    headers: {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    },
  };
  request(options, (err, response, body) => {
    if (err != null) return res.status(400).send('unable to fetch data');
    console.log('response code from github:', response);
    // if (response != 200)
    //   return res.status(404).send("GitHub Profile doesn't exist");
    return res.json(JSON.parse(body));
  });
});

module.exports = router;
