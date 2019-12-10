// Production specific configuration
// =================================
export default {
  allowedOrigins: [
    'https://your-site.com',
  ],

  mongo: {
    uri: 'mongodb://mongo/MercadoLibre'
  },

  // Server IP
  ip: process.env.IP || undefined,

  // Server port
  port: process.env.PORT || 8080,

};
