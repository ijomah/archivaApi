/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    await knex.schema.createTable('image', tbl => {
        tbl.increments('id').notNullable();
        tbl.string('img_url', 255);
        tbl.string('img_human_name', 30);
        tbl.text('img_name');
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
exports.down = function(knex) {
  
};
