import { writable, derived } from 'svelte/store'
import { updatePlayers } from '../api'

export const split = writable(localStorage.getItem('split') || 50)

function createTeamPlayers() {
  const { subscribe, set, update } = writable([])

  return {
    set,
    subscribe,
    shuffle: () => update((players) => shuffle(players)),
    balance: () => update((players) => balance(players, get(split))),
  }
}

export const teamPlayers = createTeamPlayers()

export const teamA = derived(teamPlayers, ($teamPlayers) => {
  const teamSize = Math.ceil($teamPlayers.length / 2)
  const team = $teamPlayers.slice(0, teamSize).sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  return team
})

export const teamB = derived(teamPlayers, ($teamPlayers) => {
  const teamSize = Math.floor($teamPlayers.length / 2)
  const team = $teamPlayers.slice(-teamSize).sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  return team
})

export const teamARating = derived([teamA, split], ([$teamA, $split]) => {
  return $teamA.reduce((accum, cur) => accum + calcLevel(cur, $split), 0)
})

export const teamBRating = derived([teamB, split], ([$teamB, $split]) => {
  return $teamB.reduce((accum, cur) => accum + calcLevel(cur, $split), 0)
})

export const teamATags = derived(teamA, ($teamA) => {
  let usedTags = []
  $teamA.forEach((player) => {
    if (player.tags) {
      usedTags = [...usedTags, ...player.tags]
    }
  })
  const tagCount = usedTags.reduce((group, item) => group.set(item, group.get(item) + 1 || 1), new Map())
  let returnTags = []

  tagCount.forEach((count, tag) => {
    returnTags.push(`${count} ${tag}`)
  })
  return returnTags
})

export const teamBTags = derived(teamB, ($teamB) => {
  let usedTags = []
  $teamB.forEach((player) => {
    if (player.tags) {
      usedTags = [...usedTags, ...player.tags]
    }
  })
  const tagCount = usedTags.reduce((group, item) => group.set(item, group.get(item) + 1 || 1), new Map())
  let returnTags = []

  tagCount.forEach((count, tag) => {
    returnTags.push(`${count} ${tag}`)
  })
  return returnTags
})

export function saveTeams(players) {
  let data = players.slice()
  data = data.map((player, i) => ({ ...player, seq: i + 1 }))
  updatePlayers(data)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

function balance(array, split = 50) {
  const pickAlgorithm = [1, 2, 2, 1]

  const results = [[], []]

  // sort players by ability + a random factor
  array
    .sort((a, b) => {
      return parseFloat(calcLevel(b, split) + Math.random()) - parseFloat(calcLevel(a, split) + Math.random())
    })
    .forEach((player, i) => {
      const team = pickAlgorithm[i % pickAlgorithm.length] - 1
      results[team].push(player)
    })

  return results[0].concat(results[1])
}

function calcLevel(player, split = 50) {
  const { level = 3, fitness = 3 } = player
  const weightedAbility = (level / 100) * (100 - split)
  const weightedFitness = (fitness / 100) * split
  return Math.round(weightedAbility + weightedFitness)
}

function get(store) {
  let value
  const unsubscribe = store.subscribe((s) => (value = s))
  unsubscribe()
  return value
}
