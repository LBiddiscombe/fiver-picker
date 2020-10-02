export async function allPlayers(group) {
  const response = await fetch(`/.netlify/functions/player-crud?group=${group}`)
  const result = await response.json()
  return result.map((item) => {
    return format(item)
  })
}

export async function addPlayer(data) {
  const response = await fetch('/.netlify/functions/player-crud', {
    body: JSON.stringify(data),
    method: 'POST',
  })
  const result = await response.json()
  return format(result)
}

export async function updatePlayer(ref, data) {
  const response = await fetch(`/.netlify/functions/player-crud/${ref}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  })
  const result = await response.json()
  return format(result)
}

export async function updatePlayers(data) {
  const response = await fetch(`/.netlify/functions/player-crud`, {
    body: JSON.stringify(data),
    method: 'PUT',
  })
  const result = await response.json()
  return allPlayers()
}

export async function deletePlayer(ref) {
  const response = await fetch(`/.netlify/functions/player-crud/${ref}`, {
    method: 'DELETE',
  })
  const result = await response.json()
  return result
}

function format(result) {
  return {
    ref: result.ref['@ref'].id,
    ...result.data,
  }
}
