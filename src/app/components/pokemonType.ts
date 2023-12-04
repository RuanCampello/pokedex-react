type VersionSprites = {
  back_default: string
  back_female: string | null
  back_shiny: string
  back_shiny_female: string | null
  front_default: string
  front_female: string | null
  front_shiny: string
  front_shiny_female: string | null
  animated?: {
    back_default: string
    back_female: string | null
    back_shiny: string
    back_shiny_female: string | null
    front_default: string
    front_female: string | null
    front_shiny: string
    front_shiny_female: string | null
  }
}

type GenerationSprites = {
  'black-white': VersionSprites
}

type Versions = {
  'generation-v': GenerationSprites
}
export interface Stat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  order: number
  is_default: boolean
  species: {
    name: string
    url: string
  }
  abilities: {
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }[]
  forms: {
    name: string
    url: string
  }[]
  game_indices: {
    game_index: number
    version: {
      name: string
      url: string
    }
  }[]
  held_items: {
    item: {
      name: string
      url: string
    }
    version_details: {
      rarity: number
      version: {
        name: string
        url: string
      }
    }[]
  }[]
  location_area_encounters: string
  moves: {
    move: {
      name: string
      url: string
    }
    version_group_details: {
      level_learned_at: number
      version_group: {
        name: string
        url: string
      }
      move_learn_method: {
        name: string
        url: string
      }
    }[]
  }[]
  sprites: {
    back_default: string
    back_female: string | null
    back_shiny: string
    back_shiny_female: string | null
    front_default: string
    front_female: string | null
    front_shiny: string
    front_shiny_female: string | null
    other: {
      dream_world: {
        front_default: string
        front_female: string | null
      }
      official_artwork: {
        front_default: string
      }
    }
    versions: Versions
  }
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}
