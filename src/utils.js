export function shuffle(array) {
  const results = [[], []]
  const teamSize = Math.ceil(array.length / 2)

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export function balance(array) {
  const pickAlgorithm = [1, 2, 2, 1]

  const results = [[], []]

  // sort players by ability + a random factor
  array
    .sort((a, b) => {
      return parseFloat(a.level + Math.random()) - parseFloat(b.level + Math.random())
    })
    .forEach((player, i) => {
      const team = pickAlgorithm[i % pickAlgorithm.length] - 1
      results[team].push(player)
    })

  return results[0].concat(results[1])
}
