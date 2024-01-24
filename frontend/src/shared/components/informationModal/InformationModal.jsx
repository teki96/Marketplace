import React, { useState } from 'react';

/*
    TODO:
    - Fix the bug where the modal doesn't show the updated name and email values
*/

function InformationModal(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = () => {
    // call props.onClick to update name and email values
    console.log('inside handleClick', props.name, props.email);
    props.onClick();
    // update state with new name and email values
    setName(props.name);
    setEmail(props.email);
  };

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor={props.id} onClick={handleClick} className="btn btn-info">
        {props.buttonText}
      </label>

      {/* Put this part before </body> tag */}
      {name && email
                && (
                <>
                  <input type="checkbox" id={props.id} className="modal-toggle" />
                  <label htmlFor={props.id} className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                      <h3 className="text-lg font-bold">
                        {props.title}
                      </h3>
                      <p className="py-4">
                        Name:
                        {' '}
                        {name}
                      </p>
                      <p>
                        Email:
                        {' '}
                        {email}
                      </p>
                    </label>
                  </label>
                </>
                )}
    </div>
  );
}

export default InformationModal;
