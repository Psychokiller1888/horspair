<template>
	<div class="mainContainer">
		<article>
			<div class="flex">
				<div class="author">
					Laurent Chervet<br>
					07.02.2022
				</div>
				<div class="text" :class="{extended: readingArticle === 1}">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula ultricies dolor, vitae feugiat lorem rutrum et. Donec a eros aliquet, pulvinar nibh a, luctus lacus. Curabitur tristique eleifend magna ultricies efficitur. Mauris elit purus, vehicula vitae varius ut, semper blandit nibh. Maecenas efficitur id elit vel dignissim. Nam pretium tortor et nisi auctor sodales. Donec blandit, lorem a finibus rutrum, magna nisi scelerisque ligula, consequat maximus tellus mauris nec nibh.

					Ut euismod ipsum nec consequat placerat. Mauris nec lacinia metus. Mauris at vehicula est. Mauris dignissim turpis at elit mattis malesuada. Praesent lacinia, arcu sed tempor ultricies, nunc sapien sodales erat, et luctus lacus dolor at felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisi risus, vehicula at pretium vitae, maximus sed erat. In egestas suscipit sapien, a hendrerit enim rutrum a. Praesent dignissim congue ligula, nec fermentum eros convallis et. Vivamus volutpat ante tincidunt magna consequat, non suscipit nisi feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam hendrerit pulvinar arcu, sollicitudin consectetur sem. Aenean nunc dolor, congue vitae lacus ut, dictum sodales diam. Sed est tellus, auctor a auctor egestas, condimentum in arcu.

					Nulla lacinia pulvinar tortor id lacinia. Fusce dapibus purus ac pellentesque euismod. Ut scelerisque, mi quis blandit imperdiet, eros diam rutrum tortor, vitae volutpat nulla enim nec nunc. Sed sed bibendum enim, id fringilla nulla. Cras aliquet semper risus, vitae blandit lectus viverra ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec auctor nibh ut sagittis sodales. Aliquam at viverra nisl, quis molestie lectus. Maecenas neque nunc, feugiat sed lobortis sit amet, vehicula sed enim. Aliquam eu enim vel magna convallis porta in dictum urna. Nullam et enim gravida, consectetur augue eu, tempor orci. Sed vel erat at leo fringilla tincidunt sit amet ac urna. Nulla ac justo mi.

					Pellentesque eget sagittis elit. Integer ultricies euismod nunc at aliquam. Nam luctus lectus nisi, vitae aliquet nibh suscipit et. In euismod neque in dolor molestie volutpat. Aenean nec turpis lacinia, porttitor ipsum in, sagittis augue. Cras vehicula nunc turpis, rhoncus mollis odio blandit ac. Donec volutpat elementum accumsan. Donec finibus dictum pellentesque. Nulla a neque orci. Sed dignissim ut est et ullamcorper. Mauris id sollicitudin lacus, elementum mattis massa.

					Maecenas sodales semper euismod. Morbi posuere diam in ex volutpat euismod. Sed pretium rutrum viverra. Suspendisse nec arcu pharetra, aliquet elit in, eleifend urna. Nam finibus, libero nec malesuada viverra, massa diam facilisis eros, eu tempus nunc ex ornare mi. Nunc et tristique quam. Nulla eget sem vel ligula hendrerit dictum.
				</div>
			</div>
			<div class="readMore">
				<font-awesome-icon :icon="['far', 'book-open-reader']" v-if="readingArticle !== 1" size="2x" class="clickable" @click="readingArticle = 1"/>
			</div>
		</article>
		<article>
			<div class="flex">
				<div class="author">
					Psycho<br>
					07.02.2022
				</div>
				<div class="text" :class="{extended: readingArticle === 2}">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula ultricies dolor, vitae feugiat lorem rutrum et. Donec a eros aliquet, pulvinar nibh a, luctus lacus. Curabitur tristique eleifend magna ultricies efficitur. Mauris elit purus, vehicula vitae varius ut, semper blandit nibh. Maecenas efficitur id elit vel dignissim. Nam pretium tortor et nisi auctor sodales. Donec blandit, lorem a finibus rutrum, magna nisi scelerisque ligula, consequat maximus tellus mauris nec nibh.

					Ut euismod ipsum nec consequat placerat. Mauris nec lacinia metus. Mauris at vehicula est. Mauris dignissim turpis at elit mattis malesuada. Praesent lacinia, arcu sed tempor ultricies, nunc sapien sodales erat, et luctus lacus dolor at felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisi risus, vehicula at pretium vitae, maximus sed erat. In egestas suscipit sapien, a hendrerit enim rutrum a. Praesent dignissim congue ligula, nec fermentum eros convallis et. Vivamus volutpat ante tincidunt magna consequat, non suscipit nisi feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam hendrerit pulvinar arcu, sollicitudin consectetur sem. Aenean nunc dolor, congue vitae lacus ut, dictum sodales diam. Sed est tellus, auctor a auctor egestas, condimentum in arcu.

					Nulla lacinia pulvinar tortor id lacinia. Fusce dapibus purus ac pellentesque euismod. Ut scelerisque, mi quis blandit imperdiet, eros diam rutrum tortor, vitae volutpat nulla enim nec nunc. Sed sed bibendum enim, id fringilla nulla. Cras aliquet semper risus, vitae blandit lectus viverra ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec auctor nibh ut sagittis sodales. Aliquam at viverra nisl, quis molestie lectus. Maecenas neque nunc, feugiat sed lobortis sit amet, vehicula sed enim. Aliquam eu enim vel magna convallis porta in dictum urna. Nullam et enim gravida, consectetur augue eu, tempor orci. Sed vel erat at leo fringilla tincidunt sit amet ac urna. Nulla ac justo mi.

					Pellentesque eget sagittis elit. Integer ultricies euismod nunc at aliquam. Nam luctus lectus nisi, vitae aliquet nibh suscipit et. In euismod neque in dolor molestie volutpat. Aenean nec turpis lacinia, porttitor ipsum in, sagittis augue. Cras vehicula nunc turpis, rhoncus mollis odio blandit ac. Donec volutpat elementum accumsan. Donec finibus dictum pellentesque. Nulla a neque orci. Sed dignissim ut est et ullamcorper. Mauris id sollicitudin lacus, elementum mattis massa.

					Maecenas sodales semper euismod. Morbi posuere diam in ex volutpat euismod. Sed pretium rutrum viverra. Suspendisse nec arcu pharetra, aliquet elit in, eleifend urna. Nam finibus, libero nec malesuada viverra, massa diam facilisis eros, eu tempus nunc ex ornare mi. Nunc et tristique quam. Nulla eget sem vel ligula hendrerit dictum.

					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula ultricies dolor, vitae feugiat lorem rutrum et. Donec a eros aliquet, pulvinar nibh a, luctus lacus. Curabitur tristique eleifend magna ultricies efficitur. Mauris elit purus, vehicula vitae varius ut, semper blandit nibh. Maecenas efficitur id elit vel dignissim. Nam pretium tortor et nisi auctor sodales. Donec blandit, lorem a finibus rutrum, magna nisi scelerisque ligula, consequat maximus tellus mauris nec nibh.

					Ut euismod ipsum nec consequat placerat. Mauris nec lacinia metus. Mauris at vehicula est. Mauris dignissim turpis at elit mattis malesuada. Praesent lacinia, arcu sed tempor ultricies, nunc sapien sodales erat, et luctus lacus dolor at felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisi risus, vehicula at pretium vitae, maximus sed erat. In egestas suscipit sapien, a hendrerit enim rutrum a. Praesent dignissim congue ligula, nec fermentum eros convallis et. Vivamus volutpat ante tincidunt magna consequat, non suscipit nisi feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam hendrerit pulvinar arcu, sollicitudin consectetur sem. Aenean nunc dolor, congue vitae lacus ut, dictum sodales diam. Sed est tellus, auctor a auctor egestas, condimentum in arcu.

					Nulla lacinia pulvinar tortor id lacinia. Fusce dapibus purus ac pellentesque euismod. Ut scelerisque, mi quis blandit imperdiet, eros diam rutrum tortor, vitae volutpat nulla enim nec nunc. Sed sed bibendum enim, id fringilla nulla. Cras aliquet semper risus, vitae blandit lectus viverra ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec auctor nibh ut sagittis sodales. Aliquam at viverra nisl, quis molestie lectus. Maecenas neque nunc, feugiat sed lobortis sit amet, vehicula sed enim. Aliquam eu enim vel magna convallis porta in dictum urna. Nullam et enim gravida, consectetur augue eu, tempor orci. Sed vel erat at leo fringilla tincidunt sit amet ac urna. Nulla ac justo mi.

					Pellentesque eget sagittis elit. Integer ultricies euismod nunc at aliquam. Nam luctus lectus nisi, vitae aliquet nibh suscipit et. In euismod neque in dolor molestie volutpat. Aenean nec turpis lacinia, porttitor ipsum in, sagittis augue. Cras vehicula nunc turpis, rhoncus mollis odio blandit ac. Donec volutpat elementum accumsan. Donec finibus dictum pellentesque. Nulla a neque orci. Sed dignissim ut est et ullamcorper. Mauris id sollicitudin lacus, elementum mattis massa.

					Maecenas sodales semper euismod. Morbi posuere diam in ex volutpat euismod. Sed pretium rutrum viverra. Suspendisse nec arcu pharetra, aliquet elit in, eleifend urna. Nam finibus, libero nec malesuada viverra, massa diam facilisis eros, eu tempus nunc ex ornare mi. Nunc et tristique quam. Nulla eget sem vel ligula hendrerit dictum.
				</div>
			</div>
			<div class="readMore">
				<font-awesome-icon :icon="['far', 'book-open-reader']" v-if="readingArticle !== 2" size="2x" class="clickable" @click="readingArticle = 2"/>
			</div>
		</article>
		<article>
			<div class="flex">
				<div class="author">
					Plop<br>
					07.02.2022
				</div>
				<div class="text" :class="{extended: readingArticle === 3}">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula ultricies dolor, vitae feugiat lorem rutrum et. Donec a eros aliquet, pulvinar nibh a, luctus lacus. Curabitur tristique eleifend magna ultricies efficitur. Mauris elit purus, vehicula vitae varius ut, semper blandit nibh. Maecenas efficitur id elit vel dignissim. Nam pretium tortor et nisi auctor sodales. Donec blandit, lorem a finibus rutrum, magna nisi scelerisque ligula, consequat maximus tellus mauris nec nibh.

					Ut euismod ipsum nec consequat placerat. Mauris nec lacinia metus. Mauris at vehicula est. Mauris dignissim turpis at elit mattis malesuada. Praesent lacinia, arcu sed tempor ultricies, nunc sapien sodales erat, et luctus lacus dolor at felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisi risus, vehicula at pretium vitae, maximus sed erat. In egestas suscipit sapien, a hendrerit enim rutrum a. Praesent dignissim congue ligula, nec fermentum eros convallis et. Vivamus volutpat ante tincidunt magna consequat, non suscipit nisi feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam hendrerit pulvinar arcu, sollicitudin consectetur sem. Aenean nunc dolor, congue vitae lacus ut, dictum sodales diam. Sed est tellus, auctor a auctor egestas, condimentum in arcu.

					Nulla lacinia pulvinar tortor id lacinia. Fusce dapibus purus ac pellentesque euismod. Ut scelerisque, mi quis blandit imperdiet, eros diam rutrum tortor, vitae volutpat nulla enim nec nunc. Sed sed bibendum enim, id fringilla nulla. Cras aliquet semper risus, vitae blandit lectus viverra ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec auctor nibh ut sagittis sodales. Aliquam at viverra nisl, quis molestie lectus. Maecenas neque nunc, feugiat sed lobortis sit amet, vehicula sed enim. Aliquam eu enim vel magna convallis porta in dictum urna. Nullam et enim gravida, consectetur augue eu, tempor orci. Sed vel erat at leo fringilla tincidunt sit amet ac urna. Nulla ac justo mi.

					Pellentesque eget sagittis elit. Integer ultricies euismod nunc at aliquam. Nam luctus lectus nisi, vitae aliquet nibh suscipit et. In euismod neque in dolor molestie volutpat. Aenean nec turpis lacinia, porttitor ipsum in, sagittis augue. Cras vehicula nunc turpis, rhoncus mollis odio blandit ac. Donec volutpat elementum accumsan. Donec finibus dictum pellentesque. Nulla a neque orci. Sed dignissim ut est et ullamcorper. Mauris id sollicitudin lacus, elementum mattis massa.

					Maecenas sodales semper euismod. Morbi posuere diam in ex volutpat euismod. Sed pretium rutrum viverra. Suspendisse nec arcu pharetra, aliquet elit in, eleifend urna. Nam finibus, libero nec malesuada viverra, massa diam facilisis eros, eu tempus nunc ex ornare mi. Nunc et tristique quam. Nulla eget sem vel ligula hendrerit dictum.
				</div>
			</div>
			<div class="readMore">
				<font-awesome-icon :icon="['far', 'book-open-reader']" v-if="readingArticle !== 3" size="2x" class="clickable" @click="readingArticle = 3"/>
			</div>
		</article>
	</div>
</template>

<script>
export default {
	name: 'Témoignages',
	data: function() {
		return {
			readingArticle: 0
		}
	}
}
</script>

<style scoped>
article {
	width: 50%;
	background-color: var(--secondary-bg-color);
	padding: 25px;
	box-sizing: border-box;
	margin-bottom: 50px;
	overflow: hidden;
}

.flex {
	display: flex;
}

article:nth-child(even) {
	margin-left: 150px;
}

article:nth-child(odd) {
	margin-left: 300px;
}

.author {
	width: 300px;
	min-width: 300px;
}

.text {
	text-align: justify;
	height: 100px;
	overflow: hidden;
}

.extended {
	height: auto;
}

.readMore {
	margin-top: 15px;
	text-align: right;
}

</style>
