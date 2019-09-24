<template>
	<div class="container">
		<h1>Топ 100</h1>
		<table class="table" v-if="rates">
			<thead>
			<tr>
				<th>Number</th>
				<th>Full name</th>
				<th>Price</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(item, ind) in rates">
				<td>{{ ind + 1 }}</td>
				<td>{{ item.CoinInfo.FullName }}</td>
				<td>{{ item.DISPLAY.USD.PRICE }}</td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
	import axios from 'axios'
	import {mapGetters} from 'vuex';

	export default {
		name: 'app',
		data () {
			return {
				limit: 10,
				posts: []
			}
		},
		created() {
			this.$store.dispatch('global/GETRATES', 100)
		},
		computed: {
			...mapGetters({
				rates: 'global/getRates',
			})
		},
		methods: {
			scroll (rates) {
				window.onscroll = () => {
					let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight;
					if (bottomOfWindow) {

						this.$store.dispatch('global/GETRATES', 100)
					}
				};
			},
		},
		mounted() {
			this.scroll(this.rates100);
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}
	html {
		/*min-height: 100vw;*/
		font-size: 18px;
	}
	body {
		/*min-height: 100vw;*/
	}


	.container {
		width: 100%;
		padding: 0 20px;
		text-align: center;
		/*max-width: 1280px;*/
		margin: 0 auto;
	}

	table {
		margin: 0 auto;
	}

</style>