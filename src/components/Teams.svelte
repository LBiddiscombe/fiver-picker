<script>
  import { onMount } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import Icon from 'svelte-awesome'
  import { faDice, faBalanceScale } from '@fortawesome/free-solid-svg-icons'
  import { players } from '../stores/players'
  import { shuffle, balance } from '../utils'
  import {
    teamPlayers,
    teamA,
    teamB,
    teamARating,
    teamBRating,
    teamATags,
    teamBTags,
    saveTeams,
    split,
  } from '../stores/teams'

  let advantage

  const setAdvantage = () => {
    advantage = $teamARating - $teamBRating
  }

  onMount(() => {
    teamPlayers.set(
      $players
        .slice()
        .filter((player) => player.picked)
        .sort((a, b) => a.seq - b.seq)
    )
    setAdvantage()
  })

  const onShuffle = () => {
    teamPlayers.set(shuffle($teamPlayers))
    setAdvantage()
    saveTeams($teamPlayers)
  }

  const onBalance = () => {
    teamPlayers.set(balance($teamPlayers, $split))
    setAdvantage()
    saveTeams($teamPlayers)
  }

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node)
      const transform = style.transform === 'none' ? '' : style.transform

      return {
        duration: 300,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      }
    },
  })
</script>

<style>
  .wrapper {
    width: 100%;
    max-width: 100vw;
    height: calc(100vh - 12rem);
    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-template-rows: auto 1fr;
    gap: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .title {
    height: 3rem;
    grid-column: 1/-1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
  }

  .team {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card {
    background-color: rgba(255, 255, 255, 0.25);
    font-size: 1.25rem;
    padding: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card + .card {
    margin-top: 0.25rem;
  }

  button {
    margin: 0;
    margin-left: 0.25rem;
    border-radius: 0.25rem;
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75rem;
  }

  .actions {
    position: absolute;
    top: 0.75rem;
    right: 0;
    display: flex;
  }

  .balance {
    margin: 0 0.5rem;
    height: 1rem;
    visibility: hidden;
  }

  .balance.advantage {
    font-weight: 900;
    visibility: visible;
    background-color: limegreen;
  }

  .info {
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .tags {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .tag {
    font-size: 0.75rem;
    background-color: goldenrod;
    color: black;
    border-radius: 0.25rem;
    padding: 0.5rem;
  }

  .tag + .tag {
    margin-left: 0.25rem;
  }
</style>

{#if $teamPlayers.length > 0}
  <div class="wrapper">
    <div class="title">
      <span class="balance" class:advantage={advantage > 0} style="width: {Math.abs(advantage)}rem">&nbsp;</span>
      <Icon data={faBalanceScale} class="icon" scale="2" />
      <span class="balance" class:advantage={advantage < 0} style="width: {Math.abs(advantage)}rem">&nbsp;</span>
    </div>
    <div class="team">
      {#each $teamA as player, i (player.ref)}
        <div
          in:receive={{ key: player.ref }}
          out:send={{ key: player.ref }}
          animate:flip={{ duration: 300 }}
          class="card">
          {player.name}
        </div>
      {/each}
      <div class="tags">
        {#each $teamATags as tag}<span class="tag"> {tag} </span>{/each}
      </div>
    </div>
    <div class="team">
      {#each $teamB as player, i (player.ref)}
        <div
          in:receive={{ key: player.ref }}
          out:send={{ key: player.ref }}
          animate:flip={{ duration: 300 }}
          class="card">
          {player.name}
        </div>
      {/each}
      <div class="tags">
        {#each $teamBTags as tag}<span class="tag"> {tag} </span>{/each}
      </div>
    </div>
  </div>
{:else}
  <p class="info">Select active players from the Players tab</p>
{/if}

<div class="actions">
  <button class="shuffle" on:click={onShuffle}>
    <Icon data={faDice} class="icon" scale="2" />
    <span>Random</span>
  </button>
  <button class="balanced" on:click={onBalance}>
    <Icon data={faBalanceScale} class="icon" scale="2" />
    <span>Balanced</span>
  </button>
</div>
