import { Router } from 'express'
import { userService } from '../services/userService.js'
import { createUserValid, updateUserValid } from '../middlewares/user.validation.middleware.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

//get all users
router.get(
  '/',
  (_, res, next) => {
    try {
      const users = userService.getAll()

      if (!users.length) {
        res.err = 'Users not found'
        res.errCode = 404
      } else {
        res.data = users
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

//create user
router.post(
  '/',
  createUserValid,
  (req, res, next) => {
    try {
      const userData = req.body
      const user = userService.create(userData)
      res.data = user
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

// find by id user
router.get(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params
      const user = userService.getById(id)

      if (!user) {
        res.err = 'User not found'
        res.errCode = 404
      } else {
        res.data = user
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

//update user
router.put(
  '/:id',
  updateUserValid,
  (req, res, next) => {
    try {
      const { id } = req.params
      const userInfo = req.body
      const updatedUser = userService.update(id, userInfo)
      
      if (!updatedUser.id) {
        res.err = 'User not found'
        res.errCode = 404
      } else {
        res.data = updatedUser
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

//delete user
router.delete(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params
      const deletedUser = userService.delete(id)
 
      if (!deletedUser.length) {
        res.err = 'User not found'
        res.errCode = 404
      } else {
        res.data = deletedUser
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

export { router }
