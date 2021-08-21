import React from "react"
import { useKeenSlider } from "keen-slider/react"
import { Arrow, KeenChild, NavigationWrapper, Dots, Dot, KeenChild2, KeenChild3, KeenChild4 } from './KeenDotSlider.styled';

const KeenSlider = (props: any) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
        },
    })
    return (
        <>
            <NavigationWrapper className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider d-flex">
                    {[...new Array(1)].map((_, i) => (
                        <>
                            <KeenChild className="keen-slider__slide">

                            </KeenChild>
                            <KeenChild2 className="keen-slider__slide">

                            </KeenChild2>
                            <KeenChild3 className="keen-slider__slide">

                            </KeenChild3>
                            <KeenChild4 className="keen-slider__slide">

                            </KeenChild4>
                        </>
                    ))}
                </div>
                {slider && (
                    <>
                        <ArrowLeft
                            onClick={(e: any) => e.stopPropagation() || slider.prev()}
                            disabled={currentSlide === 0}
                        />
                        <ArrowRight
                            onClick={(e: any) => e.stopPropagation() || slider.next()}
                            disabled={currentSlide === slider.details().size - 1}
                        />
                    </>
                )}
            </NavigationWrapper>
            {slider && (
                <Dots>
                    {[...Array(slider.details().size).keys()].map((idx) => {
                        return (
                            <Dot
                                key={idx}
                                onClick={() => {
                                    slider.moveToSlideRelative(idx)
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            />
                        )
                    })}
                </Dots>
            )}
        </>
    )
}

function ArrowLeft(props: any) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <Arrow
            leftArrow
            // isDisabled={disabeld}
            onClick={props.onClick}
            xmlns="http://www.w3.org/2000/svg"
            // viewBox="0 0 24 24"
            transform="translate(10, 7)"
        >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </Arrow>
    )
}

function ArrowRight(props: any) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <Arrow
            onClick={props.onClick}
            rightArrow
            xmlns="http://www.w3.org/2000/svg"
            // viewBox="0 0 24 24"
            transform="translate(10, 7)"
        >
            <path d="M1 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </Arrow>
    )
}

export default KeenSlider