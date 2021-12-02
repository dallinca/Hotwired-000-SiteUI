<template>
<div class="auth">
    <input type="button" value="logout" v-if="useDefaultLogoutButton == true && hasToken == true" v-on:click="logout">
    <div class="auth-modal" v-if="displayModal == true">

        <div class="auth-modal__overlay">
            
        </div>

        <div class="auth-modal__content-wrap">
            <div class="auth-modal__content">
                <div class="auth-modal__content__tabs">
                    <input class="button button5" v-if="displayLogin" type="button" value="Go to Registration" v-on:click="authDisplay('register')">
                    <input class="button button5" v-if="displayRegister" type="button" value="Go to Login" v-on:click="authDisplay('login')">
                </div>

                <div class="auth-modal__content__form">
                    <register v-if="displayRegister" v-on:cancel="cancelRegister" v-on:closeAuth="closeAuth"></register>
                    <login v-if="displayLogin" v-on:cancel="cancelLogin" v-on:closeAuth="closeAuth"></login>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import Register from './register.vue'
import Login from './login.vue'

import { VALIDATE_AUTH_TOKEN, CLEAR_AUTH_TOKEN } from '@/action-types'

export default {
    name: 'authentication',
    components: {
        Register,
        Login
    },
    data: function() {
        return {
            useDefaultLogoutButton: false,
            displayModal: false,
			displayRegister: false,
			displayLogin: true
        }
	},
	computed: {
		hasToken() {
			return this.$store.state.auth.hasToken;
		}
	},
	created: function() {
		this.$store.dispatch(VALIDATE_AUTH_TOKEN);
	},
	methods: {
		cancelRegister: function() {
			this.displayModal = false;
		},
		cancelLogin: function() {
			this.displayModal = false;
		},
		closeAuth: function() {
			this.displayModal = false;
		},
		authDisplay: function(display) {
			if ('register' == display) {
				this.displayRegister = true;
				this.displayLogin = false;
			} else if ('login' == display) {
				this.displayLogin = true;
				this.displayRegister = false;
			}
		},
		logout: function() {
			this.$store.dispatch(CLEAR_AUTH_TOKEN)
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>