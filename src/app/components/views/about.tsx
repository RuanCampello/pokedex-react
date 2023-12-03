import { convertKgToPounds, convertMetersToFeetAndInches, sanitizeAndCapitalizeSentences } from '@/app/utils'

interface AboutProps {
  description: string
  height: number
  weight: number
  abilities: { name: string; isHidden: boolean }[];
}

export default function About({description, height, weight, abilities}: AboutProps) {  
  return (
    <div className='w-full text-slate-600'>
      <p className='text-[15px] text-justify italic'>
        {sanitizeAndCapitalizeSentences(description)}
      </p>
      <div className='grid grid-cols-2 mt-8'>
        <div className='space-y-4'>
          <p>Height</p>
          <p>Weight</p>
          <p>Abilities</p>
        </div>
        <div className='text-slate-800 space-y-4 font-medium text-start'>
          <div className='gap-2 justify-between flex'>
            <span>{height/10}m</span>
            <span className='text-slate-600 font-normal'>({convertMetersToFeetAndInches(height/10)})</span>
          </div>
          <div className='gap-2 justify-between flex'>
            <span>{weight/10}m</span>
            <span className='text-slate-600 font-normal'>({convertKgToPounds(weight/10)})</span>
          </div>
          <ul>
            {abilities.map((ability, index) => (
              <div className='flex justify-between items-center' key={index}>
                {/* <span className='font-normal'>{index+1}.</span> */}
                {ability.name}
                {ability.isHidden ? 
                  <span className='text-xs bg-slate-800 text-platinum px-2 p-1 rounded-full'>hidden</span>
                : null}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}