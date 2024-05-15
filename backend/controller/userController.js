const User = require("../models/User");


const getUser = async (req, res) => {
    const user_id = req.user;
    try {
        const user = await User.findOne({ _id: user_id });
        if(user){
            res.status(200).json(user)
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUser }