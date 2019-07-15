<template>
    <div>
        <md-app md-waterfall>
            <md-app-content>
                <md-field>
                    <label for="trade_stock_id">股票代码</label>
                    <md-input type="number" name="trade_stock_id" id="trade_stock_id" class="myinput"/>
                </md-field>
                <md-field>
                    <label for="trade_amount">手数</label>
                    <md-input type="number" name="trade_amount" id="trade_amount" class="myinput"/>
                </md-field>
                <div class="line" style="text-align:right;">
                    <md-button class="md-raised md-primary" @click="getsell1()">点击获取信息</md-button>
                </div>
                <div class="line">
                    <span>当前卖一: {{sell1}}</span>
                </div>
                <div class="line">
                    <span>手续费: {{brokerage}}</span>
                </div>
                <div class="line">
                    <span>总计支出: {{totalvalue}}</span>
                </div>
                <div class="line" style="text-align:right;">
                    <md-button class="md-raised md-accent" @click="pay()">付款</md-button>
                </div>
            </md-app-content>
        </md-app>
        <div style="heigth:50px;width:100%">&nbsp;</div>
        <BottomNav></BottomNav>
        <md-dialog-alert
            :md-active.sync="alert"
            :md-content="alertmsg"
            md-confirm-text="确定"
        />
    </div>
</template>

<script>
 import BottomNav from '../components/BottomNav'
 import {brokerage_rate_in} from '../conf'
 export default {
     name: 'BuyStock',
     components: {
         BottomNav
     },
     methods:{
         getsell1(){
             var stockid = document.getElementById("trade_stock_id").value;
             var amount = document.getElementById("trade_amount").value;
             this.axios.get("/trade/"+stockid+"/getsell_1/").then((response)=>{
                 var resp=response.data;
                 this.sell1 = resp["inforesult"];
                 this.brokerage = this.remaintwo(parseFloat(this.sell1)*amount*100*brokerage_rate_in);
                 this.totalvalue = this.remaintwo(parseFloat(this.sell1)*amount*100*(1+brokerage_rate_in));
             })
         },
         remaintwo(number){
             return parseFloat(number).toFixed(2);
         },
         pay(){
             var stockid = document.getElementById("trade_stock_id").value;
             var amount = document.getElementById("trade_amount").value;
             this.axios.post("/trade/buystock/",
                             {
                                 "trade_stock_id": stockid,
                                 "trade_amount": amount,
                                 "trade_price": this.sell1,
                                 "trade_brokerage": this.brokerage,
                                 "trade_totalvalue": this.totalvalue
                             }).then((response)=>{
                                 var resp = response.data;
                                 this.alertmsg = resp["infomsg"];
                                 this.alert = true;
                                 if(resp["infostatus"]){
                                     this.onReturn();
                                 }
                             })
         },
         onReturn(){
             this.$router.push({name: "mainview"});
         }
     },
     data(){
         return {
             sell1: 0,
             brokerage: 0,
             totalvalue: 0,
             alert: false,
             alertmsg: "",
         }
     }
 }
</script>

<style scoped>
 .myinput{
     height: 36px;
     line-height: 36px;
 }
 .line{
     width:100%;
     text-align: left;
     padding-top: 10px;
     margin-bottom: 30px;
 }
</style>
