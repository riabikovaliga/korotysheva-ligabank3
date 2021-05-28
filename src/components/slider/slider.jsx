import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SLIDER_TIMEOUT} from '../../const';
import Indicators from '../indicators/indicators';

const Slider = ({className, children}) => {

    const [currentChild, setCurrentChild] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const setNewCurrentChild = (value) => {
        setCurrentChild((currentChild + value) % children.length);
    };

    const onSliderClick = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setNewCurrentChild(1);
    };

    useEffect(() => {
        setTimeoutId(setTimeout(() => setNewCurrentChild(1), SLIDER_TIMEOUT));
    }, [currentChild]);

    return (
        <section className={`${className} slider`}>
            <div className="slider__img" onTouchMove={() => onSliderClick()}>
                {children[currentChild]}
            </div>
            <Indicators className="slider__indicators" activeIndicator={currentChild} count={children.length}/>
        </section>
    );
};

Slider.propTypes = {
    className: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string
    })),
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export {Slider};
