import './Overlay.css'
import Toolbar from './Toolbar'

import queryString from 'query-string'
import * as util from '../util'
import KeyControl from './KeyControl'

function Overlay() {
  const qParams = queryString.parse(location.search)
  const viewMode = util.getQParam(qParams, "view") 

  return <div id="overlay">
    {viewMode ? <></> : <>
      <KeyControl />
      <Toolbar />
    </>}
  </div>
}

export default Overlay
