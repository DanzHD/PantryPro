import Text from "../../Components/Text/Text.tsx";
import "./_body.scss"
import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import useModal from "../../hooks/useModal/useModal.tsx";
import {useEffect, useRef, useState} from "react";
import AddRecipeModal from "./AddRecipeModal.tsx";
import {Item} from "../../Components/SearchBar/SearchBar.tsx";
import {getDateWeek} from "../../util/date.tsx";
import moment from "moment";
import {deleteScheduledMeal, getWeekOfScheduledMeals} from "../../api/meal.tsx";
import {DeleteScheduledMealDto} from "../../dto/DeleteScheduledMealDto.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {Carousel, CarouselItem} from "../../Components/Carousel/Carousel.tsx";
import WeekInput from "../../Components/WeekInput/WeekInput.tsx";
import {WEEKS_PER_YEAR} from "../../util/constants.tsx";

export class Recipe implements Item {
    id: number
    name: string
    ingredients: string[]
    instructions: string
    image: string | null

    constructor(id: number, name: string, ingredients: string[], instructions: string, image: string | null) {
        this.id = id
        this.name = name
        this.ingredients = ingredients
        this.instructions = instructions
        this.image = image
    }

}

function Body() {
    const { accessToken } = useAuthContext()

    const [recipes, setRecipes] = useState(new Map<DaysOfTheWeek, Map<number, Recipe>>([
        [DaysOfTheWeek.MONDAY, new Map()],
        [DaysOfTheWeek.TUESDAY, new Map()],
        [DaysOfTheWeek.WEDNESDAY, new Map()],
        [DaysOfTheWeek.THURSDAY, new Map()],
        [DaysOfTheWeek.FRIDAY, new Map()],
        [DaysOfTheWeek.SATURDAY, new Map()],
        [DaysOfTheWeek.SUNDAY, new Map()]
    ]))
    /* For recipes inside the modal, gets the day of week adding recipes for */
    const [addRecipeForDay, setAddRecipeForDay] = useState<DaysOfTheWeek>(DaysOfTheWeek.MONDAY)
    const [addRecipeModalOpen, setAddRecipeModalOpen] = useState(false)
    const addRecipeModalRef = useRef(null)
    const [week, setWeek] = useState(`${getDateWeek(new Date())}`)
    const [year, setYear] = useState(`${new Date().getFullYear()}`)

    /*
    Query the stored weekly meals
    */
    useEffect(() => {
        const yearNumber: number = year as unknown as number
        const weekNumber: number = week as unknown as number
        getWeekOfScheduledMeals({ accessToken, year: yearNumber, week: weekNumber })
            .then(weeklyScheduledMeals => {
                if (weeklyScheduledMeals) {

                    setRecipes(weeklyScheduledMeals)
                }
            })
    }, [accessToken, week, year]);
  
  
    /**
    *
    * Deals with opening and closing the add recipe modal
    */
    function handleOpenAddRecipeModal(day: DaysOfTheWeek) {
        if (!addRecipeModalRef.current) {
            return
        }

        const dialog: HTMLDialogElement = addRecipeModalRef.current as HTMLDialogElement
        setAddRecipeForDay(day)
        dialog.showModal()
        setAddRecipeModalOpen(true)

    }

    /**
    *
    * Removes a recipe from the newRecipes state variable based on the day and recipeId
    * Updates the database, removes the deleted recipe from the database
    */
    async function handleRemoveRecipe(day: DaysOfTheWeek, recipeId: number) {
        const newRecipes = new Map<DaysOfTheWeek, Map<number, Recipe>>(recipes)
        const recipesOnDay = newRecipes.get(day) as Map<number, Recipe>
        recipesOnDay.delete(recipeId)
        setRecipes(newRecipes)

        let date = moment(`${year}-W${week}`).day(day)

        if (day === DaysOfTheWeek.SUNDAY) {
            /* Day of the week starts on Sunday, add seven to make it start on Monday */
            date = date.add(7, "day")
        }
        const strDate = date.format("YYYY-MM-DD")

        const deleteScheduledMealDto = new DeleteScheduledMealDto(strDate, recipeId);
        await deleteScheduledMeal({accessToken, deleteScheduledMealDto})
    }

    function handleWeekChange(week: string, year: string) {
        if (week === "0") {

            setYear(String(Number(year) - 1))
            setWeek(String(WEEKS_PER_YEAR))
        } else if (week === "52") {
            setYear(String(Number(year) + 1))
            setWeek("1")
        } else {
            setWeek(week)
        }
    }

    return (
        <>

            <div className="meal-planner__body">
                <div className="meal-planner__body__content">
                    <div className="meal-planner__body__content__title">

                        <Text heading centered>Meal Planner</Text>
                    </div>
                    <div className="meal-planner__body__content__week-picker">

                        <WeekInput
                            week={week}
                            year={year}
                            handleWeekChange={handleWeekChange}

                        />
                    </div>

                    <div className="weekly-meals-section">
                        <Carousel>


                            {
                                Object.values(DaysOfTheWeek).map(day => {
                                    return <CarouselItem key={day}>

                                        <MealsDay
                                            key={day}
                                            day={day}
                                            meals={recipes.get(day)}
                                            handleOpenAddRecipeModal={handleOpenAddRecipeModal}
                                            handleRemoveRecipe={handleRemoveRecipe}
                                        />
                                    </CarouselItem>
                                })
                            }
                        </Carousel>
                    </div>


                </div>

            </div>

            <AddRecipeModal
                week={week}
                year={year}
                day={addRecipeForDay}
                currentRecipes={recipes}
                setCurrentRecipes={setRecipes}
                modalRef={addRecipeModalRef}
                modalOpen={addRecipeModalOpen}
                setModalOpen={setAddRecipeModalOpen}
            />



        </>
    )

}

/**
 *
 * Creates a card which contains 3 cards for breakfast, lunch and dinner
 */
function MealsDay({
    day,
    meals,
    handleOpenAddRecipeModal,
    handleRemoveRecipe
}: {
    day: DaysOfTheWeek,
    meals: Map<number, Recipe> | undefined,
    handleOpenAddRecipeModal: ((day: DaysOfTheWeek) => void),
    handleRemoveRecipe: (day: DaysOfTheWeek, recipeId: number) => void
}) {
    const openMealActionsRef = useRef<HTMLDivElement>(null)
    const {open} = useModal(openMealActionsRef)

    return <>
        <div className="day-meal">
            <div className="day-meal__title">

                <Text subheading centered>{day}</Text>
                <span ref={openMealActionsRef} className="material-symbols-outlined">
                    more_vert
                </span>
                <div className="menu-container">
                    {
                        open &&
                            <ul className="menu-meal">
                                <li onClick={() => handleOpenAddRecipeModal(day)}>
                                    <span className="material-symbols-outlined">add</span>
                                    <Text>Add Meal</Text>
                                </li>
                            </ul>
                    }
                </div>
            </div>
            {
                meals &&
                    Array.from(meals.values()).map(meal => {
                    return <div key={meal.id} className="meal">

                        <img src={meal.image ? meal.image : ""} alt={meal.name}/>
                        <Text heading ellipsis bold >{meal.name}</Text>
                        <div className="material-symbols-outlined" onClick={() => handleRemoveRecipe(day, meal.id)}>close</div>


                    </div>
                })
            }

        </div>


    </>
}

export default Body