const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch(error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // step1 - fetch the user using the email
            const user  =  await this.userRepository.getByEmail(email);
            //step2 - compare incoming password with the encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log("Password doesnot match");
                throw {error: 'Incorrect Password'};
            }
            //step3 - if password matches then create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch(error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'};
            }
            const user = this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corressponding token exists'};
            } 
            return user.id;
        } catch(error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    } 

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch(error) {
            console.log("Somthing went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch(error) {
            console.log("Something went wrong in the token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassWord) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassWord);
        } catch(error) {
            console.log("Something went wrong in comparison password");
            throw error;
        } 
    }
}

module.exports = UserService;