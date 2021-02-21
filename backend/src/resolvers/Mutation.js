const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');
const {transport, sendEmail} = require('../mail');

const maxAge = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password
      }
    }, info);
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },
  async signIn(parent, args, ctx, info) {
    const {email, password} = args;
    const user = await ctx.db.query.user({where: {email}})
    if (!user) {
      throw new Error(`no user found with email ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`invalid password`);
    }
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge,
    });
    return user;
  },
  async signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return {message: 'You have signed out successfully!'};
  },
  async requestPasswordReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({where: {email: args.email}});
    if (!user) {
      throw new Error(`no user found with email ${args.email}`);
    }
    const randomBytesPromise = promisify(randomBytes);
    const resetToken = (await randomBytesPromise(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 1000 * 60  * 60;
    const res = await ctx.db.mutation.updateUser({
      where: {email: args.email},
      data: {resetToken, resetTokenExpiry}
    });

    const mailRes = await transport.sendMail({
      from: 'bogdan@me',
      to: user.email,
      subject: "Password reset link",
      html: sendEmail(`Click the <a href="${process.env.FRONTEND_URL}/reset?rt=${resetToken}">link</a> to reset your password. The link will expire in one hour!`)
    })
    return {message: 'Check your email for a reset link!'};
  },
  async resetPassword(parent, args, ctx, info) {
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 1000 * 60 * 60
      }
    });
    if (!user) {
      throw new Error('This token is invalid or expired!');
    } 
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {email: user.email},
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      }
    })
    const token = jwt.sign({userId: updatedUser.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge
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
  },
  async updateIncome(parent, {id, amount, category, comments}, ctx, info) {
    const income = await ctx.db.mutation.updateIncome({
      where: {id},
      data: {amount, category, comments}
    }, info);
    return income;
  },
  async updateExpense(parent, {id, amount, category, comments}, ctx, info) {
    const income = await ctx.db.mutation.updateExpense({
      where: {id},
      data: {amount, category, comments}
    }, info);
    return income;
  },
  async deleteIncome(parent, {id}, ctx, info) {
    const income = await ctx.db.mutation.deleteIncome({
      where: {id},
    }, info);
    return income;
  },
  async deleteExpense(parent, {id}, ctx, info) {
    const income = await ctx.db.mutation.deleteExpense({
      where: {id},
    }, info);
    return income;
  },
};

module.exports = Mutation;
