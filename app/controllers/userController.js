const {User} = require('../models');

// get all user
exports.getAllUsers = async(req, res)=>{
    try {
        const users = await User.findAll();
        // res.render('list', {users}); // return to views
        res.status(200).json(users); // return to api response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

// find by id user
exports.getUserById = async (req, res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

// create user on form html view
exports.getCreateUserForm = (req, res)=>{
    res.render('create')
};

// create user
exports.createUser = async(req, res)=>{
    try {
        // await User.create(req.body);
        // res.redirect('/users'); // return to views
        const newUser = await User.create(req.body);
        res.status(201).json(newUser); // return to api response
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// edit user on form html
exports.getEditUserForm = async(req, res)=>{
    const user = await User.findByPk(req.params.id);
    res.render('edit', {user});
};

// update user 
exports.updateUser = async (req, res) => {
    // update user based on form html view
    // await User.update(req.body, {
    //   where: { id: req.params.id }
    // });
    // res.redirect('/users');

    // update user on rest api
    try{
        const [updated] = await User.update(req.body,{
            where : {id: req.params.id}
        });

        if(!updated){
            return res.status(404).json({ message: 'User not found' });
        }

        const updateUser = await User.findByPk(req.params.id) 
        res.status(200).json(updateUser);
    }catch(error){
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    // Delete user on html view
    // await User.destroy({
    //   where: { id: req.params.id }
    // });
    // res.redirect('/users');
    try{
        const deleted = await User.destroy({
            where: {id : req.params.id}
        });

        if(!deleted){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).json();

    }catch(error){
        res.status(500).json({ message: 'Error deleting user', error });
    }   
};

