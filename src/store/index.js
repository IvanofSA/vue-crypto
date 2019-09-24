import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import global from './modules/global'
// import messages from './modules/messages'
// import updater from './modules/updater'



export const store = new Vuex.Store({
	modules: {
		global,
	},
	strict: process.env.NODE_ENV !== 'production'
});