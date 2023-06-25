export const checkIsEmptyObj = (obj) => Object.keys(obj).length === 0

export const checkIsAllFields = (model, requestData) => {
  const { id, ...restModel } = model
  const hasAllKeys = Object.keys(restModel).every((key) => requestData.hasOwnProperty(key))
  return hasAllKeys
}

export const checkIsInvalidFields = (model, requestData) =>
  Object.keys(requestData).every((key) => model.hasOwnProperty(key))

export const checkFieldLength = (value, min, max) => {
  value = value.trim()
  return value.length >= min && value.length <= max
}
export const validatePassword = (pass) => typeof pass === 'string' && checkFieldLength(pass, 3, 50)

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/\w+@gmail\.\w{1,5}/g)
}

export const validatePhone = (phoneNumber) => {
  return phoneNumber.trim().match(/^\+380[0-9]{9}/i) && phoneNumber.trim().length === 13
}

export const checkIsUniqueEmail = (email, service) => service.search({ email })

export const checkIsUniquePhone = (phoneNumber, service) => service.search({ phoneNumber })
