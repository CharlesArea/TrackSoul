<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div style="font-weight:50;">TrackSoul <sup>2</sup></div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        ref="menu"
        :default-active="activeItem"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <sidebar-item v-for="item in barItem" :key="item.path" :item="item" :base-path="item.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      barItem: {},
      appList: {},
      appIcon: {
        web: 'https://cdn.icon-icons.com/icons2/1908/PNG/512/4552606-check-computer-result-website_121388.png',
        app: 'https://cdn.iconscout.com/icon/free/png-512/whatsapp-156-734843.png'
      },
      activeItem: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    $route: function() {
      const route = this.$route
      const { meta, fullPath } = route
      this.promiseActiveMenu(meta, fullPath).then(res => {
        this.activeItem = res
      })
    },
    appList: function() {
      console.log('appList changed')
      this.appList_to_pathList(this.appList)
    }
  },
  created() {
    this.appList_to_pathList(this.$store.state.user.appList.apps)
    this.appList = this.$store.state.user.appList.apps
  },
  methods: {
    appList_to_pathList(appList) {
      this.barItem = [{
        path: 'dashboard',
        name: 'Dashboard',
        hidden: false,
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]
      var pathList = []
      appList.forEach((item, index) => {
        var path_obj = {
          path: '/' + item.appId,
          name: item.appId,
          meta: { title: item.type + index.toString(), icon: this.appIcon[item.type] },
          children: [{
            hidden: false,
            path: '/appDetail?info=' + item.appId,
            name: 'Real_Time_Data_Dashboard',
            meta: { title: 'Real-Time Data', icon: 'example' }
          }, {
            hidden: false,
            path: '/LocData?info=' + item.appId,
            name: 'Visitor_Map',
            meta: { title: 'Visitor Map', icon: 'example' }
          }]
        }
        pathList.push(path_obj)
        this.barItem.push(path_obj)
      })
      this.$store.dispatch('appDetail/set_barItem', pathList)
      console.log(this.$store.state.appDetail.barItem)

      // var appList = this.$store.state.appDetail.barItem
      // appList.forEach((item, index) => {
      //   this.barItem.push(path_obj)
      // })
    },
    promiseActiveMenu(meta, fullPath) {
      var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (meta.activeMenu) {
            resolve(meta.activeMenu)
          }
          resolve(fullPath)
        }, 1500)
      })
      return promise
    }
  }
}
</script>
