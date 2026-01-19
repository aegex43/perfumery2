import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const perfumes = sqliteTable('perfumes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    brand: text('brand').notNull(),
    price2ml: real('price_2ml').notNull(),
    price6ml: real('price_6ml').notNull(),
    price8ml: real('price_8ml').notNull(),
    price30ml: real('price_30ml').notNull(),
    retailPrice: real('retail_price').notNull(),
    inspiration: text('inspiration'),
    bottleImage: text('bottle_image'),
    notesImage: text('notes_image'),
    scentProfileImage: text('scent_profile_image'),
});
