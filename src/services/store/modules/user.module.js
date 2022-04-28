import { userService } from "../../user.service";

export default {
    state: {
        users: null,
        loggedinUser: userService.getLoggedinUser()
    },
    getters: {
        users(state) {
            return state.users
        },
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        removeUser(state, { id }) {
            const idx = state.users.findIndex(user => user._id === id)
            state.users.splice(idx, 1)

        },
        saveUser(state, { savedUser }) {
            const idx = state.users.findIndex(user => user._id === savedUser._id)
            if (idx === -1) state.users.push(savedUser)
            else state.users.splice(idx, 1, savedUser)
        },
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user
        },
        logout(state) {
            userService.logout()
            state.loggedinUser = null
        }
    },
    actions: {
        async loadUsers(context) {
            const users = await userService.query()
            context.commit({ type: 'setUsers', users })
        },
        async removeUser({ commit }, { id }) {
            await userService.remove(id)
            commit({ type: 'removeUser', id })
        },
        async saveUser({ commit }, { user }) {
            const savedUser = await userService.save(user)
            commit({ type: 'saveUser', savedUser })
        },
        async login({ commit }, { credentials }) {
            const user = await userService.login(credentials)
            commit({ type: 'setLoggedinUser', user })
        },
        async signup({ commit }, { user }) {
            const signedupUser = await userService.signup(user)
            commit({ type: 'setLoggedinUser', user: signedupUser })
        },
        async setUpdatedUser({ commit }, { userId }) {
            const user = await userService.getById(userId)
            commit({ type: 'setLoggedinUser', user })
        },
        async addMove({ commit }, { move, userId }) {
            const savedUser = await userService.addMove(move, userId)
            commit({ type: 'saveUser', savedUser })
            commit({ type: 'setLoggedinUser', user: savedUser })
        }
    },

}