import { writable } from 'svelte/store'
import { addPlayer, updatePlayer, deletePlayer } from '../api'

function createPlayers() {
  const { subscribe, update, set } = writable([])

  return {
    subscribe,
    set,
    add: (player) => {
      addPlayer(player).then((addedPlayer) => {
        update((current) => [...current, addedPlayer])
      })
    },
    update: (ref, player) => {
      updatePlayer(ref, player).then((updatedPlayer) => {
        update((current) => {
          let playerToUpdate = current.find((p) => p.ref === ref)
          playerToUpdate.name = updatedPlayer.name
          playerToUpdate.level = updatedPlayer.level
          playerToUpdate.fitness = updatedPlayer.fitness
          playerToUpdate.picked = updatedPlayer.picked
          playerToUpdate.tags = updatedPlayer.tags
          return current
        })
      })
    },
    delete: (ref) => {
      update((current) => current.filter((player) => player.ref !== ref))
      deletePlayer(ref)
    },
  }
}

export const players = createPlayers()
export const group = writable(localStorage.getItem('group') || 'MNF')
