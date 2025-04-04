import classes from "./page.module.css"
import Image from "next/image";
import {getMeal} from "@/lib/meals";
import {notFound} from "next/navigation";

export default function MealDetails({params}) {

    const meal = getMeal(params.slug)

    meal.instructions = meal.instructions.replace(/\n/g, '<br/>');

    if (!meal) {
        notFound();
    }

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>TITLE</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{__html: meal.instructions}}>
                </p>
            </main>


        </>
    )
}