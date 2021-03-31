





import React,{ useEffect } from 'react';






export const AlertBox = ({ handleClose, show, children }) => {

    // useEffect(()=>{
    //   window.scrollTo(0,0)
  
    // })
  
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="modal-bttn">
              <button type="button" onClick={ handleClose }>
                  Ok
              </button>
          </div>
        </section>
      </div>
    );
  };
  