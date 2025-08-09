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
