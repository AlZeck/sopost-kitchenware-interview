import { useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { nextStep, prevStep, setOrderName, setOrderEmail } from "../lib/store";

const UserInfo = () => {
  const orderData = useSelector((state: RootStateOrAny) => state.order);
  const dispatch = useDispatch();

  const [name, setName] = useState(orderData.name);
  const [validName, setValidName] = useState({
    dirty: false,
    valid: orderData.name.length > 0,
  });
  const [email, setEmail] = useState(orderData.email);
  const [validEmail, setValidEmail] = useState({
    dirty: false,
    valid: orderData.email.length > 0,
  });

  const setNameWithValidation = (value: string) => {
    setValidName({ dirty: true, valid: value.length > 1 });
    setName(value);
  };

  const setEmailWithValidation = (value: string) => {
    // TODO: do proper validation
    setValidEmail({ dirty: true, valid: value.length > 1 });
    setEmail(value);
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        className={
          "border rounded-xl p-2 my-2" +
          (validName.dirty && !validName.valid ? " border-red-500" : "") +
          (validName.valid ? " border-green-500" : "")
        }
        value={name}
        onChange={(e) => setNameWithValidation(e.target.value)}
      />
      <small className="mx-4 text-red-500">
        {validName.dirty && !validName.valid && "Name is required"}
      </small>

      <input
        type="email"
        placeholder="Email"
        className={
          "border rounded-xl p-2 my-2" +
          (validEmail.dirty && !validEmail.valid ? " border-red-500" : "") +
          (validEmail.valid ? " border-green-500" : "")
        }
        value={email}
        onChange={(e) => setEmailWithValidation(e.target.value)}
      />
      <small className="mx-4 text-red-500">
        {validEmail.dirty && !validEmail.valid && "Email is required"}
      </small>
      <div></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2">
        <div></div>
        <button
          className="bg-gray-200 text-gray-700 rounded-xl p-2 my-2"
          onClick={() => dispatch(prevStep())}
        >
          Previous
        </button>
        <button
          className={
            "text-white rounded-xl p-2 my-2" +
            (validName.valid && validEmail.valid
              ? " bg-blue-500"
              : " bg-gray-500")
          }
          disabled={!validName.valid || !validEmail.valid}
          onClick={() => {
            dispatch(setOrderName(name));
            dispatch(setOrderEmail(email));
            dispatch(nextStep());
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
