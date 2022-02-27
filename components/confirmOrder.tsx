import Image from "next/image";
import ReactLoading from "react-loading";
import { useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { nextStep, prevStep, setOrderItems } from "../lib/store";
import {
  BadgeCheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

const ConfirmOrder = () => {
  const order = useSelector((state: RootStateOrAny) => state.order);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderError, setOrderError] = useState("");

  const postOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.msg === "success") {
        setOrderConfirmed(true);
      } else {
        setOrderError(responseJson.msg);
      }
    } catch (error) {
      setOrderError("Failed to submit order");
    }
    setIsLoading(false);
  };

  return (
    <>
      {!orderConfirmed && !isLoading && orderError === "" && (
        <div>
          <h1 className="text-xl mb-4">Confirm Order</h1>
          <div className="mx-4">
            <div>Your order is:</div>

            {Object.keys(order.items)
              .filter((key) => order.items[key])
              .map((key) => {
                return (
                  <div key={key} className={`flex items-center my-2  p-4`}>
                    <Image
                      src={`/${key}-set.jpg`}
                      height={50}
                      width={50}
                      alt={`${key}_set`}
                    />
                    <div className="ml-4 mr-auto text-xl capitalize">{key}</div>
                  </div>
                );
              })}
            <div>
              Your order wil be shipped to
              <div className="flex flex-col items-center my-4">
                <div>
                  <div className="text-xl">{order.name}</div>
                  <div className="text-sm">{order.address.line_1},</div>
                  <div className="text-sm">{order.address.line_2}</div>
                  <div className="text-sm">
                    {order.address.town}, {order.address.postcode}
                  </div>
                  <div className="text-sm">{order.address.country}</div>
                </div>
              </div>
            </div>
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
              className="text-white rounded-xl p-2 my-2 bg-blue-500"
              onClick={() => {
                postOrder();
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <ReactLoading type="spin" color="#000" />
        </div>
      )}
      {orderError !== "" && (
        <>
          <div className="flex flex-col justify-center items-center h-50">
            <ExclamationCircleIcon className="w-20 h-20 text-red-500" />
            <div className="text-3xl mt-10">{orderError}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2">
            <div></div>
            <div></div>
            <button
              className="bg-gray-200 text-gray-700 rounded-xl p-2 my-2"
              onClick={() => dispatch(prevStep())}
            >
              Previous
            </button>
          </div>
        </>
      )}
      {orderConfirmed && (
        <div className="flex flex-col justify-center items-center h-50">
          <BadgeCheckIcon className="w-20 h-20 text-green-500" />
          <div className="text-3xl mt-10">Order Confirmed</div>
        </div>
      )}
    </>
  );
};

export default ConfirmOrder;
