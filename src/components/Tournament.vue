<template>
    <v-card class="card">
        <v-layout>
            <v-flex xs2>
                <v-card-media
                    height="200px"
                >
                <div class="filter" :style="`background-image: url(https://source.unsplash.com/400x300/weekly?code+${index+1}120)`">
                </div>
                </v-card-media>
            </v-flex>
            <v-flex xs12>
                <v-card-text class="card-text">
                    <div>
                        <h3 class="headline">{{tournament.name|capitalize}} #{{currentRound.number}}</h3>
                        <div class="tournement_attr"> <v-icon class="icon">attach_money</v-icon> ${{currentPrize|money}} </div>
                        <div class="tournement_attr"> <v-icon class="icon">timer</v-icon> {{timeRemaining}} </div>
                        <div class="tournement_attr"> <v-icon class="icon">people</v-icon> {{currentPartcipants}} </div>
                    </div>
                </v-card-text>
                <v-card-actions class="actions">
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey">VIEW DETAILS</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Tournament',
    props: {
        tournament: Object,
        index: Number,
    },
    data() {
        return {
            currentRound: '',
            usdPrice: Number,
            timeRemaining: '',
            currentPartcipants: '',
        }
    },
    methods: {
        initializeClock(endtime) {
            const vm = this
            const timeinterval = setInterval(function(){
                var t = vm._getTimeRemaining(endtime);
                vm.timeRemaining = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`
                if(t.total <= 0) {
                  clearInterval(timeinterval);
                }
            },1000);
        },
        _getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date());
            const seconds = Math.floor( (t/1000) % 60 );
            const minutes = Math.floor( (t/1000/60) % 60 );
            const hours = Math.floor( (t/(1000*60*60)) % 24 );
            const days = Math.floor( t/(1000*60*60*24) );
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }
        },
        _compare(a, b) {
            if (a.number < b.number)
                return 1;
            if (a.number > b.number)
                return -1;
            return 0;
        }
    },
    computed: {
        currentPrize() {
            return parseFloat(this.currentRound.prizePoolNmr) * this.usdPrice + parseFloat(this.currentRound.prizePoolUsd)
        },
    },
    mounted() {
        this.currentRound = this.tournament.rounds.sort(this._compare)[0]
        console.log(this.currentRound)
        this.currentPartcipants = `${this.currentRound.stakes}/${this.currentRound.participants}`
        // console.log(this.currentRound)
        axios.get('https://api.coinmarketcap.com/v1/ticker/numeraire/?convert=USD')
        .then(({data}) => {
            this.usdPrice = data[0].price_usd
        })
        this.initializeClock(this.currentRound.closeTime)
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .filter {
        // background-image: url("https://source.unsplash.com/400x300/weekly?code+1120");
        width: 100%;
        height: 100%;
        filter: saturate(10) blur(15px);
        transform: scale(1.1);
        -webkit-filter: saturate(10) blur(15px);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .actions {
        position:absolute;
        bottom: 0;
        width: 85.7%;
        height:45px;
        align-self: flex-end;
        background-color: #f7f7f7;
    }
    .countdown {
        vertical-align: middle;
    }
    .card-text {

    }
    .headline {
        margin-bottom: 10px;
    }
    .icon {
        vertical-align: middle;
    }
    .tournement_attr {
        margin-bottom:5px;
    }
</style>
