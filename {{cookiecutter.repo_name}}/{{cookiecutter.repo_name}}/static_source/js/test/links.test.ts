import {
  beforeAll, describe, expect, it,
} from "vitest";
import linksInit, { isCurrentPage, isExternalLink } from "../links";

const mockAnchor = (href: string) => ({ href } as HTMLAnchorElement);

describe("links", () => {
  beforeAll(() => {
    window.location.href = "https://test.com/example/";
  });
  it("isExternalLink", () => {
    // internal links
    expect(isExternalLink(mockAnchor(""))).toBeFalsy();
    expect(isExternalLink(mockAnchor("https://test.com/a#foo"))).toBeFalsy();
    expect(isExternalLink(mockAnchor("/newpage"))).toBeFalsy();
    expect(isExternalLink(mockAnchor("#anchor-ref"))).toBeFalsy();
    expect(isExternalLink(mockAnchor("?foo=bar"))).toBeFalsy();
    expect(isExternalLink(mockAnchor("tel:2013334444"))).toBeFalsy();
    expect(isExternalLink(mockAnchor("mailto:example@test.com"))).toBeFalsy();
    expect(isExternalLink(mockAnchor("https://test.com"))).toBeFalsy();

    // external links
    expect(isExternalLink(mockAnchor("https://example.com"))).toBeTruthy();
    expect(isExternalLink(mockAnchor("https://example.com/#anchor-ref"))).toBeTruthy();
    expect(isExternalLink(mockAnchor("ftp://test.com"))).toBeTruthy();
  });

  it("isCurrentPage", () => {
    // same page
    expect(isCurrentPage(mockAnchor("https://test.com/example/"))).toBeTruthy();
    expect(isCurrentPage(mockAnchor("/example/#anchor-ref"))).toBeTruthy();
    expect(isCurrentPage(mockAnchor("https://test.com/example/#anchor-ref"))).toBeTruthy();
    // diff page
    expect(isCurrentPage(mockAnchor("https://test.com"))).toBeFalsy(); // needs trailing slash
    expect(isCurrentPage(mockAnchor("https://example.com/"))).toBeFalsy(); // other domain
    expect(isCurrentPage(mockAnchor("https://test.com/otherpage"))).toBeFalsy(); // other page on same domain
  });

  it("linksInit", () => {
    document.body.innerHTML = `
    <a id="active" href="/" class="active" />
    <a id="external" href="https://example.com" target="foo" />
    <a id="current" href="/example/#bar" />
    `;
    const activeLink = document.getElementById("active") as HTMLAnchorElement;
    const externalLink = document.getElementById("external") as HTMLAnchorElement;
    const currentPageLink = document.getElementById("current") as HTMLAnchorElement;

    linksInit();

    expect(activeLink.classList.contains("active")).toBeFalsy();
    expect(externalLink.target).toBe("_blank");
    expect(currentPageLink.classList.contains("active")).toBeTruthy();
    expect(currentPageLink.classList.contains("active")).toBeTruthy();
  });
});
