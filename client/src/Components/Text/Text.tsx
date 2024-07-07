import "./_text.scss"

import cx from "classnames"
import React from "react";

function Text({
    children,
    ellipsis,
    italicize,
    danger,
    small,
    success,
    heading,
    subheading,
    className,
    centered,
    bold,
    styles

}: {
    children?: React.ReactNode,
    ellipsis?: boolean,
    danger?: boolean,
    small?: boolean,
    italicize?: boolean,
    heading?: boolean,
    success?: boolean,
    subheading?: boolean,
    className?: string,
    centered?: boolean,
    bold?: boolean,
    styles?: React.CSSProperties
}) {

    const textStyles: React.CSSProperties = {
        textAlign: centered ? "center" : "start",
        textOverflow: ellipsis ? "ellipsis" : "none",
        fontStyle: italicize ? "italic" : "normal",
        ...styles
    }

    const computedClasses = cx(
        "text",
        {
            "text--small": small,
            "text--bold": bold,
            "text--danger": danger,
            "text--success": success
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