'use client'
import { useState } from "react"
import Pokemon from "./pokemon"

export default function Pokedex() {
  const [query, setQuery] = useState(String)
  return (
    <div>
      <Pokemon name={'55'}/>
    </div>
  )
}