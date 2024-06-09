<template>
  <div id="scroll-board">
    <dv-scroll-board v-if="config.data.length > 0" :config="config" />
    <dv-loading v-else>Loading...</dv-loading>
  </div>
</template>

<script>
import { getDashboardRepairs } from '../../http/api'

export default {
  name: 'ScrollBoard',
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
        header: ['设备名称', '设备编号', '设备问题', '报修单状态', '报修人', '维修人', '更新时间'],
        data: [],
        index: true,
        columnWidth: [50],
        align: ['center'],
        rowNum: 6,
        headerBGC: '#1981f6',
        headerHeight: 25,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  },
  methods: {
    async fetchData () {
      const { data } = await getDashboardRepairs(this.deptId)

      const arr = data.map(item => {
        return [
          item.equipmentName,
          item.equipmentNo,
          item.issues.join(','),
          item.latestStatus,
          item.sponsor,
          item.repairName === 'null' ? '未指派' : item.repairName,
          `${item.updatedTime[0]}-${item.updatedTime[1]}-${item.updatedTime[2]} ${item.updatedTime[3]}:${item.updatedTime[4]}`
        ]
      })
      this.config.data = arr
    }
  }
}
</script>

<style lang="less">
#scroll-board {
  width: 99.9%;
  box-sizing: border-box;
  // margin-left: 20px;
  height: 35%;
  overflow: hidden;

  border-top: 2px solid rgba(1, 153, 209, 0.5);
  background-color: rgba(6, 30, 93, 0.5);
}
</style>
