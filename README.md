# CineSeek Movie App - Complete File Structure

## 1. README.md (Task 0)

# CineSeek - Movie Discovery Application

## API Overview
The MoviesDatabase API is a comprehensive collection of movie, TV show, and actor information. It provides complete and updated data for over 9 million titles (movies, series, and episodes) and 11 million actors/crew members. The API includes features like YouTube trailer URLs, awards information, full biographies, and many other useful details. Recent titles are updated weekly, while ratings and episode information are updated daily.

## Version
v1 (current)

## Available Endpoints

- **/titles** - Returns an array of titles according to filter/sorting parameters
- **/titles/{id}** - Returns a specific title by IMDB ID
- **/titles/{id}/ratings** - Returns title rating and vote count
- **/titles/series/{seriesId}** - Returns array of episodes for a series
- **/titles/seasons/{seriesId}** - Returns number of seasons for a series
- **/titles/episode/{id}** - Returns episode details
- **/titles/random** - Returns random titles
- **/titles/x/upcoming** - Returns upcoming titles
- **/titles/search/keyword/{keyword}** - Search titles by keyword
- **/titles/search/title/{title}** - Search titles by title
- **/actors** - Returns array of actors
- **/actors/{id}** - Returns specific actor details

## Request and Response Format

### Request Structure
All endpoints accept optional query parameters:
- `info`: Specifies information level (base_info, mini_info, image, etc.)
- `limit`: Number of objects per page (max 50, default 10)
- `page`: Page number (default 1)
- `year`: Filter by specific year
- `genre`: Filter by genre (case sensitive, capitalized)
- `sort`: Sort results (year.incr, year.decr)

### Response Structure
All endpoints return an object with a 'results' key containing the data array. Paginated endpoints include additional keys:
```json
{
  "results": [...],
  "page": 1,
  "next": "next_page_url",
  "entries": 100
}
```

## Authentication
The API uses RapidAPI key authentication:
- Header: `x-rapidapi-key: YOUR_API_KEY`
- Header: `x-rapidapi-host: moviesdatabase.p.rapidapi.com`

## Error Handling
Common error responses:
- **400 Bad Request**: Invalid parameters
- **401 Unauthorized**: Invalid API key
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

Handle errors by checking response status and implementing try-catch blocks in your code.

## Usage Limits and Best Practices
- Rate limiting applies based on subscription plan
- Use pagination for large datasets (max 50 items per request)
- Cache responses when appropriate to reduce API calls
- Use specific `info` parameters to get only needed data
- Implement proper error handling and loading states
- Store API keys securely in environment variables
```

## 2. package.json

{
  "name": "alx-movie-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-brands-svg-icons": "^6.4.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

## 3. tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 4. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'themebeyond.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
```

## 5. .gitignore

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## 6. .env.local

```
MOVIE_API_KEY=YOUR_RAPIDAPI_KEY_HERE
```

## 7. interfaces/index.ts

```typescript
import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

export interface MovieProps {
  id?: string
  posterImage: string
  releaseYear: string
  title: string
}

interface PrimaryImage {
  url: string
}

interface TitleText {
  text: string
}

interface ReleaseYear {
  year: string
}

export interface MoviesProps {
  id: string
  primaryImage: PrimaryImage
  titleText: TitleText
  releaseYear: ReleaseYear
}
```

## 8. components/commons/Button.tsx

```typescript
import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <button 
      onClick={action} 
      className="px-8 py-2 border-2 border-[#E2D609] rounded-full hover:bg-[#E2D609] hover:text-black transition-colors duration-300"
    >
      {title}
    </button>
  )
}

export default Button;
```

## 9. components/commons/Loading.tsx

```typescript
const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4 animate-pulse">
          Loading...
        </h1>
        <p className="text-lg text-gray-300">
          Please wait, we&apos;re getting next set of movies ready for you.
        </p>
      </div>
    </div>
  );
};

export default Loading;
```

## 10. components/commons/MovieCard.tsx

```typescript
import { MovieProps } from "@/interfaces"
import Image from "next/image"

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="h-[563px]">
      <div>
        <Image 
          className="h-[430px] w-full rounded-md hover:cursor-pointer object-cover" 
          src={posterImage || '/placeholder-movie.jpg'} 
          width={300} 
          height={430} 
          alt={title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-movie.jpg';
          }}
        />
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold truncate mr-2">{title}</p>
        <p className="text-xl text-[#E2D609] flex-shrink-0">{releaseYear}</p>
      </div>
    </div>
  )
}

export default MovieCard
```

## 11. components/layouts/Header.tsx

```typescript
import Link from "next/link"
import Button from "../commons/Button"

const Header: React.FC = () => {
  return (
    <header className="h-28 flex items-center bg-[#171D22] px-4 md:px-16 lg:px-44 text-white">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl md:text-4xl font-semibold">
          Cine<span className="text-[#E2D609]">Seek</span>
        </h2>
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          <Link 
            href="/" 
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            Home
          </Link>
          <Link 
            href="/movies" 
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            Movies
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            Contact
          </Link>
        </nav>
        <div className="flex md:hidden">
          <Button title="Sign in" />
        </div>
        <div className="hidden md:flex">
          <Button title="Sign in" />
        </div>
      </div>
    </header>
  )
}

export default Header
```

## 12. components/layouts/Footer.tsx

