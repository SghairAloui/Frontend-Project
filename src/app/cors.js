// cors.js
module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise l'accès à partir de n'importe quelle origine
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Intercepte les requêtes OPTIONS et envoie une réponse
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next(); // Passe au prochain middleware
    }
  };
  