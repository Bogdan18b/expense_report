
const Query = {
  async expenses(parent, args, ctx, info) {
    const expenses = await ctx.db.query.expenses();
    return expenses;
  }
};

module.exports = Query;
