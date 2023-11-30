import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import BannerPage from "../../component/pages/BannerPage/BannerPage";
import { store } from "../../rtk/store";

describe("bannerPage", () => {
  test("first test", () => {
    render(
      <Provider store={store}>
        <BannerPage />
      </Provider>
    );

    const linkElement = screen.getByText(/banner/i);
    expect(linkElement).toBeInTheDocument();
  });
});