import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import DirectionItem from './DirectionItem.jsx'
import Scroller from './Scroller.jsx'
import loopIndex from './loopIndex'
import { defaultDirectionFactory } from './factories.jsx'

import './master.scss'
const ReactCompassNavigator = ({ directions, directionFactory, visibleCount }) => {

  const genItems = size => Array.from(Array(size+1).keys())

  const [position, setPosition] = useState(0)
  const [items, setItems] = useState(genItems(visibleCount))
  const [activeDirection, setActiveDirection] = useState(genItems(visibleCount))

  const mapper = (currentItem) => {
    return directionFactory(directions, currentItem)
  }

  const handleChange = (posChange) => {
    setPosition(posChange + position)
  }

  return (
    <div className='se-compass-navigator'>
      <div className='se-compass-navigator__directions'>
        {items.map(item => (
          <DirectionItem
            key={item}
            gid={item}
            mapper={mapper}
            position={position}
            visibleCount={visibleCount}
          />
        ))}
      </div>
      <Scroller onChange={handleChange} />
    </div>
  )
}

ReactCompassNavigator.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
  directionFactory: PropTypes.func,
  onChange: PropTypes.func,
  changeThrottle: PropTypes.number,
  visibleCount: PropTypes.number,
}

ReactCompassNavigator.defaultProps = {
  directionFactory: defaultDirectionFactory,
  onChange: (key, value) => {},
  changeThrottle: 256,
  visibleCount: 3
}

export default ReactCompassNavigator
