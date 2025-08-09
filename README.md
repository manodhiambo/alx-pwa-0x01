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

{
  "results": [...],
  "page": 1,
  "next": "next_page_url",
  "entries": 100
}
# Authentication & API Usage Guide

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

