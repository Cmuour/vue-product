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
        <el-form-item prop="email" class="form_list">
          <label for="用户名">邮箱</label>
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="form_list" prop="pass">
          <label for="密码">密码</label>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="form_list" prop="code">
          <label for="用户名">验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input type="text" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="primary" style="height:32px;text-align:center;" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" class="btn_commit" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
    };
    var validateEmail = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if(!reg.test(value)){
          callback(new Error("请输入正确邮箱"))
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        pass: "",
        code: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
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
  .code{
      margin-top: 20px;
  }
}
</style>