/**
 * GET dashboard
 */
 
exports.dashboard = function(req, res){
    res.render('dashboard', { 
      title: 'Dashboard',
      name: 'Anti Editor',
      desc: "",
      author: "Jared Williams &amp; Antonio Fernandes"
    });
};