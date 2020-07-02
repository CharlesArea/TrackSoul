<template>
  <el-row :gutter="40" class="panel-group">
    <!--               Registed App                     -->
    <el-col v-for="item in barItem" :key="item.meta.title" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="clickFun(item)">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon :icon-class="item.meta.icon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ item.meta.title }}
          </div>
        </div>
      </div>
    </el-col>

    <!--                 Add new                        -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="addTask=true">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-circle-plus card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            增加項目
          </div>
        </div>
      </div>
    </el-col>

    <application-dialog v-model="addTask" />
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'
import applicationDialog from './ApplicationDialog'

export default {
  components: {
    // CountTo
    applicationDialog
  },
  props: {
    panelData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      numDisplay: {},
      addTask: false,
      barItem: [{
        path: '/appDetail?info=aaa',
        name: 'appDetail3',
        meta: { title: 'APP3', icon: 'example' },
        children: [{
          hidden: false,
          path: '/appDetail?info=a1',
          name: 'appDetail3',
          meta: { title: '實時儀表板', icon: 'example' }
        }, {
          hidden: false,
          path: '/appDetail?info=a2',
          name: 'appDetail2',
          meta: { title: '地區分佈', icon: 'example' }
        }]
      }, {
        path: '/appDetail?info=ddd',
        name: 'appDetail2',
        meta: { title: 'APP2', icon: 'example' },
        children: [{
          hidden: false,
          path: '/appDetail?info=d1',
          name: 'appDetail3',
          meta: { title: '實時儀表板', icon: 'example' }
        }, {
          hidden: false,
          path: '/appDetail?info=d2',
          name: 'appDetail2',
          meta: { title: '地區分佈', icon: 'example' }
        }]
      }],
      appIcon: {
        web: 'https://cdn.icon-icons.com/icons2/1908/PNG/512/4552606-check-computer-result-website_121388.png',
        app: 'https://cdn.iconscout.com/icon/free/png-512/whatsapp-156-734843.png'
      },
      appLIst: {}
    }
  },
  watch: {
    panelData: {
      handler(val) {
        this.numDisplay = {
          approvedNum: parseInt(val.approved_data),
          processedNum: parseInt(val.processed_data),
          processingNum: parseInt(val.processing_data),
          requestedNum: val.requested_data.length || 0
        }
      }
    },
    appLIst: function() {
      this.appList_to_pathList(this.appList)
    }
  },
  created() {
    this.appList_to_pathList(this.$store.state.user.appList.apps)
    this.appLIst = this.$store.state.user.appList.apps
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },

    clickFun(item) {
      var target_path = item.children[0].path

      this.$router.push(target_path)
      // var MenuObject = this.$parent.$parent.$parent.$children[0].$refs.menu
      // if (!MenuObject.collapse) {
      //   MenuObject.openedMenus = [item.path]
      // }
      // MenuObject.activeIndex = target_path
    },

    appList_to_pathList(appList) {
      this.barItem = this.$store.state.appDetail.barItem
      console.log(this.$store.state.appDetail.barItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #4e73df;
      }
    }

    .icon-people {
      color: #4e73df;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }

  }
}
</style>
