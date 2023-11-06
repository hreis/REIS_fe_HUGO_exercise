import * as React from 'react';
import {ListItem} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

const List: React.FC<Props> = ({items, hasNavigation = true, isLoading}) => {
    if (isLoading) {
        return (
            <Container>
                <Spinner />
            </Container>
        );
    }

    if (!items?.length) {
        return (
            <Container>
                <p>No items to display.</p>
            </Container>
        );
    }

    return (
        <Container>
            {items.map(({url, id, columns, navigationProps}) => (
                <Card
                    key={id}
                    id={id}
                    columns={columns}
                    navigationProps={navigationProps}
                    hasNavigation={hasNavigation}
                    url={url}
                />
            ))}
        </Container>
    );
};

export default List;
