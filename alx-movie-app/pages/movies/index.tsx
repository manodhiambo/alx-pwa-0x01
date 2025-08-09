import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface MProps {
  movies: MoviesProps[]
}

const Movies: React.FC<MProps> = () => {
  const [page, setPage] = useState<number>(1)
  const [year, setYear] = useState<number | null>(null)
  const [genre, setGenre] = useState<string>("All")
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchMovies = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/fetch-movies', {
        method: 'POST',
        body: JSON.stringify({
          page,
          year, 
          genre: genre === "All" ? "" : genre
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API Error:', data)
        
        // Handle specific error cases
        if (response.status === 429) {
          alert('Rate limit exceeded. Please wait a moment before trying again.')
        } else if (response.status === 403) {
          alert('API access forbidden. Please check your API key and subscription.')
        } else if (response.status === 401) {
          alert('Unauthorized. Please check your API key.')
        } else {
          alert(`Error: ${data.error || 'Something went wrong'}`)
        }
        
        setMovies([])
        return
      }

      const results = data.movies
      console.log('Movies received:', results?.length || 0)
      setMovies(results || [])
    } catch (error) {
      console.error('Network error fetching movies:', error)
      alert('Network error. Please check your internet connection and try again.')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }, [page, year, genre])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => 
              setYear(event.target.value ? Number(event.target.value) : null)
            }
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto text-black"
          >
            <option value="">Select Year</option>
            {
              [2024, 2023, 2022, 2021, 2020, 2019].map((yearOption: number) => (
                <option value={yearOption} key={yearOption}>{yearOption}</option>
              ))
            }
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || new Date().getFullYear()} {genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {
              ['All', 'Animation', 'Comedy', 'Fantasy'].map((genreOption: string, key: number) => (
                <Button 
                  title={genreOption} 
                  key={key} 
                  action={() => setGenre(genreOption)} 
                />
              ))
            }
          </div>
        </div>

        {/* Movies output */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {
            movies?.map((movie: MoviesProps, key: number) => (
              <MovieCard
                title={movie?.titleText?.text || 'Unknown Title'}
                posterImage={movie?.primaryImage?.url || '/placeholder-movie.jpg'}
                releaseYear={movie?.releaseYear?.year?.toString() || 'Unknown'}
                key={key}
              />
            ))
          }
        </div>

        {movies.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No movies found. This could be due to:
            </p>
            <ul className="text-lg text-gray-500 mt-4 space-y-2">
              <li>• API rate limits (try again in a few minutes)</li>
              <li>• Invalid API key configuration</li>
              <li>• Network connectivity issues</li>
              <li>• No results for current filters</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              Check the browser console for more details.
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Button 
            title="Previous" 
            action={() => setPage(prev => prev > 1 ? prev - 1 : 1)} 
          />
          <Button 
            title="Next" 
            action={() => setPage(page + 1)} 
          />
        </div>
      </div>
      {
        loading && <Loading />
      }
    </div>
  )
}

export default Movies;
