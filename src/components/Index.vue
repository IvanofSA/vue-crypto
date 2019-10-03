<template>
	<div class="container">
		<h1>Топ 100</h1>
		<table class="table" v-if="rates">
			<thead>
			<tr>
				<th>№</th>
				<th>Full name</th>
				<th>Price</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(item, ind) in ratesTop" :key="ind">
				<td>{{ ind + 1 }}</td>
				<td>{{ item.CoinInfo.FullName }}</td>
				<td>{{ item.DISPLAY ? item.DISPLAY.USD.PRICE : 'none' }}</td>
			</tr>
			<tr v-for="(item, ind) in rates" :key="ind">
				<td>{{ ind + 100 }}</td>
				<td>{{ item.CoinInfo.FullName }}</td>
				<td>{{ item.DISPLAY ? item.DISPLAY.USD.PRICE : 'none' }}</td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: 'app',
		created() {
			this.$store.dispatch('global/REFRESH');
		},
		computed: {
			...mapGetters({
				rates: 'global/getRates',
				ratesTop: 'global/getRatesTop',
			})
		},
		methods: {
			scroll() {
				window.onscroll = () => {
					let bottomOfWindow = window.scrollY + 1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight;
					if (bottomOfWindow) {
						this.$store.dispatch('global/GETRATES', 100)
					}
				};
			},
		},
		mounted() {
			this.scroll();
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}

	html {
		font-size: 18px;
		font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
	}

	.container {
		width: 100%;
		padding: 0 20px;
		text-align: center;
		margin: 0 auto;
	}

	table {
		margin: 0 auto;
		border-collapse: collapse;
	}

	th {
		background: #ccc;
		font-size: 18px;
	}

	tr {
		border: 1px solid #000;
	}

	tr:nth-child(2n) {
		background: #ccc;
	}
</style>