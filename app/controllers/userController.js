const {User} = require('../models');

exports.getAllUsers = async(req, res)=>{
    const users =  await User.findAll();
    res.render('list', {users});
}

exports.getCreateUserForm = (req, res)=>{
    res.render('create')
};

exports.createUser = async(req, res)=>{
    await User.create(req.body);
    res.redirect('/users');
};

exports.getEditUserForm = async(req, res)=>{
    const user = await User.findByPk(req.params.id);
    res.render('edit', {user});
};

exports.updateUser = async (req, res) => {
    await User.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect('/users');
};
  
exports.deleteUser = async (req, res) => {
    await User.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/users');
};

