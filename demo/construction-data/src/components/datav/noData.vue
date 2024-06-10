<template>
    <div class="no-data">
        <span>暂无数据</span>
    </div>
</template>

<script>
export default {
  name: 'noData'
}
</script>

<style lang="less" scoped>
.no-data {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    span {
        font-size: 50px;
        color: rgb(255, 255, 255);
        opacity: 0.2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
