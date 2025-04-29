import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import Text from "../Text/Text.tsx";
import "./_weekInput.scss"
import moment from "moment/moment";
import {addDate} from "../../util/date.tsx";

function WeekInput({
    week,
    year,
    handleWeekChange
}: {
    week: string,
    year: string,
    handleWeekChange: (week: string, year: string) => void
}) {
    let date;
    if (Number(week) >= 10) {

        date = moment(`${year}W${week}`).add("7", "days").toDate()
    } else {
        date = moment(`${year}W0${week}`).add("7", "days").toDate()

    }


    return (
       <>
           <div className="week-picker">
               <div onClick={() => handleWeekChange(String(Number(week) - 1), year)} className="week-picker__previous-week material-symbols-outlined">arrow_back</div>
               <div className="days">

                   {
                       Object.keys(DaysOfTheWeek).map((day, i) => {

                           return (
                               <div key={day} className="week-picker__day">

                                   <div className="week-picker__day__heading">

                                        <Text>{day}</Text>
                                   </div>
                                   <div className="week-picker__day__body">
                                       <Text subheading>

                                           {

                                               addDate(date, i).getDate()
                                           }
                                       </Text>
                                       <Text>

                                           {
                                                addDate(date, i).toLocaleString('default', { month: 'long'})
                                           }
                                       </Text>


                                   </div>
                               </div>
                        )})

                   }
               </div>
               <div onClick={() => handleWeekChange(String(Number(week) + 1), year)} className="week-picker__next-week material-symbols-outlined">arrow_forward</div>

           </div>
       </>
   )


}

export default WeekInput