// const knexConfig = require("./../configDb");

const { trace } = require("../../app");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable('applications', tbl => {
    tbl.increments('id', {primaryKey: true}).notNullable();
    tbl.string('applic_tag');
    tbl.string('applic_no');
    tbl.text('applic_name');
    tbl.dateTime('applic_dob');
    tbl.integer('approv_id');
    tbl.foreign('approv_id').references('id').inTable('approvals')
  } 
  );

  await knex.schema.createTable('files', tbl => {
    tbl.increments('id', {primaryKey: true}).notNullable();
    tbl.text('file_name');
    tbl.string('file_no', 20)
    tbl.text('file_type');
    tbl.string('file_yr');
    tbl.string('file_tag');
    tbl.dateTime('created_at');
    tbl.integer('user_id');
    tbl.integer('applic_id');
    tbl.foreign('user_id').references('id').inTable('users');
    tbl.foreign('applic_id').references('id').inTable('applications');
  });

  await knex.schema.createTable('users', tbl => {
    tbl.increments('id', {primaryKey: true}).notNullable();
    tbl.string('user_key', 20);
    tbl.datetime('created_at');
  });

  await knex.schema.createTable('applic_address', tbl => {
    tbl.integer('address_id').notNullable();
    tbl.integer('applic_id').notNullable();
    tbl.primary(['applic_id', 'address_id']);
    tbl.foreign('applic_id').references('id').inTable('applications');
    tbl.foreign('address_id').references('id').inTable('addresses');
  });

  await knex.schema.createTable('names', tbl => {
    tbl.increments('id', {primaryKey: true}).notNullable();
    tbl.text('f_name', 15);
    tbl.text('l_name', 15);
    tbl.text('m-name', 15);
    tbl.integer('applic_id');
    tbl.foreign('applic_id').references('id').inTable('applications');
  });

  await knex.schema.createTable('addresses', tbl => {
    tbl.increments('id', {primaryKey: true}).notNullable();
    tbl.integer('house_no', 10);
    tbl.string('street_name');
    tbl.text('state', 15);
    tbl.string('country');
    tbl.integer('country_code');
  });

  await knex.schema.createTable('phones', tbl => {
    tbl.increments('id', {primaryKey: true}).notNullable();
    tbl.integer('phone_no');
    // tbl.string('phone_make')
    
  });
  await knex.schema.createTable('approvals', tbl => {
    tbl.integer('id', {primaryKey: true}).notNullable();
    tbl.string('approv_type');
    tbl.dateTime('created_at');
    tbl.text('approv_do');
    tbl.integer('dcb_no');
  });

  await knex.schema.createTable('images', tbl => {
    tbl.increments('id').notNullable();
    //tbl.string('img_url', 255);
    tbl.string('img_human_name', 30);
    //tbl.text('img_name');
    tbl.string('img_tag');
    tbl.integer('size').notNullable();
    tbl.string('img_path', 80).notNullable();
    tbl.string('mime_type', 10).notNullable();
    tbl.integer('file_id');
    tbl.foreign('file_id').references('id').inTable('files');
    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  await knex.schema.dropTableIfExists('users')
  // await knex.schema.createTable('approvals');
  // await knex.schema.createTable('applications');
  // await knex.schema.createTable('addresses');
  // await knex.schema.createTable('names');
  // await knex.schema.createTable('applic_addresses');
  // await knex.schema.createTable('users');
  // await knex.schema.createTable('files');
  // await knex.schema.createTable('images');
};
