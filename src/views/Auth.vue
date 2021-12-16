<template>
<div class="auth component-padding">
	<div class="auth__loggedIn" v-if="hasToken"><h2>You are Currently logged in</h2></div>

    <div class="auth__tabs" v-if="!hasToken">
        <input class="button button5" v-if="displayLogin" type="button" value="Go to Registration" v-on:click="authDisplay('register')">
        <input class="button button5" v-if="displayRegister" type="button" value="Go to Login" v-on:click="authDisplay('login')">
    </div>

    <div class="auth__form" v-if="!hasToken">
        <register v-if="displayRegister" v-on:cancel="cancelRegister"></register>
        <login v-if="displayLogin" v-on:cancel="cancelLogin"></login>
    </div>
</div>
</template>

<script>
import Register from '@/components/register.vue'
import Login from '@/components/login.vue'

import { CLEAR_AUTH_TOKEN } from '@/action-types'

export default {
    name: 'authentication',
    components: {
        Register,
        Login
    },
    data: function() {
        return {
			displayRegister: false,
			displayLogin: true
        }
	},
	computed: {
		hasToken() {
			return this.$store.state.auth.hasToken;
		}
	},
	watch: {
		hasToken: function(hasToken) {
			if (hasToken) {
				this.$router.push('/Profile');
			}
		}
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

<style scoped>
/**
===============================
===== AUTH MODAL
===============================
**/
.auth {}
.auth-modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
}
.auth-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}
.auth-modal__content-wrap {
    display: table-cell;
    vertical-align: middle;
}
.auth-modal__content {
    margin: 0px auto;
    z-index: 9999;
    position: relative;

    background-color: white;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 1;

    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 100%;
	justify-items: center;
	align-items: center;
}
.auth-modal__content__tabs {}
.auth-modal__content__form {
    width: 100%;
}

@media only screen and (min-width: 320px) {
    .auth-modal__content {
        width: 300px;
        height: initial;
    }
}
</style>