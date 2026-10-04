import { useContext } from "react"
import { MoviesContext } from "../../Contaxts/MoveiApi/MoveApi"
import WatchListCard from "../../Components/WathListCard/WatchListCard"

export default function WatchList() {
  const { watchlist, toggleWatchlist } = useContext(MoviesContext)

  if (watchlist.length === 0) {
    return <h4 className="text-center mt-5 text-secondary">No Movies in watch list</h4>
  }

  return (
<div className="container">
  <div style={{
  
  display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
gap: "30px",
  padding: "20px"
}}>
  {watchlist.map((item) => (
    <WatchListCard key={item.id} item={item} onRemove={toggleWatchlist} />
  ))}
</div>
</div>
  )
}