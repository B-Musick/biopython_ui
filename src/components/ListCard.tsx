import { ListCardProps } from "../lib/propTypes"

export const ListCard: React.FC<ListCardProps> = ({item, handleClick, title, children}) => {
    return (
        <button className="w-[98%] lg:w-[70%]" onClick={()=>handleClick(item)}>
            <div className="m-1 rounded-lg border p-4 w-full text-left">
                <h2 className="font-bold">{title}</h2>
                {children}
            </div>
        </button>
    )
}