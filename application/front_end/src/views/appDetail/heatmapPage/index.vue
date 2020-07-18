<template>
  <div class="dashboard-container">
    <el-menu :default-active="activateItem" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">所有頁面</el-menu-item>
      <el-menu-item index="2">頁面熱力圖</el-menu-item>
    </el-menu>

    <div v-show="activateItem === '1'">
      <keep-alive>
        <page-table ref="websiteTable" :websiteValueList="websiteValueList" v-on:changeToShow="changeToShow"/>
      </keep-alive>
    </div>

    <div v-show="activateItem === '2'">
      <keep-alive>
        <show-page ref="heatmapShowPage" :websiteList="websiteList"/>
      </keep-alive>
    </div>

  </div>
</template>

<script>
// import { getTrackRequest } from '@/api/appDetail'
import { getUserCount } from '@/api/appDetail'

import showPage from './showPage'
import pageTable from './table'

export default {
  name: 'HeatmapPage',
  components: {
    'show-page': showPage,
    'page-table': pageTable
  },
  data() {
    return {
      websiteList: [],
      searchWebstie: '',
      websiteValueList: [],
      checkWebsite: '',
      activateItem: '1'
    }
  },
  created() {
    this.token = this.$route.query.token
    getUserCount({ token: this.token }).then(res => {
      var results = res.data
      console.log(this.token, res)
      var checkClient = (results) => {
        var urlList = {}
        results.forEach(ele => {
        //   urlList[ele.result.current_visiting_url] = ''
          if (ele.result.current_visiting_url) {
            if (!urlList[ele.result.current_visiting_url]) {
              urlList[ele.result.current_visiting_url] = []
            }
            urlList[ele.result.current_visiting_url].push(ele.result)
          }
          if (ele.result.visitor_from) {
            if (!urlList[ele.result.visitor_from]) {
              urlList[ele.result.visitor_from] = []
            }
            urlList[ele.result.visitor_from].push(ele.result)
          }
        })
        return new Promise(resolve => resolve(urlList))
      }
      checkClient(results).then((data) => {
        this.websiteValueList = []
        this.websiteList = Object.keys(data)
        Object.keys(data).forEach(key => {
          this.websiteValueList.push({ value: key, clickNum: data[key].length })
        })
      })
    })
  },
  methods: {
    querySearch(queryString, cb) {
      var websiteList = this.websiteList
      var results = queryString ? websiteList.filter(this.createFilter(queryString)) : websiteList
      this.websiteValueList = []
      results.forEach(ele => this.websiteValueList.push({ value: ele }))
      // 调用 callback 返回建议列表的数据
      cb(this.websiteValueList)
    },

    createFilter(queryString) {
      return (website) => {
        return (website.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },

    handleSelect(key, keyPath) {
      this.activateItem = key
    },

    changeToShow(targetLink) {
      this.activateItem = '2'
      this.$refs.heatmapShowPage.checkWebsite = targetLink
    }
  }
}
</script>

<style lang="scss" scoped>
.iframeContainer{
    width: 80%;
    margin: 10px 8%;
}

.inline-input{
    width: 80%;
    margin: 10px 8%;
}

.el-menu.el-menu--horizontal{
    border-top: solid 1px #e6e6e6;
}
</style>

<style>
</style>
