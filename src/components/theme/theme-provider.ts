export type Theme = 'dark' | 'light' | 'system'

export const toggleTheme = (theme: Theme) => {
  const classTheme = document.querySelector('body')

  const themes = {
    dark: () => {
      if (!classTheme?.classList.contains('dark')) {
        classTheme?.classList.add('dark')
      }
    },
    light: () => {
      if (classTheme?.classList.contains('dark')) {
        classTheme?.classList.remove('dark')
      }
    },
    system: () => {
      const darkTheme = window.matchMedia('(prefers-color-scheme: dark)')

      darkTheme ? themes.dark() : themes.light()
    }
  }

  if (theme in themes) {
    themes[theme]()
    localStorage.setItem('pizza-shop-theme', theme)
  }
}

export const verifyThemeSystem = () => {
  const theme: string | null = localStorage.getItem('pizza-shop-theme')

  toggleTheme((theme as Theme) || 'system')
}
