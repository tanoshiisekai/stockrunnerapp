<template>
  <div class="page-container">
    <md-bottom-bar md-type="fixed" class="bottombar" md-sync-route>
        <md-bottom-bar-item to="/" id="bottom-bar-item-attach-money" class="bottomblock">
            实时交易
        </md-bottom-bar-item>
        <md-bottom-bar-item to="/buystock/" id="bottom-bar-item-payment" class="bottomblock">
            买股票
        </md-bottom-bar-item>
        <md-bottom-bar-item to="/summary/" id="bottom-bar-item-list" class="bottomblock">
            交易记录
        </md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
  export default {
    name: 'BottomNav'
  }
</script>

<style scoped>
.bottombar{
  position: fixed;
  bottom: 0;
  background-color: #FFFFFF;
 }
 .bottomblock{
     border: 0.1px solid rgba(255,255,255, 0.2);
 }
</style>


