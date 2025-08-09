import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;
      const currentYear = new Date().getFullYear();
      const apiKey = process.env.MOVIE_API_KEY;

      if (!apiKey) {
        console.error('API key not found in environment variables');
        return response.status(500).json({
          error: "API key not configured. Please check your .env.local file."
        });
      }

      // Build URL with proper parameters
      let url = `https://moviesdatabase.p.rapidapi.com/titles?`;
      const params = new URLSearchParams({
        year: (year || currentYear).toString(),
        sort: 'year.decr',
        limit: '12',
        page: page.toString(),
        info: 'base_info'
      });

      if (genre && genre !== 'All') {
        params.append('genre', genre);
      }

      url += params.toString();
      console.log('Requesting URL:', url);

      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          "X-RapidAPI-Key": apiKey,
          "Content-Type": "application/json"
        },
      });

      console.log('API Response status:', resp.status);

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error(`API Error ${resp.status}:`, errorText);
        
        // Handle specific error codes
        if (resp.status === 429) {
          return response.status(429).json({
            error: "Rate limit exceeded. Please wait a moment and try again.",
            retryAfter: resp.headers.get('retry-after') || 60
          });
        }
        
        if (resp.status === 403) {
          return response.status(403).json({
            error: "API access forbidden. Please check your API key and subscription.",
          });
        }

        if (resp.status === 401) {
          return response.status(401).json({
            error: "Unauthorized. Please check your API key.",
          });
        }

        throw new Error(`HTTP error! status: ${resp.status}, message: ${errorText}`);
      }

      const moviesResponse = await resp.json();
      console.log('API Response received, results count:', moviesResponse?.results?.length || 0);
      
      const movies: MoviesProps[] = moviesResponse.results || [];

      // Filter out movies without required data
      const validMovies = movies.filter(movie => 
        movie?.titleText?.text && 
        movie?.releaseYear?.year &&
        movie?.primaryImage?.url
      );

      return response.status(200).json({
        movies: validMovies,
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
