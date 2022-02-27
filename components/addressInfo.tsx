import { useState } from "react";
import ReactLoading from "react-loading";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { nextStep, prevStep, setOrderAddress } from "../lib/store";

type iAddress = {
  line_1: string;
  line_2: string;
  town: string;
  postcode: string;
  country: string;
};

const AddressInfo = () => {
  const orderAddress = useSelector(
    (state: RootStateOrAny) => state.order.address
  );
  const dispatch = useDispatch();
  const [address, setAddress] = useState<iAddress>({
    line_1: orderAddress.line_1,
    line_2: orderAddress.line_2,
    town: orderAddress.town,
    postcode: orderAddress.postcode,
    country: orderAddress.country,
  });

  const [addressFilled, setAddressFilled] = useState(
    orderAddress.territory.length > 0
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const validateAddress = async () => {
    setIsLoading(true);
    console.log(process.env.NEXT_PUBLIC_HERE_APIKEY);
    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?apikey=${process.env.NEXT_PUBLIC_HERE_APIKEY}&q=${address.line_1}+${address.line_2}+${address.town}+${address.postcode}+${address.country}`
    );
    const reponseJson = await response.json();
    if (reponseJson.items.length > 0) {
      console.log(reponseJson.items[0]);
      dispatch(
        setOrderAddress({
          line_1: address.line_1,
          line_2: address.line_2,
          town: reponseJson.items[0].address.city,
          district: reponseJson.items[0].address.county,
          postcode: reponseJson.items[0].address.postalCode,
          country: reponseJson.items[0].address.countryName,
          territory: reponseJson.items[0].address.countryCode,
        })
      );
      setAddressFilled(true);
    } else {
      setError("Invalid address");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="text-xl">Delivery Address</div>
      {!addressFilled && !isLoading && (
        <>
          {Object.keys(address).map((key) => {
            return (
              <input
                type="text"
                key={key}
                placeholder={(
                  key.charAt(0).toUpperCase() + key.slice(1)
                ).replace("_", " ")}
                className="border rounded-xl p-2 my-2"
                value={address[key as keyof iAddress]}
                onChange={(e) =>
                  setAddress({ ...address, [key]: e.target.value })
                }
              />
            );
          })}
          <small className="text-red-500"> {error} </small>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2">
            <div></div>
            <button
              className="bg-gray-200 text-gray-700 rounded-xl p-2 my-2"
              onClick={() => dispatch(prevStep())}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white rounded-xl p-2 my-2"
              onClick={() => validateAddress()}
            >
              Validate Address
            </button>
          </div>
        </>
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <ReactLoading type="spin" color="#000" />
        </div>
      )}
      {addressFilled && (
        <>
          <div className="flex  items-center ml-4 my-10">
            <div>
              <div className="text-xl">{orderAddress.line_1}</div>
              <div className="text-sm">{orderAddress.line_2}</div>
              <div className="text-sm">
                {orderAddress.town}, {orderAddress.postcode}
              </div>
              <div className="text-sm">{orderAddress.country}</div>
            </div>
            <button
              className="bg-amber-500 text-white rounded-xl p-2 ml-auto my-2"
              onClick={() => setAddressFilled(false)}
            >
              Change Address
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2">
            <div></div>
            <button
              className="bg-gray-200 text-gray-700 rounded-xl p-2 my-2"
              onClick={() => dispatch(prevStep())}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white rounded-xl p-2 my-2"
              onClick={() => dispatch(nextStep())}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressInfo;
