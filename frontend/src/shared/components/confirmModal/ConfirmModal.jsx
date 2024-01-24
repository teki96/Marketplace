import React from 'react';

function ConfirmModal(props) {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor={props.id} className="btn btn-warning">
        {props.buttonTitle}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={props.id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{props.title}</h3>
          <p className="py-4">{props.description}</p>
          <label
            onClick={props.action}
            htmlFor={props.id}
            className="btn btn-warning"
          >
            Confirm
          </label>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
