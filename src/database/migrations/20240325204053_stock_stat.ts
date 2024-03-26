import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stock_info', function (table: any) {
    table.increments();

    table.foreign('id').references('stock_id').inTable('stock')

    table.float('div_yield');
    table.float('p_l');
    table.float('roe');
    table.float('roic');
    table.float('ev_ebit');

    table.decimal('rank_ev_ebit')
    table.decimal('rank_roic')
    table.decimal('rank_final')
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('stock_info');
}