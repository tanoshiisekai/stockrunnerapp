<template>
    <div>
        <md-app md-waterfall>
            <md-app-content>
                <div class="line">
                    <span>{{stockid}}</span><span style="margin-left: 30px;">当前手数: {{amount}}</span>       
                </div>
                <div class="line">
                    <span>当前买一: {{buy1}}</span>
                </div>
                <md-field>
                    <label for="trade_amount">请输入要卖出的手数</label>
                    <md-input type="number" name="trade_amount" id="trade_amount" class="myinput"/>
                </md-field>
                <div class="line" style="text-align:right;">
                    <md-button class="md-raised md-primary" @click="getinfo()">点击获取信息</md-button>
                </div>
                <div class="line">
                    <span>手续费: {{brokerage}}</span>
                </div>
                <div class="line">
                    <span>总计收入: {{totalvalue}}</span>
                </div>
                <div class="line" style="text-align:right;">
                    <md-button class="md-raised md-accent" @click="sell()">卖出</md-button>
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
 import {brokerage_rate_out} from '../conf'
 export default {
     name: 'BuyStock',
     components: {
         BottomNav
     },
     created(){
         this.stockid = this.$cookie.get("stockid");
         this.getdata1();
         this.getdata2();
     },
     methods:{
         getdata1(){
             this.axios.get("/trade/"+this.stockid+"/getnowamount/").then((response)=>{
                 var resp=response.data;
                 this.amount = resp["inforesult"];
             })},
         getdata2(){
             this.axios.get("/trade/"+this.stockid+"/getbuy_1/").then((response)=>{
                 var resp=response.data;
                 this.buy1 = resp["inforesult"];
             })},
         getinfo(){
             var nowamount = document.getElementById("trade_amount").value;
             this.brokerage = this.remaintwo(parseFloat(this.buy1)*parseFloat(nowamount)*100*brokerage_rate_out);
             this.totalvalue = this.remaintwo(parseFloat(this.buy1)*parseFloat(nowamount)*100*(1-brokerage_rate_out));
         },
         remaintwo(number){
             return parseFloat(number).toFixed(2);
         },
         sell(){
             var nowamount = document.getElementById("trade_amount").value;
             if(parseInt(nowamount)<=this.amount){
             this.axios.post("/trade/sellstock/",
                             {
                                 "trade_stock_id": this.stockid,
                                 "trade_amount": nowamount,
                                 "trade_price": this.buy1,
                                 "trade_brokerage": this.brokerage,
                                 "trade_totalvalue": this.totalvalue,
                             }).then((response)=>{
                                 var resp = response.data;
                                 this.alertmsg = resp["infomsg"];
                                 this.alert = true;
                                 if(resp["infostatus"]){
                                     this.onReturn();
                                 }
                             })
             }
             else{
                 this.alertmsg="没有那么多股票可以卖...";
                 this.alert=true;
             }
         },
         onReturn(){
             this.$router.push({name: "mainview"});
         }
     },
     data(){
         return {
             stockid: this.$cookie.get("stockid"),
             amount: 0,
             buy1: 0,
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
