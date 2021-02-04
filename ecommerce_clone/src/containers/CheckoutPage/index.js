import React, { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import { cartConstants } from "../../actions/constants";
import Layout from "../../components/Layout";
import {
    Anchor,
    MaterialButton,
    MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";

/**
* @author
* @function CheckoutPage
**/

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
}

const CheckoutPage = (props) => {

    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onAddressSubmit = () => {

    }

    useEffect(() => {
        dispatch(getAddress());
    }, []);

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            <div className="loggedInId">
                                <span style={{ fontWeight: 500 }}>{auth.user.fullname}</span>
                                <span style={{ margin: '0 5px' }}>{auth.user.email}</span>
                            </div>
                        }
                    />
                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={true}
                        body={
                            <>
                                {
                                    user.address.map(adr => 
                                        <div className = "flexRow addressContainer">
                                            <div>
                                                <input name = "address" type = "radio"></input>
                                            </div>
                                            <div className = "flexRow sb addressinfo">
                                                <div>
                                                    <div>
                                                        <span>{adr.name}</span>
                                                        <span>{adr.addressType}</span>
                                                        <span>{adr.mobileNumber}</span>
                                                    </div>
                                                    <div>
                                                        {adr.address}
                                                    </div>
                                                    <MaterialButton
                                                    title = "DELIVER HERE"
                                                    style = {{
                                                        width : '250px'
                                                    }}/>
                                                </div>
                                                <div>edit</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        }
                    />
                    <AddressForm
                    onSubmitForm = {onAddressSubmit}
                    onCancle = {() => {}}
                    />
                    <CheckoutStep
                    stepNumber = {'3'}
                    title = {'ORDER SUMMARY'}
                    />
                    <AddressForm
                    stepNumber = {'4'}
                    title = {'PAYMENT OPTIONS'}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default CheckoutPage