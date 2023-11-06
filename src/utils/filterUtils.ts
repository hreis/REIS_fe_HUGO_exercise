import {UserData} from 'types';

export const filterByName = (items: any[], filterText: string) => {
    return filterText
        ? items.filter((item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase())
        )
        : items;
};

export const filterByFullName = (users: UserData[], filterText: string) => {
    if (!filterText) {return users;}

    const lowercasedFilter = filterText.toLowerCase();

    return users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowercasedFilter)
    );
};
