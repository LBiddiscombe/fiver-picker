<script>
  import { group } from '../stores/players'
  import { split } from '../stores/teams'

  $: {
    $group = $group.toUpperCase()
    localStorage.setItem('group', $group)
    localStorage.setItem('split', $split)
  }
</script>

<style>
  form {
    margin-top: 1rem;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 1rem;
    font-size: 1.5rem;
  }

  input {
    margin: 0.5rem;
    text-transform: uppercase;
  }

  input[type='range'] {
    padding: 0;
  }

  .splits-title {
    margin-top: 2rem;
  }

  .splits {
    margin: 0 auto;
    max-width: 400px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-content: center;
    align-items: center;
  }
</style>

<form on:submit|preventDefault>
  <label><span>Group</span><input type="text" bind:value={$group} /></label>
  <div class="splits-title">Level Influence</div>
  <div class="splits">
    <span>Ability<br />{100 - $split}%</span>
    <input type="range" bind:value={$split} min="0" max="100" step="10" />
    <span>Fitness<br />{$split}%</span>
  </div>
</form>
