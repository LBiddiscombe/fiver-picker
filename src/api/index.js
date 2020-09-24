export async function allPlayers() {
  const response = await fetch('/.netlify/functions/fauna-crud')
  const result = await response.json()
  return result.map((item) => ({ ref: item.ref['@ref'].id, name: item.data.name, level: item.data.level }))
}

export async function addPlayer(data) {
  const response = await fetch('/.netlify/functions/fauna-crud', {
    body: JSON.stringify(data),
    method: 'POST',
  })
  const result = await response.json()
  return { ref: result.ref['@ref'].id, name: result.data.name, level: result.data.level }
}

export async function updatePlayer(ref, data) {
  const response = await fetch(`/.netlify/functions/fauna-crud/${ref}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  })
  const result = await response.json()
  return { ref: result.ref['@ref'].id, name: result.data.name, level: result.data.level }
}

export async function deletePlayer(ref) {
  const response = await fetch(`/.netlify/functions/fauna-crud/${ref}`, {
    method: 'DELETE',
  })
  const result = await response.json()
  return result
}
