<template>
    <div>
        <md-app md-waterfall>
            <md-app-content>
                <md-card class="mycard" v-for="item in datalist" :key="item.trade_stock_id">
                    <md-card-header>
                        <div class="md-title">当前汇总</div>
                        <div class="md-title">{{item.trade_profit}}</div>
                    </md-card-header>
                    <md-card-content>
                        <div class="line">
                            <span class="block">日期: {{item.trade_date}}</span>
                            <span class="block">时间: {{item.trade_time}}</span>
                        </div>
                        <div class="line">
                            <span class="block">{{item.trade_stock_id}}</span>
                            <span class="block">{{item.trade_stock_name}}</span>
                        </div>
                        <div class="line">
                            <span class="block">买入: {{item.trade_in_amount}}手</span>
                            <span class="block">每股: {{item.trade_in_price}}元</span>
                        </div>
                        <div class="line">
                            <span class="block">买入手续费: {{item.trade_in_brokerage}}元</span>
                        </div>
                        <div class="line">
                            <span class="block">买入总支出: {{item.trade_in_totalvalue}}元</span>
                        </div>
                        <div class="line">
                            <span class="block">卖出: {{item.trade_out_amount}}手</span>
                            <span class="block">每股: {{item.trade_out_price}}元</span>
                        </div>
                        <div class="line">
                            <span class="block">卖出手续费: {{item.trade_out_brokerage}}元</span>
                        </div>
                        <div class="line">
                            <span class="block">卖出总收入: {{item.trade_out_totalvalue}}元</span>
                        </div>
                    </md-card-content>
                </md-card>
            </md-app-content>
        </md-app>
        <div style="height:50px;width:100%;">&nbsp;</div>
        <BottomNav>
        </BottomNav>
    </div>
</template>
<script>
 import BottomNav from '../components/BottomNav'
 export default{
     name: 'Summary',
     components: {
         BottomNav
     },
     created(){
         this.getdata();
     },
     methods: {
         getdata(){
             this.axios.get("/trade/getsummary/").then((response)=>{
                 this.datalist = [];
                 var resp=response.data;
                 for(var i=resp["inforesult"].length-1; i>=0; i--){
                     this.datalist.push({
                         'trade_date': resp["inforesult"][i][0],
                         'trade_time': resp["inforesult"][i][1],
                         'trade_stock_id': resp["inforesult"][i][2],
                         'trade_stock_name': resp["inforesult"][i][3],
                         'trade_in_amount': resp["inforesult"][i][4],
                         'trade_in_price': resp["inforesult"][i][5],
                         'trade_in_brokerage': this.remaintwo(resp["inforesult"][i][6]),
                         'trade_in_totalvalue': this.remaintwo(resp["inforesult"][i][7]),
                         'trade_out_amount': resp["inforesult"][i][8],
                         'trade_out_price': resp["inforesult"][i][9],
                         'trade_out_brokerage': this.remaintwo(resp["inforesult"][i][10]),
                         'trade_out_totalvalue': this.remaintwo(resp["inforesult"][i][11]),
                         'trade_profit': this.remaintwo(resp["inforesult"][i][12])
                     })
                 }
             })
         },
         remaintwo(number){
             return parseFloat(number).toFixed(2);
         },
     },
     data(){
         return {
             datalist: []
         }
     }
 }
</script>
<style>
 .mycard{
     margin: 10px;
 }
 .line{
     text-align: left;
 }
 .block{
     margin-right: 10px;
 }
</style>
