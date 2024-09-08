const { addAuditTrails } = require("../helpers/migrationaudit.js");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", async (table) => {
    table.uuid("id").primary().index();
    table.string("firstName").notNullable().index();
    table.string("lastName").nullable().defaultTo(null).index();
    table.string("email").unique().notNullable().index();
    table.string("password").notNullable().index();
    addAuditTrails(table);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
