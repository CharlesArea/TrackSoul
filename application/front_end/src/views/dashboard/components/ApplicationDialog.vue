<template>
  <div>
    <el-dialog :visible.sync="dialog.visible" :title="dialog.title" width="60%" @closed="closeDialog">
      <!--            Step 1                  -->
      <div v-if="curStep==1" style="height:350px">
        <span>
          Select your application needed to be tracked
          <el-row :gutter="20" style="margin:15px 0px;">
            <el-col v-for="(item, index) in appList" :key="index" :span="8">
              <el-card :body-style="{ padding: '0px' }" class="appSelectType" :class="item.selected ? 'selectedItem' : ''" @click.native="selectType(index)">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
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
          Please put this code into your programme
          <el-input
            v-model="textarea"
            type="textarea"
            :autosize="{ minRows: 12, maxRows: 14}"
            placeholder="Code"
            readonly
            resize="none"
          />

        </span>
      </div>
      <span v-if="curStep==2" slot="footer" class="dialog-footer">
        <el-row>
          <el-button style="float: left; width: 50%;" @click="dialog.visible = false">取 消</el-button>
          <el-button type="danger" style="float: right;" @click="addApp">完成</el-button>
        </el-row>
      </span>

    </el-dialog>
  </div>
</template>

<script>

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
        title: 'Step by Step (first step)'
      },
      appList: [{
        appType: 'web',
        imgSrc: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        selected: false
      }, {
        appType: 'app',
        imgSrc: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        selected: false
      }, {
        appType: 'web',
        imgSrc: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        selected: false
      }],
      selectedApp: -1,
      curStep: 1,
      textarea: '',
      appIcon: {
        web: 'https://cdn.icon-icons.com/icons2/1908/PNG/512/4552606-check-computer-result-website_121388.png',
        app: 'https://cdn.iconscout.com/icon/free/png-512/whatsapp-156-734843.png'
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        console.log(val)
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
      this.curStep = 2
    },

    addApp() {
      this.dialog.visible = false
      this.closeDialog()

      // add value
      var appId = this.makeid(7)
      var appType = this.appList[this.selectedApp].appType

      var o_appList = this.$store.state.user.appList.apps
      o_appList.push({ appId: appId, type: appType })
    },

    makeid(length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
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

</style>
