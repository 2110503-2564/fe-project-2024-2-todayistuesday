// components/LocationDateReserve.tsx
"use client";
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface LocationDateReserveProps {
  onDateChange: (value: Dayjs) => void;
  initialDate?: Dayjs | null;
}

export default function LocationDateReserve({ 
  onDateChange, 
  initialDate = null 
}: LocationDateReserveProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialDate);

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setSelectedDate(newValue);
      onDateChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{ 
          textField: { 
            variant: 'standard', 
            fullWidth: true 
          } 
        }}
        // Optional: Add min and max date constraints
        minDate={dayjs()} // Prevent selecting past dates
        maxDate={dayjs().add(1, 'year')} // Limit to 1 year in the future
      />
    </LocalizationProvider>
  );
}
