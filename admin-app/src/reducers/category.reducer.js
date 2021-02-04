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
                type : newCategory.type,
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
                type : newCategory.type,
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
                ...initialState,
                loading: false,
                error : action.payload.error
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}