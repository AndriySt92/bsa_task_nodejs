import { FIGHT } from '../models/fight.js'
import {
  checkIsEmptyObj,
  checkFieldLength,
  checkIsInvalidFields,
  validateNumber,
  checkIsUniqueName,
} from '../validation/index.js'
import { fighterService } from '../services/fighterService.js'

const createFightValid = (req, res, next) => {
  const fightData = req.body
  const { id, fighter1, fighter2, log } = fightData
    
  try {
    if (checkIsEmptyObj(fightData)) {
      throw new Error('Payload should not be empty!')
    } else if (!fighter1 || !fighter2 || !log.length) {
      throw new Error('Invalid payload!')
    } else if (!checkIsInvalidFields(FIGHT, fightData)) {
      throw new Error('Payload contain invalid fields')
    } else if (id) {
      throw new Error('The id field should not be present!')
    } else if (!fighterService.search({ id: fighter1 })) {
      throw new Error('Invalid payload. Fighter1 not found')
    } else if (!fighterService.search({ id: fighter2 })) {
      throw new Error('Invalid payload. Fighter2 not found')
    } else if (!Array.isArray(log)) {
      throw new Error('Invalid log field')
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message })
  }
  next()
}

const updateFightValid = (req, res, next) => {
  const fightData = req.body
  const { id, fighter1, fighter2, log } = fightData

  try {
    if (checkIsEmptyObj(fightData)) {
      throw new Error('Payload should not be empty!')
    } else if (!checkIsInvalidFields(FIGHT, fightData)) {
      throw new Error('Payload contain invalid fields')
    } else if (id) {
      throw new Error('The id field should not be present!')
    } else if (fighter1 && !fighterService.search({ id:fighter1 })) {
      throw new Error('Invalid payload. Fighter1 not found')
    } else if (fighter2 && !fighterService.search({ id:fighter2 })) {
      throw new Error('Invalid payload. Fighter2 not found')
    } else if (log && Array.isArray(log) && log.lenght > 0) {
      throw new Error('Invalid log field')
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message })
  }
  next()
}

export { createFightValid, updateFightValid }
