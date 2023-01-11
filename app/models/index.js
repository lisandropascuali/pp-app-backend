const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: process.env.SEQUELIZE_HOST,
  dialect: process.env.DB_DIALECT,
  protocol: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
}
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.subscription = require("../models/subscription.model.js")(sequelize, Sequelize);
db.subscriptionState = require("../models/subscriptionState.model.js")(sequelize, Sequelize);
db.transaction = require("../models/transaction.model.js")(sequelize, Sequelize);
db.transactionState = require("../models/transactionState.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.changePasswordToken = require("../models/changePasswordToken.model.js")(sequelize, Sequelize);
db.subscriptionStateHistoric = require("../models/subscriptionStateHistoric.model.js")(sequelize, Sequelize);
db.milestone = require("./milestone.model.js")(sequelize, Sequelize);
db.activity = require("./activity.model.js")(sequelize, Sequelize);
//db.event = require("../models/event.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.user.belongsToMany(db.user, {
  through: "UserReferred",
  as: "ReferrerUser",
  foreignKey: "ReferrerUserId"
});
db.user.belongsToMany(db.user, {
  through: "UserReferred",
  as: "ReferredUser",
  foreignKey: "ReferredUserId"
});
db.subscription.belongsTo(db.user,{
  foreignKey: 'userId', targetKey: 'id'
});
db.subscriptionState.belongsTo(db.subscription,{
  foreignKey: 'subscriptionId', targetKey: 'id'
});
db.milestone.belongsToMany(db.user, {
  through: "user_milestones",
  foreignKey: "milestoneId",
  otherKey: "userId"
});
db.user.belongsToMany(db.milestone, {
  through: "user_milestones",
  foreignKey: "userId",
  otherKey: "milestoneId"
});
db.activity.belongsTo(db.user,{
  foreignKey: 'userId', targetKey: 'id'
});
db.subscriptionStateHistoric.belongsTo(db.subscription,{
  foreignKey: 'subscriptionId', targetKey: 'id'
});
db.transaction.belongsTo(db.user,{
  foreignKey: 'userId', targetKey: 'id'
});
db.transactionState.belongsTo(db.transaction,{
  foreignKey: 'transactionId', targetKey: 'id'
});
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.transaction.belongsTo(db.subscription, {
  foreignKey: 'subscriptionId', targetKey: 'id'
});
db.changePasswordToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});
db.subscription.hasOne(db.transaction, {
  foreignKey: 'subscriptionId', targetKey: 'id'
});
db.user.hasOne(db.changePasswordToken, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.subscription, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.transaction, {
  foreignKey: 'userId', targetKey: 'id'
});
db.subscription.hasOne(db.subscriptionState, {
  foreignKey: 'subscriptionId', targetKey: 'id'
});
db.user.hasMany(db.activity, {
  foreignKey: 'userId', targetKey: 'id'
});
db.subscription.hasMany(db.subscriptionStateHistoric, {
  foreignKey: 'subscriptionId', targetKey: 'id'
});
db.transaction.hasOne(db.transactionState, {
  foreignKey: 'transactionId', targetKey: 'id'
});
db.ROLES = ["user", "admin"];
module.exports = db;
