const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in
  });
  if (err) {
    res.status(500).json(err)
   };
  res.render("homepage");
});
router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
module.exports = router;