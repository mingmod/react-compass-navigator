import React from 'react'
import { render } from 'react-dom'

import ReactCompassNavigator from '../ReactCompassNavigator.jsx'

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

const handleChange = (key, value) => {
  console.log(key, value);
}

render(<ReactCompassNavigator directions={directions} onChange={handleChange}/>, document.getElementById('app'))
