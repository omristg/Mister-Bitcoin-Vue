import { createStore } from 'vuex';
import contactModule from '../store/modules/contact.module'
import userModule from './modules/user.module';

const store = createStore({
    strict: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {},
    modules: {
        contactModule,
        userModule
    }
});

export default store;