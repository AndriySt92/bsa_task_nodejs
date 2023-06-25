import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  create(fighter) {
    return fightRepository.create(fighter)
  }
  getAll() {
    return fightRepository.getAll()
  }

  getById(id) {
    return fightRepository.getOne({ id })
  }

  update(id, data) {
    return fightRepository.update(id, data)
  }

  delete(id) {
    return fightRepository.delete(id)
  }
  
  search(search) {
    const item = fightRepository.getOne(search)
    if (!item) {
      return null
    }
    return item
  }
}

const fightService = new FightService();

export { fightService };
