<template>
  <div class="container">
    <el-table
      :data="websiteValueList"
      style="width: 100%;margin-top: 10px; cursor:pointer;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @row-click="rowClick"
    >
      <el-table-column
        prop="value"
        label="連結"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="clickNum"
        label="點擊數"
        sortable
      >
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  name: 'HeatmapPage',
  props: {
    websiteValueList: Array
  },
  data() {
    return {
      output: null,
      websiteList: [],
      searchWebstie: '',
      checkWebsite: ''
    }
  },
  created() {
  },
  methods: {
    rowClick(row, column, event) {
      console.log(row)
      this.$emit('changeToShow', row.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 80%;
  margin: 0px auto;
}
</style>

<style>
</style>
