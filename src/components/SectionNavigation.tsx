import { NavLink } from "react-router-dom";
import { NavLinkInfo } from "../lib/propTypes";

interface SectionNavigationProps {
    sections: NavLinkInfo[]
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({sections}) =>{ 
    let navSections = sections.map(section => {
        return (
            <NavLink to={section.url} className="w-full">
                <div className="flex w-full justify-start p-2 sm:w-36">
                    {section.icon}
                    <p className="hidden sm:block text-[0.7em] pl-1">{section.title}</p>
                </div>
            </NavLink>
        )
    })

    return (
        <nav className="h-full  flex flex-col justify-start bg-gray-100">
            {navSections}
        </nav>
    )
}

export default SectionNavigation