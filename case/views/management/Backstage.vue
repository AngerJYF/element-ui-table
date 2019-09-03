<template>
  <div class="backstage_management">
    <!-- 后台数据管理 -->
    <div class="tab" v-if="tabHearder&&tabHearder.length >0">
      <span
        @click="activeTab(item.title,index)"
        :class="{activeClass:activeClass == item.title}"
        class="tab_option"
        v-for="(item,index) of tabHearder"
        :key="index"
      >{{item.title}}</span>
    </div>
    <transition>
      <component :is="flag" class="min_height"></component>
    </transition>
  </div>
</template>

<script>
import BackstageTab1 from "./components/BackstageTab1.vue";
import BackstageTab2 from "./components/BackstageTab2.vue";
export default {
  name: "Backstage",
  components: {
    BackstageTab1,
    BackstageTab2
  },
  data() {
    return {
      flag: "BackstageTab1",
      activeClass: "Enterprise information",
      tabHearder: [
        { title: "Enterprise information" },
        { title: "News information maintenance" }
      ]
    };
  },
  methods: {
    activeTab(val, index) {
      console.log("index", index);
      this.activeClass = val;
      switch (index) {
        case 0:
          this.flag = "BackstageTab1";
          break;
        case 1:
          this.flag = "BackstageTab2";
          break;
        default:
          this.flag = "BackstageTab1";
          break;
      }
    }
  }
};
</script>

<style scoped>
.min_height {
  min-height: 500px;
}
.backstage_management {
  padding: 0 10px;
}
.tab {
  padding-top: 10px;
  padding-left: 24px;
  border-bottom: 1px solid #e2e3e4;
}
.tab_option {
  cursor: pointer;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 25px;
  border-radius: 32px;
  margin-right: 20px;
  margin-bottom: 10px;
  background: #f2f3f4;
}
.tab_option:last-child {
  margin-right: 0;
}
.activeClass {
  color: #fff;
  background: #0078ff;
}
</style>