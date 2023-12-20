export type MoveType = {
  accuracy: number
  name: string
  type: {
    name: string
    url: string
  }
  contest_combos: {
    normal: {
      use_after: {
        name: string
        url: string
      }[] | null
      use_before: null
    }
    super: {
      use_after: null
      use_before: null
    }
  }
  machines: {
    machine: {
      url: string
    }
  }[]
  contest_effect: {
    url: string
  }
  contest_type: {
    name: string
    url: string
  }
  damage_class: {
    name: string
    url: string
  }
  effect_chance: number | null
  effect_changes: any[]
  effect_entries: {
    effect: string
    language: {
      name: string
      url: string
    }
    short_effect: string
  }[]
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
  level_learned_at?: number
  tm: Tm
}
export type Tm = {
  id: number
  item: {
    name: string
    url: string
  }
}