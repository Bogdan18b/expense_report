
const Query = {
  currentUser(parent, args, ctx, info) {
    console.log('uuu', ctx.request.userId)
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({where: {id: ctx.request.userId}}, info);
  },
};

module.exports = Query;
