import { useState } from "react";
import Image from "next/image";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { nextStep, prevStep, setOrderItems } from "../lib/store";
const ItemsSelector = () => {
  const orderItems = useSelector((state: RootStateOrAny) => state.order.items);
  const dispatch = useDispatch();
  const [items, setItems] = useState({ ...orderItems });
  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center my-2 border rounded-2xl p-4 ${
          items.forks ? "border-green-500" : ""
        }`}
        onClick={() => setItems({ ...items, forks: !items.forks })}
      >
        <Image src="/forks-set.jpg" height={100} width={100} alt="fork_set" />
        <div className="ml-4 mr-auto text-xl"> Forks </div>
        <input
          type="checkbox"
          checked={items.forks}
          onChange={() => setItems({ ...items, forks: !items.forks })}
        />
      </div>

      <div
        className={`flex items-center my-2 border rounded-2xl p-4 ${
          items.knives ? "border-green-500" : ""
        }`}
        onClick={() => setItems({ ...items, knives: !items.knives })}
      >
        <Image src="/knives-set.jpg" height={100} width={100} alt="knive_set" />
        <div className="ml-4 mr-auto text-xl"> Knives </div>
        <input
          type="checkbox"
          checked={items.knives}
          onChange={() => setItems({ ...items, knives: !items.knives })}
        />
      </div>
      <div
        className={`flex items-center my-2 border rounded-2xl p-4 ${
          items.spoons ? "border-green-500" : ""
        }`}
        onClick={() => setItems({ ...items, spoons: !items.spoons })}
      >
        <Image
          src="/spoons-set.jpg"
          height={100}
          width={100}
          alt="s poon_set"
        />
        <div className="ml-4 mr-auto text-xl"> Spoons </div>
        <input
          type="checkbox"
          checked={items.spoons}
          onChange={() => setItems({ ...items, spoons: !items.spoons })}
        />
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
          className={
            "text-white rounded-xl p-2 my-2" +
            (items.forks || items.knives || items.spoons
              ? " bg-blue-500"
              : " bg-gray-500")
          }
          disabled={!items.forks && !items.knives && !items.spoons}
          onClick={() => {
            dispatch(setOrderItems(items));
            dispatch(nextStep());
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ItemsSelector;
