exports.endpoints = {
    '/api': {
      'GET /api': {
        description: 'This endpoint lists all available enpoints on the server',
      },
      '/stock': {
        'GET /api/stock': {
          description: 'This endpoint returns all the stock on the server',
        },
        'POST /api/stock': {
          description: 'This enpoint allows the user to add stock to the server',
        },
      },
    },
  };
  