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
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{tournament.name|capitalize}} #{{currentRound.number}}</h3>
                        <p> {{currentPrize|round(2)}} </p>
                        <p> {{timeRemaining}} </p>
                    </div>
                </v-card-title>
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
            timeRemaining: ''
        }
    },
    methods: {
        initializeClock(endtime) {
            const vm = this
            const timeinterval = setInterval(function(){
                var t = vm.getTimeRemaining(endtime);
                vm.timeRemaining = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`
                if(t.total <= 0) {
                  clearInterval(timeinterval);
                }
            },1000);
        },
        getTimeRemaining(endtime) {
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
    },
    computed: {
        currentPrize() {
            return parseFloat(this.currentRound.prizePoolNmr) * this.usdPrice + parseFloat(this.currentRound.prizePoolUsd)
        },
    },
    mounted() {
        const compare = (a,b) => {
            if (a.number < b.number)
                return 1;
            if (a.number > b.number)
                return -1;
            return 0;
        }
        this.currentRound = this.tournament.rounds.sort(compare)[0]
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
        align-self: flex-end;
        background-color: #f7f7f7;
    }
</style>
