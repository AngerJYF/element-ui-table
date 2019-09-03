<template>
  <div class="addnew_dialog">
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
        <el-form-item label prop="region">
          <span class="option_title">Please add a brand:</span>
          <el-select v-model="ruleForm.region" placeholder="Single selection">
            <el-option label="option1" value="option1"></el-option>
            <el-option label="option2" value="option2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label prop="region1">
          <span class="option_title">Please choose to follow the brand:</span>
          <el-select v-model="ruleForm.region1" placeholder="Single selection">
            <el-option label="option1" value="option1"></el-option>
            <el-option label="option2" value="option2"></el-option>
          </el-select>
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
  name: "AddNewDialog",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        region: "",
        region1: ""
      },
      rules: {
        region: [
          { required: true, message: "please choose", trigger: "change" }
        ],
        region1: [
          { required: true, message: "please choose", trigger: "change" }
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
.addnew_dialog >>> .el-form-item__content .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.addnew_dialog >>> .el-form-item__content {
  margin-left: 0 !important;
}
.addnew_dialog >>> .el-form-item .el-form-item__label {
  line-height: 10px;
}
.option_title {
  text-align: right;
  display: inline-block;
  width: 240px;
  margin-right: 10px;
}
.addnew_dialog >>> .button .el-form-item__content button {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
}
.addnew_dialog >>> .button {
  text-align: right;
  margin-bottom: 0;
}
.addnew_dialog >>> .el-form-item__content .el-form-item__error {
  left: 250px;
}
.addnew_dialog >>> .el-form-item__content .el-select {
  width: calc(100% - 260px);
}
</style>