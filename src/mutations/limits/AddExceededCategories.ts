import { ExceededCategories } from "models/Models";

export function AddExceededCategories({ category }: ExceededCategories) {
    const getExceededCategories = {
        category: category
    }

    const updatedExceededCategories = [getExceededCategories];
    localStorage.setItem("exceededCategories", JSON.stringify(updatedExceededCategories));
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
}