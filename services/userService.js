import { userRepository } from '../repositories/userRepository.js'

class UserService {
  create(user) {
    return userRepository.create(user)
  }

  getAll() {
    return userRepository.getAll()
  }

  getById(id) {
    return userRepository.getOne({ id })
  }

  update(id, data) {
    return userRepository.update(id, data)
  }

  delete(id) {
    return userRepository.delete(id)
  }

  search(search) {
    const item = userRepository.getOne(search)
    if (!item) {
      return null
    }
    return item
  }
}

const userService = new UserService()

export { userService }
