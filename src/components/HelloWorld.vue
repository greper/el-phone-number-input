<template>
  <el-container>

    <div style="margin: auto;width:50%">
      <h2> ElPhoneNumberInput 示例</h2>
      <div style="margin-bottom: 20px;">
      github: <a href="https://github.com/greper/el-phone-number-input" target="_blank">https://github.com/greper/el-phone-number-input</a>
      </div>
      <el-form ref="form" :model="form"  :rules="rules" label-width="120px" >
        <el-form-item label="无默认值"  prop="noValue">
          <el-phone-number-input v-model="form.noValue" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="disabled"  prop="noValue">
          <el-phone-number-input :disabled="true" v-model="form.noValue" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="readonly"  prop="noValue">
          <el-phone-number-input :readonly="true" v-model="form.noValue" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="手机号码"  prop="mobile">
          <el-phone-number-input v-model="form.mobile" :onlyCountries="onlyCountries" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="电话号码"  prop="phone">
          <el-phone-number-input v-model="form.phone" :onlyCountries="onlyCountries" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="国家代码"  prop="countryCode">
          <el-phone-number-input v-model="form.countryCode"  @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="仅包含某些国家"  prop="only">
          <el-phone-number-input v-model="form.countryCode" :onlyCountries="onlyCountries" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="不包含某些国家"  prop="ignored">
          <el-phone-number-input v-model="form.countryCode" :ignoredCountries="ignoredCountries" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="某些国家优先"  prop="priority">
          <el-phone-number-input v-model="form.countryCode" :priorityCountries="priorityCountries" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="国家选择宽度"  prop="only">
          <el-phone-number-input v-model="form.countryCode" :onlyCountries="onlyCountries" selectWidth="200" @change="handleChange"></el-phone-number-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <pre style="text-align: left">{{form}}</pre>

      <div style="text-align: left">
        <h3>代码</h3>
        <d2-highlight :code="helper"/>
      </div>
    </div>
  </el-container>
</template>

<script>
import { ElPhoneNumberInput, mobileValidator, phoneNumberValidator } from './ElPhoneNumberInput/index.js'
import helper from './helper'
export default {
  name: 'Example',
  components: { ElPhoneNumberInput },
  props: {
  },
  data () {
    return {
      helper: helper.code,
      priorityCountries: ['CN', 'HK', 'TW', 'US'],
      onlyCountries: ['CN', 'HK', 'TW', 'US'],
      ignoredCountries: ['AF', 'AL', 'DZ', 'CN', 'HK', 'TW', 'US'],
      form: {
        noValue: {},
        mobile: {
          callingCode: '86',
          phoneNumber: '18611112222'
        },
        phone: {
          callingCode: '86',
          phoneNumber: '075501010202'
        },
        countryCode: {
          countryCode: 'CN',
          phoneNumber: '18611111111'
        }

      },
      rules: {
        noValue: [
          { required: true, message: '请输入手机号' }
        ],
        mobile: [
          { required: true, message: '请输入手机号' },
          { validator: mobileValidator, message: '手机号不正确' }
        ],
        phone: [
          { required: true, message: '请输入电话号码' },
          { validator: phoneNumberValidator, message: '电话号码不正确' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleChange (value) {
      console.log('change', value)
    }
  }
}
</script>
