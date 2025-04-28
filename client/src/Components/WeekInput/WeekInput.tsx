import {useState} from "react";
import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import Text from "../Text/Text.tsx";
import "./_weekInput.scss"

function WeekInput({
    startingWeek,
    startingYear,
    handleWeekChange
}: {
    startingWeek: number,
    startingYear: number,
    handleWeekChange: () => void
}) {
    const [week, setWeek] = useState(startingWeek)
    const [year, setYear] = useState(startingYear)

   return (
       <>
           <div className="week-picker">
               <div className="week-picker__previous-week material-symbols-outlined">arrow_back</div>
               <div className="days">

                   {
                       Object.keys(DaysOfTheWeek).map(day => {
                           return (
                               <div className="week-picker__day">

                                   <div className="week-picker__day__heading">

                                        <Text>{day}</Text>
                                   </div>
                                   <div className="week-picker__day__body">
                                       <Text>11</Text>
                                       <Text>Sep</Text>
                                   </div>
                               </div>
                        )})

                   }
               </div>
               <div className="week-picker__next-week material-symbols-outlined">arrow_forward</div>

           </div>
       </>
   )


}

export default WeekInput