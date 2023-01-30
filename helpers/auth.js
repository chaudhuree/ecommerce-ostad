const bcrypt =require("bcrypt");

exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//note:
//here password is the password given to test
//and hashed is the password stored in the database
//see auth controller login part in compare section to have clear understanding
exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
