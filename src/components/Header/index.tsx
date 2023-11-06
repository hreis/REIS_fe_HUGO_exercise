import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            // scenario where there's no history
            navigate('/home');
        }
    };

    return (
        <HeaderContainer as="header">
            <NavigationHeader as="nav">
                {showBackButton && (
                    <BackButton
                        onClick={handleBack}
                        aria-label="Go back"
                        role="button"
                        tabIndex={0}
                    >
                        <span aria-hidden="true">🔙</span>
                    </BackButton>
                )}
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
