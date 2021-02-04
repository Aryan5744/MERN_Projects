import React from 'react'
import Layout from '../../components/Layout'
import './style.css'
import ProductStore from './ProductStore'
import getURLParams from '../../utils/getURLParams'
import ProductPage from './ProductPage'

/**
* @author
* @function ProductListPage
**/

const ProductListPage = (props) => {

    const renderProduct = () => {
        const params = getURLParams(props.location.search);
        let content = null;
        switch (params.type){
            case 'store':
                content = <ProductStore {...props}/>;
            break;
            case 'page':
                content = <ProductPage {...props}/>;
            break;
            default : 
                content = null;
        } 
        return content;
    }
    return (
        <Layout>
            {renderProduct()}
        </Layout>
    );
}

export default ProductListPage