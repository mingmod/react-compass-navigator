import React, { useRef, useEffect } from 'react'
import animate from './animate'

const Scroller = ({ children, onChange }) => {
  const paramScroll = 'scrollLeft'
  const paramSize = 'clientWidth'
  const scrollRef = useRef()
  const scrollRef1 = useRef()
  const speedStepMod = 5
  const speedMod = 20
  let pos = { top: 0, left: 0, x: 0, y: 0 }
  let speed = 0
  let animationTimerID = null

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      // set scroll to center
      scrollRef.current[paramScroll] = scrollRef.current[paramSize]/2

      // remove all timers and event listerners
      return () => {
        stopMouseEvents()
        stopAnimation()
      }
    }
  }, [])

  const speedWatcher = () => {
    if (!scrollRef) return 0
    const halfSize = scrollRef.current[paramSize]/2
    const nextSpeed = parseInt((100/speedStepMod)/halfSize * (halfSize - scrollRef.current[paramScroll]))
    if (speed !== nextSpeed) {
      speed = nextSpeed
    }
  }

  const animationCallback = (nextScrollPosition) => {
    scrollRef.current[paramScroll] = nextScrollPosition
    speedWatcher()
  }

  const stopAnimation = () => {
    if (animationTimerID) clearInterval(animationTimerID)
  }

  const startAnimation = () => {
    stopAnimation()
    if (!scrollRef || !scrollRef.current) return;
    animationTimerID = animate(
      animationCallback,
      scrollRef.current[paramScroll],
      scrollRef.current[paramSize]/2,
      Math.abs(speedMod * speed)
    )
  }

  const stopMouseEvents = () => {
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  const handleScroll = () => {

  }

  const mouseDownHandler = function(e) {
    pos = {
      left: scrollRef.current.scrollLeft,
      top: scrollRef.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    }

    stopAnimation()
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = function(e) {
    scrollRef.current.style.cursor = 'grabbing'
    // How far the mouse has been moved
    const dx = e.clientX - pos.x
    const dy = e.clientY - pos.y

    // Scroll the element
    scrollRef.current.scrollTop = pos.top - dy
    scrollRef.current.scrollLeft = pos.left - dx

    // Watch speed
    speedWatcher()

    // update position
    onChange(dx/4)
  }

  const mouseUpHandler = function() {
    scrollRef.current.style.cursor = 'grab'
    stopMouseEvents()
    startAnimation()
  }

  return (
    <div className='se-compass-navigator__scrollbox'>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='se-compass-navigator__scroll'
        onMouseDown={mouseDownHandler}
      >
        <div ref={scrollRef1} className='se-compass-navigator__scroll-inner'>
          <div className='se-compass-navigator__scroll-center'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scroller
