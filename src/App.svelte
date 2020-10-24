<script lang="ts">
	// Import Svelt3 components
	import S3d from "./svelte3/S3d.svelte";
	import Mesh from "./svelte3/Mesh.svelte";
	import PointLight from "./svelte3/PointLight.svelte";
	import MeshStandardMaterial from "./svelte3/MeshStandardMaterial.svelte";
	import GeometrySelector from "./GeometrySelector.svelte"
	import AmbientLight from "./svelte3/AmbientLight.svelte";

	// Import 3js
	import * as t$ from "three";

	// Setup local state
	let showMesh=true;
	let objectColor = "#ff1010";
	let lightColor = "#ffffff";

	let geometry1:t$.Geometry;
	let geometry2:t$.Geometry;

	// Handle the ray caster result and
	// set the location of the position 
	// sphere
	let rayPosition = new t$.Vector3(0,0,0)
	const click = (event:CustomEvent<t$.Intersection>)=>{
		rayPosition = event.detail.point
	}

	// Create a geometry for the position sphere
	const sphereGeometry = new t$.SphereGeometry(0.1,128,128)

</script>

<style>
	.App{
		margin: 1em;
	}
</style>

<h1>Svelt3 Demo</h1>

<input type=checkbox bind:checked={showMesh}/>

<label for="object-color">object color</label>
<input name="object-color" type=color bind:value={objectColor}/>

<label for="point-light-color">light color</label>
<input name="point-light-color" type=color bind:value={lightColor}/>

<GeometrySelector bind:geometry={geometry1}/>
<GeometrySelector bind:geometry={geometry2}/>

<div class="App">
	<S3d w={1024} h={768}>
		<PointLight 
			color={lightColor} 
			intensity={1} 
			distance={50} 
			position={new t$.Vector3(5,2,0)}
		/>
		<PointLight 
			color={lightColor} 
			intensity={1} 
			distance={50} 
			position={new t$.Vector3(-5,2,0)}
		/>
		<AmbientLight 
			color="white" 
			intensity={0.5} 
			position={new t$.Vector3(2,2,0)}
		/>
		{#if showMesh}
			<MeshStandardMaterial args={{color:"white"}}>
				<Mesh geometry={sphereGeometry} position={rayPosition}/>
			</MeshStandardMaterial>
			<MeshStandardMaterial args={{color:objectColor, flatShading:false, roughness:0.1, metalness:0.8}}>
				<Mesh on:click={click} geometry={geometry1}/>
				<Mesh on:click={click} geometry={geometry2} position={new t$.Vector3(2,0,0)}/>
			</MeshStandardMaterial>
		{/if}
	</S3d>
</div>
