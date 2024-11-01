import { Link } from "react-router-dom"
import Button from "../Button"

const Header = () => {
  return (
    <div className="w-full absolute z-10">
      <div className="py-6 px-4 max-width flex justify-between items-center ">
      <Link to={"/"} >
        <img src="/public/bmw.png" width={50} />
      </Link>
      <Button title="Kaydol" designs="min-w-[130px]"/>
      </div>
    </div>
  )
}

export default Header