import { Component } from 'react';
import PropTypes from 'prop-types';

//import './GenericModalComponent.css'

class GenericModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
    }

    

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <div id="myModal" className={ this.state.show ? 'modal-disp-block' : 'modal-disp-none' }>
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

            </div>
        )
    }
}

GenericModalComponent.propTypes = {
    /*title: PropTypes.string,
    bodyText: PropTypes.string,
    buttons: PropTypes.array,
    enableCancelButton: PropTypes.bool.isRequired,
    fields: PropTypes.array,
    show: PropTypes.bool.isRequired,
    actionDescription: PropTypes.string*/
}

export default GenericModalComponent;