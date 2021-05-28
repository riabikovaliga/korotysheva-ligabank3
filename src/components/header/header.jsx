import React from 'react';
import {MainNav} from '../main-nav/main-nav';
import {PreviewMain, PreviewMan, PreviewWoman} from '../preview/preview';
import {Slider} from '../slider/slider';

const Header = () => {
    return (
        <header className="header">
            <MainNav className="header__nav"/>
            <Slider className="header__slider">
                <PreviewMain className="header__preview-main"/>
                <PreviewMan className="header__preview-man"/>
                <PreviewWoman className="header__preview-woman"/>
            </Slider>
        </header>
    );
};

export {Header};
