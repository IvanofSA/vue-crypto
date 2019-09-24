import axios from 'axios';

export default {
	namespaced: true,
	state: {
		rates: [],
		endpoint: 'https://min-api.cryptocompare.com/data/top/mktcapfull',
		limit: 100,
		page: 0,
		tsym: 'USD',
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
	},
	mutations: {
		getRates(state, data) {
			// state.rates = new Set([...state.rates, ...data])
			state.rates = [...state.rates, ...data];


			state.page = state.page + 2;
		}
	},
	actions: {
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
					data.Data.sort((a, b) => {
						return b.RAW.USD.PRICE - a.RAW.USD.PRICE;
					});

					store.commit('getRates', data.Data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};