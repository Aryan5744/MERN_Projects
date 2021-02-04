import React from 'react'
import { addAddress } from '../../actions';
import { MaterialButton } from '../../components/MaterialUI';

/**
* @author
* @function AddressForm
**/

const AddressForm = (props) => {

    const { initialData } = props;
    const [name, setName] = useState(initialData ? initialData.name : "");
    const [mobileNumber, setMobileNumber] = useState(
        initialData ? initialData.mobileNumber : ""
    );
    const [pinCode, setPinCode] = useState(
        initialData ? initialData.pinCode : ""
    );
    const [locality, setLocality] = useState(
        initialData ? initialData.locality : ""
    );
    const [address, setAddress] = useState(
        initialData ? initialData.address : ""
    );
    const [cityDistrictTown, setCityDistrictTown] = useState(
        initialData ? initialData.cityDistrictTown : ""
    );
    const [state, setState] = useState(initialData ? initialData.state : "");
    const [landmark, setLandmark] = useState(
        initialData ? initialData.landmark : ""
    );
    const [alternatePhone, setAlternatePhone] = useState(
        initialData ? initialData.alternatePhone : ""
    );
    const [addressType, setAddressType] = useState(
        initialData ? initialData.addressType : ""
    );
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "");

    const inputContainer = {
        width: '100%',
        marginRight: 10
    };

    const onAddressSubmit = (e) => {
        const payload = {
            address: {
                name,
                mobileNumber,
                pinCode,
                locality,
                address,
                cityDistrictTown,
                state,
                landmark,
                alternatePhone,
                addressType
            }
        }
        dispatch(addAddress(payload));
    }

    return (
        <div className="checkoutStep" style={{ background: '#f5faff' }}>
            <div className={'checkoutHeader'}>
                <div>
                    <span className="stepNumber">+</span>
                    <span className="stepTitle">{'ADD NEW ADDRESS'}</span>
                </div>
            </div>
            <div style={{
                padding: '0 60px',
                paddingBottom: '20px',
                boxSizing: 'border-box'
            }}>
                <div className="flexRow">
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="10-digit mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="Pincode"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="Locality"
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="City/District/Town"
                            value={cityDistrictTown}
                            onChange={(e) => setCityDistrictTown(e.target.value)}
                        />
                    </div>
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="Landmark (Optional)"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                        />
                    </div>
                    <div style={{ inputContainer }}>
                        <MaterialButton
                            label="Alternate Phone (Optional)"
                            value={alternatePhone}
                            onChange={(e) => setAlternatePhone(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label>Address Type</label>
                    <div className="flexRow">
                        <div>
                            <input
                                type="radio"
                                onClick={() => setAddressType('home')}
                                name="addressType"
                                value="home"
                            />
                            <span>Home</span>
                        </div>
                        <div>
                            <input
                                type="radio"
                                onClick={() => setAddressType('work')}
                                name="addressType"
                                value="work"
                            />
                            <span>Work</span>
                        </div>
                    </div>
                </div>
                <div className="flexRow">
                    <MaterialButton
                        title={"SAVE AND DELIVER HERE"}
                        onClick={onAddressSubmit}
                        style={{
                            width: '250px',
                            margin: '20px 0'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddressForm