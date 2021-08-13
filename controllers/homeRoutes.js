const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  const projectData = await Project.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });
  const projects = projectData.map((project) => project.get({ plain: true }));
  res.render('homepage', {
    projects,
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