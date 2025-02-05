import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles

const MonthPicker = ({ onMonthChange, onAllTime }) => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    setStartDate(date);
    onMonthChange(date);
  };

  return (
    <div className="flex items-center gap-4 mx-2">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        scrollableMonthYearPicker
        className="btn-primary"
        popperClassName="custom-datepicker-dropdown"
        placeholderText={startDate ? "" : "All time"}
      />
      <button
        className="txt-color font-bold btn-secondary w-32"
        onClick={onAllTime}
      >
        All time
      </button>
    </div>
  );
};

export default MonthPicker;
