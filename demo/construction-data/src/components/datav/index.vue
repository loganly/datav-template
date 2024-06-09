<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div v-show="showFullScreen" @click="toggleFullScreen" class="full-screen-button">点击全屏</div>

      <top-header />

      <div class="main-content">
        <digital-flop />

        <div class="block-left-right-content">
          <ranking-board />

          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <rose-chart />

              <water-level-chart />

              <scroll-board />
            </div>

            <cards />
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
import digitalFlop from './digitalFlop'
import rankingBoard from './rankingBoard'
import roseChart from './roseChart'
import waterLevelChart from './waterLevelChart'
import scrollBoard from './scrollBoard'
import cards from './cards'
import { getDashboardDailyRecord } from '../../http/api'

export default {
  name: 'DataView',
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards
  },
  mounted () {
    console.log('DataView mounted')
    document.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        this.showFullScreen = false
      } else {
        this.showFullScreen = true
      }
    })
    this.fetchedData()
  },
  data () {
    return {
      showFullScreen: true
    }
  },
  methods: {
    async fetchedData () {
      console.log('fetchedData')
      const resp = await getDashboardDailyRecord(2)
      console.log('fetchedData resp', resp)
    },
    toggleFullScreen () {
      if (!document.fullscreenElement) {
        // 进入全屏
        document.documentElement.requestFullscreen()
      } else {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .full-screen-button {
    position: absolute;
    top: 33px;
    right: 15px;
    font-size: 16px;
    cursor: pointer;
    z-index: 9999;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
