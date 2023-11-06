import * as React from 'react';
import {ListItem, Teams as TeamsType} from 'types';
import {filterByName} from 'utils/filterUtils';
import FilterInput from 'components/FilterInput';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

function mapTeamsToItems(teams: TeamsType[]): ListItem[] {
  return teams.map(team => ({
    id: team.id,
    url: `/team/${team.id}`,
    columns: [
      {
        key: 'Name',
        value: team.name,
      },
    ],
    navigationProps: team,
  }));
}

const Teams: React.FC = () => {
  const [teams, setTeams] = React.useState<TeamsType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [filter, setFilter] = React.useState(''); // State to hold the filter input

  React.useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetchTeams();
        setTeams(response);
      } catch (error) {
        setErrorMessage(`Failed to fetch team data: ${error.message}`);
      }
      setIsLoading(false);
    };
    getTeams();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredTeams = filterByName(teams, filter);

  return (
    <Container>
      <Header title="Teams" showBackButton={false} />
      <FilterInput
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by name..."
      />
      <List items={mapTeamsToItems(filteredTeams)} isLoading={isLoading} />
      {errorMessage && <span>{errorMessage}</span>}
    </Container>
  );
};

export default Teams;
