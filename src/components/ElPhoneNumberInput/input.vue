<template>
  <el-input
      type="text"
      v-model="number"
      :placeholder="numberPlaceholder">
    <el-select slot="prepend" :style="{width:selectWidth?selectWidth:'130px'}" filterable v-model="code" placeholder="请选择">
      <el-option
          v-for="item in countryOptions"
          :key="item.iso2"
          :label="item.name"
          :value="item.iso2">
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
        callingCode: 86, // 电话区号
        countryCode: 'CN', // 国家代码
        phoneNumber: '' // 电话号码
      }
    }
  },
  created () {

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
        let ret = null
        if (this.value != null) {
          if (this.value.countryCode != null) {
            ret = this.countryOptions.find(item => item.iso2 === this.value.countryCode)
          } else if (this.value.callingCode != null) {
            ret = this.countryOptions.find(item => item.dialCode === this.value.callingCode)
          }
        }
        if (ret != null) {
          return ret.iso2
        }
        return null
      },
      set (countryCode) {
        let ret = this.countryOptions.find(item => item.iso2 === countryCode)
        this.selectValue.countryCode = countryCode
        this.selectValue.callingCode = ret.dialCode
        if (this.value != null && this.value.phoneNumber != null) {
          this.selectValue.phoneNumber = this.value.phoneNumber
        }
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
        if (this.value != null && this.value.countryCode != null) {
          this.selectValue.countryCode = this.value.countryCode
        }
        if (this.value != null && this.value.callingCode != null) {
          this.selectValue.callingCode = this.value.callingCode
        }
        this.selectValue.phoneNumber = phoneNumber
        this.emitValue()
      }
    }
  },
  methods: {
    emitValue () {
      this.$emit('input', this.selectValue)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
