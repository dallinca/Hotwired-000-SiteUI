<template>
<div class="site-ribbon">
    <router-link class="image-wrap site-ribbon__logo" to="/">
        <img src="/images/Logo_Hotwired_NoPadding.png">
    </router-link>
    <div class="site-ribbon__navs">

        <nav class="inline-menu site-nav--inline">
            <div class="inline-menu__items">
                <router-link v-for="item in siteNavItems" v-bind:key="item" class="inline-menu__item" v-bind:to="item.link">{{ item.text }}</router-link>
            </div>
        </nav>

        <nav class="dropdown-menu dropdown-menu--right site-nav--dropdown"
        v-bind:class="{ tapped: siteNavTapped }"
        v-on:click="toggleTapped($event.currentTarget, 'siteNav')">
            <a class="icon icon1" href="#" v-bind:class="{ tapped: siteNavTapped }">
                <img src="/images/menu-ham.svg">
            </a>
            <div class="dropdown-menu__items">
                <router-link v-for="item in siteNavItems" v-bind:key="item" class="dropdown-menu__item" v-bind:to="item.link">{{ item.text }}</router-link>
            </div>
        </nav>

        <nav class="dropdown-menu dropdown-menu--right user-nav"
        v-bind:class="{ tapped: userNavTapped }"
        v-on:click="toggleTapped($event.currentTarget, 'userNav')">
            <a class="icon icon1" href="#" v-bind:class="{ tapped: userNavTapped }">
                <img v-bind:src="ribbonInfo.userIcon">
                <svg v-if="!userLoggedIn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                <svg v-if="userLoggedIn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
            </a>
            <div class="dropdown-menu__items">
                <router-link v-for="(item, name) in userNavItems" v-bind:key="item"
                class="dropdown-menu__item"
                v-bind:to="item.link"
                v-on:click="userNavItemsAction(name)">{{ item.text }}</router-link>
            </div>
        </nav>

    </div>
</div>
</template>

<script>
export default {
    name: 'med-large-ribbon',
    props: {
		parentRibbonInfo: Object,
		parentSiteNavItemsAction: Function,
		parentUserNavItemsAction: Function
	},
    data: function() {
    return {
            ribbonInfo: this.parentRibbonInfo,
            siteNavItems: this.parentRibbonInfo.siteNavItems,
            userNavItems: this.parentRibbonInfo.userNavItems,
            siteNavItemsAction: this.parentSiteNavItemsAction,
            userNavItemsAction: this.parentUserNavItemsAction,
            userLoggedIn: this.parentRibbonInfo.userLoggedIn,

            // Mobile tapping data
            siteNavTapped: false,
            userNavTapped: false,
            lastTapped: null,
            onlyOneActiveTap: true
        }
	},
	methods: {
		toggleTapped: function(target, tapGroup) {
			if (!("ontouchstart" in document.documentElement)) {
				return;
            }

			var currentTapped = tapGroup + "Tapped";

			// If only one active is allowed, untap previous tap
            if (this.onlyOneActiveTap &&
                this.lastTapped &&
                this.lastTapped != currentTapped)
            {
                this[this.lastTapped] = false;
            }

            // Toggle the new tap
            this.lastTapped = currentTapped;
			this[currentTapped] = !this[currentTapped];

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>