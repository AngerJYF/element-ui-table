<template>
  <div class="user_management">
    <!--  用户管理  -->
    <div class="search_data">
      <div class="item_title">State:</div>
      <div class="item_select">
        <el-select clearable v-model="selectValue" placeholder="All">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item_keyword">
        <el-input v-model="inputValue" placeholder="Please enter a keyword"></el-input>
      </div>
      <div class="item_submit" @click="searchData">Search</div>
    </div>
    <!-- 数据表格 -->
    <div class="table">
      <TableTem
        size="mini"
        :isSelection="false"
        :isIndex="true"
        :isPagination="true"
        :isHandle="true"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @select="select"
        @passRowData="passRowData"
      ></TableTem>
    </div>
    <!-- // 添加关联品牌 -->
    <AddNewDialog @visible="visible" :passVisible="brandVisible" :title="addBrandTitle"></AddNewDialog>
    <!-- // 添加角色 -->
    <RoleDialog @visible="visible" :passVisible="roleVisible" :title="addRoleTitle"></RoleDialog>
  </div>
</template>

<script>
import TableTem from "./components/TableTem.vue";
import { tableCols } from "@/conf/User.js";
import AddNewDialog from "./components/AddNewDialog.vue";
import RoleDialog from "./components/RoleDialog.vue";
export default {
  name: "User",
  components: {
    TableTem,
    // 添加关联品牌
    AddNewDialog,
    // 添加角色
    RoleDialog
  },
  data() {
    return {
      // 添加关联品牌
      brandVisible: false,
      addBrandTitle: "",
      // 添加角色
      roleVisible: false,
      addRoleTitle: "",
      tableData: [
        {
          Account: "Kyle",
          Role: "General user ",
          Name: "Kyle",
          createTime: "2014-12-24  23:12:00",
          state: false
        },
        {
          Account: "Kayla",
          Role: "General user ",
          Name: "Kayla",
          createTime: "2014-12-24  23:12:00",
          state: false
        },
        {
          Account: "Edward",
          Role: "General user ",
          Name: "Edward",
          createTime: "2014-12-24  23:12:00",
          state: true
        }
      ],
      tableCols,
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 7
      },
      options: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        }
      ],
      selectValue: "",
      inputValue: ""
    };
  },
  methods: {
    select(row) {
      console.log(row);
    },
    // 搜索数据
    searchData() {
      console.log(this.selectValue, this.inputValue);
    },
    deleteRow(index, rows) {
      console.log("rows", rows);
    },
    querySwitchVal(val) {
      console.log(val);
    },

    scopeData(rowData) {
      console.log("rowData", rowData);
    },
    visible(val) {
      this.brandVisible = this.roleVisible = val;
    },
    // 获取 表格传递的数据
    passRowData(rowData) {
      console.log("rowData", rowData);
      let buttonType = rowData.button;
      switch (buttonType) {
        case "Add a related brand":
          // 添加关联品牌
          this.brandVisible = true;
          this.addBrandTitle = "Add a related brand";
          break;
        case "Add Role":
          // 添加角色
          this.roleVisible = true;
          this.addRoleTitle = "Add Role";
          break;
      }
    }
  }
};
</script>

<style scoped>
.search_data > div {
  display: inline-block;
  margin-right: 15px;
  vertical-align: middle;
}
.search_data >>> .el-input__inner,
.search_data >>> .el-input__icon {
  height: 32px;
  line-height: 32px;
}
.search_data .item_submit {
  cursor: pointer;
  width: 74px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #0078ff;
  border-radius: 2px;
  border: 1px solid#0078FF;
}
.user_management {
  padding: 10px;
}
</style>