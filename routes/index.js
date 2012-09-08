
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { 
      title: 'Anti-Edit',
      name: 'Anti Editor',
      desc: "The most dark editor in the world!",
      author: "Jared Williams &amp; Antonio Fernandes"
    });
};