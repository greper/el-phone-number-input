# el-phone-number-input
基于ElementUI的国际电话输入框组件
查看示例：http://greper.veryreader.com/ElPhoneNumberInput/index.html

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

名称 | 详情| 示例 |  默认值   
-|-|-|-
value | Object类型的默认值，3个属性均可为空<br/>coutryCode:国家代码<br/>callingCode:电话区号<br/>phoneNumber:电话号码<br/> | {<br/>coutryCode:'CN',<br/>callingCode:'86',<br/>phoneNumber:'18601010202'<br/>} | 无 |
numberPlaceholder | 号码输入框的placeholder| | 手机号 |
codePlaceHolder | 地区选择框的placeholder| | 请选择 |
onlyCountries | 仅支持哪些国家地区 |['CN', 'HK', 'TW', 'US'] | 无 |
ignoreCountries | 忽略哪些国家地区 |['CN', 'HK', 'TW', 'US'] | 无 |
selectWidth | 国家地区选择框的宽度，注意要带px，也支持% | 130px | 130px |
priorityCountries | 哪些国家地区优先 |['CN', 'HK', 'TW', 'US'] | 无 |
clearable | 是否支持清空 | true,false | true |
filterable | 是否支持国家地区过滤 | true,false | true |
defaultCountry | 输入手机号后触发默认选择的国家 | CN | CN |
