import Card from 'components/Card';
import React from 'react';
import {UserData} from 'types';

interface TeamLeadProps {
    teamLead: UserData;
}

const TeamLeadCard: React.FC<TeamLeadProps> = ({teamLead}) => {
    const columns = [
        {
            key: 'Team Lead',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];

    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} data-testid={`cardContainer-${teamLead.id}`} />;
};

export default TeamLeadCard;