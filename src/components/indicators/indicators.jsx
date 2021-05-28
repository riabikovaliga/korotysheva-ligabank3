import React from 'react';
import PropTypes, {number} from 'prop-types';
import {range} from '../../utils';

const Indicators = ({className, activeIndicator, count}) => {

    return (
        <ol className={`${className} indicators`}>
            {range(count).map((index) =>
                <li className={`indicator ${activeIndicator === index && 'indicator--active'}`} key={index}/>
            )}
        </ol>
    );
};

Indicators.propTypes = {
    className: PropTypes.string.isRequired,
    activeIndicator: number.isRequired,
    count: PropTypes.number.isRequired
};

export default React.memo(Indicators);
