var db = require('../models');

// GET /markers
function index(req, res) {
  db.AstroLog.find({},'longitude latitude', function(err,allAstroLogs){
  	var lat_lng= allAstroLogs
   res.send(lat_lng);
   
  });
};



// CAREFUL THIS PURGES THE ASTROLOG DB, IMAGINE A BIG RED BUTTON HERE!!!
//  function destroy (req, res) {
// 	db.AstroLog.remove({ },function(err,allAstroLogs){
//    res.send(allAstroLogs);
	
// });
// };

 module.exports = {
  index: index,

}

 // destroy: destroy