import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { autumnOffers, tirePriceRows, waxPriceRows } from "@/routes/index";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Owner-supplied category prices", () => {
  it.each([
    [0, ["Rengashotelli", "Renkaidenvaihto", "Renkaidenpesu"], 99],
    [1, ["Tehopesu", "Kovavaha"], 99],
    [2, ["Tehopesu", "Kovavaha", "Täydellinen sisäpuhdistus"], 149],
    [3, ["Renkaidenvaihto", "Renkaidenpesu", "Ulko tehopesu"], 79],
  ])("preserves autumn offer %s package and price", (index, services, price) => {
    expect(autumnOffers[Number(index)]?.services).toEqual(services);
    expect(autumnOffers[Number(index)]?.price).toBe(price);
  });
  it.each([
    [0, [85, "95€", 95]],
    [1, [120, 140, 160]],
    [2, [150, 170, 190]],
    [3, ["? €", "? €", "? €"]],
    [4, ["? €", "? €", "? €"]],
    [5, ["? €", "? €", "? €"]],
  ])("preserves wax row %s prices", (index, prices) => {
    expect(waxPriceRows[Number(index)]?.prices).toEqual(prices);
  });

  it.each([
    [0, [30, 35, 40]],
    [1, [35, 35, 35]],
    [2, [45, 45, 45]],
    [3, [15, 15, 15]],
    [4, [99, 99, 99]],
    [5, [90, 90, 90]],
  ])("preserves tire row %s prices", (index, prices) => {
    expect(tirePriceRows[Number(index)]?.prices).toEqual(prices);
  });

  it("sets Kovavaha service duration to 60 minutes", () => {
    expect(waxPriceRows[1]?.time).toBe("60 min");
  });
  it("keeps ceramic coating duration unknown", () => {
    expect(waxPriceRows[4]?.time).toBe("? min");
  });
  it("keeps polishing duration unknown", () => {
    expect(waxPriceRows[5]?.time).toBe("? min");
  });
  it("keeps wheel work duration unspecified", () => {
    expect(tirePriceRows[4]?.time).toBe("- min");
  });
  it("sets tire hotel duration to zero", () => {
    expect(tirePriceRows[5]?.time).toBe("0 min");
  });
});
