import Badge from './badge'

interface LevelUpMovesProps {
  elementalColour: string
  classColour: string
  classImage: string
  levelLearned: number
  accuracy: number
  name: string
  damageClass: string
  elementalType: string
  typeImage: string
  text: string
}

export default function LevelUpMoves({elementalColour, classColour, classImage, elementalType,levelLearned, damageClass, typeImage, accuracy, name, text}: LevelUpMovesProps) {
  return (
    <div className='flex flex-col my-2 gap-1 sm:mb-4 mb-7'>
      <div className='grid grid-cols-5 mx-2 items-center'>
        <div className='col-span-2'>
          <span className='capitalize sm:leading-7 sm:text-[17px] text-[22px] font-medium'>{name}</span>
        </div>
        <div className='flex gap-1 justify-center'>
          <Badge background={classColour} title={damageClass} imageUrl={classImage} />
          <Badge background={elementalColour} title={elementalType} imageUrl={typeImage} />
        </div>
        <div className={`col-span-2 sm:text-sm items-center text-lg text-slate-700 border-slate-700 border-2 rounded-full sm:w-28 w-32 justify-center flex justify-self-end`}>
          <span className='w-[55px] flex justify-center'>
            {levelLearned! > 0 ? `Lv.${levelLearned}` : `n/a`}
          </span>
          <div className='sm:h-6 h-7 w-[2px] bg-slate-700'></div>
          <span className='w-[55px] flex justify-center'>
            {accuracy ? `${accuracy}%` : 'n/a'}
          </span>
        </div>
      </div>
      <span className={`sm:text-sm text-lg text-justify  mx-2 mb-2 text-slate-500`}>
        {text}
      </span>
    </div>
  )
}