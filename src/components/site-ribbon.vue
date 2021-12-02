<template>
    
  <div class="site-ribbon__wrap">
    <site-ribbon-desktop
      v-bind:parent-ribbon-info="ribbonInfo"
      v-bind:parent-site-nav-items-action="siteNavItemsAction"
      v-bind:parent-user-nav-items-action="userNavItemsAction">	
    </site-ribbon-desktop>

    <site-ribbon-mobile
      v-bind:parent-ribbon-info="ribbonInfo"
      v-bind:parent-site-nav-items-action="siteNavItemsAction"
      v-bind:parent-user-nav-items-action="userNavItemsAction">	
    </site-ribbon-mobile>
  </div>

</template>

<script>
import SiteRibbonDesktop from '@/components/site-ribbon--desktop.vue'
import SiteRibbonMobile from '@/components/site-ribbon--mobile.vue'

import { VALIDATE_AUTH_TOKEN, CLEAR_AUTH_TOKEN } from '@/action-types'

export default {
  name: 'site-ribbon',
  components: {
    SiteRibbonDesktop,
    SiteRibbonMobile
  },
  data: function() {
    return {
      ribbonInfo: {
        siteNavItems: {
          about: { text: "About", link: "/About", tapped: false },
          contact: { text: "Contact Us", link: "/Contact", tapped: false }
        },
        userNavItems: {
          login: { text: "Login", link: "/Auth", tapped: false}
        },
        userIcon: "/images/gear.svg"
      }
    }
	},
	computed: {
		hasToken() {
			return this.$store.state.auth.hasToken;
		}
	},
	watch: {
		hasToken: function(hasToken) {
      this.tokenStatusChange(hasToken);
		}
	},
	created: function() {
		this.$store.dispatch(VALIDATE_AUTH_TOKEN);
	},
	methods: {
		tokenStatusChange: function(hasToken) {
			if (hasToken) {
				// Update Menu Icon
				this.ribbonInfo.userIcon = "/images/avatar.svg"

				// Remove items
                delete this.ribbonInfo.userNavItems["login"];

				// Add items
				this.ribbonInfo.userNavItems["logout"] = { text: "Logout", link: "#"};
				this.ribbonInfo.userNavItems["profile"] = { text: "Profile", link: "/profile"};
			} else  {
				// Update Menu Icon
				this.ribbonInfo.userIcon = "/images/gear.svg"

				// Remove items
                delete this.ribbonInfo.userNavItems["logout"];
                delete this.ribbonInfo.userNavItems["profile"];

				// Add items
				this.ribbonInfo.userNavItems["login"] = { text: "Login", link: "/Auth"};
			}
		},
		userNavItemsAction: function(key) {
			if ("logout" == key) {
                this.$store.dispatch(CLEAR_AUTH_TOKEN)
            }
            console.log("userNavItemsAction: " + key)
		},
		siteNavItemsAction: function(key) {
			//No actions yet
            console.log("siteNavItemsAction: " + key)
		}
	}
}
</script>

<style>
.site-ribbon__wrap {
    width: 100%;
}


/**
===============================
===== SITE RIBBON
===============================
**/
.site-ribbon {
    display: none;
}

@media only screen and (min-width: 360px) {
    body {
        padding-top: 32px;
    }

    .site-ribbon {
        width: 100%;
        height: 32px;
        position: fixed;
        top: 0px;
        box-shadow: 0px 0px 8px black;
        background: #FFF;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .site-ribbon__logo {
        height: 32px;
        width: 110px;
        display: grid;
        justify-items: center;
        align-items: center;
        margin-left: 10px;
    }
    .site-ribbon__navs {
        height: 32px;
        display: flex;
    }
    .site-nav--dropdown {
        width: 32px;
        height: 32px;
        border-left: 1px solid #000;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
    }
    .site-nav--inline {
        display: none;
    }
    .user-nav {
        width: 32px;
        height: 32px;
        border: 1px solid #000;
    }
}

@media only screen and (min-width: 600px) {
    .site-nav--dropdown {
        border: none;
        display: none;
    }
    .site-nav--inline {
        display: block;
    }
}
</style>