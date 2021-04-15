
import React from 'react';



export default function ViewAlertBox(props) {
    return(
        <div className={props.show ? "view-modal display-block" : "view-modal display-none"}>
            <section className="view-modal-main">
                <div className="view-modal-header">
                    {/* <span>An Error occured but nothing to be worried about</span> */}
                    <span className="view-modal-close" onClick={props.hideModal}> &times; </span>
                </div>
                <div className="view-modal-content">
                    <p> {props.message} </p>                              
                </div>
            </section>
        </div>
    )
}
export function ViewOkAlertBox(props) {
    return(
        <div className={props.show ? "view-modal-ok display-block" : "view-modal display-none"}>
            <section className="view-modal-ok-main">
                <div className="view-modal-ok-header">
                    <span className="view-modal-ok-close" onClick={props.hideModal}> &times; </span>
                </div>
                <div className="view-modal-ok-content">
                    <p> {props.message} </p>                              
                </div>
            </section>
        </div>

    )
}