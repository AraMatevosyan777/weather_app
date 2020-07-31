import React, { Component } from 'react'
import './index.css'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class CityModal extends Component{
    constructor(props) {
        super(props);
        this.root = document.createElement('div');
      }
    
      componentDidMount() {
        document.body.appendChild(this.root);
      }
    
    componentWillUnmount(){
        document.body.removeChild(this.root);
    }
    render() {
        return ReactDOM.createPortal(
            <div className="cityModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button onClick={this.props.setError} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.error}</p>
                        </div>
                    </div>
                </div>
            </div>,
            this.root
        )
    }
}
// const CityModal = ({error}) => error ? ReactDOM.createPortal(
//         <div className="cityModal modal" tabIndex="-1" role="dialog">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">Modal title</h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         <p>Modal body text goes here.</p>
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                         <button type="button" className="btn btn-primary">Save changes</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     ):null
CityModal.propTypes = {
    error: PropTypes.string,
    setError: PropTypes.func
}

export default CityModal
