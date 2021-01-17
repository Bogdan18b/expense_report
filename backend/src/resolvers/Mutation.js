const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mutation = {
  async signUp(parent, args, ctx, info) {
    const email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {
        email,
        name: args.name,
        password
      }
    }, info);
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },
  async createExpense(parent, args, ctx, info) {
    const expense = await ctx.db.mutation.createExpense({
      data: {...args}
    }, info);
    return expense;
  },
  async createIncome(parent, args, ctx, info) {
    const income = await ctx.db.mutation.createIncome({
      data: {...args}
    }, info);
    return income;
  }
};

module.exports = Mutation;
