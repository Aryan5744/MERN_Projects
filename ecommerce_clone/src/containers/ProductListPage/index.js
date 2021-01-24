import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout'
import { generatePublicURL } from '../../urlConfig';
import './style.css'

/**
* @author
* @function ProductListPage
**/

const ProductListPage = (props) => {

    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5K : 5000,
        under10K : 10000,
        under15K : 15000,
        under20K : 20000,
        under25K : 25000,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);
    
    return (
        <Layout>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} Mobile Under {priceRange[key]}</div>
                                <button>VIEW ALL</button>
                            </div>
                            <div style = {{display : 'flex'}}>
                                {
                                    product.productsByPrice[key].map(product => <div className="productContainer">
                                        <div className="productImgContainer">
                                            <img src={generatePublicURL(product.productPictures[0].img)} alt="" />
                                        </div>
                                        <div className="productInfo">
                                            <div style={{ margin: '5px 0' }}>{product.name}</div>
                                            <div>
                                                <span>4.3</span>
                                                <span>3353</span>
                                            </div>
                                            <div className="productPrice">{product.price}</div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    );
                })
            }
        </Layout>
    )

}

export default ProductListPage