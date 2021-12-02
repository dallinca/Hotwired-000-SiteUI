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