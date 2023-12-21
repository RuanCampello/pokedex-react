import Badge from './badge'

interface MachineMovesProps {
  name: string
  machineType: string
  machineNumber: number
  text: string
  accuracy: number
  classImage: string
  classColour: string
  classTitle: string
  elementalImage: string
  elementalColour: string
  elementalTitle: string
}

export default function MachineMoves({name, accuracy, machineType, machineNumber, text, classColour, classImage, classTitle, elementalTitle, elementalColour, elementalImage}: MachineMovesProps) {
  const formattedMachineNumber = machineNumber < 10 ? `0${machineNumber}` : machineNumber
  return (
    <div className='flex flex-col my-2 gap-1 mx-2 sm:mb-4 mb-7'>
      <div className='grid grid-cols-5 items-center'>
        <span className='col-span-2 capitalize sm:leading-7 sm:text-[17px] text-[22px] font-medium'>{name}</span>
        <div className='flex justify-center gap-1'>
          <Badge background={classColour} imageUrl={classImage} title={classTitle}/>
          <Badge background={elementalColour} imageUrl={elementalImage} title={elementalTitle}/>
        </div>
        <div className={`col-span-2 sm:text-sm items-center text-lg text-slate-700 border-slate-700 border-2 rounded-full sm:w-28 w-32 justify-center flex justify-self-end`}>
          <div className='w-[55px] flex justify-center'>
            <span className={`${machineType ? 'uppercase' : 'lowercase'}`}>{machineType || 'n/a'}</span>
            <span>{machineType && formattedMachineNumber}</span>
          </div>
          <div className='sm:h-6 h-7 w-[2px] bg-slate-700'></div>
          <span className='w-[55px] flex justify-center'>
            {accuracy ? `${accuracy}%` : 'n/a'}
          </span>
        </div>
      </div>
      <span className='text-slate-500 sm:text-sm text-lg text-justify'>{text}</span>
    </div>
  )
}