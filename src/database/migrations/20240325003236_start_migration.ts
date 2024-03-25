import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stock', function (table: any) {
    table.increments('id');

    table.string('title');
    table.string('ticker');

    // 0 - br stock, 1 - usa stock, 2 - crypto
    table.tinyint('type');

    // 0 - active, 1 - deleted
    table.tinyint('flag_deleted');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('stock');
}