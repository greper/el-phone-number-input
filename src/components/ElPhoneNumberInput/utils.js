import { countries } from '@/components/ElPhoneNumberInput/phoneCodeCountries'

export function getCountryByValue (value) {
  let ret = null
  if (value != null) {
    if (value.countryCode != null) {
      ret = countries.find(item => item.iso2 === value.countryCode)
    } else if (value.callingCode != null) {
      ret = countries.find(item => item.dialCode === value.callingCode)
    }
  }
  if (ret != null) {
    ret = {
      callingCode: ret.dialCode,
      countryCode: ret.iso2
    }
  }
  return ret
}
