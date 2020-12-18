import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
    title?: string;
    description?: string;
}

const defaultProps: Props = {
    title: 'Welcome To ProShop',
    description: 'eCommerce portfolio project',
};

const Meta: FC<Props> = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    );
};

Meta.defaultProps = defaultProps;

export default Meta;
