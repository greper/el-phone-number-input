<template>
  <el-input
    :placeholder="numberPlaceholder"
    type="text"
    v-model="number"
    @change="handleChanged">
    <el-select :style="{width:selectWidth?selectWidth:'130px'}" filterable placeholder="请选择" slot="prepend"
               v-model="code" @change="handleSelectChanged">
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
    numberPlaceholder: { defaultValue: '手机号', require: false },
    codePlaceHolder: { defaultValue: '请选择', require: false },
    value: { type: Object, require: false }, // 结构与selectValue一致
    onlyCountries: { require: false },
    ignoreCountries: { require: false },
    selectWidth: { defaultValue: '130px', require: false }
  },
  data () {
    return {
      selectValue: {
        callingCode: '86', // 电话区号
        countryCode: 'CN', // 国家代码
        phoneNumber: null // 电话号码
      }
    }
  },
  created () {
    const ret = this.getCountryByValue(this.value)
    if (ret != null) {
      this.selectValue.callingCode = ret.dialCode
      this.selectValue.countryCode = ret.iso2
      this.$nextTick(() => {
        this.emitValue()
      })
    }
    if (this.value != null && this.value.phoneNumber != null) {
      this.selectValue.phoneNumber = this.value.phoneNumber
    }
  },
  computed: {
    countryOptions () {
      let options = []
      if (this.onlyCountries != null) {
        options = countries.filter(item => this.onlyCountries.find(country => item.iso2.includes(country)))
      } else if (this.ignoredCountries != null) {
        options = countries.filter(item => !(this.ignoredCountries.find(country => item.iso2.includes(country))))
      } else {
        options = countries
      }
      return options
    },
    code: {
      get () {
        let ret = this.getCountryByValue(this.value)
        if (ret != null) {
          return ret.iso2
        }
        return null
      },
      set (countryCode) {
        this.changeCountry(countryCode)
        this.emitValue()
      }
    },
    number: {
      get () {
        if (this.value == null) {
          return null
        }
        return this.value.phoneNumber
      },
      set (phoneNumber) {
        this.changeNumber(phoneNumber)
        this.emitValue()
      }
    }
  },
  methods: {
    emitValue () {
      console.log('input', this.selectValue)
      this.$emit('input', this.selectValue)
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
      return ret
    },
    handleSelectChanged (value) {
      this.changeCountry(value)
      this.$emit('change', this.value)
    },
    handleChanged (value) {
      this.changeNumber(value)
      this.$emit('change', this.value)
    },
    changeNumber (phoneNumber) {
      if (this.value != null && this.value.countryCode != null) {
        this.selectValue.countryCode = this.value.countryCode
      }
      if (this.value != null && this.value.callingCode != null) {
        this.selectValue.callingCode = this.value.callingCode
      }
      this.selectValue.phoneNumber = phoneNumber
    },
    changeCountry (countryCode) {
      let ret = this.countryOptions.find(item => item.iso2 === countryCode)
      this.selectValue.countryCode = countryCode
      this.selectValue.callingCode = ret.dialCode
      if (this.value != null && this.value.phoneNumber != null) {
        this.selectValue.phoneNumber = this.value.phoneNumber
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
