const User = require('../models/user');

exports.saveUser = async (request, response) => {
  try {
    const newUser = new User(request.body);
    await newUser.save();

    response.status(200).json({ msg: 'Data saved successfully' });
  } catch (error) {
    response.status(500).json(error);
  }
}

exports.getUserHistory = async (request, response) => {
  let username = request.query.username;
  try {
    let userHistory;
    if (username) 
      userHistory = await User.find({ username: username });

    response.status(200).json({ data: userHistory, msg: 'Got user history' });
  } catch (error) {
    response.status(500).json({ err: 'Failed to get user history' });
  }
}
