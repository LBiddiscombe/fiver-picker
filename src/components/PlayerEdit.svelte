<script>
  import Tags from 'svelte-tags-input'
  import Icon from 'svelte-awesome'
  import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
  import { createEventDispatcher, onMount } from 'svelte'
  import Levels from './Levels.svelte'
  import { group, players } from '../stores/players'

  const dispatch = createEventDispatcher()

  export let ref = -1

  let player = {
    name: '',
    level: 3,
    fitness: 3,
    picked: false,
    tags: '',
  }

  let error = ''
  let originalName
  let autoComplete = ['GK', 'DEF', 'ATT']

  onMount(() => {
    if (ref !== -1) player = { ...player, ...$players.find((player) => player.ref === ref), group: $group }
    originalName = player.name.toString()
  })

  const save = () => {
    if (!player.name) {
      error = 'Please enter a name'
      return
    }

    if (player.name !== originalName && $players.findIndex((p) => p.name === player.name)) {
      error = 'A player with this name already exists'
      return
    }

    if (ref === -1) {
      players.add(player)
    } else {
      players.update(ref, player)
    }

    dispatch('close')
  }

  const del = () => {
    const agreed = confirm(`Delete ${player.name}?`)
    if (agreed) {
      players.delete(ref)
      dispatch('close')
    }
  }

  function handleTags(event) {
    player.tags = event.detail.tags.map((tag) => tag.toUpperCase())
  }
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

  .tags {
    margin: 1rem auto;
    max-width: 300px;
    color: black;
  }

  :global(.svelte-tags-input-tag) {
    background-color: blueviolet;
  }
</style>

<form on:submit|preventDefault={save}>
  <p>{error}&nbsp;</p>
  <input type="text" bind:value={player.name} maxLength="25" on:focus={() => (error = '')} />
  <Levels title="Ability" bind:level={player.level} />
  <Levels title="Fitness" bind:level={player.fitness} />
  <div class="tags">
    <Tags
      tags={player.tags}
      on:tags={handleTags}
      onlyUnique={true}
      minChars={1}
      {autoComplete}
      placeholder={'Tags, e.g. GK, DEF, ATT'} />
  </div>
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
