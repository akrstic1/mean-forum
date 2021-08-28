module.exports = function (app, express, db, jwt, secret) {
  let apiRouter = express.Router();
  let ObjectId = require('mongodb').ObjectId;

  apiRouter.route('/categories').get(function (req, res) {
    //res.json({ message:"Dobro dosli u api"});
    db.collection('category')
      .find({})
      .toArray(function (err, categories) {
        if (!err) {
          res.json(categories);
        } else {
          res.sendStatus(404);
        }
      });
  });

  apiRouter.route('/posts').get(async function (req, res) {
    try {
      let posts = await db.collection('posts').find({}).toArray();
      res.json({ status: 'OK', posts });
    } catch (e) {
      res.json({ status: 'NOT OK' });
    }
  });

  apiRouter.route('/posts/:id').get(async function (req, res) {
    try {
      let post = await db
        .collection('posts')
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      res.json({ status: 'OK', post });
    } catch (e) {
      res.json({ status: 'NOT OK' });
    }
  });

  apiRouter.route('/users').get(async function (req, res) {
    try {
      let users = await db.collection('users').find({}).project({ password: 0 }).toArray();
      res.json({ status: 'OK', users });
    } catch (e) {
      res.json({ status: 'NOT OK' });
    }
  });

  return apiRouter;
};
