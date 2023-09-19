<template>
    <div class="box">
        <div class="login">
            <h2>电商后台管理</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input  :prefix-icon="User" v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input  :prefix-icon="Lock" show-password  v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="toLogin">登录</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { queryLoginApi } from '../api'
// import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router =useRouter()
const ruleFormRef = ref()
const ruleForm = reactive({
    username: '',
    password: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  const reg=/^[a-zA-Z]{3,20}$/
  if(reg.test(value)){
    callback()
  }else{
    callback(new Error('用户名或密码错误'))
  }
}
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' },
        { min: 3, max: 20, message: '长度在3到20之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在3到20之间', trigger: 'blur' },
    ],
   
})

const toLogin = () => {
    ruleFormRef.value.validate((valid:boolean) => {
    if (valid) {
        queryLoginApi(ruleForm).then((res:any)=>{
            console.log(res,'queryLoginApi');
                router.push('/')
                // ElMessage.success('登录成功')
        })
        
    } else {
    //   ElMessage.error('请输入正确的用户名和密码')
    }
  }) 
}




</script>
<style lang='scss' scoped>
.box {
    width: 100vw;
    height: 100vh;
    background-color: #28496c;
    display: flex;
    align-items: center;
    justify-content: center;

    .login {
        width: 450px;
        height: 300px;
        border-radius: 5px;
        background-color: #fff;
        padding: 20px;
        h2{
            text-align: center;
            margin: 20px 0;
        }
    }
}

.btn {
    float: right;
}
</style>