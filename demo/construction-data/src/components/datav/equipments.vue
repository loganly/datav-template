<template>
    <div class="equipments-container">
        <dv-border-box-1>
            <div class="content" v-if="equipmentList.length">
                <vue-seamless-scroll :data="equipmentList" class="warp" :class-option="classOption">
                   <div class="card-warp" v-for="(equipments,index) in equipmentList"  :key="index">
                        <div class="card-list">
                            <div class="equipments-card" v-for="equipment in equipments"  :key="equipment.code">
                                <div class="icon"></div>
                                <div class="info">
                                    <div>{{equipment.equipmentName}}</div>
                                    <div>{{equipment.equipmentNo}}</div>
                                    <div class="title">状态：<span :class="[`${equipment.equipmentStatus}`]">{{transformEquipmentStatus(equipment.equipmentStatus)}}</span></div>
                                    <div class="title">维修：<span :class="[`${transformRepairStatusClass(equipment.repairStatus)}`]">{{equipment.repairStatus}}</span></div>
                                    <div class="title">巡检：<span :class="[`${transformCheckStatusClass(equipment.checkStatus)}`]">{{transformCheckStatusText(equipment.checkStatus)}}</span></div>
                                </div>
                            </div>
                        </div>
                   </div>
                </vue-seamless-scroll>
            </div>
        </dv-border-box-1>
    </div>
  </template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import { getDashboardEquipments } from '../../http/api'

export default {
  name: 'Example01Basic',
  components: {
    vueSeamlessScroll
  },
  mounted () {
    const { fetchData } = this
    fetchData()
    setInterval(fetchData, 15000)
  },
  data () {
    return {
      classOption: {
        // singleHeight: 100,
        limitMoveNum: 3
      },
      equipmentList: []
    }
  },
  methods: {
    async fetchData () {
      const { data } = await getDashboardEquipments(2)
      this.equipmentList = this.chunkArray(data, 5)
    },
    chunkArray (array, chunkSize) {
      let result = []
      for (let i = 0; i < array.length; i += chunkSize) {
        let chunk = array.slice(i, i + chunkSize)
        result.push(chunk)
      }
      return result
    },
    transformEquipmentStatus (status) {
      switch (status) {
        case 'NORMAL':
          return '正常'
        case 'BROKEN':
          return '损坏'
        case 'MAINTAIN':
          return '维护'
        default:
          return '未知'
      }
    },
    transformRepairStatusClass (status) {
      switch (status) {
        case '维修申请':
          return 'BROKEN'
        case '维修中':
          return 'MAINTAIN'
        case '已维修':
          return 'MAINTAIN'
        case '返工':
          return 'MAINTAIN'
        case '完成':
          return 'NORMAL'
        default:
          return ''
      }
    },
    transformCheckStatusClass (status) {
      switch (status) {
        case 'ID':
          return 'UNCHECK'
        case 'CD':
          return 'NORMAL'
        case 'ER':
          return 'MAINTAIN'
        case 'RC':
          return 'BROKEN'
        default:
          return ''
      }
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

<style lang="less" scoped>
.equipments-container {
    width: 100%;
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    background-color: rgba(6, 30, 93, 0.5);
    .content {
        padding: 20px;
        .warp {
            height: 320px;
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
            .card-warp {
                width: 100%;
                .card-list {
                    display: flex;
                    gap: 0 15px;
                    .equipments-card {
                        width: 170px;
                        margin: 10px 0 0;
                        padding: 10px;
                        font-size: 12px;
                        border: 1px dashed #949494;
                        box-sizing: border-box;
                        border-radius: 5px;
                        display: flex;
                        align-items: center;
                        .icon {
                            width: 30px;
                            height: 30px;
                            background-image: url('./img/equipment.png');
                            background-size: cover;
                            background-position: center;
                        }
                        .info {
                            color: #fff;
                            margin-left: 20px;
                            .title {
                                color: #f4f4f4;
                            }
                            .NORMAL {
                                color: #67C23A;
                            }
                            .BROKEN {
                                color: #F56C6C;
                            }
                            .MAINTAIN {
                                color: #E6A23C;
                            }
                            .UNCHECK {
                                color: #909399;
                            }
                        }
                    }
                }
            }

        }
    }

}
</style>
