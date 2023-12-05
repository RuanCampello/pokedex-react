import { useRecoilState } from 'recoil'
import { view } from '@/atoms/view'

interface PageButtonProps {
  text: string
  pageView: string
}

export default function PokemonPageButton({text, pageView}: PageButtonProps) {
  const [currentView, setView] = useRecoilState(view)
  return (
    <button className={`pb-4 px-2 sm:border-b-2 border-b-4 mb-4 ${currentView === pageView? 'border-slate-800' : 'border-transparent'}`} onClick={() => setView(pageView)}>
      {text}
    </button>
  )
}