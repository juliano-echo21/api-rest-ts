import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AlterPublications extends BaseSchema {
  protected tableName = "publicaciones";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("alternative_text").nullable();
    });
  }

  public async down() {
    // this.schema.alterTable(this.tableName)
  }
}
