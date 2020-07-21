<template>
  <div>
    <el-dialog :visible.sync="dialog.visible" :title="dialog.title" width="60%" @closed="closeDialog">
      <!--            Step 1                  -->
      <div v-if="curStep==1" style="height:350px">
        <span>
          Select your application platform that needed to be tracked
          <el-row :gutter="20" style="margin:15px 0px;">
            <el-col v-for="(item, index) in appList" :key="index" :span="8">
              <el-card :body-style="{ padding: '0px' }" class="appSelectType" :class="item.selected ? 'selectedItem' : ''" @click.native="selectType(index)">
                <img :src="item.imgSrc" class="image">
                <div style="padding: 14px;">
                  <span>{{ item.appType }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </span>
      </div>
      <span v-if="curStep==1" slot="footer" class="dialog-footer">
        <el-row>
          <el-button style="float: left; width: 50%;" @click="dialog.visible = false">取 消</el-button>
          <el-button type="danger" style="float: right;" @click="nextStep">next</el-button>
        </el-row>
      </span>
      <!--              Step 2                  -->
      <div v-if="curStep==2" style="height:350px">
        <span>
          Please name your programme
          <el-input
            v-model="appName"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2}"
            placeholder="AppName"
            resize="none"
          />
        </span>
        <span>
          Domain Name
          <el-input
            v-model="appDomain"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2}"
            placeholder="Domain Name"
            resize="none"
          />
        </span>
        <span>
          Description
          <el-input
            v-model="appDescription"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6}"
            placeholder="Write down your description"
            resize="none"
          />
        </span>
      </div>
      <span v-if="curStep==2" slot="footer" class="dialog-footer">
        <el-row>
          <el-button style="float: left; width: 50%;" @click="prevStep">上一步</el-button>
          <el-button type="danger" style="float: right;" @click="nextStep">下一步</el-button>
        </el-row>
      </span>
      <!--              Step 3                  -->
      <div v-if="curStep==3" style="height:350px">
        <span>
          Please put this code into your programme
          <el-input
            v-model="textarea"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 12}"
            placeholder="Code"
            readonly
            resize="none"
          />
        </span>
      </div>
      <span v-if="curStep==3" slot="footer" class="dialog-footer">
        <el-row>
          <el-button style="float: left; width: 50%;" @click="dialog.visible = false">取 消</el-button>
          <el-button type="danger" style="float: right;" @click="addApp">完成</el-button>
          <el-button type="warning" style="float: right;" @click="testConnet">測試</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { updateAppDetail } from '@/api/appDetail'
import axios from 'axios'
import makeRandomStr from '@/utils/util'
import { visit_website } from '@/api/appDetail'

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: {
        visible: false,
        title: 'Adding your application (Choose your platform)'
      },
      appList: [{
        appType: 'Website',
        imgSrc: 'https://www.w3.org/html/logo/img/html5-display.png',
        selected: false
      }, {
        appType: 'Wechat Mini-Program',
        imgSrc: 'https://assets.materialup.com/uploads/e3e4dd46-9ff9-4735-ad16-5ac8370d1e1a/preview.png',
        selected: false
      }, {
        appType: 'Android',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg',
        selected: false
      }],
      selectedApp: -1,
      curStep: 1,
      textarea: '',
      appName: '',
      appDescription: '',
      appDomain: '',
      appToken: '',
      appKey: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        this.dialog.visible = val
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', this.dialog.visible)
      this.curStep = 1
    },

    selectType(item) {
      var storeBool = this.appList[item].selected
      this.appList.forEach(ele => { ele.selected = false })
      this.appList[item].selected = !storeBool

      this.selectedApp = (!storeBool) ? item : -1
    },

    nextStep() {
      if (this.curStep === 1) {
        if (this.selectedApp === -1) {
          this.$message.error('Please Select your application')
          return
        }
      } else if (this.curStep === 2) {
        if (!this.appName || !this.appDomain) {
          this.$message.error('Please name your application and domain')
          return
        } else {
          this.appToken = makeRandomStr(10)
          this.appKey = makeRandomStr(20)
          this.textarea = '<scri'
          this.textarea += 'pt async id="TrackSoul" src="src/main.js"'
          this.textarea += '\nclient_id="' + this.appToken + '"\nclient_key="' + this.appKey + '"\ndomain_name="' + this.appDomain + '"\ntype="module"/'
          this.textarea += '>\n</sc'
          this.textarea += 'ript>'
        }
      }
      this.curStep += 1
    },

    prevStep() {
      this.curStep -= 1
    },

    addApp() {
      if (this.appName && this.appDomain) {
        // add value
        // var appToken = makeRandomStr(10)
        // var appKey = makeRandomStr(20)
        var appToken = this.appToken
        var appKey = this.appKey
        var appType = this.appList[this.selectedApp].appType
        this.$store.dispatch('user/updateApp', { appToken: appToken, appKey: appKey, type: appType, appName: this.appName, des: this.appDomain }).then(res => {
          this.appName = ''
          this.appDescription = ''
          this.appToken = ''
          this.appKey = ''
          this.dialog.visible = false
          this.closeDialog()
        }).catch(error => {
          console.log(error)
          this.$message.error('something wrong')
        })
      } else {
        this.$message.error('Please name your application')
      }
    },

    testConnet() {
      console.log('gogo test')
      visit_website({url: this.appDomain, token: this.appToken}).then(res => {
        this.$message('Tracking Success!!!')
      })
    }
  }
}
</script>

<style scoped>
.appSelectType:hover{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    cursor: pointer;
}
.selectedItem{
    border: 3px solid red;
    /* box-shadow: 0 0 0 3px red; */
}

.image{
  width:100%;
  height:260px;
  padding-top:10px;
}

</style>
