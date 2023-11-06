import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Container} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
}

const Card: React.FC<Props> = ({
    id,
    columns,
    url = '#',
    hasNavigation = true,
    navigationProps = {},
}) => {
    const navigate = useNavigate();
    const getInitials = (name = '') => {
        return name
            .split(' ')
            .slice(0, 2)
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    };

    const avatarEntry = columns.find(({key}) => key === 'Avatar');
    const [avatarUrl, setAvatarUrl] = React.useState(avatarEntry ? avatarEntry.value : '');
    const displayNameEntry = columns.find(({key}) => key === 'Name');
    const locationEntry = columns.find(({key}) => key === 'Location');
    const teamLeadEntry = columns.find(({key}) => key === 'Team Lead');
    const displayName = displayNameEntry ? displayNameEntry.value : '';
    const initials = getInitials(displayName);
   

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (hasNavigation && url) {
            navigate(url, {
                state: navigationProps,
            });
        }
        e.preventDefault();
    };

    React.useEffect(() => {
        const img = new Image();
        img.onload = () => setAvatarUrl(avatarEntry.value);
        img.onerror = () => setAvatarUrl('');
        if (avatarEntry && avatarEntry.value) {
            img.src = avatarEntry.value;
        }
    }, [avatarEntry]);

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={handleClick}
            tabIndex={hasNavigation ? 0 : undefined}
            role={hasNavigation ? 'button' : undefined}
        >
            {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" style={{width: '100px', height: '100px'}} />
            ) : (
                <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#737373',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    borderRadius: '50%',
                }}>
                    {initials}
                </div>
            )}
            {teamLeadEntry && <p>Team Lead</p>}
            {displayNameEntry && <p>{displayNameEntry.value}</p>}
            {locationEntry && <p>{locationEntry.key}: {locationEntry.value}</p>}
        </Container>
    );
};

export default Card;
