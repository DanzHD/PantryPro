import React, {ReactNode, useRef, useState} from "react";
import "./_carousel.scss"
import cx from "classnames";
import Button from "../Button/Button.tsx";

enum cursorStates {
    GRAB = "grab",
    GRABBING = "grabbing",
    DEFAULT = "default"
}

export function Carousel({
    children,
    draggable,

}: {
    children: ReactNode,
    draggable?: boolean,
    itemsVisible: number

}) {
    const [mouseDown, setMouseDown] = useState(false)
    const [cursor, setCursor] = useState(() => {
        if (draggable) {
            return cursorStates.GRAB
        }

        return cursorStates.DEFAULT
    })

    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        x: 0,
        y: 0
    })

    const carouselSliderRef = useRef<HTMLUListElement>(null);

    const draggableFunctions = {

        onMouseLeave: handleMouseLeave,
        onMouseUp: handleMouseUp,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove
    }

    function handleMouseDown(event: React.MouseEvent<HTMLElement>) {
        setMouseDown(true)
        setCursor(cursorStates.GRABBING)
        const carouselSlider = carouselSliderRef.current
        if (!carouselSlider) return
        setPosition({
            left: carouselSlider?.scrollLeft,
            top: carouselSlider?.scrollTop,
            x: event.clientX,
            y: event.clientY
        })
    }

    function handleMouseUp() {
        setMouseDown(false)
        setCursor(cursorStates.GRAB)
    }

    function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
        if (!mouseDown) {
            return;
        }

        event.preventDefault();
        const carouselSlider: HTMLElement | null = carouselSliderRef.current
        if (!carouselSlider) {
            throw new Error("Carousel slider ref should not be null");
        }

        const horizontalMovement = event.clientX - position.x
        carouselSlider.scrollLeft = position.left - horizontalMovement



    }

    function handleMoveNextItem() {
        if (!carouselSliderRef.current) {
            throw Error("Carousel Slider ref should not be null");

        }
        const carouselSlider = carouselSliderRef.current
        const scrollToElement = findItemToScroll(carouselSlider.children)
        scrollToElement.scrollIntoView()

    }

    function handleMovePreviousItem() {
        if (!carouselSliderRef.current) {
            throw Error("Carousel Slider ref should not be null");

        }
        const carouselSlider = carouselSliderRef.current
        const carouselItems = Array.prototype.slice.apply(carouselSlider.children).reverse()
        const scrollToElement = findItemToScroll(carouselItems)
        scrollToElement.scrollIntoView()
    }

    /**
     *
     * @param carouselItems
     * Finds first element that is in view within carouselItems. Then returns the next item that is not in view in
     * carousel Items
     */
    function findItemToScroll(carouselItems: HTMLCollection | Array<HTMLElement>) {
        let foundItemInView = false;
        let inView;
        for (const carouselItem of carouselItems) {
            inView = isElementInView(carouselItem);
            if (!inView && foundItemInView) {
                return carouselItem;
            }
            /* Avoiding scrolling backwards */
            if (inView) {
                foundItemInView = true;
            }
        }

        return carouselItems[0]
    }


    function isElementInView(element: Element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleMouseLeave() {
        setMouseDown(false)
        setCursor(cursorStates.GRAB)
    }

    return <div className="carousel">
        <ul
            style={{cursor: cursor}}
            {...(draggable ? draggableFunctions : {})}
            ref={carouselSliderRef}
            className="carousel__slider">
            {
                children
            }

        </ul>
        <Button onClick={handleMovePreviousItem} classNames="carousel__previous">Previous</Button>
        <Button onClick={handleMoveNextItem} classNames="carousel__next">Next</Button>


    </div>
}

export function CarouselItem({
    children,
    className
}: {
    children: ReactNode,
    className?: string
}) {

    const computedClasses = cx(
        "carousel__item",
        className
    )

    return <li className={computedClasses} >

        {children}
    </li>
}

