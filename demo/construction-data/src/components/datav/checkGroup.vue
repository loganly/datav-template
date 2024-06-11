<template>
  <div id="water-level-chart">
    <div class="water-level-chart-title">巡检班组检查情况</div>

    <div v-if="currentData.groupName">
      <dv-decoration-11 style="width:100%;height:60px;margin-top:7px">{{ currentData.groupName }}</dv-decoration-11>
      <div class="chart-container">
        <dv-border-box-13 style="height: 230px;">
          <dv-capsule-chart v-if="config.data.length > 0" :config="config" style="width:90%;height:200px;margin:17px" />
        </dv-border-box-13>
      </div>
    </div>
    <noData v-else />
    <!-- <dv-loading v-else>Loading...</dv-loading> -->
  </div>
</template>

<script>
import noData from './noData'
import { getDashboardDailyRecord } from '../../http/api'

export default {
  name: 'CheckGroup',
  components: {
    noData
  },
  props: {
    deptId: {
      type: String
    }
  },
  mounted () {
    const { fetchData, looper } = this
    fetchData()
    setInterval(fetchData, 15000)

    setInterval(looper, 7000)
  },

  data () {
    return {
      hasInit: false,
      currentIndex: 0,
      currentData: {},
      listData: [],
      config: {
        data: [],
        colors: ['#00baff', '#469f4b', '#ffc530', '#c44b4b'],
        unit: '个',
        showValue: true
      }
    }
  },
  methods: {
    async fetchData () {
      const { data } = await getDashboardDailyRecord(this.deptId)
      this.listData = data
      if (!this.hasInit) {
        this.looper()
        this.hasInit = true
      }
    },
    looper () {
      if (this.listData.length === 0) {
        return
      }
      this.currentData = this.listData[this.currentIndex]
      this.currentIndex += 1
      if (this.currentIndex >= this.listData.length) {
        this.currentIndex = 0
      }
      this.config.data = []
      this.$nextTick(() => {
        this.config.data.push({ name: '巡检总设备数', value: this.currentData.totalTasks })
        this.config.data.push({ name: '完成巡检设备数', value: this.currentData.completedTasks })
        this.config.data.push({ name: '待巡检设备数', value: this.currentData.pendingTasks })
        this.config.data.push({ name: '巡检异常设备数', value: this.currentData.errorTasks })
      })
    }
  }
}
</script>

<style lang="less">
#water-level-chart {
  width: 30%;
  box-sizing: border-box;
  margin-left: 20px;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  display: flex;
  flex-direction: column;

  .water-level-chart-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
  }

  .chart-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
