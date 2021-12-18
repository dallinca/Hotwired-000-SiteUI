<template>
	<div class="site-ribbon--mobile">
		<router-link class="image-wrap logo" to="/">
			<img src="/images/Logo_Hotwired_NoPadding.png">
		</router-link>

		<div class="navs-wrap">

			<nav class="dropdown-menu dropdown-menu--mobile site-nav"
			v-bind:class="{ tapped: siteNavTapped }"
			v-on:click="toggleTapped($event.currentTarget, 'siteNav')">
				<div class="icon dropdown-menu__button"
				v-bind:class="{ tapped: siteNavTapped }">
					<img src="/images/menu-ham.svg">
				</div>
				<div class="dropdown-menu__items">
					<router-link v-for="item in siteNavItems" v-bind:key="item" class="dropdown-menu__item" v-bind:to="item.link">{{ item.text }}</router-link>
				</div>
			</nav>

			<nav class="dropdown-menu dropdown-menu--mobile2 user-nav"
			v-bind:class="{ tapped: userNavTapped }"
			v-on:click="toggleTapped($event.currentTarget, 'userNav')">
				<div class="icon dropdown-menu__button"
				v-bind:class="{ tapped: userNavTapped }">
					<img v-bind:src="ribbonInfo.userIcon">
				</div>
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
	name: 'small-ribbon',
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
.site-ribbon--mobile {
	display: grid;
	grid-template-columns: 164px auto;
	width: 100%;
	height: 56px;
}

.site-ribbon--mobile .logo {
	width: 164px;
	padding: 10px;
	display: block;
}

.site-ribbon--mobile .navs-wrap {
    width: 100%;
    height: 32px;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    box-shadow: 0px 0px 8px black;
}

.site-ribbon--mobile .site-nav {
    width: 50%;
    height: 32px;
    float: left;
    border-right: 1px solid #000;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
}

.site-ribbon--mobile .user-nav {
    width: 50%;
    height: 32px;
    float: right;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
}

@media only screen and (min-width: 360px) {
	.site-ribbon--mobile {
		display: none;
	}
}


/* 888888888888888888888888888888888888888888 */
.mobile-site-nav__dropdown {
    display: none;
}
.no-touch .mobile-site-nav:hover .mobile-site-nav__dropdown, .mobile-site-nav.tapped .mobile-site-nav__dropdown {
    display: block;
    position: absolute;
    width: 100%;
}

</style>