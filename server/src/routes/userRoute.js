const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const HeroController = require('../controllers/heroController')
const ComicController = require('../controllers/comicController')
const UserLogin = require('../middleware/login')


router.post('/login', userController.login)
router.get('/', UserLogin.required, userController.index)

router.post('/', userController.store)
router.put('/:id', UserLogin.required, userController.update)
router.delete('/:id', UserLogin.required, userController.destroy)

router.get('/:user_id/heroes', UserLogin.required, HeroController.index)
router.post('/:user_id/heroes', UserLogin.required, HeroController.store)
router.delete('/:user_id/heroes/:hero_id', UserLogin.required, HeroController.delete)

router.get('/:user_id/comics', UserLogin.required, ComicController.index)
router.post('/:user_id/comics', UserLogin.required, ComicController.store)
router.delete('/:user_id/comics/:comic_id', UserLogin.required, ComicController.delete)


module.exports = router