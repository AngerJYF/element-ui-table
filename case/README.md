### 表格组件代码：Table.vue

#### 先看最终效果(展示部分数据, 自行根据项目需求进行封装)


``` hash

<!--表格组件 -->

<template>
<section class="ces-table-page">

  <!-- 表格操作按钮 -->
    <section class="ces-handle" v-if='isHandle'>
      <el-button v-for='item in tableHandles' :size="item.size || size" :type="item.type" :icon='item.icon' @click="item.handle()">{{item.label}}</el-button>
    </section>

    <!-- 数据表格 -->
    <section class="ces-table">
        <el-table  :data='tableData' :size='size' height="100%" 
          :border  ='isBorder'
          @select='select' 
          @select-all='selectAll'
          v-loading='loading' 
          :defaultSelections='defaultSelections'
          ref="cesTable">
            <el-table-column v-if="isSelection" type="selection" align="center" ></el-table-column>
            <el-table-column v-if="isIndex" type="index" :label="indexLabel" align="center" width="50"></el-table-column>

            <!-- 数据栏 -->

            <el-table-column v-for="item in tableCols" 
              :key="item.id"
              :prop="item.prop" 
              :label="item.label" 
              :width="item.width"
              :align="item.align" 
              :render-header="item.require?renderHeader:null"
              >
                <template slot-scope="scope" >

                  <!-- html -->

                  <span v-if="item.type==='Html'" v-html="item.html(scope.row)"></span>

                  <!-- 按钮 -->

                  <span v-if="item.type==='Button'" >
                    <el-button v-for="btn in item.btnList" 
                      v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row))"
                      :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                      :type="btn.type" 
                      :size="btn.size || size" 
                      :icon="btn.icon" 
                      @click="btn.handle(scope.row)">{{btn.label}}</el-button>
                    </span>

                  <!-- 输入框 -->

                  <el-input v-if="item.type==='Input'" v-model="scope.row[item.prop]" :size="size" 
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    @focus="item.focus && item.focus(scope.row)"></el-input>

                  <!-- 下拉框 -->

                  <el-select v-if="item.type==='Select'" v-model="scope.row[item.prop]" :size="size" :props="item.props"
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)" 
                    @change='item.change && item.change(scope.row)'>
                      <el-option v-for="op in item.options" :label="op[item.props.label]" :value="op[item.props.value]" :key="op[item.props.value]"></el-option>
                  </el-select>

                  <!-- 单选 -->

                  <el-radio-group v-if="item.type==='Radio'" v-model="scope.row[item.prop]"
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    @change='item.change && item.change(scope.row)'>
                      <el-radio v-for="ra in item.radios" :label="ra.value">{{ra.label}}</el-radio>
                  </el-radio-group>

                  <!-- 复选框 -->

                  <el-checkbox-group v-if="item.type==='Checkbox'" v-model="scope.row[item.prop]" 
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    @change='item.change && item.change(scope.row)'>
                      <el-checkbox v-for="ra in item.checkboxs" :label="ra.value">{{ra.label}}</el-checkbox>
                  </el-checkbox-group>

                  <!-- 评价 -->

                  <el-rate v-if="item.type==='Rate'" v-model="scope.row[item.prop]"
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    @change='item.change && item.change(scope.row)'></el-rate>

                  <!-- 开关 -->

                  <el-switch v-if="item.type==='Switch'" v-model="scope.row[item.prop]"
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    @change='item.change && item.change(scope.row)'></el-switch>

                  <!-- 图像 -->

                  <img v-if="item.type==='Image'" :src="scope.row[item.prop]" @click="item.handle && item.handle(scope.row)"/>

                  <!-- 滑块 -->

                  <el-slider v-if="item.type==='Slider'" v-model="scope.row[item.prop]" 
                  :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    @change='item.change && item.change(scope.row)'></el-slider>

                  <!-- 默认 -->

                  <span v-if="!item.type" 
                    :style="item.itemStyle && item.itemStyle(scope.row)" 
                    :class="item.itemClass && item.item.itemClass(scope.row)">{{(item.formatter && item.formatter(scope.row)) || scope.row[item.prop]}}</span>

                </template>
              </el-table-column>
        </el-table>
    </section>
    <!-- 分页 -->
    <section class="ces-pagination"  v-if='isPagination'>
        <el-pagination style='display: flex;justify-content: center;height: 100%;align-items: center;'
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total,sizes ,prev, pager, next,jumper"
            :page-size="pagination.pageSize"
            :current-page="pagination.pageNum"
            :total="pagination.total"
        ></el-pagination>
    </section>
</section>
</template>

<script>

export default {
  props:{
    // 表格型号：mini,medium,small
    size:{type:String,default:'medium'},
    isBorder:{type:Boolean,default:true},
    loading:{type:Boolean,default:false},
    // 表格操作
    isHandle:{type:Boolean,default:false},
    tableHandles:{type:Array,default:()=>[]},
    // 表格数据
    tableData:{ type:Array,default:()=>[]},
    // 表格列配置
    tableCols:{ type:Array,default:()=>[]},
    // 是否显示表格复选框
    isSelection:{type:Boolean,default:false},
    defaultSelections:{ type:[Array,Object], default:()=>null},
    // 是否显示表格索引
    isIndex:{type:Boolean,default:false},
    indexLabel: {type:String,default:'序号'},
    // 是否显示分页
    isPagination:{type:Boolean,default:true},
    // 分页数据
    pagination:{ type:Object,default:()=>({pageSize:10,pageNum:1,total:0})},
    
  },
  data(){
    return {
    }
  },
  watch:{
    'defaultSelections'(val) {
        this.$nextTick(function(){
          if(Array.isArray(val)){
            val.forEach(row=>{
              this.$refs.cesTable.toggleRowSelection(row)
            })
          }else{
            this.$refs.cesTable.toggleRowSelection(val)
          }
        })      
    }
  },
  methods:{
    // 表格勾选
    select(rows,row){
      this.$emit('select',rows,row);
    },
    // 全选
    selectAll(rows){
      this.$emit('select',rows)
    },
    // 
    handleCurrentChange(val){
      this.pagination.pageNum = val;
      this.$emit('refresh');
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit('refresh');
    },
    
    // tableRowClassName({rowIndex}) {
    //     if (rowIndex % 2 === 0) {
    //         return "stripe-row";
    //     }
    //     return "";
    // }
    renderHeader(h,obj) {
      return h('span',{class:'ces-table-require'},obj.column.label)
    },
  },
}
</script>
<style>
.ces-table-require::before{
  content:'*';
  color:red;
}
</style>

```

