'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// VIP Mexican Wedding Theme Context
const VIPMexicanThemeContext = React.createContext({
  currentPalette: 'tricolor',
  eleganceLevel: 'vip',
  culturalElements: true,
})

export interface VIPMexicanThemeProviderProps extends ThemeProviderProps {
  palette?: 'tricolor' | 'emerald' | 'wine' | 'gold'
  eleganceLevel?: 'classic' | 'elegant' | 'vip' | 'premium'
  culturalElements?: boolean
}

export function ThemeProvider({ 
  children, 
  palette = 'tricolor',
  eleganceLevel = 'vip',
  culturalElements = true,
  ...props 
}: VIPMexicanThemeProviderProps) {
  const vipThemeValue = React.useMemo(() => ({
    currentPalette: palette,
    eleganceLevel,
    culturalElements,
  }), [palette, eleganceLevel, culturalElements])

  return (
    <VIPMexicanThemeContext.Provider value={vipThemeValue}>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </VIPMexicanThemeContext.Provider>
  )
}

export const useVIPMexicanTheme = () => {
  const context = React.useContext(VIPMexicanThemeContext)
  if (!context) {
    throw new Error('useVIPMexicanTheme must be used within a VIPMexicanThemeProvider')
  }
  return context
}
