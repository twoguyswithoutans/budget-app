import { CategoryLimit } from "models/Models";

export function AddCategoryLimit({category, limit}: CategoryLimit) {
    const getLimit = {
        category: category,
        limit: limit,
    }

    const setLimit = JSON.parse(localStorage.getItem("categoryLimit") || '[]');
    const updatedLimit = setLimit.filter((item: CategoryLimit) => item.category !== category);
    updatedLimit.push(getLimit);
    localStorage.setItem("categoryLimit", JSON.stringify(updatedLimit));
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
}

export function RemoveCategoryLimit(category: string) {
    const setLimit = JSON.parse(localStorage.getItem("categoryLimit") || '[]');
    const updatedLimit = setLimit.filter((item: CategoryLimit) => item.category !== category);
    localStorage.setItem("categoryLimit", JSON.stringify(updatedLimit));
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
}