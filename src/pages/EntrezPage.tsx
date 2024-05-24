import { Outlet } from "react-router-dom"
import SectionNavigation from "../components/SectionNavigation"
import { FaInfoCircle, FaSearch } from "react-icons/fa"
import { FaTableCells } from "react-icons/fa6"
import { NavLinkInfo } from "../lib/propTypes"

export const EntrezPage = () => {
    const sectionItems = [
        {title: 'Info', url: '/entrez/info', icon: <FaInfoCircle />} as NavLinkInfo,
        {title: 'Search', url: '/entrez/search', icon: <FaSearch />} as NavLinkInfo,
        {title: 'Recent', url: '/entrez/recent', icon: <FaTableCells />} as NavLinkInfo,
    ]
    return (
        <div className="flex h-full">
            <SectionNavigation sections={sectionItems} />

            <Outlet />
        </div>
    )
}