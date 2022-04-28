<template>
    <section class="login">
        <h2>{{ pageTitle }}</h2>
        <form>
            <el-input
                @focus="removeErrorMsg"
                v-model="input.username"
                placeholder="Username"
                clearable
            />
            <el-input v-if="!isLogin" v-model="input.fullname" placeholder="Full name" clearable />
            <el-input type="password" v-model="input.password" placeholder="Password" clearable />
            <el-input
                v-if="!isLogin"
                type="password"
                v-model="input.repeatPassword"
                placeholder="Confirm password"
                clearable
            />
            <div class="actions">
                <el-button v-if="isLogin" @click="onLogin" type="primary">Login</el-button>
                <el-button v-else @click="onSignup" type="primary">Signup</el-button>
                <el-button @click="onReset">Reset</el-button>
            </div>
            <div @click="onSwitch" class="switcher">{{ mainSwicher }}</div>
            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
        </form>
    </section>
</template>

<script>
import { userService } from '../services/user.service'
export default {
    data() {
        return {
            input: {
                username: '',
                fullname: '',
                password: '',
                repeatPassword: '',
            },
            isLogin: true,
            errorMsg: ''
        }
    },
    methods: {
        onSwitch() {
            this.isLogin = !this.isLogin
        },
        onReset() {
            this.input = {
                username: '',
                fullname: '',
                password: '',
                repeatPassword: ''
            }
            this.removeErrorMsg()
        },
        async onLogin() {
            const credentials = {
                username: this.input.username,
                password: this.input.password
            }
            try {
                await this.$store.dispatch({ type: 'login', credentials })
                this.onGoToHomePage()
            } catch (err) {
                this.errorMsg = 'Invalid username or password!'
            }

        },
        async onSignup() {
            if (!this.checkMatch()) return this.matchFailed()
            const user = this.input
            delete user.repeatPassword
            await this.$store.dispatch({ type: 'signup', user })
            this.onGoToHomePage
        },
        checkMatch() {
            if (this.input.password !== this.input.repeatPassword) return false
            else return true
        },
        matchFailed() {
            this.errorMsg = 'Passwords don\'t match'
            this.input.password = ''
            this.input.repeatPassword = ''
        },
        removeErrorMsg() {
            this.errorMsg = false
        },
        onGoToHomePage() {
            this.$router.push('/')
        }

    },
    computed: {
        pageTitle() {
            if (this.isLogin) return 'Login'
            else return 'Signup'
        },
        mainSwicher() {

            if (this.isLogin) return 'Not a user? Signup'
            else return 'Already a user? Login'
        }
    },
}
</script>

<style lang="scss" scoped>
.login {
    display: grid;
    place-items: center;
    margin: 3rem auto;
    border: 1px solid #acb0b8;
    background-color: white;
    padding: 1rem;
    border-radius: 4px;

    h2 {
        margin-bottom: 1rem;
    }
    form {
        margin: auto;
        width: 13rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .actions {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
        }
    }

    .switcher {
        font-size: 0.8rem;
        cursor: pointer;
    }

    .error-msg {
        font-size: 0.8rem;
        color: red;
    }
}
</style>