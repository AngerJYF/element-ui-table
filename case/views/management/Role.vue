<template>
  <div class="role_management">
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

      <div class="add_new" @click="addNew">
        <span class="el-icon-circle-plus add_new_icon">&nbsp;Add New</span>
      </div>
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

    <!-- // 添加角色 || 编辑角色 -->
    <RoleDialog @visible="visible" :passVisible="roleVisible" :title="RoleTitle"></RoleDialog>
  </div>
</template>

<script>
import TableTem from "./components/TableTem.vue";
import { tableCols } from "@/conf/Role.js";
import RoleDialog from "./components/RoleDialog.vue";
export default {
  name: "Role",
  components: {
    TableTem,
    RoleDialog
  },
  data() {
    return {
      roleVisible: false,
      RoleTitle: "",
      tableCols,
      tableData: [
        {
          Role: "General user",
          Description: "Kyle",
          createTime: "2014-12-24  23:12:00",
          state: true
        },
        {
          Role: "General user",
          Description: "Kayla",
          createTime: "2014-12-24  23:12:00",
          state: false
        }
      ],
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
    visible(val) {
      this.roleVisible = val;
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
    // 添加 新角色
    addNew() {
      console.log("添加新角色");
      this.roleVisible = true;
      this.RoleTitle = "Creating a Role";
    },
    // 获取 表格传递的数据
    passRowData(rowData) {
      console.log("rowData", rowData);
      let buttonType = rowData.button;
      switch (buttonType) {
        case "Edit":
          // 添加关联品牌
          this.roleVisible = true;
          this.RoleTitle = "Edit Role";
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
.role_management {
  padding: 10px;
}
.add_new {
  float: right;
}
.add_new span {
  cursor: pointer;
  user-select: none;
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #0078ff;
  font-size: 14px;
  color: #0078ff;
  border-radius: 2px;
}
</style>