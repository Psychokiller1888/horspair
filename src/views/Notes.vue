<template>
	<div class="mainContainer">
		<div class="board">
			<div class="postit" style="background-color: #488a4b; top: 135px; left: 632px; transform: rotate(12deg)">
				<div class="note">
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
					Terminer le design concept
				</div>
				<div class="deadline">15 juillet 2022, 17h30</div>
			</div>
			<div class="postit" style="background-color: #93ff96; top: 182px; left: 836px; transform: rotate(-7deg); color: #1e1e1e;">
				<div class="note">
					<strong>Appeler les Toises</strong>
				</div>
				<div class="deadline red">02 juillet 2022, 12h00</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Notes'
}
</script>

<style scoped>
	.board {
		width: 100%;
		height: 100%;
		display: flex;
		background-color: #04000c;
		flex-grow: 1;
		position: relative;
	}

	.postit {
		position: absolute;
		width: 200px;
		min-height: 200px;
		-webkit-box-shadow: 4px 8px 15px 3px #000000;
		box-shadow: 4px 8px 15px 3px #000000;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.note {
		font-family: "Comic Sans MS", "Monotype Corsiva", "Bradley Hand ITC", serif;
		flex-grow: 1;
		text-align: justify;
	}

	.deadline {
		margin-top: 10px;
		font-size: 0.8em;
		text-align: right;
	}

	.red {
		color: red;
		font-weight: bolder;
	}
</style>
