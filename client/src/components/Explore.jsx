import { useSelector, useDispatch } from "react-redux"
import state from "../state"

const Explore = () => {

  const word = useSelector((state) => state.searchWord);

  return (
    <div>{word}</div>
  )
}

export default Explore