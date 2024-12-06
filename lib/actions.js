'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";

function isInvalidText (text){
    return!text || text.trim() == ''
}
export async function shareMeal(formData){
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get('image'),
        creator: formData.get("name"),
        creator_email: formData.get("email")
    }

    if(isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions)||
        isInvalidText(meal.creator_email) ||
        isInvalidText(meal.creator)||
        !meal.creator_email.includes('@') ||
    !meal.image || meal.image.site === 0){
        throw new Error()
    }
   await saveMeal(meal)
    redirect((`/meals`))
}