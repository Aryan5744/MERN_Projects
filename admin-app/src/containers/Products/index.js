import React, { useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import { addProduct } from '../../actions';
import Modal from '../../components/UI/Modal'
import './style.css';
import {generatePublicURL} from '../../urlConfig';
/**
* @author
* @function Products
**/

const Products = (props) => {

  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false); 
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append('name', productName);
    form.append('quantity', productQuantity);
    form.append('price', productPrice);
    form.append('description', productDescription);
    form.append('category', productCategoryId);

    for (let image of productPictures) {
      form.append('productPictures', image);
    }

    dispatch(addProduct(form));

    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const renderProducts = () => {
    return (
      <Table style = {{fontSize : 12}} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0
              ? product.products.map(product =>
                <tr onClick = {() => showProductDetailsModal(product)} key = {product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category ? product.category.name : "-" }</td>
                </tr>
              ) : null
          }
        </tbody>
      </Table>
    );
  }

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Product'}
      >
        <Input
          value={productName}
          placeholder={'Product Name'}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          value={productQuantity}
          placeholder={'Product Quantity'}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <Input
          value={productPrice}
          placeholder={'Product Price'}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <Input
          value={productDescription}
          placeholder={'Product Description'}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <select className="form-control"
          value={productCategoryId}
          onChange={(e) => setProductCategoryId(e.target.value)}>
          <option>Select Category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>
                {option.name}
              </option>)
          }
        </select>
        {
          productPictures.length > 0
            ? productPictures.map((pic, index) => <div key={index}> {pic.name} </div>)
            : null
        }
        <input type="file" name="productPictures" onChange={handleProductPictures} />
      </Modal>
    );
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  }

  const renderProductDetailsModal = () => {
    console.log(productDetails);

    if(!productDetails){
      return null;
    }

    return (
      <Modal 
       show = {productDetailModal}
       handleClose = {handleCloseProductDetailsModal}
       modalTitle = {'Product Details'}
       size = "lg">
        <Row>
          <Col md = "6">
            <label className = "key">Name</label>
            <p className ="value">{productDetails.name}</p>
          </Col>
          <Col md = "6">
            <label className = "key">Price</label>
            <p className ="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md = "6">
            <label className = "key">Quantity</label>
            <p className ="value">{productDetails.quantity}</p>
          </Col>
          <Col md = "6">
            <label className = "key">Category</label>
            <p className ="value">{productDetails.category ? productDetails.category.name : "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md = "12">
            <label className = "key">Description</label>
            <p className ="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className = "key">Product Pictures</label>
            <div style = {{display : 'flex'}}>
            {productDetails.productPictures.map(picture =>
            <div className = "productImageContainer">
              <img src = {generatePublicURL(picture.img)}/>
            </div>  
            )}
            </div>
          </Col>
        </Row>
       </Modal>
    );
  }
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  )
}
export default Products