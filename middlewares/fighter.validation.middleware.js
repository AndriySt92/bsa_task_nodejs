import { FIGHTER } from "../models/fighter.js";
import { checkIsEmptyObj, checkFieldLength, checkIsInvalidFields, validateNumber, checkIsUniqueName } from "../validation/index.js";
import { fighterService } from '../services/fighterService.js'

const createFighterValid = (req, res, next) => {
  const fighterData = req.body
  const {power, defense, health, id, name} = fighterData
  
  try {
    if (checkIsEmptyObj(fighterData)) {
      throw new Error('Payload should not be empty!')
    } else if (!power || !defense || !name) {
      throw new Error('Please fill in all the fields!')
    } else if (!checkIsInvalidFields(FIGHTER, fighterData)) {
      throw new Error('Payload contain invalid fields')
    } else if (id) {
      throw new Error('The id field should not be present!')
    } else if (checkIsUniqueName(name, fighterService)) {
      throw new Error(`Fighter with ${name} already exist`)
    } else if(!checkFieldLength(name, 2, 100)){
      throw new Error('Incorrect name field. Name must contain from 2 symbol to 100')
    } else if(!validateNumber(power, 1, 100)){
      throw new Error('Incorrect power field. Power must be number from 1 to 100')
    } else if(!validateNumber(defense, 1, 10)){
      throw new Error('Incorrect defense field. Defense must be number from 1 to 10')
    } else if(health && !validateNumber(health, 80, 120)){
      throw new Error('Incorrect health field. Health must be number from 80 to 120')
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message })
  }
  next();
};

const updateFighterValid = (req, res, next) => {
    const fighterData = req.body
  const {power, defense, health, id, name} = fighterData
  
  try {
    if (checkIsEmptyObj(fighterData)) {
      throw new Error('Payload should not be empty!')
    } else if (!checkIsInvalidFields(FIGHTER, fighterData)) {
      throw new Error('Payload contain invalid fields')
    } else if (id) {
      throw new Error('The id field should not be present!')
    } else if (name && checkIsUniqueName(name, fighterService)) {
      throw new Error(`Fighter with ${name} already exist`)
    } else if(power && !validateNumber(power, 1, 100)){
      throw new Error('Incorrect power field. Power must be number from 1 to 100')
    } else if(defense && !validateNumber(defense, 1, 10)){
      throw new Error('Incorrect defense field. Defense must be number from 1 to 10')
    } else if(health && !validateNumber(health, 80, 120)){
      throw new Error('Incorrect health field. Health must be number from 80 to 120')
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message })
  }
  next();
};

export { createFighterValid, updateFighterValid };
