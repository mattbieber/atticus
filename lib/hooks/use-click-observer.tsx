import React, { useEffect } from 'react'
import { assertIsTypeNode } from '../utils'
export function useOutsideClickObserver(ref: React.RefObject<HTMLDivElement>) {
 
  
  useEffect(() => {
    
    const onDocumentClick = (event: MouseEvent) => {
      event.preventDefault()
      assertIsTypeNode(event.target)
    //   if (ref.current && !ref.current.contains(event.target)) {
          
    //   }
      
    }

    document.addEventListener('mousedown', onDocumentClick)
    return () => document.removeEventListener('mousedown', onDocumentClick)
  }, [ref])
}
