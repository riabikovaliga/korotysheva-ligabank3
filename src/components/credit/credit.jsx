import React from 'react';
import {Calculator} from '../calculator/calculator';
import {Map} from '../map/map';
import {Tabs} from '../tabs/tabs';

const Credit = () => {
    return (
        <main className="credit">
            <Tabs className="credit__tabs"/>
            <Calculator className="credit__calculator"/>
            <Map className="credit__map">Map</Map>
        </main>
    );
};

export {Credit};
