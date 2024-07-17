import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

const CustomDatePicker = () => {
  const [dateValue, setDateValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select date"
        value={dateValue}
        onChange={(newValue) => setDateValue(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'black',
                color: '#fff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiSvgIcon-root': {
                color: 'gray',
              },
            }}
          />
        )}
        PaperProps={{
          sx: {
            backgroundColor: 'black',
            color: '#fff',
            boxShadow: 'none',
            '& .MuiPickersDay-root': {
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#1976d2',
              },
              '&:hover': {
                backgroundColor: '#2d2d2d',
              },
            },
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#1976d2',
            },
            '& .MuiPickersDay-root:hover': {
              backgroundColor: '#2d2d2d',
            },
            '& .MuiTypography-root': {
              color: '#fff',
            },
            '& .MuiIconButton-root': {
              color: '#fff',
            },
            '& .MuiPickersCalendarHeader-root': {
              color: '#fff',
            },
            '& .MuiPickersArrowSwitcher-root': {
              color: '#fff',
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
