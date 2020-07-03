<template>
  <div class="dashboard-container">
    <h1> All tracking applications -  </h1>
    <panel-group :panel-data="panelData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import chart from './components/chart'
import moment from 'moment'
import PanelGroup from './components/PanelGroup'
// import { getDashboardData } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  components: {
    'panel-group': PanelGroup
  },
  data() {
    return {
      panelData: {},
      requestedData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getDashboardData()
  },
  methods: {
    getDashboardData() {
      // getDashboardData().then(res => {
      //   this.panelData = res.result[0]
      //   this.initChartData(res.result[0].requested_data)
      // })
    },
    initChartData(rawData) {
      const date = rawData.map(row => ({
        ...row,
        date: moment(row.date_time).format('YYYY-MM-DD')
      })).sort((a, b) => {
        return moment(a.date) - moment(b.date)
      })
      date.forEach(row => {
        if (this.requestedData.length < 1) {
          this.requestedData.push({
            date: row.date,
            value: 1
          })
        } else {
          let breakFlat = false
          for (const item of this.requestedData) {
            if (item.date === row.date) {
              item.value += 1
              breakFlat = true
              break
            }
          }
          if (!breakFlat) {
            this.requestedData.push({
              date: row.date,
              value: 1
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
