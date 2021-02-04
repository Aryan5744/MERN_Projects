import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import linearCategories from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import categoryReducer from '../../reducers/category.reducer';
import { createPage } from '../../actions'
/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    useEffect(() => {
        if (!page.loading) {
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDescription('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const onCategoryChange = (e) => {
        const cat = categories.find(category => category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(cat.type);
    }
    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }
    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }
    const showCreateModal = () => setCreateModal(true);

    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if (title === "") {
            alert('Please enter the Title');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('category', categoryId);
        form.append('type', type);

        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        dispatch(createPage(form));
    }
    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit = {submitPageForm}
                >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value=""> Select Category </option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    )
                                }
                            </select> */}
                            <Input
                            type = 'select'
                            value = {categoryId}
                            onChange = {onCategoryChange}
                            options = {categories}
                            placeholder = {'Select Category'}
                            >
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className="form-control-sm"
                            >
                            </Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={'Description'}
                                className="form-control-sm"
                            >
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        {
                            banners.length > 0
                                ? banners.map((banner, index) =>
                                    <Row key={index}>
                                        <Col>{banner.name}</Col>
                                    </Row>
                                )
                                : null
                        }
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            >
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.length > 0
                                ? products.map((product, index) =>
                                    <Row key={index}>
                                        <Col>{product.name}</Col>
                                    </Row>
                                )
                                : null
                        }
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="product"
                                onChange={handleProductImages}
                            >
                            </Input>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    }
    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p> Creating Page... </p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <button onClick={showCreateModal}> button </button>
                    </>
            }
        </Layout>
    )

}

export default NewPage