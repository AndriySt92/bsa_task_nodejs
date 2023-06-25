import { USER } from '../models/user.js'
import { userService } from '../services/userService.js'
import {
  checkIsAllFields,
  checkIsEmptyObj,
  checkIsUniqueEmail,
  checkIsUniquePhone,
  checkIsInvalidFields,
  validateEmail,
  validatePhone,
  validatePassword,
  checkFieldLength,
} from '../validation/index.js'

const createUserValid = (req, res, next) => {
  const userData = req.body

  try {
    if (checkIsEmptyObj(userData)) {
      throw new Error('Payload should not be empty!')
    } else if (!checkIsAllFields(USER, userData)) {
      throw new Error('Please fill in all the fields!')
    } else if (!checkIsInvalidFields(USER, userData)) {
      throw new Error('Payload contain invalid fields')
    } else if (checkIsUniqueEmail(userData.email, userService)) {
      throw new Error(`User with such email: "${userData.email}" already exist!`)
    } else if (checkIsUniquePhone(userData.phoneNumber, userService)) {
      throw new Error(`User with such phone number: "${userData.phoneNumber}" already exist!`)
    } else if (userData.id) {
      throw new Error('The id field should not be present!')
    } else if (!validatePassword(userData.password)) {
      throw new Error('Password should be at least 3 characters length!')
    } else if (!validateEmail(userData.email)) {
      throw new Error('Invalid email address, email should contain: @gmail!')
    } else if (!validatePhone(userData.phoneNumber)) {
      throw new Error('Phone number should follow format +380xxxxxxxxx!')
    } else if (!checkFieldLength(userData.firstName, 2, 50)) {
      throw new Error('Incorrect first name. First name must contain from 2 symbol to 50')
    } else if (!checkFieldLength(userData.lastName, 2, 50)) {
      throw new Error('Incorrect last name. Last name must contain from 2 symbol to 50')
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message })
  }
  next()
}

const updateUserValid = (req, res, next) => {
  const userData = req.body

  try {
    if (checkIsEmptyObj(userData)) {
      throw new Error('Payload should not be empty!')
    } else if (!checkIsInvalidFields(USER, userData)) {
      throw new Error('Payload contain invalid fields')
    } else if (userData.email && checkIsUniqueEmail(userData.email, userService)) {
      throw new Error(`User with such email: "${userData.email}" already exist!`)
    } else if (userData.phoneNumber && checkIsUniquePhone(userData.phoneNumber, userService)) {
      throw new Error(`User with such phone number: "${userData.phoneNumber}" already exist!`)
    } else if (userData.id) {
      throw new Error('The "id" field should not be present!')
    } else if (userData.password && !validatePassword(userData.password)) {
      throw new Error('Password should be at least 3 characters length!')
    } else if (userData.email && !validateEmail(userData.email)) {
      throw new Error('Invalid email address, email should contain: @gmail!')
    } else if (userData.phoneNumber && !validatePhone(userData.phoneNumber)) {
      throw new Error('Phone number should follow format +380xxxxxxxxx!')
    } else if ( userData.firstName && !checkFieldLength(userData.firstName, 2, 50)) {
      throw new Error('Incorrect first name. First name must contain from 2 symbol to 50')
    } else if (userData.lastName && !checkFieldLength(userData.lastName, 2, 50)) {
      throw new Error('Incorrect last name. Last name must contain from 2 symbol to 50')
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message })
  }

  next()
}

export { createUserValid, updateUserValid }
