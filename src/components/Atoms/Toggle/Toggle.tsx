import { useState } from 'react';
import ToggleButton from './ToggleButton';

const Toggle = ({ leftText, rightText, setState }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = (option: boolean) => {
    setSelected(option);
    setState(option);
  };

  return (
      <div className="flex mx-auto bg-dark-gray rounded-xl p-1">
        <ToggleButton handleClick={handleClick} selected={selected} text={leftText} value={false} />
        <ToggleButton handleClick={handleClick} selected={selected} text={rightText} value={true} />
      </div>
  );
};

export default Toggle;