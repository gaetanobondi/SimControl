let colorScheme = 'light';

const Colors = {
    light: {
        accent: 'black',
        background: '#F7F7F7',
        cardBackground: '#fff',
        borderCard: '#F4F4F4'
    },
    dark: {
        accent: '#fff',
        background: 'black',
        cardBackground: 'black',
        borderCard: '#F4F4F4'
    }
}

export const getColors = (colorScheme = colorScheme) => {
    return Colors[colorScheme];
};