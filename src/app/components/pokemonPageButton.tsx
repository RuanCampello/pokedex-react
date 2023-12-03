import { useRecoilState } from 'recoil'
import { view } from '@/atoms/view'

interface PageButtonProps {
  text: string
  pageView: string
}

export default function PokemonPageButton({text, pageView}: PageButtonProps) {
  const [currentView, setView] = useRecoilState(view)
  return (
    <button className='pb-4' onClick={() => setView(pageView)}>
      {text}
    </button>
  )
}