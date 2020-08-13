<template>
  <el-input
    :placeholder="numberPlaceholder"
    type="text"
    :value="selectValue.phoneNumber"
    :clearable="clearable"
    @input="handleNumberInput">
    <el-select :style="{width:_width}" :filterable="filterable" :clearable="clearable" placeholder="请选择" slot="prepend"
        :value="selectValue.countryCode" @input="handleSelectInput" >
      <el-option
        :key="item.iso2"
        :label="item.name"
        :value="item.iso2"
        v-for="item in countryOptions">
      </el-option>
    </el-select>
  </el-input>
</template>
<script>
import { countries } from './phoneCodeCountries.js'

export default {
  name: 'el-phone-number-input',
  props: {
    numberPlaceholder: { default: '手机号', require: false },
    codePlaceHolder: { default: '请选择', require: false },

    /**
     * selectValue: {
        callingCode: undefined, // 电话区号
        countryCode: undefined, // 国家代码
        phoneNumber: undefined // 电话号码
      }
     */
    value: { type: Object, require: false }, // 结构
    onlyCountries: { require: false }, // 仅限国家地区
    ignoreCountries: { require: false }, // 忽略国家地区
    priorityCountries: { require: false }, // 优先国家地区
    selectWidth: { default: '130px', require: false },
    clearable: { default: true },
    filterable: { default: true },
    defaultCountry: { default: 'CN' }
  },
  data () {
    return {
      selectValue: {
        callingCode: undefined, // 电话区号
        countryCode: undefined, // 国家代码
        phoneNumber: undefined // 电话号码
      }
    }
  },
  watch: {
    value (value, oldValue) {
      this.$emit('change', this.getEmitValue())
      if (this.isChanged(value)) {
        this.setValue(value)
      }
    }
  },
  created () {
    this.setValue(this.value)
  },
  computed: {
    countryOptions () {
      if (this.onlyCountries != null) {
        return countries.filter(item => this.onlyCountries.find(country => item.iso2.includes(country)))
      }
      let options = []
      let priorityCountries = this.priorityCountries ? this.priorityCountries : []
      let ignoredCountries = this.ignoredCountries ? this.ignoredCountries : []
      options = countries.filter(item => priorityCountries.find(country => item.iso2.includes(country)))
      ignoredCountries = ignoredCountries.concat(priorityCountries)
      options = options.concat(countries.filter(item => !(ignoredCountries.find(country => item.iso2.includes(country)))))
      return options
    },
    _width () {
      let selectWidth = this.selectWidth
      if (this.selectWidth) {
        if (typeof this.selectWidth === 'number') {
          selectWidth = this.selectWidth + 'px'
        } if (typeof this.selectWidth === 'string') {
          const convert = parseInt(this.selectWidth)
          if (!isNaN(convert)) {
            selectWidth = convert + 'px'
          }
        }
      }
      return selectWidth
    }
  },
  methods: {
    isChanged (value) {
      if (value && this.selectValue) {
        return value.callingCode !== this.selectValue.callingCode ||
          value.countryCode !== this.selectValue.countryCode ||
          value.phoneNumber !== this.selectValue.phoneNumber
      } else {
        return value !== this.selectValue
      }
    },
    setValue (value) {
      if (value == null) {
        this.selectValue = { callingCode: undefined, countryCode: undefined, phoneNumber: undefined }
      }
      const ret = this.getCountryByValue(value)
      if (ret != null) {
        this.selectValue.callingCode = ret.callingCode
        this.selectValue.countryCode = ret.countryCode
      }
      if (value && value.phoneNumber) {
        this.selectValue.phoneNumber = value.phoneNumber
      } else {
        this.selectValue.phoneNumber = undefined
      }
    },
    getCountryByValue (value) {
      let ret = null
      if (value != null) {
        if (value.countryCode != null) {
          ret = this.countryOptions.find(item => item.iso2 === value.countryCode)
        } else if (value.callingCode != null) {
          ret = this.countryOptions.find(item => item.dialCode === value.callingCode)
        }
      }
      if (ret != null) {
        ret = {
          callingCode: ret.dialCode,
          countryCode: ret.iso2
        }
      }
      return ret
    },
    handleSelectInput (countryCode) {
      this.changeCountry(countryCode)
      this.$emit('input', this.getEmitValue())
    },
    handleNumberInput (number) {
      this.selectValue.phoneNumber = number
      if (this.selectValue.callingCode == null && this.selectValue.countryCode == null) {
        this.selectValue.countryCode = this.defaultCountry
        const country = this.getCountryByValue(this.selectValue)
        if (country) {
          this.selectValue.callingCode = country.callingCode
        }
      }
      this.$emit('input', this.getEmitValue())
    },
    getEmitValue () {
      return { countryCode: this.selectValue.countryCode, callingCode: this.selectValue.callingCode, phoneNumber: this.selectValue.phoneNumber }
    },
    changeCountry (countryCode) {
      if (!countryCode) {
        this.selectValue.callingCode = undefined
      }
      this.selectValue.countryCode = countryCode
      let ret = this.getCountryByValue(this.selectValue)
      if (ret) {
        this.selectValue.callingCode = ret.callingCode
      }
    }
  }
}
</script>
