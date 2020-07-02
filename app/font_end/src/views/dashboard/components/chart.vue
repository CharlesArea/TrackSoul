<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    formatData(chartData) {
      const dateList = []
      if (chartData.length > 0) {
        const startDate = chartData[0].date
        const endDate = chartData[chartData.length - 1].date
        const oneDay = 24 * 3600 * 1000
        let daystamp = +new Date(startDate)
        let currentDate = startDate
        while (currentDate !== endDate) {
          dateList.push({
            date: currentDate,
            value: 0
          })
          console.log(daystamp)
          daystamp += oneDay
          currentDate = moment(daystamp).format('YYYY-MM-DD')
        }
        dateList.push({
          date: currentDate
        })
        chartData.forEach(row => {
          for (const item of dateList) {
            if (item.date === row.date) {
              item['value'] = row.value
              break
            }
          }
        })
      }
      return dateList
    },
    setOptions(chartData = []) {
      const date = this.formatData(chartData).map(row => row.date)
      const data = this.formatData(chartData).map(row => row.value)
      this.chart.setOption({
        title: {
          left: 'center',
          text: '請求數量',
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        xAxis: {
          data: date,
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          max: function(value) {
            return value.max + 1
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '數量',
            type: 'line',
            smooth: false,
            data: data
          }
        ]
      })
    }
  }
}
</script>
