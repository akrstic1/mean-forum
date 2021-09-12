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

  apiRouter
    .route('/posts')
    .get(async function (req, res) {
      try {
        let posts = await db.collection('posts').find({}).toArray();
        res.json(posts);
      } catch (e) {
        res.sendStatus(404);
      }
    })
    .post(async function (req, res) {
      try {
        let newPost = {
          text: req.body.text,
          user_id: req.body.user_id,
          category_id: req.body.category_id,
          category_name: req.body.category_name,
          theme: req.body.theme,
          replies: req.body.replies,
          date: req.body.date,
        };

        await db.collection('posts').insertOne(newPost, function (err, data) {
          if (!err) {
            res.json(200);
          } else {
            res.json(404);
          }
        });
      } catch (e) {
        res.json(404);
      }
    });

  apiRouter
    .route('/posts/:id')
    .get(async function (req, res) {
      try {
        let post = await db.collection('posts').findOne({ _id: ObjectId(req.params.id) });
        res.json(post);
      } catch (e) {
        res.sendStatus(404);
      }
    })
    .post(async function (req, res) {
      try {
        let posts = await db.collection('posts').updateOne(
          { _id: ObjectId(req.params.id) },
          {
            $push: {
              replies: {
                _id: new ObjectId(),
                reply_text: req.body.reply_text,
                reply_user_id: req.body.reply_user_id,
                reply_date: req.body.reply_date,
              },
            },
          }
        );
        res.json(posts);
      } catch (e) {
        res.sendStatus(404);
      }
    })
    .put(async function (req, res) {
      try {
        let posts = await db
          .collection('posts')
          .updateOne({ _id: ObjectId(req.params.id) }, { $pull: { replies: { _id: ObjectId(req.body.replyId) } } });
        res.sendStatus(200);
      } catch (e) {
        res.sendStatus(404);
      }
    })
    .delete(async function (req, res) {
      try {
        await db.collection('posts').removeOne({
          _id: ObjectId(req.params.id),
        });
        res.json({ status: 'OK' });
      } catch (e) {
        res.json({ status: 'NOT OK' });
      }
    });

  apiRouter.route('/posts/:id/likes/').get(async function (req, res) {
    try {
      let likes = await db.collection('likes').find({ post_id: req.params.id }).project({ user_id: 1 }).toArray();
      res.json(likes);
    } catch (e) {
      res.json(404);
    }
  });

  apiRouter
    .route('/posts/:postId/likes/:userId')
    .post(async function (req, res) {
      try {
        let isLiked = await db
          .collection('likes')
          .find({ user_id: req.params.userId, post_id: req.params.postId })
          .toArray();

        if (isLiked.length == 0) {
          let newLike = {
            post_id: req.params.postId,
            user_id: req.params.userId,
          };

          await db.collection('likes').insertOne(newLike, function (err, data) {
            if (!err) {
              res.json(200);
            } else {
              res.json(404, 'yoo');
            }
          });
        } else {
          res.json(304);
        }
      } catch (e) {
        res.json(405);
      }
    })
    .delete(async function (req, res) {
      try {
        let isLiked = await db
          .collection('likes')
          .find({ user_id: req.params.userId, post_id: req.params.postId })
          .toArray();
        if (isLiked.length != 0) {
          await db.collection('likes').removeOne({ user_id: req.params.userId, post_id: req.params.postId });
        }
        res.json({ status: 'OK' });
      } catch (e) {
        res.json({ status: 'NOT OK' });
      }
    });

  apiRouter.route('/users').get(async function (req, res) {
    try {
      let users = await db.collection('users').find({}).project({ password: 0 }).toArray();
      res.json(users);
    } catch (e) {
      res.sendStatus(404);
    }
  });

  return apiRouter;
};
