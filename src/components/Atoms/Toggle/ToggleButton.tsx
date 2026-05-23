const ToggleButton = ({ handleClick, selected, text, value }) => {

    return (
        <button
          onClick={() => handleClick(value)}
          className={`
            px-6 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:cursor-pointer
            ${selected === value
              ? 'bg-light-gray/30 text-white shadow-sm'
              : 'text-white hover:bg-gray-200/50'}
          `}
        >
          {text}
        </button>
    )
}

export default ToggleButton