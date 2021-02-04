import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Container, Row, Col } from 'react-bootstrap';
const DeleteCategoriesModal = (props) => {
    const{
        show,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        deleteSelectedCategories
    } = props

    return (
        <Modal
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
            buttons={[
                {
                    label: 'No',
                    color: 'primary',
                    onClick: () => { alert('No') }
                },
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: () => { deleteSelectedCategories() }
                }
            ]}
        >
            <h5>Expanded</h5>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }
            <h5>Checked</h5>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }

        </Modal>
    );
}
export default DeleteCategoriesModal;