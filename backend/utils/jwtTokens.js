// creating this file so that we dont have to write the same code again n again
// userController
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   token,
  // });

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};


module.exports = sendToken