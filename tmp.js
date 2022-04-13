const bcrypt = require('bcrypt')

async function testHash() {
  //When we store the password in the database, we store the HASH of the password
  //
  const hash = await bcrypt.hash("cohort4", 10)

  console.log("hash:", hash)

 /*$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
  |  |  |                      |
  |  |  |                      hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
  |  |  |
  |  |  salt = nOUIs5kJ7naTuTFkBy1veu
  |  |
  |  cost-factor => 10 = 2^10 rounds
  |
  hash-algorithm identifier => 2b = BCrypt
  */

  /*
   mike     => [salt]kjsdhjyhse32342
   password => hshskbek32432
   fred     => 344Fsfere32342

  */

  const username = "mike"
  const password = "cohort5"

  //When we want to check if the user has provided the correct
  //password - we can use bcrypt.compare - this will compare the
  //hash of the plaintext password to the stored hash 
  const areEqual = await bcrypt.compare(password, hash)
  if (areEqual) {
    console.log("Password valid!")
  }
  else {
    console.log("NOT VALID!")
  }
}

testHash()

// Note that both techniques achieve the same end-result.

// To check a password:
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//   // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//   // result == false
// });