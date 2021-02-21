
const Query = {
  currentUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({where: {id: ctx.request.userId}}, info); // get income and expense back
  },
  expenses(parent, args, ctx, info) {
    return ctx.db.query.expenses({where: {userId: args.userId}}, info); // get income and expense back
  },
  incomes(parent, args, ctx, info) {
    return ctx.db.query.incomes({where: {userId: args.userId}}, info); // get income and expense back
  },
};

module.exports = Query;
