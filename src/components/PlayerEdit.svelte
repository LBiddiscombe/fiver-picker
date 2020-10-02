<script>
  import Icon from 'svelte-awesome'
  import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
  import { createEventDispatcher } from 'svelte'
  import Levels from './Levels.svelte'
  import { group, players } from '../stores/players'

  const dispatch = createEventDispatcher()
  const save = () => {
    if (!name) {
      error = 'Please enter a name'
      return
    }

    if (name !== originalName && $players.find((player) => player.name === name)) {
      error = 'A player with this name already exists'
      return
    }

    dispatch('save', { ref, name, level, fitness, picked, group: $group })
    dispatch('close')
  }
  const del = () => {
    const agreed = confirm(`Delete ${name}?`)
    if (agreed) {
      dispatch('delete', { ref })
      dispatch('close')
    }
  }

  export let ref = -1
  export let name = ''
  export let level = 3
  export let picked = false
  export let fitness = 3

  let error = ''
  let originalName = name.toString()
</script>

<style>
  button {
    margin: 0;
    border: none;
    display: flex;
    align-items: center;
    background: none;
  }

  button.save {
    background-color: limegreen;
    color: black;
    padding: 0.5rem 1rem;
  }

  button.delete {
    color: tomato;
  }

  p {
    margin: 0 0 0.25rem 0;
    color: tomato;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button > span {
    margin-right: 0.5rem;
  }
</style>

<form on:submit|preventDefault={save}>
  <input type="text" autofocus bind:value={name} maxLength="25" on:focus={() => (error = '')} />
  <Levels title="Ability" bind:level />
  <Levels title="Fitness" bind:level={fitness} />
  <p>{error}&nbsp;</p>
  <div class="actions">
    <button class="delete" on:click={del} type="button">
      <Icon data={faTrashAlt} class="icon" scale="2" />
    </button>
    <button class="save" type="sumbit">
      <span>Save</span>
      <Icon data={faSave} class="icon" scale="2" />
    </button>
  </div>
</form>
