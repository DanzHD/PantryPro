import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import "./_carousel.scss"
import cx from "classnames";

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
    draggable?: boolean

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
    const [allItemsInView, setAllItemsInView] = useState(false)
    const isAllElementsInView = useCallback((items: HTMLCollection | Array<HTMLElement>) => {
        let inView;
        for (const item of items) {
            inView = isElementInView(item)
            if (!inView) {
                return false;
            }
        }

        return true;

    }, [])

    /**
     *
     * @param carouselItems
     * Finds first element that is in view within carouselItems. Then returns the next item that is not in view in
     * carousel Items
     */
    const findItemToScroll = useCallback((carouselItems: HTMLCollection | Array<HTMLElement>) => {
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
    }, [])

    const handleMoveNextItem = useCallback(() => {
        if (!carouselSliderRef.current) {
            throw Error("Carousel Slider ref should not be null");

        }
        const carouselSlider = carouselSliderRef.current
        const scrollToElement = findItemToScroll(carouselSlider.children)
        scrollToElement.scrollIntoView()

    }, [findItemToScroll])

    const handleMovePreviousItem = useCallback(() => {
        if (!carouselSliderRef.current) {
            throw Error("Carousel Slider ref should not be null");

        }
        const carouselSlider = carouselSliderRef.current
        const carouselItems = Array.prototype.slice.apply(carouselSlider.children).reverse()
        const scrollToElement = findItemToScroll(carouselItems)
        scrollToElement.scrollIntoView()
    }, [findItemToScroll])

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        const LEFT_KEY = "ArrowLeft"
        const RIGHT_KEY = "ArrowRight"
        const keyPressed = e.code;
        e.preventDefault()

        if (keyPressed === LEFT_KEY) {
            handleMovePreviousItem();
        } else if (keyPressed === RIGHT_KEY) {
            handleMoveNextItem();
        }
    }, [handleMoveNextItem, handleMovePreviousItem])

    useEffect(() => {

        function checkElementsInView() {
            const carouselSlider = carouselSliderRef.current;
            if (!carouselSlider) {
                throw new Error("Carousel Slider should not be null");
            }
            const inView = isAllElementsInView(carouselSlider.children)
            setAllItemsInView(inView)
        }

        checkElementsInView()

        window.addEventListener("resize", checkElementsInView)
        return () => window.removeEventListener("resize", checkElementsInView)


    }, [isAllElementsInView]);

    
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
        {

            !allItemsInView &&
            <div
                className="carousel__previous material-symbols-outlined"
                onClick={handleMovePreviousItem}>
                arrow_back
            </div>
        }
        <ul
            onKeyDown={handleKeyPress}
            tabIndex={0}
            style={{cursor: cursor}}
            {...(draggable ? draggableFunctions : {})}
            ref={carouselSliderRef}
            className="carousel__slider">
            {
                children
            }

        </ul>
        {
            !allItemsInView &&
            <div
                className="carousel__next material-symbols-outlined"
                onClick={handleMoveNextItem}>
                arrow_forward
            </div>
        }

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

