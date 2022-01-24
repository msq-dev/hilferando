function randomValueBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateAppointment(day) {
  const startHelping = randomValueBetween(7, 16)

  const appointmentStart = new Date(day).setHours(startHelping, 0, 0, 0)
  const calculateEnd = appointmentStart + randomValueBetween(3, 6) * 60 * 60 * 1000
  const appointmentEnd = new Date(calculateEnd)

  return [new Date(appointmentStart), new Date(appointmentEnd)]
}

function generateAvailableTimes(amount) {
  const now = new Date().getTime()
  const fourWeeksLater = now + (28 * 24 * 60 * 60 * 1000)

  let times = []

  for (let i = 0; i < amount; i++) {
    let start = randomValueBetween(now, fourWeeksLater)

    while (times.some((d) => d[0].toDateString() === new Date(start).toDateString())) {
      start = randomValueBetween(now, fourWeeksLater)
    }
    let date = generateAppointment(start)
    times.push(date)
  }

  return times
}


export { generateAvailableTimes }
