import type { NavLinkProps } from "./types.ts"

const NavLink = ({ href, text }: NavLinkProps) => {
    return (
        <a href={href} className="text-white hover:scale-110 transition duration-400 px-3 py-2 min-w-[90px] lg:min-w-[105px] text-center rounded-md text-sm font-medium text-xl lg:text-2xl">
            { text }
        </a>
    )
}
export default NavLink
