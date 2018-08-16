<template>
    <v-container fluid>
        <v-layout justify-center>
            <v-flex xs12 sm6>
                <tournament
                    v-for="tournament, index in tournaments"
                    :index="index"
                    :tournament="tournament"
                >
                </tournament>
            </v-flex>
            <v-flex xs12 sm3 offset-sm1>
                <v-card class="card">
                    <v-card-text>
                        <h4 class="text-xs-center">Welcome to Numerai</h4>
                        <p> </p>
                        <div>
                            <v-btn block>SIGN UP</v-btn>
                            Already have an account? <a href="">Login</a>
                            <ul class="with-bullets">
                                <li> New to Numerai? Learn how it works </li>
                                <li> Check out the tournament rules </li>
                                <li> Read the FAQs </li>
                            </ul>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card class="card">
                    <v-card-title primary-title>
                        <table>
                            <thead>
                                <v-icon class="icon">timeline</v-icon> OPEN ROUNDS
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Prize Pool</td>
                                    <td>${{totalPrizePool|money}}</td>
                                </tr>
                                <tr>
                                    <td>Total Stakes</td>
                                    <td>$$</td>
                                </tr>
                                <tr>
                                    <td>Total Submissions</td>
                                    <td>$$</td>
                                </tr>
                            </tbody>
                        </table>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import Tournament from '../components/Tournament'

export default {
    name: 'Home',
    components: {
        Tournament,
    },
    data () {
        return {
            tournaments: [],
            totalPrizePool: '',
            totalStakes: '',
            totalSubmission: '',
        }
    },
    methods: {
        _compare(a, b) {
            if (a.number < b.number)
                return 1;
            if (a.number > b.number)
                return -1;
            return 0;
        }
    },
    mounted() {
        const vm = this
        axios.post('https://api-tournament.numer.ai/', {
            query: `
              query {
                countryCode
                tournaments {
                    tournament
                    name
                    rounds{
                        number
                        tournament
                        openTime
                        closeTime
                        closeStakingTime
                        resolveTime
                        resolvedGeneral
                        resolvedStaking
                        participants
                        stakes
                        prizePoolUsd
                        prizePoolNmr
                    }
                }
              }
            `
        })
        .then(({data}) => {
            vm.tournaments = data.data.tournaments
            const firstTournement = this.tournaments[0]
            const latestRound = firstTournement.rounds.sort(this._compare)[0]
            axios.get('https://api.coinmarketcap.com/v1/ticker/numeraire/?convert=USD')
            .then(({data}) => {
                vm.totalPrizePool = latestRound.prizePoolNmr *  data[0].price_usd * 5
            })


        })
    }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    margin-top: 20px
}
</style>
