const { app } = require('./app');
const { SERVER_PORT } = require('./environment');

const PORT = SERVER_PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
