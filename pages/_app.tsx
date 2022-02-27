import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../lib/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="flex justify-center min-h-screen  bg-rose-900">
        <div className="bg-white py-20 px-10 w-6/12 min-w-fit">
          <h3 className="font-serif text-6xl sm:text-7xl text-center">
            <span className="">Kitchen</span>
            <span className="italic">ware</span>
          </h3>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
