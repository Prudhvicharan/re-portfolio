import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import emailjs from "@emailjs/browser";
import Contact from "@/components/Contact";
import Navbar from "@/components/shared/Navbar";
import Projects from "@/components/Projects";
import { personal } from "@/lib/data";
vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));
beforeEach(() => { vi.mocked(emailjs.sendForm).mockReset(); });

async function fillContact() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Your Name"), "Portfolio QA");
  await user.type(screen.getByLabelText("Your Email"), "qa@example.com");
  await user.type(screen.getByLabelText("Message"), "Testing the portfolio contact flow.");
  return user;
}

describe("Contact", () => {
  it("has correctly constructed profile links and an email fallback", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", personal.github);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", personal.linkedin);
    expect(screen.getByRole("link", { name: personal.email })).toHaveAttribute("href", `mailto:${personal.email}`);
  });
  it("blocks empty and malformed input with native constraints", async () => {
    render(<Contact />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    expect(emailjs.sendForm).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText("Your Email"), "not-an-email");
    expect(screen.getByLabelText("Your Email")).toBeInvalid();
  });
  it("announces sending and success, prevents repeat sends, and resets only after success", async () => {
    let finish!: (value: { status: number; text: string }) => void;
    vi.mocked(emailjs.sendForm).mockReturnValue(new Promise(resolve => { finish = resolve; }));
    render(<Contact />);
    const user = await fillContact();
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    expect(screen.getByRole("button", { name: /Sending/ })).toBeDisabled();
    expect(screen.getByText("Sending your message…").closest('[role="status"]')).toHaveAttribute("aria-live", "polite");
    finish({ status: 200, text: "OK" });
    await screen.findByText(/Message accepted by the email service/);
    expect(screen.getByLabelText("Message")).toHaveValue("");
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  });
  it("retains input on forced service failure, offers mailto, and allows retry", async () => {
    vi.mocked(emailjs.sendForm).mockRejectedValueOnce(new Error("Forced failure")).mockResolvedValueOnce({ status: 200, text: "OK" });
    render(<Contact />);
    const user = await fillContact();
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    const fallback = await screen.findByRole("link", { name: "Email me directly" });
    expect(fallback).toHaveAttribute("href", `mailto:${personal.email}`);
    expect(screen.getByLabelText("Message")).toHaveValue("Testing the portfolio contact flow.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    await screen.findByText(/Message accepted by the email service/);
  });
  it("explains clipboard failure without removing the email link", async () => {
    render(<Contact />);
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("Denied"));
    await user.click(screen.getByRole("button", { name: "Copy" }));
    await screen.findByText(/Could not copy/);
    expect(screen.getByRole("link", { name: personal.email })).toHaveAttribute("href", `mailto:${personal.email}`);
  });
});

describe("Mobile navigation", () => {
  it("opens with focus inside, loops Tab in both directions, closes on cancellation and restores focus", async () => {
    render(<Navbar />);
    const user = userEvent.setup();
    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    const close = within(dialog).getByRole("button", { name: "Close menu" });
    const last = within(dialog).getByRole("link", { name: "Contact" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "Tab" });
    expect(close).toHaveFocus();
    // Browsers dispatch cancel when Escape is pressed on a modal dialog.
    fireEvent(dialog, new Event("cancel", { bubbles: false, cancelable: true }));
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });
  it("uses native fragment links and closes after a destination is selected", async () => {
    render(<Navbar />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const link = within(screen.getByRole("dialog")).getByRole("link", { name: "Projects" });
    expect(link).toHaveAttribute("href", "#projects");
    await user.click(link);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

it("gives every project action a specific accessible name", () => {
  render(<Projects />);
  for (const project of ["Career Axis", "LaunchMasters"]) {
    expect(screen.getByRole("link", { name: `View ${project} source code` })).toHaveAttribute("href", expect.stringContaining("github.com/Prudhvicharan/"));
    expect(screen.getByRole("link", { name: `Open ${project} live demo` })).toHaveAttribute("href", expect.stringMatching(/^https:/));
  }
});
