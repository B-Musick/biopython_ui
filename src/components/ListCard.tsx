import { ListCardProps } from "../lib/propTypes"

export const ListCard: React.FC<ListCardProps> = ({actionButtons, item, handleClick, title, children}) => {
    return (
        <button className="w-[98%] lg:w-[70%]" onClick={()=>handleClick(item)}>
            <div className="m-1 rounded-lg border p-4 w-full text-left flex">
                <div className="w-[95%]">
                    <h2 className="font-bold">{title}</h2>
                    {children}
                </div>
                <div className="w-[5%]">
                    {actionButtons}
                </div>
            </div>
        </button>
    )
}