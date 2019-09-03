<template>
  <div class="role_dialog">
    <el-dialog
      :title="title"
      :before-close="cancelButton"
      :visible.sync="dialogVisible"
      max-width="70%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Role Name:" prop="roleName">
          <el-input
            v-model="ruleForm.roleName"
            auto-complete="off"
            placeholder="Please enter Role Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="description">
          <el-input
            type="textarea"
            v-model="ruleForm.description"
            auto-complete="off"
            placeholder="Please enter a description"
          ></el-input>
        </el-form-item>
        <el-form-item label="Role status:" prop="roleStatus">
          <el-radio-group v-model="ruleForm.roleStatus">
            <el-radio label="On"></el-radio>
            <el-radio label="Off"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Permission list:" prop>
          <div class="permission"></div>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["passVisible", "title"],
  name: "RoleDialog",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        roleName: "",
        description: "",
        roleStatus: ""
      },
      rules: {
        roleName: [
          { required: true, message: "Please enter Role Name", trigger: "blur" }
        ],
        description: [
          {
            required: true,
            message: "Please enter a description",
            trigger: "blur"
          }
        ],
        roleStatus: [
          { required: true, message: "Please Role status", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    cancelButton() {
      this.resetForm("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetForm("ruleForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.$emit("visible", false);
    }
  },
  watch: {
    passVisible(val) {
      this.dialogVisible = val;
    }
  }
};
</script>

<style scoped>
.role_dialog >>> .el-form-item__content .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.role_dialog >>> .button .el-form-item__content button {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
}
.role_dialog >>> .el-form-item__content {
  margin-left: 120px !important;
}
.role_dialog >>> .el-form-item__label {
  width: 120px !important;
}
.role_dialog >>> .button {
  text-align: right;
  margin-bottom: 0;
}
.role_dialog >>> .el-dialog__body {
  padding-top: 10px;
}
.permission {
  height:150px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>