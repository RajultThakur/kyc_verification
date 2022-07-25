import React, { Component } from 'react'

export class ImagePrev extends Component {
    render (props) {
        const { imageUrl } = this.props;
        return (
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Verify Documents</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div style={{ "height": "520px" }} className="modal-body">
                            <div style={{ "width": "100%", "height": "100%" }} className='imageContainer'>

                                <img style={{ "width": "100%", "height": "100%", "objectFit": "contain" }} className='image' src={`http://localhost:8080/download/${imageUrl}`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImagePrev