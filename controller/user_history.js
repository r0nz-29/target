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
      userHistory = await User.findOne({ username: username });
    response.status(200).json({ data: userHistory, msg: 'Got user history' });
  } catch (error) {
    response.status(500).json({ err: 'Failed to get user history' });
  }
}

exports.saveUserHistory = async (req, res) => {
  const {username, history} = req.body;
  console.log(username, history)
  try {
    const userFromDb = await User.findOne({username});
    userFromDb.gameHistory.push({...history, errorCount: history.errors});
    await userFromDb.save();
    res.status(200).json({ data: userFromDb, msg: 'Saved user history' })
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Failed to save user history' });
  }
}