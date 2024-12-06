import fs from "node:fs"
import sql from 'better-sqlite3'
import slugify from "slugify";
import xss from "xss";
import Buffer from "next/dist/server/lib/squoosh/image_data";


const db = sql('meals.db');

export async function getMeals() {
    await new Promise((res) => setTimeout(res, 1000))
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}


export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);
    const imageName = meal.image.name
    const extension = imageName.split('.').pop();
    const fileName = `${meal.slug}.${extension}`


    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error(error)
        }
    })


    meal.image = `./images/${fileName}`
    db.prepare(`
    INSERT INTO meals
    (title, summary,instructions,creator, creator_email, image, slug)
    VALUES(
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
    )
    `).run(meal);
}