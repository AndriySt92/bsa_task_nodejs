import { Router } from 'express'
import { userService } from '../services/userService.js'
import { createUserValid, updateUserValid } from '../middlewares/user.validation.middleware.js'

const router = Router()

//get all users
router.get('/', (_, res) => {
  try {
    const users = userService.getAllUsers()

    if (!users) {
      res.status(400).send({
        error: true,
        message: 'There are no users in the database',
      })
    }

    res.send(users)
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    })
  }
})

//create user
router.post('/', createUserValid, (req, res) => {
  const user = req.body
  try {
    res.send(userService.createUser(user))
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    })
  }
})

// find by id user
router.get('/:id', (req, res) => {
  const { id } = req.params
  try {
    const user = userService.getUserById(id)

    if (!user) {
      res.status(404).send({
        error: true,
        message: 'User not found',
      })
    }
    res.send(user)
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    })
  }
})

//update user
router.put('/:id', updateUserValid, (req, res) => {
  try {
    const { id } = req.params
    const userInfo = req.body
    const updatedUser = userService.updateUser(id, userInfo)

    if (!updatedUser) {
      res.status(404).send({
        error: true,
        message: 'User no found',
      })
    }
    res.send(updatedUser)
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    })
  }
})

//delete user
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = userService.deleteUser(id)

    if (!deletedUser) {
      res.status(404).send({
        error: true,
        message: 'User no found',
      })
    }
    res.send(deletedUser)
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    })
  }
})

export { router }
