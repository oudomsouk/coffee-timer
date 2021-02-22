import { fireEvent, render, screen } from "@testing-library/react";
import Stage from ".";

describe("Stage component", () => {
  it("should render the stage name", () => {
    render(
      <Stage
        stage={{ name: "Pre-infusion", time: 0 }}
        onDelete={jest.fn()}
        isActive={false}
      />
    );

    expect(screen.getByText("Pre-infusion")).toBeTruthy();
  });

  it("should render an arrow for an active stage", () => {
    render(
      <Stage
        stage={{ name: "Pre-infusion", time: 0 }}
        onDelete={jest.fn()}
        isActive={true}
      />
    );

    expect(screen.getByText(">")).toBeTruthy();
  });

  it("should render the stage start time", () => {
    render(
      <Stage
        stage={{ name: "Pre-infusion", time: 23 }}
        onDelete={jest.fn()}
        isActive={true}
      />
    );

    expect(screen.getByText(/@ 23s/)).toBeTruthy();
  });

  it("should call the on delete function when delete button is clicked", () => {
    const mockDelete = jest.fn();
    render(
      <Stage
        stage={{ name: "Pre-infusion", time: 23 }}
        onDelete={mockDelete}
        isActive={true}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Delete stage: Pre-infusion" })
    );
    expect(mockDelete).toBeCalled();
  });
});
