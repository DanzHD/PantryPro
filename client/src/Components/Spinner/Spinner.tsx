import "./_spinner.scss"
import cx from "classnames";
import {ISpinner} from "./ISpinner.tsx";

function Spinner({
    small,
    large
}: ISpinner) {

    const computedClasses = cx(
        "spinner",
        {
            "spinner--small": small,
            "spinner--large": large
        }

    )

    return <div className={computedClasses} />
}

export default Spinner;