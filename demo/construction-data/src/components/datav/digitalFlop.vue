<template>
  <div id="digital-flop">
    <template v-if="digitalFlopData.length">
      <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width:100px;height:50px;"
        />
          <div class="unit">{{ item.unit }}</div>
      </div>
    </div>
    </template>
    <dv-loading v-else>Loading...</dv-loading>

    <dv-decoration-10 />
  </div>
</template>

<script>
import { getDashboardRepairRecord } from '../../http/api'

export default {
  name: 'DigitalFlop',
  props: {
    deptId: {
      type: String
    }
  },
  mounted () {
    const { fetchData } = this

    fetchData()

    setInterval(fetchData, 10000)
  },
  data () {
    return {
      digitalFlopData: [
        {
          title: '总报修数量',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#4d99fc',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        },
        {
          title: '维修申请',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#f46827',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        },
        {
          title: '维修中',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#40faee',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        },
        {
          title: '返工中',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#a227f4',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        },
        {
          title: '已完成',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#8ef427',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        },
        {
          title: '内部维修',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#4d99fc',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        },
        {
          title: '外派维修',
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#40faee',
              fontWeight: 'bold'
            }
          },
          unit: '个'
        }
      ]
    }
  },
  methods: {
    async fetchData () {
      const { data } = await getDashboardRepairRecord(this.deptId)
      if (data && data.length > 0) {
        const { totalRepairs, pendingRepairs, ongoingRepairs, reworkRepairs, finishedRepairs, externalRepairs, internalRepairs } = data[0]
        this.digitalFlopData = [
          {
            title: '总报修数量',
            number: {
              number: [totalRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          },
          {
            title: '维修申请',
            number: {
              number: [pendingRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#f46827',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          },
          {
            title: '维修中',
            number: {
              number: [ongoingRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#40faee',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          },
          {
            title: '返工中',
            number: {
              number: [reworkRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#a227f4',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          },
          {
            title: '已完成',
            number: {
              number: [finishedRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#8ef427',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          },
          {
            title: '内部维修',
            number: {
              number: [internalRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          },
          {
            title: '外派维修',
            number: {
              number: [externalRepairs],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#40faee',
                fontWeight: 'bold'
              }
            },
            unit: '个'
          }

        ]
      }
    }

  }
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 10%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 14.28%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    // margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
