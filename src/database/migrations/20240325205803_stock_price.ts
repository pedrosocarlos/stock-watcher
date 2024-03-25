import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stock_price', function (table: any) {
    table.increments('id');

    table.foreign('id').references('stock_id').inTable('stock')

    table.float('valor');

    table.date('date');
    table.timestamp('time', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('stock_price');
}