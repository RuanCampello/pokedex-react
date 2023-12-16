import { transformStatName } from '@/app/utils';
import Line from '../line';
import { Stat } from '../types/pokemonType';

interface BaseStatsProps {
  stats: Stat[]
  colour: string
}

export default function BaseStats({stats, colour}: BaseStatsProps) {
  let total = 0
  return (
    <div className='sm:text-base text-lg'>
        {
          stats.map((stat, i) => {
            total += stat.base_stat 
            return (
              <div key={i} className='grid grid-cols-7 items-center gap-4 space-y-2'>
                <p className='capitalize col-span-2 text-slate-500'>{transformStatName(stat.stat.name)}</p>
                <p className='text-end sm:font-normal font-medium'>{stat.base_stat}</p>
                <Line colour={colour} widthValue={stat.base_stat}/>
              </div>
            )
          })
        }
        <div className='grid grid-cols-7 items-center gap-4 space-y-2'>
          <p className='capitalize col-span-2 text-slate-500'>Total</p>
          <p className='text-end sm:font-normal font-medium'>{total}</p>
          <Line colour={colour} widthValue={total/6}/>
        </div>
    </div>
  )
}