const clamp = (min, max, value) => {
  return Math.min(Math.max(value, min), max)
}
const floor = (value) => {
  return Math.floor(value)
}

module.exports = { clamp, floor }
