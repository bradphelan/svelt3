<script context="module">
import {writable} from 'svelte/store'
    let consoleStore = writable<any[]>([])
    export const log = (txt:any)=>{
        consoleStore.update( old => [txt, ...old.slice(0,10)])
    }

    let clear = (_e: any)=>{
        consoleStore.set([]);
    }


</script>
<style>
    .main { 
        display: flex;
        flex-direction: column;
    }
</style>
<div class="main">
    <button on:click={clear}>clear</button>
    {#each $consoleStore as item}
    <span>{item}</span>
    {/each}
</div>