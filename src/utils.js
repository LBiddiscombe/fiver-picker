export function shuffle(array) {
  const results = [[], []]
  const teamSize = Math.ceil(array.length / 2)

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export function balance(array, split = 5) {
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
      console.log(player.name, calcLevel(player, split))
    })

  return results[0].concat(results[1])
}

export function calcLevel(player, split = 50) {
  const { level = 3, fitness = 3 } = player
  const weightedAbility = (level / 100) * (100 - split)
  const weightedFitness = (fitness / 100) * split
  return Math.round(weightedAbility + weightedFitness)
}
