export const getAirports = () => fetch('./api/airports')
  .then(res => !console.log('airports got') && res.json())

export const getFlights = tripId => fetch(`./api/trip/${tripId}/flights`)
  .then(res => res.json());

export const getTrips = () => fetch(`./api/trips`)
  .then(res => res.json());

export const deleteFlight = (tripId, refId) => fetch(`./api/trip/${tripId}/${refId}`, { method: 'delete' })
  .then(res => res.json())
  .then(res => console.log(res))

export const addFlight = (tripId, from, to) => fetch(`./api/trip/${tripId}/flight`,
  {
    method: 'post',
    headers: { from, to }
  })
  .then(res => res.json())
