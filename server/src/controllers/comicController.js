const Comic = require("../models/Comic")
const User = require("../models/User")



class ComicController {
    async index(req, res) {
        try {

            const { user_id } = req.params
            
            if(req.user.user_id != user_id) {
                return res.status(401).send({ erro: "not allowed" })
            }

            const user = await User.findByPk(user_id, {
                include: { association: 'comics', through: {attributes: []}},
            })
            if (!user) {
                return res.status(404).send({ erro: "user not found" })
            }



            return res.send(user.comics)
        } catch (err) {
            return res.status(400).send({ error: err.message })
        }
    }

    async store(req, res) {
        try {

            
            const { user_id } = req.params
            
            if(req.user.user_id != user_id) {
                return res.status(401).send({ erro: "not allowed" })
            }

            const { comic_id } = req.body

            const user = await User.findByPk(user_id)
            if (!user) {
                return res.status(404).send({ erro: "user not found" })
            }

            const [ comic ] = await Comic.findOrCreate({
                where: { comic_id },
                defaults: {...req.body}
            })
            await user.addComic(comic)
           
            return res.status(201).send({ comic })
        } catch (err) {
            return res.status(400).send({ error: err.message })
        }
    }


    async delete(req, res) {
        try {

            const { user_id, comic_id } = req.params
            
            if(req.user.user_id != user_id) {
                return res.status(401).send({ erro: "not allowed" })
            }

            const user = await User.findByPk(user_id)
            if (!user) {
                return res.status(404).send({ erro: "user not found" })
            }

            const comic = await Comic.findOne({
                where: { comic_id }
            })

            await user.removeComic(comic)

            return res.status(200).send()
        } catch (err) {
            return res.status(400).send({ error: err.message })
        }
    }
}

module.exports = new ComicController()