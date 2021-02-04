import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getAllCategory, addCategory, updateCategories, deleteCategories } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/UI/Modal';
import CheckBoxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosAdd,
    IoIosTrash,
    IoIosCreate
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoriesModal from './components/AddCategoriesModal';
import DeleteCategoriesModal from './components/DeleteCategoriesModal';
import './style.css'
/**
* @author
* @function Category
**/

const Category = (props) => {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!category.loading){
            setShow(false);
        }
    }, [category.loading]);

    const handleClose = () => {

        const form = new FormData();
        if(categoryName === ""){
            alert("Please enter Category Name");
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        setCategoryName('');
        setParentCategoryId('');

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ 
                value: category._id, 
                name: category.name, 
                parentId: category.parentId,
                type : category.type 
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updatedCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updatedCheckedAndExpandedCategories = () => {
        const categoryList = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const _category = categoryList.find((category, _index) => categoryId == category.value);
            _category && checkedArray.push(_category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const _category = categoryList.find((category, _index) => categoryId == category.value);
            _category && expandedArray.push(_category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type = "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updatedCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteSelectedCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        // const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        // const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategories(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory());
                        setDeleteCategoryModal(false);
                    }
                });
        }
        setDeleteCategoryModal(false);
    }

    const categoryList = createCategoryList(category.categories);
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions : </span>
                                <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash/><span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCreate/><span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckBoxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <AddCategoriesModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                handleCategoryImage={handleCategoryImage}
                categoryList={categoryList}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Category'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            <DeleteCategoriesModal
                show={deleteCategoryModal}
                modalTitle={'Confirm'}
                handleClose={() => setDeleteCategoryModal(false)}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                deleteSelectedCategories={deleteSelectedCategories}
            />
        </Layout>
    )
}

export default Category