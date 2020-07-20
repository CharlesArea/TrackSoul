<template>
  <div class="dashboard-container">

    <el-menu :default-active="activateItem" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">所有頁面</el-menu-item>
      <el-menu-item index="2">頁面熱力圖</el-menu-item>
    </el-menu>

    <!--                  Button Filter                       -->
    <div class="" v-show="activateItem === '1'" style="float:right; margin: 10px 10px;">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        align="right"
        range-separator="至"
        start-placeholder="開始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
      />
      <el-button type="success" plain @click="filterByDate">Search</el-button>
    </div>

    <!--                    Show Panel                        -->
    <div v-show="activateItem === '1'">
      <keep-alive>
        <page-table ref="websiteTable" :websiteValueList="websiteValueList" v-on:changeToShow="changeToShow"/>
      </keep-alive>
    </div>

    <div v-show="activateItem === '2'">
      <keep-alive>
        <show-page ref="heatmapShowPage" :websiteList="websiteList" :heatmapInfo="heatmapInfo" v-on:changeHeatmapInfo="changeHeatmapInfo"/>
      </keep-alive>
    </div>

  </div>
</template>

<script>
// import { getTrackRequest } from '@/api/appDetail'
import { getUserCount, getClickEventFiltDate } from '@/api/appDetail'

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
      activateItem: '1',
      resultObject: {},
      heatmapInfo: [],
      dateRange: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一週',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.token = this.$route.query.token
    // getUserCount({ token: this.token }).then(res => {
    //   var results = res.data
    //   // Table result
    //   this.getUrlList(results).then((data) => {
    //     console.log(data)
    //     this.websiteValueList = []
    //     this.websiteList = Object.keys(data)
    //     Object.keys(data).forEach(key => {
    //       this.websiteValueList.push({ value: key, clickNum: data[key].length })
    //     })
    //   })
    // })

    var endDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    var start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    var startDate = start.toISOString().replace(/T/, ' ').replace(/\..+/, '')

    getClickEventFiltDate({ token: this.token, startDate: startDate, endDate: endDate }).then( res => {
      var results = res.data
      // Table result
      this.getUrlList(results).then((urlList) => {
        var data = urlList['urls']
        var cookies_info = urlList['cookies']
        this.websiteValueList = []
        this.websiteList = Object.keys(data)
        Object.keys(data).forEach(key => {
          this.websiteValueList.push({ value: key, clickNum: data[key].length, visitorNum: cookies_info[key].length})
        })
      })
      this.dateRange = [startDate, endDate]
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
      this.heatmapInfo = this.resultObject[targetLink]
    },

    changeHeatmapInfo(targetLink) {
      this.heatmapInfo = this.resultObject[targetLink]
    },

    getUrlList(results) {
      console.log(results)
      var urlList = {}
      urlList['urls'] = []
      urlList['cookies'] = []
      results.forEach(ele => {
      //   urlList[ele.result.current_visiting_url] = ''
        if (ele.result.current_visiting_url) {
          var current_url = ele.result.current_visiting_url
          if (!urlList['urls'][current_url]) {
            urlList['urls'][current_url] = []
            urlList['cookies'][current_url] = []
          }
          urlList['urls'][current_url].push(ele.result)
          if (!urlList['cookies'][current_url].includes(ele.result.client_cookie_id)) {
            urlList['cookies'][current_url].push(ele.result.client_cookie_id)
          }
          urlList['urls'][current_url].push(ele.result)
        }
      })
      console.log(urlList)
      this.resultObject = urlList['urls']
      console.log(this.resultObject)
      return new Promise(resolve => resolve(urlList))
    },

    filterByDate() {
      if (this.dateRange[0]) {
        var startDate = this.dateRange[0] + ' 23:59:59'
        var endDate = this.dateRange[1] + ' 23:59:59'
        getClickEventFiltDate({ token: this.token, startDate: startDate, endDate: endDate }).then( res => {
          var results = res.data
          // Table result
          this.getUrlList(results).then((urlList) => {
            var data = urlList['urls']
            this.websiteValueList = []
            this.websiteList = Object.keys(data)
            Object.keys(data).forEach(key => {
              this.websiteValueList.push({ value: key, clickNum: data[key].length })
            })
          })
        })
      }
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
