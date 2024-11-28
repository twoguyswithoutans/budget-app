import { ExceededCategory } from "models/Models";

export function AddExceededCategory({ category }: ExceededCategory) {
    const getExceededCategory = {
        category: category
    }

    const updatedExceededCategory = getExceededCategory;
    localStorage.setItem("exceededCategory", JSON.stringify(updatedExceededCategory));
    window.location.reload();
}

export function GetExceededCategory() {
    const exceededCategory = localStorage.getItem('exceededCategory');
    if(exceededCategory) {
        const parsedExceededCategory = JSON.parse(exceededCategory);
        return parsedExceededCategory.category;
    }
    return null;
}