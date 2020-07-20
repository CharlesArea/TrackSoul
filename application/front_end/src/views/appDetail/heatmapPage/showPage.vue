<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-row>
        <el-autocomplete
          class="inline-input"
          v-model="searchWebstie"
          :fetch-suggestions="querySearch"
          placeholder="web"
          @select="changeInput"
        />
      </el-row>
    </div>
    <div class="dashboard-editor-container iframeContainer" id="heatmap" ref="iframeContainer" :style="{'height': 1200+'px', width: iframeWidth+'px', overflow: 'auto'}" >
      <iframe ref="iframeDisplayer" :src="checkWebsite" title="localhost" :style="{height: 1200+'px', width: iframeWidth+'px'}" />
    </div>

  </div>
</template>

<script>
import Heatmap from 'heatmap.js'
// import { getTrackRequest } from '@/api/appDetail'

export default {
  name: 'ShowPage',
  props: {
    websiteList: Array,
    heatmapInfo: Array
  },
  data() {
    return {
      iframeHeight: 300,
      iframeWidth: 300,
      iframeDisplayer: '',
      heatmapSwitch: true,
      output: null,
      // websiteList: [],
      searchWebstie: '',
      websiteValueList: [],
      checkWebsite: ''
    }
  },
  created() {
    this.iframeHeight = (window.innerHeight) * 0.8
    this.iframeWidth = (window.innerWidth) * 0.8
  },
  mounted() {
    this.iframeDisplayer = this.$refs.iframeDisplayer
    // console.log(this.$refs.iframeDisplayer.contentWindow)
    // console.log(this.$refs.iframeDisplayer.contentWindow.document)
    // console.log(this.$refs.iframeDisplayer.contentWindow.document.body)
    // console.log(this.$refs.iframeDisplayer.contentWindow.document.body.offsetHeight)
    // console.log(this.$refs.iframeDisplayer.contentWindow.location.href)

    // var _this = this
    const iframe = this.$refs.iframeDisplayer
    // 处理兼容行问题
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function() {
        // iframe加载完毕以后执行操作
        console.log('iframe loaded')
        // console.log(this.$refs.iframeDisplayer.contentWindow.document.body.scrollHeight)
      })
    } else {
      iframe.onload = () => {
        // iframe加载完毕以后执行操作
        // console.log('iframe已加载完毕')
        // console.log(iframe.contentWindow.document.body.scrollHeight)
        console.log(this.$refs.iframeDisplayer)
      }
    }
  },
  watch: {
    heatmapSwitch: function() {
      console.log(this.heatmapSwitch)
      var heatmap_canvas = (document.querySelector('.heatmap-canvas'))
      console.log(heatmap_canvas.style)
      heatmap_canvas.style.display = this.heatmapSwitch ? 'inline-block' : 'none'
    },

    heatmapInfo: function() {
      this.reGenerateCanvas()
    }
  },
  methods: {
    async print() {
      const el = this.$refs.printMe
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = await this.$html2canvas(el, options)
    },

    querySearch(queryString, cb) {
      var websiteList = this.websiteList
      console.log(this.websiteList, websiteList)
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

    changeInput() {
      console.log(this.searchWebstie)
      this.checkWebsite = this.searchWebstie
      this.$emit('changeHeatmapInfo', this.searchWebstie)
    },

    reGenerateCanvas() {
      var heatmapCanvas = document.querySelector('.heatmap-canvas');
      if (heatmapCanvas) {
        this.$refs.iframeContainer.removeChild(heatmapCanvas);
      }
      var heatmapInstance = Heatmap.create({
        // only container is required, the rest will be defaults
        container: this.$refs.iframeContainer
      })
      var points = []
      this.heatmapInfo.forEach( ele => {
        // console.log(ele.page_position_x, ele.page_position_y)
        var point = {
          x: ele.page_position_x,
          y: ele.page_position_y,
          value: 3,
          // radius configuration on point basis
          radius: 20
        }
        points.push(point)
      })
      var data = {
        max: 3,
        data: points
      }
      heatmapInstance.setData(data)
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
</style>

<style>
</style>
