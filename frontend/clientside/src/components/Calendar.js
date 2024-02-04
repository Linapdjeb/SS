import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { CalendarPicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Date is: ", date);
  };

  return (
      <LocalizationProvider dateAdapter={DateFnsUtils}>
            <Paper style={{ overflow: "hidden" }}>
                {/* <Calendar date={selectedDate} onChange={handleDateChange} /> */}
                <CalendarPicker date={selectedDate} onChange={handleDateChange} />
            </Paper>
      </LocalizationProvider>
    //   <MuiPickersUtilsProvider utils={DateFnsUtils}></MuiPickersUtilsProvider>
  );
}

export default Calendar;