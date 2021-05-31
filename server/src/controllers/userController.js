const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
  async index(req, res) {
    try {

      if (req.user.user_id != 1) {
        return res.status(401).send({ erro: "not allowed, only master can list users" })
      }

      const user = await User.findAll()

      return res.send(user)
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async show(req, res) {
    try {

      if (req.user.user_id != req.params.id) {
        return res.status(401).send({ erro: "not allowed" })
      }

      const user = await User.findByPk(req.params.id)
      if (!user) {
       return res.status(404).send({erro: "user not found"})
      }

      return res.send(user)
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  

  async login(req, res) {
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email }
      })
      if (!userExist) {
        console.log(userExist)
        return res.status(401).send({ error: 'Authentication failed' })
      }

      if (bcrypt.compareSync(req.body.password, userExist.password)) {
        const token = jwt.sign({
          user_id: userExist.id,
          name: userExist.name
        },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          });
        return res.status(200).send({
          message: 'Successfully authenticated',
          user: userExist.name,
          user_id: userExist.id,
          token: token
        })
      }
      return res.status(401).send({ message: 'Authentication failed' })

    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async store(req, res) {
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email }
      })
      if (userExist) {
        console.log(userExist)
        return res.status(409).send({ erro: "User already registered" })
      }

      const hash = bcrypt.hashSync(req.body.password, 10)

      const user = await User.create({
        ...req.body,
        password: hash
      })

      return res.status(201).send({ inserted_user: user })
    } catch (err) {
      return res.status(500).send({ error: err.message })
    }
  }

  async update(req, res) {
    try {

      if (req.user.user_id != req.params.id) {
        return res.status(401).send({ erro: "not allowed" })
      }

      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ erro: "user not found" })
      }
      await user.update(req.body)

      return res.status(200).send({ altered_user: user })
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async destroy(req, res) {
    try {

      if (req.user.user_id != req.params.id) {
        return res.status(401).send({ erro: "not allowed" })
      }

      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ erro: "user not found" })
      }

      await user.destroy()

      return res.status(200).send({ deleted_user: user })
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }
}

module.exports = new UserController()