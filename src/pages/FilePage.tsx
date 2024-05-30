import { Outlet } from "react-router-dom"
import SectionNavigation from "../components/SectionNavigation"
import { FaInfoCircle, FaSearch } from "react-icons/fa"
import { FaTableCells } from "react-icons/fa6"
import { NavLinkInfo } from "../lib/propTypes"

export const FilePage = () => {
    const sectionItems = [
        {title: 'Info', url: '/file/info', icon: <FaInfoCircle />} as NavLinkInfo,
        {title: 'Upload', url: '/file/upload', icon: <FaSearch />} as NavLinkInfo,
        {title: 'Recent', url: '/file/recent', icon: <FaTableCells />} as NavLinkInfo,
    ]
    return (
        <div className="flex">
            <SectionNavigation sections={sectionItems} />

            <Outlet />
        </div>
    )
}