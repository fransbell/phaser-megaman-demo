const clamp = (min, max, value) => {
  return Math.min(Math.max(value, min), max)
}
const floor = (value) => {
  return Math.floor(value)
}

const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t
}

module.exports = { clamp, floor, lerp }
