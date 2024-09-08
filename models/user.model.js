const { v4: uuidv4 } = require("uuid");
const BaseModel = require("./basemodel");

class Users extends BaseModel {
  static get tableName() {
    return "Users";
  }

  static get idColumn() {
    return "id";
  }

  async $beforeInsert(querryContext) {
    await super.$beforeInsert(querryContext);
    this.id = this.id ? this.id : uuidv4();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "email"],
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
      },
    };
  }
}

module.exports = { Users };
