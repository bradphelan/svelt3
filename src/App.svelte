<script lang="ts">
	import S3d from "./svelte3/S3d.svelte";
	import Mesh from "./svelte3/Mesh.svelte";
	import PointLight from "./svelte3/PointLight.svelte";
	// import MeshBasicMaterial from "./svelte3/MeshBasicMaterial.svelte";
	import MeshStandardMaterial from "./svelte3/MeshStandardMaterial.svelte";
	import GeometrySelector from "./GeometrySelector.svelte"
	import * as t$ from "three";
	import AmbientLight from "./svelte3/AmbientLight.svelte";

	var boxGeometry = new t$.BoxGeometry(1, 1, 1);
	var coneGeometry = new t$.ConeGeometry(1, 1, 32);

	var options = [
		{label:"box", geometry: boxGeometry},
		{label:"cone", geometry: coneGeometry},
	]

	let showMesh=true;
	let objectColor = "#ffffff";
	let lightColor = "#00ff00";

	let geometry1:t$.Geometry;
	let geometry2:t$.Geometry;
</script>

<style>
</style>

<input type=checkbox bind:checked={showMesh}/>

<label for="object-color">object color</label>
<input name="object-color" type=color bind:value={objectColor}/>

<label for="point-light-color">light color</label>
<input name="point-light-color" type=color bind:value={lightColor}/>


<GeometrySelector bind:geometry={geometry1}/>

<GeometrySelector bind:geometry={geometry2}/>

<div class="App">
	<S3d w={500} h={500}>
		<PointLight 
			color={lightColor} 
			intensity={2} 
			distance={50} 
			position={new t$.Vector3(2,2,0)}
		/>
		<AmbientLight 
			color="white" 
			intensity={0.2} 
			position={new t$.Vector3(2,2,0)}
		/>
		{#if showMesh}
			<MeshStandardMaterial args={{color:objectColor}}>
				{#if geometry1}
				<Mesh geometry={geometry1}/>
				{/if}
				{#if geometry2}
				<Mesh geometry={geometry2} position={new t$.Vector3(2,0,0)}/>
				{/if}
			</MeshStandardMaterial>
		{/if}
	</S3d>
</div>
