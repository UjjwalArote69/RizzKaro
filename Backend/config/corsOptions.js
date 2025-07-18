const allowedOrigins = [
  'http://localhost:5173',
  'https://rizz-karo.vercel.app',
  'https://rizzkaro-production.up.railway.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
