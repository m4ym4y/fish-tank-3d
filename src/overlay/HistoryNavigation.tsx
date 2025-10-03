import { useEffect } from 'react'

import {
  loadArrangementFromUrl
} from '../editor/editorSlice'
import { useAppDispatch } from '../state/hooks.ts'

function HistoryNavigation() {
  const dispatch = useAppDispatch()
  const loadArrangement = () => {
    console.log("Load arrangement from URL")
    dispatch(loadArrangementFromUrl())
  }

  useEffect(() => {
    window.addEventListener('popstate', loadArrangement)
    return () => {
      window.removeEventListener('popstate', loadArrangement)
    }
  }, [])

  return <div></div>
}

export default HistoryNavigation
