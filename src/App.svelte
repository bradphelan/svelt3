<script lang="ts">
	import S3d from "./svelte3/S3d.svelte";
	import Mesh from "./svelte3/Mesh.svelte";
	import PointLight from "./svelte3/PointLight.svelte";
	import MeshStandardMaterial from "./svelte3/MeshStandardMaterial.svelte";
	import GeometrySelector from "./GeometrySelector.svelte"
	import * as t$ from "three";
	import AmbientLight from "./svelte3/AmbientLight.svelte";

	let showMesh=true;
	let objectColor = "#ff1010";
	let lightColor = "#ffffff";

	let geometry1:t$.Geometry;
	let geometry2:t$.Geometry;

	const click = (event:CustomEvent<t$.Intersection>)=>{
		rayPosition = event.detail.point
	}
	const sphereGeometry = new t$.SphereGeometry(0.1,10,10)

	let rayPosition = new t$.Vector3(0,0,0)

</script>

<style>
	.App{
		margin: 1em;
	}
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
			<MeshStandardMaterial args={{color:objectColor}}>
				<Mesh on:click={click} geometry={geometry1}/>
				<Mesh on:click={click} geometry={geometry2} position={new t$.Vector3(2,0,0)}/>
			</MeshStandardMaterial>
		{/if}
	</S3d>
</div>
