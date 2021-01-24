import { act } from "react-dom/test-utils";
import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (_parentId, existingCategories, newCategory) => {
    let myCategories = [];

    if (_parentId == undefined) {
        return [
            ...existingCategories,
            {
                _id: newCategory._id,
                name: newCategory.name,
                slug: newCategory.slug,
                children: []
            }
        ];
    }
    for (let cat of existingCategories) {
        if (cat._id == _parentId) {
            const newCategoryObject = {
                _id: newCategory._id,
                name: newCategory.name,
                slug: newCategory.slug,
                parentId: newCategory.parentId,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategoryObject] : [newCategoryObject] 
            });
        }
        else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(_parentId, cat.children, newCategory) : []
            });
        }
    }
    return myCategories;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;

        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const _newCategory = action.payload.newCategory;
            const updatedCategories = buildNewCategories(_newCategory.parentId, state.categories, _newCategory);
            console.log(updatedCategories);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;

        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initialState
            }
            break;
    }
    return state;
}