import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { MyDatePickerProps } from './types';
import InputLabel from '../InputLabel/InputLabel';
import ColumnContainer from '../ColumnContainer/ColumnContainer';

const MyDatePicker: React.FC<MyDatePickerProps> = ({ label, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <ColumnContainer>
      <InputLabel htmlFor="date-picker-input" label={label} />
      <DatePicker
        id="date-picker-input"
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MMMM d, yyyy"
        isClearable
        placeholderText="Select a date"
        className="p-2 w-fit border border-gray-300 rounded-md"
      />
    </ColumnContainer>
  );
};

export default MyDatePicker;
