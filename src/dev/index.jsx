import React from 'react'
import { render } from 'react-dom'

import ReactCompassNavigator from '../ReactCompassNavigator.jsx'

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

render(<ReactCompassNavigator directions={directions}/>, document.getElementById('app'))
