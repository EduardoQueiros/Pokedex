import { useState, useEffect } from 'react'

const PokemonCard = ({ pokemon, onClick }) => {
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        setPokemonData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching pokemon data:', error)
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [pokemon.url])

  if (loading) {
    return (
      <div className="bg-[#2a2a2a] rounded-lg p-3 animate-pulse">
        <div className="h-24 bg-[#333333] rounded"></div>
        <div className="h-4 bg-[#333333] rounded mt-2 w-3/4 mx-auto"></div>
      </div>
    )
  }

  if (!pokemonData) return null

  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  }

  return (
    <div 
      className={`bg-[#2a2a2a] rounded-lg p-3 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isHovered ? 'shadow-lg' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center">
        <img 
          src={pokemonData.sprites.front_default} 
          alt={pokemon.name}
          className="h-24 w-24 object-contain transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-sm font-bold text-white capitalize">{pokemon.name}</h3>
        <div className="flex justify-center gap-1 mt-1">
          {pokemonData.types.map((type, index) => (
            <span 
              key={index}
              className={`px-2 py-0.5 text-xs rounded-full text-white font-medium capitalize ${
                typeColors[type.type.name] || 'bg-gray-500'
              }`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="text-xs text-white/60 mt-1">
          #{pokemonData.id.toString().padStart(3, '0')}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard 