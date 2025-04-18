import { useState, useEffect } from 'react'
import PokemonCard from './components/PokemonCard'
import SearchBar from './components/SearchBar'
import PokemonDetails from './components/PokemonDetails'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await response.json()
        setPokemons(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching pokemons:', error)
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl">
        {/* Pokedex Frame */}
        <div className="relative bg-[#e60012] rounded-[40px] p-8 shadow-2xl">
          {/* Top Screen */}
          <div className="bg-black rounded-[30px] p-6 mb-8">
            <div className="bg-[#1a1a1a] rounded-[20px] p-4 h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
              ) : (
                <div className="grid grid-cols-3 gap-4 w-full">
                  {filteredPokemons.map((pokemon, index) => (
                    <PokemonCard
                      key={index}
                      pokemon={pokemon}
                      onClick={() => setSelectedPokemon(pokemon)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg"></div>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg"></div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 flex-1 mx-8">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="flex space-x-6">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg"></div>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-6 left-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-6 right-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-6 right-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
        </div>

        {selectedPokemon && (
          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
