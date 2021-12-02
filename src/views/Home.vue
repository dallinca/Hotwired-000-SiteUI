<template>
<div class="home">
  <h1>Welcome Home!</h1>

  <da-chat
    v-bind:parent-auth="auth">
  </da-chat>

  <h2>Current Features -{{ auth }}</h2>
  <ul>
    <li>Register</li>
    <li>Login/Logout</li>
    <li>General Chat</li>
  </ul>

  <h2>Coming Soon</h2>
  <ul>
    <li>User Settings Page</li>
    <li>Friends</li>
    <li>Flashcards</li>
  </ul>
</div>
</template>

<script>
import DaChat from '@/components/da-chat.vue'

export default {
    name: 'page-home',
    components: {
        DaChat
    },
	props: {
		parentAuth: Object
	},
	data: function() {
		return {
			// current Auth
			auth: this.parentAuth
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>