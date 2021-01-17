const Mutation = {
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
