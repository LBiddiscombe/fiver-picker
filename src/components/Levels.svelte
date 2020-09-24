<script>
  export let level = 3
  let levels = [1, 2, 3, 4, 5]
</script>

<style>
  .levels {
    margin: 0 auto;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
  }
  .level {
    display: grid;
    place-items: center;
    height: 3rem;
    width: 3rem;
    background-color: black;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .level.selected {
    background-color: limegreen;
  }
</style>

<div>
  <div class="levels">
    {#each levels as lev}
      <div class="level" class:selected={level === lev} on:click={() => (level = lev)}>{lev}</div>
    {/each}
  </div>
</div>
