<template>
  <div class="backstage_tab">
    <!-- BackstageTab2 -->
    <div class="search_data">
      <div>
        <ul class="ul clearfix">
          <li
            @click="querySearch(item)"
            :class="{activeClass:active == item}"
            v-for="(item,index) of alphabeticQuery"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <div class="item_keyword">
        <el-input v-model="inputValue" placeholder="Please enter a keyword"></el-input>
      </div>
      <div class="item_submit" @click="searchData">Search</div>

      <!-- <div class="add_new" @click="addNew">
        <span class="el-icon-circle-plus add_new_icon">&nbsp;Add New</span>
      </div>-->
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
      ></TableTem>
    </div>
  </div>
</template>

<script>
import { alphabeticQuery, BackstageTab2 } from "@/conf/Backstage.js";
import TableTem from "./TableTem.vue";
export default {
  name: "BackstageTab2",
  components: {
    TableTem
  },
  data() {
    return {
      alphabeticQuery,
      active: "A",
      inputValue: "",
      tableCols: BackstageTab2,
      tableData: [
        {
          headlines: "Alipay opens an appointment for some users",
          summary:
            "Henan set up a second-phase fund for migrant workers returning to the countryside to support start-up Henan set up a second-phase fund for migrant workers returning to the countryside to support start-up ",
          newsSource: "Reuters",
          createTime: "2014-12-24  23:12:00",
          state: true
        }
      ],
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 7
      }
    };
  },
  methods: {
    select(row) {
      console.log(row);
    },
    querySearch(val) {
      console.log("val", val);
      this.active = val;
    },
    searchData() {
      console.log(this.inputValue);
    },
    // 添加 新角色
    addNew() {
      console.log("添加新角色");
    }
  }
};
</script>

<style scoped>
.ul li {
  cursor: pointer;
  user-select: none;
  float: left;
  padding: 8px 10px;
  background: #f7f8fa;
}
.activeClass {
  color: #fff;
  background: #0078ff !important;
}
.backstage_tab {
  min-height: 300px;
  margin: 20px 0;
}
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
.add_new {
  float: right;
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