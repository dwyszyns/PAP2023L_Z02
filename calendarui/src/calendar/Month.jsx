import React from 'react'
import Day from "./Day";
import './Month.css'

export default function Month({month}) {
    return (
        <div className="flex-1">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, index) => (
                        <div className="flex-1-day">
                            <Day day={day} key={index} rowIdx={i}/>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}