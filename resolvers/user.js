const bcrypt = require('bcryptjs')

const { users, tasks } = require('../constants');
const User = require('../database/models/user');

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id)
  },
  Mutation: {
    signup: async (root, { input }) => {
      try {
        const userEmail = await User.findOne({ email: input.email});
        if (userEmail) throw new Error('Email already exists in db');

        const hashedPwd = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPwd });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log('!!! Error signing up a User !!!\n', error);
      }
    }
  },
  User: {
    tasks: ({ id }) => tasks.filter(task => task.userId === id)
  }
}