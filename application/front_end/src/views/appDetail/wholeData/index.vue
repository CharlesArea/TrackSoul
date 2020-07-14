<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">

      <panel-group ref="panelGroup" @handleSetLineChartData="handleSetLineChartData" />

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <raddar-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import { getUserCount } from '@/api/appDetail'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      token: ''
    }
  },
  created() {
    this.token = this.$route.query.token
    this.LoadData()
  },
  methods: {
    LoadData() {
      getUserCount({ token: this.token }).then(res => {
        console.log(res)
        var results = res.data
        ///////////////// Panel Group /////////////////
        // get clickNum
        this.$refs.panelGroup.totalVisitsNum = results.length
        // get client Num and Current User
        var checkClient = () => {
          var clientCookie = {}
          results.forEach(ele => {
            clientCookie[ele.result.client_cookie_id] = ''
            console.log(ele.result)
          })
          return new Promise(resolve => resolve(clientCookie))
        }
        checkClient().then((data) => {
          this.$refs.panelGroup.totalClientsNum = (Object.keys(data).length)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
