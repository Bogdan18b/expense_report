
const Query = {
  currentUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({where: {id: ctx.request.userId}}, info);
  },
  expenses(parent, args, ctx, info) {
    return ctx.db.query.expensesConnection({where: {userId: args.userId}}, info);
  },
  incomes(parent, args, ctx, info) {
    return ctx.db.query.incomesConnection({where: {userId: args.userId}}, info);
  },
};

module.exports = Query;
