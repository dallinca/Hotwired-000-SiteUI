<template>
  <div class="site__wrap">
    <site-ribbon />
    <router-view />
  </div>
</template>

<script>
import SiteRibbon from '@/components/site-ribbon.vue'

import { VALIDATE_AUTH_TOKEN } from '@/action-types'

export default {
  name: 'App',
  components: {
    SiteRibbon
  },
  data: function() {
    return {}
	},
	created: function() {
		this.$store.dispatch(VALIDATE_AUTH_TOKEN);
	}
}
</script>

<style>
.site__wrap {
  min-width: 320px;
}
</style>
