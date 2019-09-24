export default {
  code: `<template>
  <el-container>
    <div >
      <el-form ref="form" :model="form"  :rules="rules" label-width="120px" >
        <el-form-item label="无默认值"  prop="noValue">
          <el-phone-number-input v-model="form.noValue" :onlyCountries="onlyCountries"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="手机号码"  prop="mobile">
          <el-phone-number-input v-model="form.mobile" :onlyCountries="onlyCountries"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="电话号码"  prop="phone">
          <el-phone-number-input v-model="form.phone" :onlyCountries="onlyCountries"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="仅包含某些国家"  prop="only">
          <el-phone-number-input v-model="form.only" :onlyCountries="onlyCountries"></el-phone-number-input>
        </el-form-item>
        <el-form-item label="不包含某些国家"  prop="ignore">
          <el-phone-number-input v-model="form.ignore" :ignoredCountries="ignoredCountries" ></el-phone-number-input>
        </el-form-item>
        <el-form-item label="国家选择宽度"  prop="ignore">
          <el-phone-number-input v-model="form.ignore" :onlyCountries="onlyCountries" selectWidth="200px"></el-phone-number-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import { ElPhoneNumberInput, mobileValidator, phoneNumberValidator } from './ElPhoneNumberInput/index.js'
export default {
  name: 'Example',
  components: { ElPhoneNumberInput },
  props: {
  },
  data () {
    return {
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
        ignore: {
          countryCode: 'CN',
          phoneNumber: ''
        },
        only: {
          countryCode: 'CN',
          phoneNumber: ''
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
    }
  }
}
</script>
`
}
