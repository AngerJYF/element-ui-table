<template>
  <div class="table_tem">
    <!-- 表格模板 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="550"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column fixed v-if="isSelection" type="selection" align="center" width="50"></el-table-column>
      <el-table-column
        fixed
        v-if="isIndex"
        type="index"
        :label="indexLabel"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 数据 -->
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        v-for="(item,index) of tableCols"
        :key="index"
        :fixed="item.isFixed"
      >
        <template slot-scope="scope">
          <!-- 操作按钮 -->
          <span v-if="item.type==='Button'">
            <el-button
              v-for="(btn,index) of item.btnList"
              :key="index"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              :type="btn.type"
              :size="btn.size || size"
              :icon="btn.icon"
              @click="dataOperating(btn.label,scope.row)"
            >{{btn.label}}</el-button>
          </span>
          <!-- 开关按钮 -->
          <el-switch
            v-if="item.type==='Switch'"
            active-text="off"
            inactive-text="on"
            v-model="scope.row[item.prop]"
            @change="querySwitchVal(scope.row)"
          >{{scope.row}}</el-switch>
          <!-- 图片 -->
          <img v-if="item.type==='image'" :src="scope.row[item.prop]" />
          <!-- 默认 -->
          <span
            v-if="!item.type"
            class="text_one_line"
            :title="scope.row[item.prop]"
          >{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination" v-if="isPagination">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total,sizes ,prev, pager, next,jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.pageNum"
        :total="pagination.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格型号：mini,medium,small
    size: { type: String, default: "medium" },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: "Number" },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 分页数据
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageNum: 1, total: 0 })
    },
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格列配置
    tableCols: { type: Array, default: () => [] },
    // 当前列是否固定
    isFixed: { type: Boolean || String, default: false }
  },
  name: "TableTem",
  data() {
    return {};
  },
  methods: {
    // 表格勾选
    select(rows, row) {
      this.$emit("select", rows, row);
    },
    // 全选
    selectAll(rows) {
      this.$emit("selectAll", rows);
    },
    // 第几页
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.$emit("refresh");
    },
    // 每页显示条数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit("refresh");
    },
    // 开关状态
    querySwitchVal(row) {
      console.log(row);
      this.$emit("switchVal", row);
    },
    dataOperating(button, row) {
      let result = {
        button: button,
        rowData: row
      };
      this.$emit("passRowData", result);
      // console.log(button, row);
    }
  },
  watch: {}
};
</script>

<style scoped>
img {
  max-width: 50%;
}
.pagination {
  text-align: center;
  margin: 20px;
}
/* 文字一行显示 多出隐藏 */

.text_one_line {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.text_two_line {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.table_tem {
  padding: 10px 0;
  margin-top: 10px;
}
.table_tem >>> .el-table .el-table__header th {
  background: #f7f8fa;
  font-size: 14px;
  color: #6c757d;
}
</style>