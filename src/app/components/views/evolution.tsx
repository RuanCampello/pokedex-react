interface EvolutionDetail {
  trigger: {
    name: string
  }
  item?: {
    name: string
  }
}

interface Evolution {
  species: {
    name: string
  }
  evolution_details: EvolutionDetail[]
}

export interface EvolutionChain {
  id: number
  baby_trigger_item?: {
    name: string
  }
  chain: {
    evolves_to: Evolution[]
    species: {
      name: string
    }
  }
}

interface EvolutionProps {
  evolutionData: EvolutionChain[]
}

export default function Evolution({ evolutionData }: EvolutionProps) {
  const pokemonNames = evolutionData.map((chain) => [
    chain.chain.species.name,
    ...chain.chain.evolves_to.map((evolution) => evolution.species.name),
  ])  
  return (
    <div>
      <ul>
        {
          pokemonNames.map((name, i) => {
            return (
              <li key={i}>{name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}
