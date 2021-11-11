const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
    }
);

/**
 * Encrypt the password of the user
 */
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Verify that the user exists and that the given password is correct
 * @param pseudo the user's pseudo
 * @param email the user's email
 * @param password the user's password
 * @return the user
 */
userSchema.statics.login = async function(pseudo, email, password) {
    const user = await this.findOne({ pseudo }) || this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect pseudo or email');
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;