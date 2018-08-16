<template>
    <v-container fluid>
        <v-layout justify-center row wrap>
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
                    <v-card-title primary-title>
                        <h4 class="">Welcome to Numerai</h4>
                        <div>
                            <v-btn>SIGN UP</v-btn>
                            Already have an account? <a href="">Login</a>
                            <ul class="with-bullets">
                                <li> New to Numerai? Learn how it works </li>
                                <li> Check out the tournament rules </li>
                                <li> Read the FAQs </li>
                            </ul>
                        </div>
                    </v-card-title>
                </v-card>
                <v-card class="card">
                    <v-card-title primary-title>
                        <table>
                            <thead>
                                OPEN ROUNDS
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Prize Pool</td>
                                    <td>$$</td>
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
const images = [
    'https://source.unsplash.com/400x300/weekly?code+1120',
    'https://source.unsplash.com/400x300/weekly?code+2120',
    'https://source.unsplash.com/400x300/weekly?code+3120'
]

export default {
    name: 'Home',
    components: {
        Tournament,
    },
    data () {
        return {
            tournaments: [],
            totalPricePool: '',
            totalStakes: '',
            totalSubmission: '',
        }
    },
    mounted() {
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
            this.tournaments = data.data.tournaments
        })
    }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
    margin-top: 20px
}
.with-bullets {
    list-style:circle
}
</style>
