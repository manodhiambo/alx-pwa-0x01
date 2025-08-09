import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;
      const date = new Date();

      // Build URL safely
      let url = `https://moviesdatabase.p.rapidapi.com/titles?year=${year || date.getFullYear()}&sort=year.decr&limit=12&page=${page || 1}`;
      if (genre && genre !== "All") {
        url += `&genre=${encodeURIComponent(genre)}`;
      }

      console.log("Requesting URL:", url);

      // Fetch from RapidAPI
      const resp = await fetch(url, {
        headers: {
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.MOVIE_API_KEY as string,
        },
      });

      // Handle non-OK responses gracefully
      if (!resp.ok) {
        const text = await resp.text();
        console.error("API returned non-JSON response:", text);
        return response.status(resp.status).json({
          error: `Failed to fetch movies: ${resp.status}`,
          details: text,
        });
      }

      // Parse JSON
      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results || [];

      // Filter valid movies
      const validMovies = movies.filter(movie =>
        movie?.titleText?.text &&
        movie?.releaseYear?.year &&
        movie?.primaryImage?.url
      );

      return response.status(200).json({
        movies: validMovies,
        total: moviesResponse.entries || 0,
        page: moviesResponse.page || 1,
      });

    } catch (err) {
      console.error("Unexpected error:", err);
      return response.status(500).json({
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
