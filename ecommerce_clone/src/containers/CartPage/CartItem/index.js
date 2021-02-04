import React, { useState } from 'react'
import { generatePublicURL } from '../../../urlConfig';
import './style.css'
/**
* @author
* @function CartItem
**/

const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);
    const {
        _id, name, price, img
    } = props.cartItem;

    const onQuantityIncreament = () => {
        setQty(qty + 1);
        props.onQuantityInc(_id, qty + 1);
    }
    const onQuantityDecreament = () => {
        if(qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1);
    }

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className = "cartProImgContainer">
                    <img src = {generatePublicURL(img)} alt = ""></img>
                </div>
            <div className="cartItemDetails">
                <div>
                    <p>{name}</p>
                    <p>Rs. {price}</p>
                </div>
                <div>Delivery in 3 - 5 days</div>
            </div>
            </div>
            <div style = {{
                display : 'flex',
                margin : '5px 0'
            }}>
                <div className = "quantityControl">
                    <button onClick = {onQuantityDecreament}>-</button>
                    <input value = {qty} readOnly></input>
                    <button onClick = {onQuantityIncreament}>+</button>
                </div>
                <button className = "cartActionBtn">Save for later</button>
                <button className = "cartActionBtn">Remove</button>
            </div>
        </div>
    )

}

export default CartItem