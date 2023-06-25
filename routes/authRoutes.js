import { Router } from 'express'
import { authService } from '../services/authService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

router.post('/login', (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = authService.login({ email, password })
    res.send(user)
  } catch (err) {
    res.status(404).send({
      error: true,
      message: 'User no found',
    })
  } finally {
    next()
  }
})

export { router }
