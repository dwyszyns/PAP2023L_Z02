import React, {useState} from 'react';
import './calendar.css';
import {getMonth} from "./util";
import './Sidebar'
import './CalendarHeader'
import './Month'
import Sidebar from "./Sidebar";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";

function CalendarElement() {
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    // const []
    return (
        <React.Fragment>
            <div className="h-screen">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default CalendarElement;