``` hash 

<!-- 页面调用和搜索框组件同用 -->

<template>
  <div class="ces-main">
    <search-form 
      size='mini'
      labelWidth = '80px' 
      :searchData = "searchData"
      :searchForm = "searchForm"
      :searchHandle="searchHandle"></search-form>
    <ces-table 
      size='mini'
      :isSelection='true'
      :isIndex='true'
      :isPagination='true'
      :isHandle='true'
      :tableData='tableData' 
      :tableCols='tableCols' 
      :tableHandles='tableHandles'
      :pagination='pagination'
      >
      </ces-table>
  </div>
</template>

<script>
import SearchForm from '@/components/common/Form/searchForm'
import cesTable from '@/components/common/Table/Table'
export default {
  data () {

    let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
    let sexProps={label:'label',value:'value'}
    let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}]
    let interstProps={label:'label',value:'value'}
    return {
// 查询表单
      searchData:{
        name:null,
        age:null,
        sex:null,
        interst:null
      },
      searchForm:[
        {type:'Input',label:'姓名',prop:'name',width:'180px',placeholder:'请输入姓名...'},
        {type:'Input',label:'年龄',prop:'age',width:'180px',placeholder:'请输入年龄...'},
        {type:'Select',label:'性别',prop:'sex',width:'180px',options:sexs,props:sexProps,change:row=>'',placeholder:'请选择性别...'},
        {type:'Checkbox',label:'爱好',width:'180px',prop:'interst',checkboxs:intersts,props:interstProps}
      ],
      searchHandle:[
        {label:'查询',type:'primary',handle:()=>''},
        {label:'重置',type:'primary',handle:()=>''}
      ],

// 表格
      tableData:[
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'}
        
      ],
      tableCols:[
        {label:'姓名',prop:'name'},
        {label:'年龄',prop:'age'},
        {label:'性别',prop:'sex'},
        {label:'爱好',prop:'interst'},
        {label:'操作',type:'Button',btnList:[
          {type:'primary',label:'编辑',handle:row=>''},
          {type:'danger',label:'删除',handle:row=>''}
        ]}
      ],
      tableHandles:[
        {label:'新增',type:'primary',handle:row=>''}
      ],
      pagination:{
        pageSize:10,
        pageNum:1,
        total:7
      }
    }
  },
  components:{
    cesTable,
    SearchForm
  }
}
</script>

<style>

</style>

```