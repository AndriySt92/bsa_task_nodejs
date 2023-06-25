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
      const users = userService.getAllUsers()

      if (!users.length) {
        res.err = 'Users no found'
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
      const user = userService.createUser(userData)
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
      const user = userService.getUserById(id)

      if (!user) {
        res.err = 'User no found'
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
      const updatedUser = userService.updateUser(id, userInfo)
      console.log(updatedUser)
      if (!updatedUser.id) {
        res.err = 'User no found'
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
      const deletedUser = userSice.deleteUser(id)

      if (!deletedUser.length) {
        res.err = 'User no found'
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
