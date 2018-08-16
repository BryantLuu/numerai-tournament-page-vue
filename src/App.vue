<template>
    <v-app>
        <v-toolbar
            app
            color="black"
            dark
        >
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-toolbar-items>
                <v-btn flat>Tournement</v-btn>
                <v-btn flat>Tutorial</v-btn>
                <v-btn flat>Leaderboard</v-btn>
                <v-btn flat>Community</v-btn>
                <v-btn flat>Telegram</v-btn>
                <v-btn icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <span class="usdPrice">1 NMR ≈ ${{usdPrice|round(2)}}</span>

                <v-btn >Log in</v-btn>
                <v-btn >Sign up</v-btn>
        </v-toolbar>
        <v-content>
            <router-link to="/about">About</router-link>
                <router-view/>
        </v-content>
        <v-footer app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
import axios from 'axios'
let glob

export default {
    name: 'App',
    data () {
        return {
            title: 'NUMERAI',
            'usdPrice': '',
            'tournaments': []
        }
    },
    mounted() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/numeraire/?convert=USD')
        .then(({data}) => {
            this.usdPrice = data[0].price_usd
        })
    }
}
</script>

<style scoped>
.usdPrice {
    text-decoration-line: underline;
    text-decoration-style: dashed;
}
</style>
