const Hero = require("../models/Hero")
const User = require("../models/User")



class HeroController {
    async index(req, res) {
        try {

            const { user_id } = req.params
            
            if(req.user.user_id != user_id) {
                return res.status(401).send({ erro: "not allowed" })
            }

            const user = await User.findByPk(user_id, {
                include: { association: 'heroes', through: {attributes: []}},
            })
            if (!user) {
                return res.status(404).send({ erro: "user not found" })
            }

            return res.send(user.heroes)
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

            const { hero_id } = req.body

            const user = await User.findByPk(user_id)
            if (!user) {
                return res.status(404).send({ erro: "user not found" })
            }

            const [ hero ] = await Hero.findOrCreate({
                where: { hero_id },
                defaults: {...req.body}
            })
            console.log(req.body)
            await user.addHero(hero)
           
            return res.status(201).send({ hero })
        } catch (err) {
            console.log(req.body, err)
            return res.status(400).send({ error: err.message })
        }
    }


    async delete(req, res) {
        try {

            const { user_id, hero_id } = req.params
            
            if(req.user.user_id != user_id) {
                return res.status(401).send({ erro: "not allowed" })
            }

            const user = await User.findByPk(user_id)
            if (!user) {
                return res.status(404).send({ erro: "user not found" })
            }

            const hero = await Hero.findOne({
                where: { hero_id }
            })

            await user.removeHero(hero)

            return res.status(200).send()
        } catch (err) {
            return res.status(400).send({ error: err.message })
        }
    }
}

module.exports = new HeroController()