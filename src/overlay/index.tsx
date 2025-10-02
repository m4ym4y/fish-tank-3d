import './Overlay.css'
import Toolbar from './Toolbar'

import queryString from 'query-string'
import * as util from '../util'

function Overlay() {
  const qParams = queryString.parse(location.search)
  const viewMode = util.getQParam(qParams, "view") 

  return <div id="overlay">
    {viewMode ? <></> : <Toolbar />}
  </div>
}

export default Overlay
