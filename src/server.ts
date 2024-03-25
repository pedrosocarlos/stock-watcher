import app from './app';

const PORT = process.env.PORT || 3000

console.log('The server run in development mode!')

app.listen(PORT, () => console.log('Express server listening on port ' + PORT))