import axios from 'axios';

export default {
	namespaced: true,
	state: {
		rates: [],
		ratesTop: [],
		endpoint: 'https://min-api.cryptocompare.com/data/top/mktcapfull',
		limit: 100,
		page: 2,
		tsym: 'USD'
	},
	getters: {
		getEndpoint(state) {
			return state.endpoint;
		},
		getBase(state) {
			return state.base
		},
		getRates(state) {
			return state.rates
		},
		getRatesTop(state) {
			return state.ratesTop
		},
	},
	mutations: {
		refresh(state, data) {
			state.ratesTop = data;
			state.ratesTop.sort((a, b) => {
				return b.RAW.USD.PRICE - a.RAW.USD.PRICE;
			});
		},
		getRates(state, data) {
			let arr = [...state.rates, ...data];
			state.rates = arr.filter((el) => {
				if (el.RAW) {
					return el
				}
			});
			state.rates.sort((a, b) => {
				return b.RAW.USD.PRICE - a.RAW.USD.PRICE;
			});
			state.page = state.page + 2;
		}
	},
	actions: {
		REFRESH(store) {
			axios.get(store.state.endpoint, {
				params: {
					limit: 100,
					page: 0,
					tsym: store.state.tsym,
				}
			})
				.then(response => {
					let data = response.data;
					store.commit('refresh', data.Data);
				})
				.catch(error => {
					console.log(error)
				});
		},
		GETRATES(store, limit) {
			axios.get(store.state.endpoint, {
				params: {
					limit: limit,
					page: store.state.page,
					tsym: store.state.tsym,
				}
			})
				.then(response => {
					let data = response.data;
					store.commit('getRates', data.Data);
				})
				.catch(error => {
					console.log(error)
				});
		}
	}
};