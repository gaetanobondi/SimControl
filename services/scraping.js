import axios from 'axios';

const scrapeWebsite = async (url, sessionId) => {
    try {
    
        // Configura le intestazioni della richiesta
        const config = {
          headers: {
            'Cookie': `ACCOUNT_SESSID=${sessionId}`,
          },
        };
    
        // Effettua la richiesta GET
        const response = await axios.get(url, config);
        return response.data;
      } catch (error) {
        // Gestisci gli errori
        console.error('Error fetching data:', error);
      }
};

export default scrapeWebsite;
