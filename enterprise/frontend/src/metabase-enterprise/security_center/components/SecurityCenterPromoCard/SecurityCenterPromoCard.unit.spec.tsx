<<<<<<< HEAD
=======
import userEvent from "@testing-library/user-event";
>>>>>>> v0.62.3
import fetchMock from "fetch-mock";
import { Route } from "react-router";

import { setupNotificationChannelsEndpoints } from "__support__/server-mocks";
import { mockSettings } from "__support__/settings";
import { renderWithProviders, screen, waitFor } from "__support__/ui";
<<<<<<< HEAD
=======
import { securityCenterApi, subscriptionApi } from "metabase/api";
>>>>>>> v0.62.3
import { createMockState } from "metabase/redux/store/mocks";
import type { Advisory } from "metabase-types/api";
import {
  createMockTokenFeatures,
  createMockUser,
} from "metabase-types/api/mocks";
import { createAdvisory } from "metabase-types/api/mocks/security-center";

import { SecurityCenterPromoCard } from "./SecurityCenterPromoCard";

const DISMISSED_KEY = "security-center-promo-dismissed";

interface SetupOpts {
<<<<<<< HEAD
=======
  isAdmin?: boolean;
>>>>>>> v0.62.3
  isProSelfHosted?: boolean;
  emailConfigured?: boolean;
  slackConfigured?: boolean;
  advisories?: Advisory[];
}

function setup({
<<<<<<< HEAD
=======
  isAdmin = true,
>>>>>>> v0.62.3
  isProSelfHosted = true,
  emailConfigured = false,
  slackConfigured = false,
  advisories = [],
}: SetupOpts = {}) {
  const tokenFeatures = createMockTokenFeatures(
    isProSelfHosted
      ? { advanced_permissions: true, hosting: false }
      : { hosting: false },
  );

  setupNotificationChannelsEndpoints({
<<<<<<< HEAD
    email: { configured: emailConfigured } as any,
    slack: { configured: slackConfigured } as any,
=======
    email: { configured: emailConfigured },
    slack: { configured: slackConfigured },
>>>>>>> v0.62.3
  });

  fetchMock.get("path:/api/ee/security-center", {
    last_checked_at: null,
    advisories,
  });

  const state = createMockState({
<<<<<<< HEAD
    currentUser: createMockUser({ is_superuser: true }),
=======
    currentUser: createMockUser({ is_superuser: isAdmin }),
>>>>>>> v0.62.3
    settings: mockSettings({
      "token-features": tokenFeatures,
    }),
  });

<<<<<<< HEAD
  renderWithProviders(<Route path="*" component={SecurityCenterPromoCard} />, {
    initialRoute: "/",
    storeInitialState: state,
    withRouter: true,
  });
}

=======
  return renderWithProviders(
    <Route path="*" component={SecurityCenterPromoCard} />,
    {
      initialRoute: "/",
      storeInitialState: state,
      withRouter: true,
    },
  );
}

type SetupResult = ReturnType<typeof setup>;

async function waitForAdminQueriesToFinish({ store }: SetupResult) {
  await waitFor(() => {
    expect(
      subscriptionApi.endpoints.getChannelInfo.select()(store.getState())
        .isSuccess,
    ).toBe(true);
    expect(
      securityCenterApi.endpoints.listSecurityAdvisories.select()(
        store.getState(),
      ).isSuccess,
    ).toBe(true);
  });
}

function expectAdminQueriesToBeSkipped({ store }: SetupResult) {
  expect(
    subscriptionApi.endpoints.getChannelInfo.select()(store.getState())
      .isUninitialized,
  ).toBe(true);
  expect(
    securityCenterApi.endpoints.listSecurityAdvisories.select()(
      store.getState(),
    ).isUninitialized,
  ).toBe(true);
}

>>>>>>> v0.62.3
describe("SecurityCenterPromoCard", () => {
  afterEach(() => {
    localStorage.removeItem(DISMISSED_KEY);
  });

  it("renders the promo when no channels are configured and no active advisory", async () => {
    setup();

    expect(
      await screen.findByText(/Stay safe with security alerts/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Set up security alerts/i }),
    ).toHaveAttribute("href", "/admin/security-center?open=notifications");
  });

  it("does not render when email is configured", async () => {
<<<<<<< HEAD
    setup({ emailConfigured: true });

    await screen.findByText(() => false).catch(() => {});
=======
    const view = setup({ emailConfigured: true });

    await waitForAdminQueriesToFinish(view);
>>>>>>> v0.62.3
    expect(
      screen.queryByText(/Stay safe with security alerts/),
    ).not.toBeInTheDocument();
  });

  it("does not render when slack is configured", async () => {
<<<<<<< HEAD
    setup({ slackConfigured: true });

    await screen.findByText(() => false).catch(() => {});
=======
    const view = setup({ slackConfigured: true });

    await waitForAdminQueriesToFinish(view);
>>>>>>> v0.62.3
    expect(
      screen.queryByText(/Stay safe with security alerts/),
    ).not.toBeInTheDocument();
  });

<<<<<<< HEAD
  it("does not render for non-pro-self-hosted plans", async () => {
    setup({ isProSelfHosted: false });

    await screen.findByText(() => false).catch(() => {});
=======
  it("does not render or fire admin-only requests for non-admin users", () => {
    const view = setup({ isAdmin: false });

    expectAdminQueriesToBeSkipped(view);
    expect(
      screen.queryByText(/Stay safe with security alerts/),
    ).not.toBeInTheDocument();

    // Non-admins must not trigger admin-only endpoints.
    expect(fetchMock.callHistory.called("path:/api/ee/security-center")).toBe(
      false,
    );
  });

  it("does not render for non-pro-self-hosted plans", async () => {
    const view = setup({ isProSelfHosted: false });

    await waitForAdminQueriesToFinish(view);
>>>>>>> v0.62.3
    expect(
      screen.queryByText(/Stay safe with security alerts/),
    ).not.toBeInTheDocument();
  });

  it("does not render when there is an active advisory (red banner takes over)", async () => {
<<<<<<< HEAD
    setup({
      advisories: [createAdvisory({ match_status: "active" })],
    });

    await screen.findByText(() => false).catch(() => {});
=======
    const view = setup({
      advisories: [createAdvisory({ match_status: "active" })],
    });

    await waitForAdminQueriesToFinish(view);
>>>>>>> v0.62.3
    expect(
      screen.queryByText(/Stay safe with security alerts/),
    ).not.toBeInTheDocument();
  });

  it("is dismissible", async () => {
    setup();

    await screen.findByText(/Stay safe with security alerts/);
    const close = screen.getByRole("button", { name: /close/i });
<<<<<<< HEAD
    close.click();
=======
    await userEvent.click(close);
>>>>>>> v0.62.3

    await waitFor(() => {
      expect(
        screen.queryByText(/Stay safe with security alerts/),
      ).not.toBeInTheDocument();
    });
    expect(localStorage.getItem(DISMISSED_KEY)).toBe("true");
  });

  it("stays hidden after dismissal", async () => {
    localStorage.setItem(DISMISSED_KEY, "true");

<<<<<<< HEAD
    setup();

    await screen.findByText(() => false).catch(() => {});
=======
    const view = setup();

    await waitForAdminQueriesToFinish(view);
>>>>>>> v0.62.3
    expect(
      screen.queryByText(/Stay safe with security alerts/),
    ).not.toBeInTheDocument();
  });
});
