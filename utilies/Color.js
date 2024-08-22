let colorScheme = 'light';

const Colors = {
    light: {
        accent: 'black',
        background: '#F7F7F7',
        cardBackground: '#fff',
        borderCard: '#F4F4F4',
        red: '#CF1B1F'
    },
    dark: {
        accent: '#fff',
        background: 'black',
        cardBackground: 'black',
        borderCard: '#F4F4F4',
        red: '#CF1B1F'
    }
}

export const getColors = (colorScheme = colorScheme) => {
    return Colors[colorScheme];
};