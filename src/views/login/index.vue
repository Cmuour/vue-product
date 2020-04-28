<template>
  <div id="login">
    <div class="login_wrap">
      <ul class="login_register">
        <li
          href="javascript:;"
          :class="{'active': item.isSelected}"
          v-for="item in list"
          :key="item.name"
          @click="changeStatus(item)"
        >{{item.name}}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        size="small"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 邮箱 -->
        <el-form-item class="form_list" prop="email">
          <label for="用户名">邮箱</label>
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="form_list" prop="pass">
          <label for="密码">密码</label>
          <el-input
            type="text"
            v-model="ruleForm.pass"
            maxlength="18"
            minlength="6"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 重复密码 -->
        <el-form-item class="form_list" prop="passs" v-if="list[1].isSelected">
          <label for="密码">重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passs"
            maxlength="18"
            minlength="6"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="form_list" prop="code">
          <label for="用户名">验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input
                type="text"
                v-model="ruleForm.code"
                maxlength="6"
                minlength="6"
                autocomplete="off"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="primary" style="height:32px;text-align:center;" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" class="btn_commit" @click="submitForm('ruleForm')">{{list[0].isSelected?'登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript, validateEmail } from '@/utils/validate.js';
import { log } from 'util';
export default {
  name: "Login",
  data() {
    // 邮箱
    var validateUserEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (!validateEmail(value)) {
        callback(new Error("请输入正确邮箱"));
      } else {
        callback();
      }
    };
    // 密码
    var validatePass = (rule, value, callback) => {
      if(stripscript(value)){
        callback(new Error("包含特殊符号，请重新输入"));
      }
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6至18位数字和字母结合"));
      } else {
        callback();
      }
    };
    // 重复密码
    var validatePasss = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != this.ruleForm.pass) {
        callback(new Error("重复密码不一致"));
      } else {
        callback();
      }
    };
    // 验证码
    var validateCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        console.log(value)
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        pass: "",
        passs: "",
        code: ""
      },
      rules: {
        email: [{ validator: validateUserEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        passs: [{ validator: validatePasss, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      list: [
        { name: "登录", isSelected: true },
        { name: "注册", isSelected: false }
      ]
    };
  },
  methods: {
    changeStatus(ms) {
      this.list.forEach(v => {
        v.isSelected = false;
      });
      ms.isSelected = !ms.isSelected;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #056b8d;
  display: flex;
  .login_wrap {
    margin: 120px auto;
    color: #fff;
    .login_register {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0;
      li {
        padding: 10px 20px;
        border-radius: 4px;
        margin: 0 10px;
        display: inline-block;
      }
      li:hover {
        background-color: #04485f;
      }
      li.active {
        background-color: #0a5d79;
      }
    }
  }
  .demo-ruleForm {
    .form_list {
      margin-bottom: 10px;
    }
    .btn_commit {
      margin-top: 16px;
      width: 100%;
      display: block;
    }
  }
  .code {
    margin-top: 20px;
  }
}
</style>