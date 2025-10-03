import * as util from '../util'
import { useEffect } from 'react'

import {
  loadArrangement
} from '../editor/editorSlice'
import { useAppDispatch } from '../state/hooks.ts'

function HistoryNavigation() {
  const dispatch = useAppDispatch()
  const loadArrangementFromUrl = () => {
    dispatch(loadArrangement(util.loadUrlArrangement()))
  }

  useEffect(() => {
    window.addEventListener('popstate', loadArrangementFromUrl)
    return () => {
      window.removeEventListener('popstate', loadArrangementFromUrl)
    }
  }, [])

  return <div></div>
}

export default HistoryNavigation
