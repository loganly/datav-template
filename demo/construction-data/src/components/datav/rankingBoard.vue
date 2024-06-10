<template>
  <div id="ranking-board">
    <div class="ranking-board-title">巡检设备状态</div>
    <dv-scroll-ranking-board v-if="config.data.length > 0" :config="config" />
    <dv-loading v-else style="flex: 0; margin: 100px auto;">Loading...</dv-loading>
  </div>
</template>

<script>
import { getDashboardChecks } from '../../http/api'
export default {
  name: 'RankingBoard',
  props: {
    deptId: {
      type: String
    }
  },
  mounted () {
    const { fetchData } = this
    fetchData()
    setInterval(fetchData, 15000)
  },
  data () {
    return {
      config: {
        data: [],
        rowNum: 15
      }
    }
  },
  methods: {
    async fetchData () {
      const { data } = await getDashboardChecks(this.deptId)
      // console.log(data)
      const arr = data.map(item => {
        return {
          name: `${item.equipmentName}(${item.equipmentNo})`,
          value: this.transformCheckStatusText(item.equipmentResult)
        }
      })
      // console.log('arr =', arr)
      this.config.data = arr
      // this.config.data = arr.slice(0, 110)
      // console.log('this.config.data =', this.config.data)
    },
    transformCheckStatusText (status) {
      switch (status) {
        case 'ID':
          return '未检查'
        case 'CD':
          return '已检查'
        case 'ER':
          return '异常'
        case 'RC':
          return '重新检查'
        default:
          return '未知'
      }
    }
  }
}
</script>

<style lang="less">
#ranking-board {
  width: 20%;
  height: 1000px;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  padding: 0px 30px;

  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
