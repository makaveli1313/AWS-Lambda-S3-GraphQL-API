const axios = require('axios');
const dotenv = require('dotenv').config();

const config = {
  headers: {
    'x-api-key': process.env.API_KEY
  }
};

const resolvers = {
  Query: {
    locationData: async (_, args) => {
      const uri = process.env.URI.concat(args.name);
      const { data } = await axios.post(uri, args, config);
      return data;
    },
    locationNames: async (_, args) => {
      const uri = process.env.URI;
      const { data } = await axios.post(uri, args, config);
      return data;
    }
  }
};

module.exports = { resolvers };
