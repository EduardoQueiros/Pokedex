import { useState, useEffect } from 'react'

const PokemonDetails = ({ pokemon, onClose }) => {
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#e60012] rounded-[40px] p-8 max-w-md w-full">
          <div className="bg-black rounded-[30px] p-6">
            <div className="animate-pulse">
              <div className="h-48 bg-[#2a2a2a] rounded-xl"></div>
              <div className="h-6 bg-[#2a2a2a] rounded mt-6 w-3/4"></div>
              <div className="h-4 bg-[#2a2a2a] rounded mt-4 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pokemonData) return null

  const mainType = pokemonData.types[0].type.name
  const bgColor = typeColors[mainType] || 'bg-gray-500'

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#e60012] rounded-[40px] p-8 max-w-md w-full relative">
        {/* Decorative Elements */}
        <div className="absolute top-6 left-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-6 right-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-6 left-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-6 right-6 w-6 h-6 bg-yellow-400 rounded-full"></div>

        <div className="bg-black rounded-[30px] p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">{pokemon.name}</h2>
              <div className="flex gap-2 mt-2">
                {pokemonData.types.map((type, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full text-white font-medium capitalize ${
                      typeColors[type.type.name] || 'bg-gray-500'
                    }`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemon.name}
              className="h-32 w-32 object-contain transform hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#2a2a2a] rounded-xl p-4">
              <h3 className="text-white/80 text-sm mb-1">Height</h3>
              <p className="text-white text-lg">{pokemonData.height / 10}m</p>
            </div>
            <div className="bg-[#2a2a2a] rounded-xl p-4">
              <h3 className="text-white/80 text-sm mb-1">Weight</h3>
              <p className="text-white text-lg">{pokemonData.weight / 10}kg</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-medium mb-2">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemonData.abilities.map((ability, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-[#2a2a2a] text-white capitalize"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">Stats</h3>
            <div className="space-y-2">
              {pokemonData.stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-20 text-white/80 text-sm capitalize">{stat.stat.name}</span>
                  <div className="flex-1 bg-[#2a2a2a] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${bgColor}`}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-right text-white text-sm">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails 