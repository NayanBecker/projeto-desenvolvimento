const express = require('express');
const router = express.Router();
const model = require('../../../models');

router.get(process.env.BASE_URL + '/api/v1/rest/post',
  async function (req, resp) {
    try {
      const posts = await model.post.findAll({
        include: [
          {
            model: model.reply,
            as: 'replies',
            required: false,
          },
        ],
      });
      resp.json(posts);
    } catch (error) {
      console.error(error);
      resp.status(500).json({ error: 'Internal server error' });
    }
  });
router.post(process.env.BASE_URL + '/api/v1/rest/post',
  async function (req, resp) {
    const Post = await model.Post.schema('public');
    const data = req.body;
    try {
      console.log(data.post);
      result = await Post.create(data.post);
      return resp.status(201).send().json(result);
    } catch (err) {
      return resp.status(500).send().json({ error: err, result });
    }
  });
router.delete(
  process.env.BASE_URL + '/api/v1/rest/post/:id',
  async function (req, resp) {
    const id = req.params.id;
    const Post = await model.Post.schema('public');
    const data = await Post.findByPk(id);
    const reply = await model.reply.schema('public');
    if (!data) {
      return resp.status(404).send({ error: 'Não encontrado' });
    }
    try {
      const antigo = { ...data.dataValues };
      await reply.destroy({
        where: {
          id_post: id
        },
      });
      await data.destroy();
      return resp.send({ success: true, msg: `Post ${antigo.title} deletado com sucesso!` });
    } catch (error) {
      console.log(error);
      return resp.status(500).send({ error });
    }
  },
);
module.exports = router;