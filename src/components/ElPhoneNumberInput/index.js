import ElPhoneNumberInput from './input'
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'
import { getCountryByValue } from './utils'

function getParsePhoneNumberFromString ({ phoneNumber, countryCode }) {
  const parsing =
    phoneNumber && countryCode
      ? parsePhoneNumberFromString(phoneNumber, countryCode)
      : null
  return {
    phoneNumber: phoneNumber || null,
    countryCode: countryCode,
    isValid: false,
    ...(parsing
      ? {
        formattedNumber: parsing.number,
        nationalNumber: parsing.nationalNumber,
        isValid: parsing.isValid(),
        type: parsing.getType(),
        formatInternational: parsing.formatInternational(),
        formatNational: parsing.formatNational(),
        uri: parsing.getURI(),
        e164: parsing.format('E.164')
      }
      : null)
  }
}

/**
 * 校验输入是否正确的电话号码
 * @param rule
 * @param value
 * @param callback
 * @returns {boolean|*}
 */
function phoneNumberValidator (rule, value, callback) {
  if (!value || value.phoneNumber == null || value.phoneNumber === '') {
    return callback()
  }
  if (!value.countryCode && value.callingCode) {
    let country = getCountryByValue(value)
    if (country) {
      value.countryCode = country.countryCode
    }
  }
  let parse = getParsePhoneNumberFromString({
    phoneNumber: value.phoneNumber,
    countryCode: value.countryCode
  })
  if (!parse.isValid) {
    console.warn('parse:', parse)
    return callback(new Error('电话号码错误'))
  }
  return callback()
}

/**
 * 校验输入是否正确的手机号码
 * @param rule
 * @param value
 * @param callback
 * @returns {boolean|*}
 */
function mobileValidator (rule, value, callback) {
  if (!value || value.phoneNumber == null || value.phoneNumber === '' ||
    value.countryCode == null || value.countryCode === ''
  ) {
    return callback()
  }
  if (!value.countryCode && value.callingCode) {
    let country = getCountryByValue(value)
    if (country) {
      value.countryCode = country.countryCode
    }
  }
  let parse = getParsePhoneNumberFromString({
    phoneNumber: value.phoneNumber,
    countryCode: value.countryCode
  })
  if (!parse.isValid || parse.type !== 'MOBILE') {
    console.warn('parse:', parse)
    return callback(new Error('手机号错误'))
  }
  return callback()
}

/**
 * 手机号必填校验
 * @param rule
 * @param value
 * @param callback
 * @returns {boolean|*}
 */
function mobileRequiredValidator (rule, value, callback) {
  if (!value || value.phoneNumber == null || value.phoneNumber === '') {
    return callback(new Error('该项必填'))
  }
  return callback()
}

export { ElPhoneNumberInput, phoneNumberValidator, mobileValidator, mobileRequiredValidator }
