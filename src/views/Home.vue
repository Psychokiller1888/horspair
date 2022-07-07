<template>
	<div class="mainContainer">
		<div class="homepage">
<!--						<div class="box center">-->
<!--							<div class="boxTitle">-->
<!--								comprendre décider assumer-->
<!--							</div>-->
<!--							<div class="boxContent">-->
<!--								<p>-->
<!--									Par manque d'intérêt et de communauté, ce projet est annulé.-->
<!--								</p>-->
<!--							</div>-->
<!--						</div>-->
			<div class="box left">
				<div class="boxTitle">
					Surdoué haut potentiel zèbre intello HP HPI HPE sur-efficient
				</div>
				<div class="boxContent">
					<p>
						Tu as sûrement déjà entendu ces termes! Tu te sens différent(e)? Ca tombe bien, nous aussi!
					</p>
					<p>
						Tu te sens en décalage avec ton entourage? Tu t'ennuies alors que tes amis s'éclatent? Tes emotions te dépassent? Tu es bien plus rapide que les autres dans les calculs ou la jugeote? Tu sens les choses venir et tu es capable de finir les phrases de tes proches avant même le milieu de leur phrase? Ou alors depuis toujours tu te ressens rejeté(e) ou mis(e) à l'écart et tu as du te forcer pour pouvoir t'intégrer?
					</p>
					<p>
						La médisance, l'injustice, les inégalités, la méchanceté gratuite t'indignent?
					</p>
					<p>
						Tous ces points peuvent être, parmi tant d'autres, des signes de ta sur-efficience mentale.
					</p>
				</div>
			</div>
			<div class="citation right">
				<p>
					<font-awesome-icon :icon="['far', 'quote-left']" size="xs" transform="up-10"/>
					Ajouter de la tempête à la tempête et bien ça donne... Du vent...
					<font-awesome-icon :icon="['far', 'quote-right']" size="xs" transform="down-10"/>
				</p>
			</div>
			<div class="box right">
				<div class="boxTitle">
					croyances élite peurs honte média
				</div>
				<div class="boxContent">
					<p>
						Non, tu ne dois pas forcement tous les cocher et au contraire des croyances archaïques, promues autant par certains groupes élitistes ainsi que la médiatisation de notre prédisposition mentale, tu n'es pas obligé(e) d'avoir un QI de plus de 130, ni de pouvoir terminer un Rubik's Cube en moins de 10 secondes les yeux bandés et les mains attachées dans le dos pour être un(e) HP! Ca peut aider hein, mais ce ne sont pas des conditions sine qua non.
					</p>
				</div>
			</div>
			<div class="box center">
				<div class="boxTitle">
					guérir apprendre contrôler gérer changer
				</div>
				<div class="boxContent">
					<p>
						La seule chose qui est différente chez toi comme chez nous, c'est que tu n'utilises pas ton cerveau comme la majorité de la population et, crois-nous, ça te donnes un certain avantage, même si tu penses que c'est un problème. Et nous sommes ici pour t'accueillir, t'accompagner et t'aider, sans jugement mais aussi pour apprendre de toi, tout simplement.
					</p>
					<div class="button" @click="joinModal = true" v-if="!$store.state.user">Rejoindre la communauté</div>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div ref="joinModal" @click="joinModal = false" v-if="joinModal">
				<div class="modal">
					<div class="modalContent">
						<p>
							Le sentiment de sécurité est essentiel, pour un HP tout particulièrement. Un HP peut vite tomber sous le charme d'un pervers narcissique ou de personnes malveillantes.
						</p>
						<p>
							Pour cela, tu ne peux pas librement rejoindre cette communauté. Pour pouvoir profiter de ces outils, tu dois y être invité par ton thérapeute.
						</p>
						<p>
							Parle lui de ton envie de nous rejoindre pour qu'il puisse t'y inviter.
						</p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: function() {
		return {
			joinModal: false
		}
	},
	methods: {}
}
</script>

<style scoped>
.homepage {
	width: 90%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	text-align: justify;
	align-items: center;
}

.box {
	margin-top: 50px;
	max-width: 750px;
	min-width: 250px;
	background-color: var(--dark-bg-color);
	padding: 25px;
	box-sizing: border-box;
	-webkit-box-shadow: var(--boxShadow);
	box-shadow: var(--boxShadow);
}

.citation {
	font-style: italic;
	color: #3b3b41;
	font-variant: small-caps;
	font-size: 1.25em;
}

.boxTitle {
	font-weight: bold;
	text-transform: uppercase;
	font-size: 0.75em;
	margin-bottom: 2em;
}

.left {
	align-self: flex-start;
}

.right {
	align-self: flex-end;
}

.center {
	align-self: center;
}

.boxContent {
	font-variant: small-caps;
	font-size: 1.25em;
}

.button {
	width: 250px;
	margin: 0 auto;
	text-align: center;
	font-weight: bold;
	padding: 10px;
	box-sizing: border-box;
	border: 2px solid var(--secondary-bg-color);
	border-radius: 5px;
}

.button:hover {
	background-color: var(--main-bg-color);
}

</style>
