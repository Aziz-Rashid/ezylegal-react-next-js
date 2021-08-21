import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { TOptions } from "keen-slider";

import { ArrowButton } from "./KeenSlider.styled";

import "keen-slider/keen-slider.min.css";

interface KeenSliderProps extends TOptions {
    children: React.ReactNode;
    showArrows?: boolean;
};

const KeenSlider = ({ children, showArrows, ...props }: KeenSliderProps) => {
    const [sliderRef, slider] = useKeenSlider(props);

    return (
        <div className="d-flex align-items-center">
            { showArrows && (
                <ArrowButton onClick={() => slider.prev()} leftArrow>
                    <img src="/icons/arrow-left.svg" alt="Left" height="10"/>
                </ArrowButton>
            )}
            <div ref={sliderRef as React.RefObject<HTMLDivElement>} className="keen-slider">
                { children }
            </div>
            { showArrows && (
                <ArrowButton onClick={() => slider.next()} rightArrow>
                    <img src="/icons/arrow-right.svg" alt="Right" height="10"/>
                </ArrowButton>
            )}
        </div>
    );
};

interface KeenSlideProps {
    children: React.ReactNode;
};

export const KeenSlide = ({ children }: KeenSlideProps) => {
    return (
        <div className="keen-slider__slide">{ children }</div>
    );
};

export default KeenSlider;