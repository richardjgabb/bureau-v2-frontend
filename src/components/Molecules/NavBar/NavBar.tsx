import NavLink from "../../Atoms/NavLink/NavLink"

const NavBar = () => {
    return (
        <nav className="w-full h-10 flex justify-center items-center gap-4 px-4">
            <NavLink href={'/'} text={'Games'} />
            <NavLink href={'/players'} text={'Players'} />
            <NavLink href={'/stats'} text={'Stats'} />
        </nav>
    )
}
export default NavBar
