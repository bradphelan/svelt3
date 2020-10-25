<script lang="ts">
	import * as t$ from "three";
	var boxGeometry = new t$.BoxGeometry(1, 1, 1);
	var coneGeometry = new t$.ConeGeometry(1, 1, 256);
	var options = [
		{label:"box", geometry: boxGeometry},
		{label:"cone", geometry: coneGeometry},
	]
    let selectedGeometry = options[1]
    export let geometry:t$.Geometry|undefined;
    $:{
        geometry = selectedGeometry.geometry;
    }
</script>

<select bind:value={selectedGeometry}>
	{#each options as option}
		<option value={option}>{option.label}</option>
	{/each}
</select>