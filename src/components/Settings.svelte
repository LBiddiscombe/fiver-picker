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
  label + label {
    margin-top: 2rem;
  }
</style>

<form on:submit|preventDefault>
  <label><span>Group</span><input type="text" bind:value={$group} /></label>
  <label><span>Ability/Fitness Weights ({$split * 10} / {100 - $split * 10})</span>
    <input type="range" bind:value={$split} min="0" max="10" />
  </label>
</form>
