<template>
	<div class="mainContainer">
		<div class="subMenu">
			<ul>
				<li @click="page = 'data'">Mes données</li>
				<li @click="page = 'doctors'">Mes thérapeutes</li>
				<li @click="page = 'friends'">Mes amis</li>
			</ul>
		</div>
		<div class="content">
			<div class="profilDataHolder" v-if="page === 'data'">
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
					<input type="text" v-model="firstName" placeholder="Prénom"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
					<input type="text" v-model="lastName" placeholder="Nom de famille"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'location-crosshairs']" size="2x"/></span>
					<input type="text" v-model="address" placeholder="Rue"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'input-numeric']" size="2x"/></span>
					<input type="text" v-model="cityCode" placeholder="NPA"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'city']" size="2x"/></span>
					<input type="text" v-model="city" placeholder="Ville"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'phone']" size="2x"/></span>
					<input type="text" v-model="phone" placeholder="Téléphone"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
					<input type="text" v-model="email" placeholder="Email" disabled/>
				</p>
				<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Mettre à jour!" @click="update"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Compte',
	data: function() {
		return {
			page: 'data',
			firstName: this.$store.state.user['firstName'],
			lastName: this.$store.state.user['lastName'],
			address: this.$store.state.user['address'],
			cityCode: this.$store.state.user['cityCode'],
			city: this.$store.state.user['city'],
			phone: this.$store.state.user['phone'],
			email: this.$store.state.user['email']
		}
	},
	methods: {
		update: function() {
			this.$store.commit('updateProfile', {
				firstName: this.firstName,
				lastName: this.lastName,
				address: this.address,
				cityCode: this.cityCode,
				city: this.city,
				phone: this.phone
			})
		},
		cancel: function() {
			this.firstName = this.$store.state.user['firstName']
			this.lastName = this.$store.state.user['lastName']
			this.address = this.$store.state.user['address']
			this.cityCode = this.$store.state.user['cityCode']
			this.city = this.$store.state.user['city']
			this.phone = this.$store.state.user['phone']
			this.email = this.$store.state.user['email']
			this.$router.push({path: '/'})
		}
	}
}
</script>

<style scoped>
ul {
	padding: 0;
	margin-right: 25px;
}
li {
	font-family: var(--main-font), sans-serif;
	font-size: 1.1em;
	display: block;
	box-sizing: border-box;
	text-decoration: underline;
	padding: 15px;
}
li:hover {
	cursor: pointer;
	color: var(--hover-text-color);
	background-color: var(--tertiary-bg-color);
}
.mainContainer {
	display: flex;
}

.content {
	flex-grow: 1;
	margin-bottom: 15px;
}

.profilDataHolder {
	width: 500px;
}
</style>