```typescript
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171D22] text-white py-10 px-6 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {/* Footer Logo */}
        <h2 className="text-xl md:text-4xl font-semibold mb-4 md:mb-0">
          Cine<span className="text-[#E2D609]">Seek</span>
        </h2>

        <nav className="flex-1 flex justify-center space-x-6 mb-4 md:mb-0">
          <Link 
            href="/" 
            className="hover:text-[#E2D609] text-lg transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            href="/movies" 
            className="hover:text-[#E2D609] text-lg transition-colors duration-300"
          >
            Movies
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-[#E2D609] text-lg transition-colors duration-300"
          >
            Contact
          </Link>
          <Link 
            href="/privacy" 
            className="hover:text-[#E2D609] text-lg transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </nav>

        <div className="flex space-x-4">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#E2D609] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#E2D609] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#E2D609] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 CineSeek. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
```

## 13. components/layouts/Layout.tsx

```typescript
import { ComponentProps } from "@/interfaces";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

export default Layout;
```

## 14. pages/_app.tsx

```typescript
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

## 15. pages/index.tsx

```typescript
import Button from "@/components/commons/Button";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-[#171D22] text-white">
      <section
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://themebeyond.com/html/movflx/img/bg/breadcrumb_bg.jpg")',
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Discover Your Next Favorite{" "}
            <span className="text-[#E2D609]">Movie</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            Explore the latest blockbuster movies, critically acclaimed films,
            and your personal favorites – all in one place.
          </p>
          <Button
            title="Browse Movies"
            action={() => router.push("/movies", undefined, { shallow: false })}
          />
        </div>
      </section>

      <section className="py-16 px-8 md:px-44 bg-[#121018] text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">
          Join CineSeek Now!
        </h2>
        <p className="text-lg md:text-2xl mb-12">
          Sign up today to get access to the latest movies, exclusive content,
          and personalized movie recommendations.
        </p>
        <Button title="Get Started" />
      </section>
    </div>
  );
};

export default Home;
```

## 16. pages/movies/index.tsx

```typescript
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

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      const data = await response.json()
      const results = data.movies
      console.log(results)
      setMovies(results || [])
    } catch (error) {
      console.error('Error fetching movies:', error)
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
            <p className="text-xl text-gray-400">No movies found. Try adjusting your filters.</p>
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
```

## 17. pages/api/fetch-movies.ts

```typescript
import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;
      const currentYear = new Date().getFullYear();
      const apiKey = process.env.MOVIE_API_KEY;

      if (!apiKey) {
        return response.status(500).json({
          error: "API key not configured"
        });
      }

      // Build URL with proper parameters
      let url = `https://moviesdatabase.p.rapidapi.com/titles?`;
      const params = new URLSearchParams({
        year: (year || currentYear).toString(),
        sort: 'year.decr',
        limit: '12',
        page: page.toString()
      });

      if (genre && genre !== 'All') {
        params.append('genre', genre);
      }

      url += params.toString();

      const resp = await fetch(url, {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results || [];

      return response.status(200).json({
        movies,
        page: moviesResponse.page || 1,
        total: moviesResponse.entries || 0
      });

    } catch (error) {
      console.error('API Error:', error);
      return response.status(500).json({
        error: "Failed to fetch movies",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
```

## 18. styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #171D22;
}

::-webkit-scrollbar-thumb {
  background: #E2D609;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c9c008;
}
```

## 19. .eslintrc.json

```json
{
  "extends": "next/core-web-vitals"
}
```

## Installation and Setup Instructions

1. **Create the project directory:**
   ```bash
   mkdir alx-project-0x14
   cd alx-project-0x14
   ```

2. **Initialize Next.js project:**
   ```bash
   npx create-next-app@latest alx-movie-app --typescript --eslint --tailwind
   cd alx-movie-app
   ```

3. **Install additional dependencies:**
   ```bash
   npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/fontawesome-svg-core
   ```

4. **Create the directory structure and files as shown above**

5. **Set up environment variables:**
   - Create `.env.local` file
   - Add your RapidAPI key: `MOVIE_API_KEY=your_api_key_here`

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Features Implemented

- ✅ Responsive movie discovery application
- ✅ Next.js 14 with TypeScript
- ✅ Tailwind CSS styling
- ✅ MoviesDatabase API integration
- ✅ Movie filtering by year and genre
- ✅ Pagination support
- ✅ Loading states and error handling
- ✅ Professional UI with consistent branding
- ✅ Font Awesome icons
- ✅ Environment variable management
- ✅ SEO-friendly structure

This complete implementation provides a fully functional movie discovery application as specified in the project requirements.

## Authentication & API Usage Guide

## Authentication
This API uses **RapidAPI key authentication**.

Include the following headers in your requests:

x-rapidapi-key: YOUR_API_KEY
x-rapidapi-host: moviesdatabase.p.rapidapi.com


---

## Error Handling

**Common error responses:**

| Status Code | Meaning                              |
|-------------|--------------------------------------|
| **400**     | Bad Request — Invalid parameters     |
| **401**     | Unauthorized — Invalid API key       |
| **404**     | Not Found — Resource not found       |
| **429**     | Too Many Requests — Rate limit exceeded |
| **500**     | Internal Server Error — Server error |

**Best practice:**  
Always check the response status and use `try-catch` blocks (or equivalent) to handle errors gracefully.

---

## Usage Limits & Best Practices

- **Rate limiting** applies based on your subscription plan.
- **Pagination**: For large datasets, request a maximum of **50 items per request**.
- **Caching**: Store frequently used responses to reduce API calls.
- **Selective data fetching**: Use specific `info` parameters to get only the data you need.
- **Error handling**: Implement proper error handling and loading states in your app.
- **Security**: Store API keys securely in **environment variables**, never hard-code them.

---

