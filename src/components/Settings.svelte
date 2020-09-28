<script>
  export let group

  $: localStorage.setItem('group', group)
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
  }
</style>

<form on:submit|preventDefault><label><span>Group</span><input type="text" bind:value={group} /></label></form>
