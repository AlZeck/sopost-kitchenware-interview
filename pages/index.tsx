import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import UserInfo from "../components/UserInfo";
import AddressInfo from "../components/addressInfo";
import ItemsSelector from "../components/ItemsSelector";
import ConfirmOrder from "../components/confirmOrder";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { nextStep, prevStep } from "../lib/store";

const Home: NextPage = () => {
  const step = useSelector((state: RootStateOrAny) => state.form.step);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col mt-8">
      {step === 1 && <UserInfo />}
      {step === 2 && <AddressInfo />}
      {step === 3 && <ItemsSelector />}
      {step === 4 && <ConfirmOrder />}
    </div>
  );
};

export default Home;
