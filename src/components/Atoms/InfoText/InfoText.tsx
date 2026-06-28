interface Props {
    text: string
}

const InfoText = ({ text }: Props) => {

    return (
        <p className="text-white/80 text-[10px] px-4">ⓘ { text }</p>
    )
}

export default InfoText