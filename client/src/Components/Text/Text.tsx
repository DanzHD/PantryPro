import "./_text.scss"

import cx from "classnames"
import React from "react";

function Text({
    children,
    ellipsis,
    italicize,
    danger,
    small,
    heading,
    subheading,
    className,
    centered,
    bold

}: {
    children?: React.ReactNode,
    ellipsis?: boolean,
    danger?: boolean,
    small?: boolean,
    italicize?: boolean,
    heading?: boolean,
    subheading?: boolean,
    className?: string,
    centered?: boolean,
    bold?: boolean
}) {

    const textStyles: React.CSSProperties = {
        textAlign: centered ? "center" : "start",
        textOverflow: ellipsis ? "ellipsis" : "none",
        fontStyle: italicize ? "italic" : "normal"
    }

    const computedClasses = cx(
        "text",
        {
            "text--small": small,
            "text--bold": bold,
            "text--danger": danger
        },
        className
    )

    if (heading) {
        return <h1 className={computedClasses} style={textStyles}>{children}</h1>
    }

    if (subheading) {
        return <h2 className={computedClasses} style={textStyles}>{children}</h2>
    }

    return <p className={computedClasses} style={textStyles}>{children}</p>
}

export default Text