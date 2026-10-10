import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import emailjs from "@emailjs/browser";
import Contact from "@/components/site/Contact";
import Nav, { RESUME, SHEETS } from "@/components/site/Nav";
import { personal } from "@/lib/data";

vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));
beforeEach(() => { vi.mocked(emailjs.sendForm).mockReset(); });

async function fill() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Your name"), "Portfolio QA");
  await user.type(screen.getByLabelText("Your email"), "qa@example.com");
  await user.type(screen.getByLabelText("Message"), "Testing the request form.");
  return user;
}

describe("Contact", () => {
  it("links to email, LinkedIn, GitHub and the résumé", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: personal.email })).toHaveAttribute("href", `mailto:${personal.email}`);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", personal.linkedin);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", personal.github);
    expect(screen.getByRole("link", { name: /Résumé/ })).toHaveAttribute("href", RESUME);
  });

  it("does not send an empty request", async () => {
    render(<Contact />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Send request" }));
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it("sends once, confirms, and clears the form", async () => {
    let finish!: (v: { status: number; text: string }) => void;
    vi.mocked(emailjs.sendForm).mockReturnValue(new Promise(r => { finish = r; }));
    render(<Contact />);
    const user = await fill();
    await user.click(screen.getByRole("button", { name: "Send request" }));
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    finish({ status: 200, text: "OK" });
    await waitFor(() => expect(screen.getByText(/Sent\. I’ll reply/)).toBeInTheDocument());
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("keeps the message and offers email when sending fails", async () => {
    vi.mocked(emailjs.sendForm).mockRejectedValue(new Error("down"));
    render(<Contact />);
    const user = await fill();
    await user.click(screen.getByRole("button", { name: "Send request" }));
    await waitFor(() => expect(screen.getByText(/didn’t send/)).toBeInTheDocument());
    expect(screen.getByLabelText("Message")).toHaveValue("Testing the request form.");
  });

  it("copies the email address and announces it", async () => {
    const user = userEvent.setup(); // installs its own clipboard, so mock after it
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<Contact />);
    await user.click(screen.getByRole("button", { name: "Copy email address" }));
    expect(writeText).toHaveBeenCalledWith(personal.email);
    expect(await screen.findByText("Email address copied.")).toBeInTheDocument();
  });
});

describe("Nav", () => {
  it("lists every sheet and links the résumé", () => {
    render(<Nav />);
    for (const s of SHEETS) expect(screen.getByRole("link", { name: new RegExp(s.label) })).toHaveAttribute("href", `#${s.id}`);
    expect(screen.getByRole("link", { name: /Résumé/ })).toHaveAttribute("href", RESUME);
  });
});

describe("SheetTab", () => {
  it("opens the sheet index and closes it when a sheet is chosen", async () => {
    const { default: SheetTab } = await import("@/components/site/SheetTab");
    render(<SheetTab />);
    const user = userEvent.setup();
    const pill = screen.getByRole("button", { name: /open the sheet index/ });
    expect(pill).toHaveAttribute("aria-expanded", "false");
    await user.click(pill);
    expect(pill).toHaveAttribute("aria-expanded", "true");
    const link = screen.getByRole("link", { name: /Work/ });
    expect(link).toHaveAttribute("href", "#work");
    await user.click(link);
    expect(pill).toHaveAttribute("aria-expanded", "false");
  });
});
