import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../../actions';
import { generatePublicURL } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5K: 5000,
        under10K: 10000,
        under15K: 15000,
        under20K: 20000,
        under25K: 25000,
        under50K: 50000,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${props.match.params.slug} Mobile Under ${priceRange[key]}`}
                            headerRight={<button>VIEW ALL</button>}
                            style = {{
                                width : 'calc(100% - 40px)',
                                margin : '20px'
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{
                                                display: 'block'
                                            }} className="productContainer">
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
                                        </Link>)
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </>
    );
}
export default ProductStore