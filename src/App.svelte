<script lang="ts">
	import { onMount } from "svelte";
	import S3d from "./svelte3/S3d.svelte";
	import Mesh from "./svelte3/Mesh.svelte";
	import Scene from "./svelte3/Scene.svelte";
	import * as t$ from "three";

	var geometry: t$.BoxGeometry = new t$.BoxGeometry(1, 1, 1);

	let showMesh=true;
</script>

<style>
</style>

<input type=checkbox bind:checked={showMesh}/>
<div class="App">
	<S3d w={500} h={500}>
		{#if showMesh}
			<Mesh {geometry} />
		{/if}
	</S3d>
</div>
