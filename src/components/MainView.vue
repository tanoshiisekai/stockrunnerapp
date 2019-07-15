<template>
    <div>
        <md-app md-waterfall>
            <md-app-content>
                <div id="mycontent">
                    <md-card class="mycard">
                        <md-card-header>
                            <div class="md-title">总利润</div>
                            <div class="md-title">{{summary}}</div>
                        </md-card-header>
                        <md-card-actions>
                            <md-button class="md-raised md-primary">全卖</md-button>
                        </md-card-actions>
                    </md-card>
                    <md-card class="mycard" v-for="item in datalist" :key="item.trade_stock_id">
                        <md-card-header style="padding:0px;">
                            <div class="md-title">
                                <span>{{item.trade_stock_name}}</span>
                                <span>{{item.trade_stock_id}}</span>
                            </div>
                        </md-card-header>

                        <md-card-content class="mylist">
                            <div class="line">
                                <span class="block">现有手数: {{item.trade_amount}} </span>
                                <span class="block">买入总支出: {{item.trade_totalvalue}}</span>
                            </div>
                            <div class="line">
                                <span class="block">买一价格: {{item.trade_buy1}}</span>
                                <span class="block">卖出手续费: {{item.trade_brokerage}}</span>
                            </div>
                            <div class="line">
                                <span class="block">卖出总收入: {{item.trade_totalin}}</span>
                                <span class="block">利润: {{item.trade_profit}}</span>
                            </div>
                        </md-card-content>

                        <md-card-actions style="padding:0px;">
                            <md-button class="md-raised md-primary" @click="sell(item.trade_stock_id)">卖</md-button>
                        </md-card-actions>
                    </md-card>
                </div>
            </md-app-content>
        </md-app>
        <div style="height:50px;width:100%">&nbsp;</div>
        <BottomNav>

        </BottomNav>
    </div>
</template>

<script>
 import BottomNav from '../components/BottomNav'
 import {brokerage_rate_out} from '../conf'
 import {brokerage_rate_in} from '../conf'

 export default {
     name: 'MainView',
     components: {
         BottomNav
     },
     created(){
         this.getdata();
         setInterval(()=>{this.getdata()}, 5000);
     },
     methods: {
         sell(stockid){
             this.$cookie.set("stockid", stockid);
             this.$router.push({name: "sellstock"});
         },
         getdata(){
             this.axios.get("/trade/getstockintrade/").then((response)=>{
                 this.datalist = [];
                 this.summarytemp = 0;
                 var resp=response.data;
                 for (var i=0; i<resp["inforesult"].length;i++){
                     var trade_totalvalue = resp["inforesult"][i][3];
                     var trade_brokerage = resp["inforesult"][i][4]*resp["inforesult"][i][2]*100*parseFloat(brokerage_rate_out);
                     var trade_totalin = resp["inforesult"][i][4]*resp["inforesult"][i][2]*100*(1-parseFloat(brokerage_rate_out));
                     var trade_profit = resp["inforesult"][i][4]*resp["inforesult"][i][2]*100*(
                         1-parseFloat(brokerage_rate_out))+resp["inforesult"][i][3];
                     this.datalist.push({
                         'trade_stock_id': resp["inforesult"][i][0],
                         'trade_stock_name': resp["inforesult"][i][1],
                         'trade_amount': resp["inforesult"][i][2],
                         'trade_totalvalue':this.remaintwo(trade_totalvalue),
                         'trade_buy1': resp["inforesult"][i][4],
                         'trade_brokerage':this.remaintwo(trade_brokerage),
                         'trade_totalin':this.remaintwo(trade_totalin),
                         'trade_profit':this.remaintwo(trade_profit)
                     });
                     this.summarytemp = this.summarytemp + trade_profit;
                     this.summary = this.remaintwo(this.summarytemp);
                 }
             })
         },
         remaintwo(number){
             return parseFloat(number).toFixed(2);
         },
     },
     data(){
         return{
             summary: 0,
             summarytemp: 0,
             datalist: [],
         }
     }
 }
</script>
<style scoped>
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
