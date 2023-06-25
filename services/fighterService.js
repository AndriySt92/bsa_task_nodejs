import { fighterRepository } from '../repositories/fighterRepository.js'

class FighterService {
  create(fighter) {
    return fighterRepository.create(fighter)
  }
  getAll() {
    return fighterRepository.getAll()
  }

  getById(id) {
    return fighterRepository.getOne({ id })
  }

  update(id, data) {
    return fighterRepository.update(id, data)
  }

  delete(id) {
    return fighterRepository.delete(id)
  }
  
  search(search) {
    const item = fighterRepository.getOne(search)
    if (!item) {
      return null
    }
    return item
  }
}

const fighterService = new FighterService()

export { fighterService }
