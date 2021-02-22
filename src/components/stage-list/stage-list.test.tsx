import { fireEvent, render, screen } from "@testing-library/react";
import StageList from ".";
import Stage from "../stage";

describe("Stages component", () => {
  it("should be able to add stages", () => {
    render(<StageList currentSecond={0} />);
    fireEvent.change(screen.getByRole("textbox", { name: "New stage name" }), {
      target: { value: "Pre-infusion" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "New stage start time" }),
      { target: { value: "10" } }
    );
    fireEvent.click(screen.getByRole("button", { name: "Add new stage" }));
    expect(screen.getByText(/Pre-infusion/)).toBeTruthy();
    expect(screen.getByText(/@ 10s/)).toBeTruthy();
  });

  it("should be able to delete stages", () => {
    render(<StageList currentSecond={0} />);
    fireEvent.change(screen.getByRole("textbox", { name: "New stage name" }), {
      target: { value: "Pre-infusion" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "New stage start time" }),
      { target: { value: "10" } }
    );
    fireEvent.click(screen.getByRole("button", { name: "Add new stage" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Delete stage: Pre-infusion" })
    );
    expect(screen.queryByText(/Pre-infusion/)).toBeNull();
  });
});
