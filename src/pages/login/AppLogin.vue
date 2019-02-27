<template>
  <div class='page'>
    <div class="login-box">
      <div class="panda">
        <div class="ears">
          <div class="left"></div>
          <div class="right"></div>
        </div>
        <div class="fase">
          <div class="eyes">
            <div class="left">
              <div class="eye"></div>
            </div>
            <div class="right">
              <div class="eye"></div>
            </div>
          </div>
          <div class="nose"></div>
          <div class="mouth">
            <div class="left"></div>
            <div class="right"></div>
          </div>
        </div>
        <div class="body">
          <div class="arms"></div>
          <div class="legs"></div>
        </div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container" status-icon>
        <h3 class="title">{{ $t("login.title") }}</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" :placeholder="$t('login.username')" id="loginEmail"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" :placeholder="$t('login.password')" id="loginPassword"></el-input>
          <label id="showPasswordToggle">
            <el-checkbox v-model="checked" id="showPasswordCheck">显示密码</el-checkbox>
          </label>
          <router-link to="/" style="float: right; color: #bbbbbb">忘记密码？</router-link>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">
            登录
          </el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <router-link to="/register">
            <el-button style="width:100%;">
              注册
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
      <el-button @click="changeLanguage">切换语言</el-button>
    </div>
  </div>
</template>

<script>
import sha256 from 'crypto-js/sha256'
import { requestLogin } from '@/api/user'

export default {
  name: 'app-login',
  data() {
    return {
      logining: false,
      fromUrl: '/',
      ruleForm: {
        account: 'admin',
        checkPass: '123456'
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit(ev) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true
          const loginParams = {
            username: this.ruleForm.account,
            password: sha256(this.ruleForm.checkPass)
          }
          requestLogin(loginParams)
            .then(data => {
              this.logining = false
              this.$message({
                message: '登录成功！',
                type: 'success'
              })
              this.$router.push(this.fromUrl)
            })
            .catch(err => {
              this.logining = false
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //切换语言
    changeLanguage: function() {
      if (localStorage.getItem('user-language') == 'zh-cn') {
        localStorage.setItem('user-language', 'en')
        this.$i18n.locale = 'en'
      } else {
        localStorage.setItem('user-language', 'zh-cn')
        this.$i18n.locale = 'zh-cn'
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.fullPath !== '/register' && !from.meta.errorPage) {
        vm.fromUrl = from.fullPath
      }
    })
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
}

.page {
  background-color: #eff3f4;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  border: solid 1px #ddd;
  border-radius: 0.5em;
  font-family: 'Source Sans Pro', sans-serif;
}
*,
::before,
::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panda {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 150px;
  border-radius: 40%;
  cursor: pointer;
  display: block;
  margin: 0 auto 20px auto;
}

.ears {
  position: absolute;
  top: -50px;
  z-index: -1;
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
}
.ears .left,
.ears .right {
  width: 40px;
  height: 40px;
  border: 1px solid #231d1d;
  background-color: #3e3e3e;
  background-image: radial-gradient(circle at 50% 100%, #3e3e3e, #231d1d);
  box-shadow: inset 0 -5px 10px #060606;
}
.ears .left {
  border: 1px solid #000;
  border-radius: 54% 46% 31% 69% / 56% 73% 27% 44%;
}
.ears .right {
  border: 1px solid #000;
  border-radius: 29% 71% 72% 28% / 77% 64% 36% 23%;
  transform-origin: 0% 100%;
  animation: ears 5s cubic-bezier(0.06, 0.63, 0.91, 0.66) 2s infinite;
}

.fase {
  display: flex;
  width: 180px;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40%;
  background: white;
}
.fase .eyes {
  display: flex;
  width: 90%;
  height: 100px;
  justify-content: space-around;
  align-items: center;
}
.fase .eyes .left,
.fase .eyes .right {
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border: 1px solid #231d1d;
  background-color: #3e3e3e;
  background-image: radial-gradient(circle at 50% 100%, #3e3e3e, #231d1d);
  border-radius: 50% 20% 50% 40%;
}
.fase .eyes .left .eye,
.fase .eyes .right .eye {
  position: relative;
  width: 45px;
  height: 45px;
  background-color: #ebebeb;
  border-radius: 50%;
}
.fase .eyes .left .eye::before,
.fase .eyes .right .eye::before {
  position: absolute;
  top: 5px;
  left: 5px;
  content: '';
  width: 35px;
  height: 35px;
  border: 1px solid #231d1d;
  background-color: #3e3e3e;
  background-image: radial-gradient(circle at 50% 100%, #3e3e3e, #231d1d);
  border-radius: inherit;
  box-shadow: inset 0 0px 20px #060606;
}
.fase .eyes .left .eye::after,
.fase .eyes .right .eye::after {
  position: absolute;
  top: 5px;
  left: 5px;
  content: '';
  width: 15px;
  height: 15px;
  border-radius: inherit;
  background-color: #ebebeb;
}
.fase .eyes .right {
  border-radius: 20% 50% 40% 50%;
}
.fase .nose {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 20px;
  border-radius: 20% 20% 50% 50%;
  border: 1px solid #231d1d;
  background-color: #3e3e3e;
  background-image: radial-gradient(circle at 50% 100%, #3e3e3e, #231d1d);
}
.fase .nose::before {
  position: absolute;
  content: '';
  top: 2px;
  left: 2px;
  transform: rotate(-10deg);
  width: 10px;
  height: 4px;
  border-radius: 40%;
  background-color: #ebebeb;
}
.fase .mouth {
  display: flex;
  width: 80px;
  height: 20px;
  justify-content: center;
  align-items: center;
}
.fase .mouth .right,
.fase .mouth .left {
  position: relative;
  width: 50px;
  height: 35px;
  border: 3px solid #3e3e3e;
  border-radius: 50% 30% 50% 40%;
}
.fase .mouth .right::after,
.fase .mouth .left::after {
  position: absolute;
  top: -3px;
  left: -20px;
  content: '';
  width: 50px;
  height: 30px;
  border-radius: inherit;
  background-color: #fff;
  background: radial-gradient(#3e3e3e 11%, transparent 11%), white;
  background-position: 0 0, 26px 26px;
  background-size: 26px 26px;
  transition: all 0.2s linear;
}
.fase .mouth .right {
  border-radius: 30% 50% 40% 50%;
}
.fase .mouth .right::after {
  left: 4px;
}
.fase:hover .eye::before,
.fase:hover .eye::after {
  animation: eye 200ms linear infinite;
}
.fase:hover .mouth .right::after,
.fase:hover .mouth .left::after {
  height: 20px;
}

@keyframes eye {
  50% {
    transform: translate(0.5px, -0.5px);
  }
}
@keyframes ears {
  20% {
    transform: rotate(10deg);
  }
  21% {
    transform: rotate(-5deg);
  }
  22% {
    transform: rotate(15deg);
  }
}
</style>