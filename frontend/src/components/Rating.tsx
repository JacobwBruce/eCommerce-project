import React from 'react';

interface Props {
    value: number;
    text?: string;
    color?: string;
}

const Rating: React.FC<Props> = ({ value, text, color }) => {
    let stars: Array<JSX.Element> = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= i + 1
                            ? 'fas fa-star'
                            : value >= i + 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                ></i>
            </span>
        );
    }

    return (
        <div className='Rating'>
            {stars} <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825',
};

export default Rating;
