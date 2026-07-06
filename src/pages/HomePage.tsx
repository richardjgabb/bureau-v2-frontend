import MainHeader from "../components/Atoms/MainHeader/MainHeader"

const HomePage = () => {

    return (
        <section className="flex flex-col gap-4 items-center">
                <MainHeader text="Bureau"/>
                <img src="/Bureau.png" alt="Bureau logo" className="w-32 h-32" />
        </section>)
}

export default HomePage
