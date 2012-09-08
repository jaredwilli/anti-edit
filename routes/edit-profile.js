/**
 * GET editProfile
 */
 
exports.editProfile = function(req, res){
    res.render('editProfile', { 
      title: 'Edit Profile',
      name: 'Edit Profile',
      desc: "",
      author: "Jared Williams &amp; Antonio Fernandes"
    });
};