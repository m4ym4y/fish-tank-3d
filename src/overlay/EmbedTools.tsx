import { useState } from 'react'
import './EmbedTools.css'
import { useAppSelector } from '../state/hooks.ts'
import * as util from '../util'
import queryString from 'query-string'

function EmbedTools() {
  const [ popupVisible, setPopupVisible ] = useState(false)
  const arrangement = useAppSelector(state => state.editor.arrangement)

  const serialized = util.serializeArrangement(arrangement)
  const qParams = queryString.parse(location.search)
  const url = URL.parse(location.href) as URL

  qParams.arrangement = serialized
  qParams.view = 'true'
  url.search = queryString.stringify(qParams)

  return <div className="overlay-popup-tool embed-popup-button">
    <div className={`embed-popup ${popupVisible ? 'show' : ''}`} >
      <div className="embed-popup-tools">
        <button>Copy to Clipboard</button>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => setPopupVisible(false)}>X</button>
      </div>
      <textarea readOnly>
        {`<iframe width="400" height="300" src="${url.href}" />`}
      </textarea>
    </div>
    <button onClick={() => setPopupVisible(!popupVisible)}>Embed</button>
  </div>
}

export default EmbedTools
