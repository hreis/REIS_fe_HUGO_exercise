import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import TeamLeadCard from 'components/TeamLeadCard';
import {filterByFullName} from 'utils/filterUtils';
import FilterInput from 'components/FilterInput';
import {getTeamOverview, getUserData} from '../api';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const mapItems = (users: UserData[]): ListItem[] => {
    return users.map(user => {
        const columns = [
            {
                key: 'Name',
                value: `${user.firstName} ${user.lastName}`,
            },
            {
                key: 'Display Name',
                value: user.displayName,
            },
            {
                key: 'Location',
                value: user.location,
            },
            {
                key: 'Avatar',
                value: user.avatarUrl,
            },
        ];
        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    });
};

interface TeamOverviewState {
    teamLead?: UserData;
    teamMembers?: UserData[];
    teamName?: string; // hold the team name
}

const TeamOverview: React.FC = () => {
    const location = useLocation();
    const {teamId} = useParams<{ teamId: string }>(); // specify expected params
    const [pageData, setPageData] = React.useState<TeamOverviewState>({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [filter, setFilter] = React.useState<string>('');

    React.useEffect(() => {
        const fetchTeamUsers = async () => {
            try {
                if (teamId == null) {
                    throw new Error('teamId is undefined');
                }
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);
                const teamMembersPromises = teamMemberIds.map(id => getUserData(id));
                const teamMembers = await Promise.all(teamMembersPromises);
                setPageData({teamLead, teamMembers});
            } catch (error) {
                setErrorMessage(`'Failed to fetch team data: ${error.message}`);
            }
            setIsLoading(false);
        };

        fetchTeamUsers();
    }, [teamId]);

    // Ensure location.state is defined before trying to access its properties
    const teamName = location.state?.name || 'Unknown';

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const filteredTeamMembers = pageData.teamMembers
        ? filterByFullName(pageData.teamMembers, filter)
        : [];

    return (
        <Container>
            <Header title={`Team ${teamName}`} />
            <FilterInput
                value={filter}
                onChange={handleFilterChange}
                placeholder="Filter team members..."
            />
            {!isLoading && pageData.teamLead && <TeamLeadCard teamLead={pageData.teamLead} />}
            <List items={mapItems(filteredTeamMembers)} isLoading={isLoading} />
            {errorMessage && <span>{errorMessage}</span>}
        </Container>
    );
};

export default TeamOverview;
