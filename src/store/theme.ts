import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Theme = 'light' | 'dark'

// eu nao tenho a mais remota noção de se isso ta certo ou nao
const baseThemeAtom =
  atomWithStorage<Theme>('theme', 'dark')

export const themeAtom = atom(
  (get) => get(baseThemeAtom),
  (get, set, newValue: Theme) => {
    const currentValue = get(baseThemeAtom)
    console.log('removendo ', currentValue)
    const d = document.documentElement
    console.log('adicionando ', newValue)

    d.classList.remove(currentValue)
    d.classList.add(newValue)
    set(baseThemeAtom, newValue)
  }
)

