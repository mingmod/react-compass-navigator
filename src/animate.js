const animate = (cb, from, to, time) => {
  const start = new Date().getTime()
  const timer = setInterval(() => {
    const step = Math.min(1, (new Date().getTime() - start) / time)
      cb((from + step * (to - from)))
      if (step === 1) clearInterval(timer)
    },
  25)
  // cb(from)
  return timer
}

export default animate
