<script>
  import Tags from 'svelte-tags-input'
  import Icon from 'svelte-awesome'
  import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
  import { createEventDispatcher } from 'svelte'
  import Levels from './Levels.svelte'
  import { group, players } from '../stores/players'

  export let ref = -1
  export let name = ''
  export let level = 3
  export let picked = false
  export let fitness = 3
  export let tags = ''

  let error = ''
  let originalName = name.toString()
  let autoComplete = ['GK', 'DEF', 'ATT']

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

    dispatch('save', { ref, name, level, fitness, picked, group: $group, tags })
    dispatch('close')
  }

  const del = () => {
    const agreed = confirm(`Delete ${name}?`)
    if (agreed) {
      dispatch('delete', { ref })
      dispatch('close')
    }
  }

  function handleTags(event) {
    tags = event.detail.tags.map((tag) => tag.toUpperCase())
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
  <input type="text" bind:value={name} maxLength="25" on:focus={() => (error = '')} />
  <Levels title="Ability" bind:level />
  <Levels title="Fitness" bind:level={fitness} />
  <div class="tags">
    <Tags
      {tags}
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
