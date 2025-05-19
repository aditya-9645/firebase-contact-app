import { RiContactsBook3Fill } from "react-icons/ri";

const NotFoundContact = () => {
    return (<div className="flex w-[100%] h-[50vh] justify-center  align-middle gap-3">
        <RiContactsBook3Fill size={50} className="text-red-500 self-center"/> 
        <h2 className="self-center text-xl font-semibold text-red-500">No Contact Found!</h2>
    </div>
  )
}

export default NotFoundContact