# el-phone-number-input
基于ElementUI的国际电话输入框组件
查看示例：http://qiniu.veryreader.com/ElPhoneNumberInput/index.html?v=1.0.0

## 快速开始
    
### 1. 安装
```shell
npm i element-ui el-phone-number-input -S
```

### 2. 引入
* #### 全局引入
 
 ```javascript
 import { ElPhoneNumberInput } from 'ElPhoneNumberInput'
 Vue.component(ElPhoneNumberInput.name,ElPhoneNumberInput)

 ```
 * #### 或者单独引入
```javascript
  import { ElPhoneNumberInput, mobileValidator, phoneNumberValidator } from 'ElPhoneNumberInput'
  export default {
    components: { ElPhoneNumberInput },
  }
 ```
 
 ### 3. form表单
 ```html
 <template>
  <el-form ref="form" :model="form"  :rules="rules" label-width="120px" >
         <el-form-item label="手机号码"  prop="mobile">
           <el-phone-number-input v-model="form.mobile" :onlyCountries="onlyCountries"></el-phone-number-input>
         </el-form-item>
  </el-form>
 </template>
 
 <script>
 import { ElPhoneNumberInput} from 'ElPhoneNumberInput'
 export default {
   name: 'Example',
   components: { ElPhoneNumberInput },
   form: {
	   mobile: {
	     callingCode: '86',
	     phoneNumber: '18611112222'
	   }
	 }
 }
 </script>
 ```
## 参数
