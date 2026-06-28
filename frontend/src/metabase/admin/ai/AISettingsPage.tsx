import type { ReactNode } from "react";
import { jt, t } from "ttag";

import {
  SettingsPageWrapper,
  SettingsSection,
} from "metabase/admin/components/SettingsSection";
import { useListMetabotsQuery } from "metabase/api";
import { useAdminSetting } from "metabase/api/utils";
import { ExternalLink } from "metabase/common/components/ExternalLink";
import { Link } from "metabase/common/components/Link";
<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
import { LoadingAndErrorWrapper } from "metabase/common/components/LoadingAndErrorWrapper";
||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
=======
import { LoadingAndErrorWrapper } from "metabase/common/components/LoadingAndErrorWrapper";
import { UpsellGem } from "metabase/common/components/upsells/components/UpsellGem";
>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx
import { useDocsUrl, useSetting } from "metabase/common/hooks";
import { FIXED_METABOT_IDS } from "metabase/metabot/constants";
import {
  PLUGIN_EMBEDDING_IFRAME_SDK,
  PLUGIN_EMBEDDING_SDK,
} from "metabase/plugins";
import { useRouter } from "metabase/router/useRouter";
import { Divider, Flex, Stack, Switch, Tabs } from "metabase/ui";

import { EmbeddedMetabotUpsell } from "./EmbeddedMetabotUpsell";
import { McpAppsSettings } from "./McpAppsSettings";
import { MetabotSettingsPanel } from "./MetabotSettingsPanel";
import { MetabotSetup } from "./MetabotSetup";

type MetabotTabId =
  | typeof FIXED_METABOT_IDS.DEFAULT
  | typeof FIXED_METABOT_IDS.EMBEDDED;

const SETUP_SECTION_ID = "setup";
const METABOT_SECTION_ID = "metabot";
const MCP_SECTION_ID = "mcp";
const AGENT_API_SECTION_ID = "agent-api";
const AI_FEATURES_ENABLED_SECTION_ID = "ai-features-enabled";
const METABOT_SETTINGS_PATH = "/admin/metabot";
const METABOT_ID_QUERY_PARAM = "metabot_id";

export function AISettingsPage() {
  const {
    location: { query },
  } = useRouter();

  const isConfigured = !!useSetting("llm-metabot-configured?");
  const hasEmbedding =
    PLUGIN_EMBEDDING_SDK.isEnabled() || PLUGIN_EMBEDDING_IFRAME_SDK.isEnabled();

  const {
    value: aiFeaturesEnabledValue,
    updateSetting: updateAiSetting,
    isLoading: isUpdatingAiFeatures,
  } = useAdminSetting("ai-features-enabled?");
  const areAiFeaturesEnabled = aiFeaturesEnabledValue !== false;

<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
  const selectedMetabotId = getSelectedMetabotId(
    query?.[METABOT_ID_QUERY_PARAM],
    {
      hasEmbedding,
    },
  );
||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
  const {
    value: agentApiEnabledValue,
    updateSetting: updateAgentApiSetting,
    isLoading: isUpdatingAgentApi,
  } = useAdminSetting("agent-api-enabled?");
  const isAgentApiEnabled = agentApiEnabledValue !== false;

  // eslint-disable-next-line metabase/no-unconditional-metabase-links-render -- Admin settings
  const { url: agentApiDocsUrl } = useDocsUrl("ai/agent-api");

  const selectedTab = getSelectedMetabotTab(params.metabotId, pathname, {
    hasEmbedding,
  });
=======
  const selectedMetabotId = getSelectedMetabotId(
    query?.[METABOT_ID_QUERY_PARAM],
  );
>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx

  const handleAiFeaturesEnabledChange = async (checked: boolean) => {
    await updateAiSetting({
      key: "ai-features-enabled?",
      value: !checked,
    });
  };

  return (
    <SettingsPageWrapper
      title={t`AI features`}
      description={t`Manage your AI provider connection and Metabot.`}
    >
      {areAiFeaturesEnabled && (
        <>
          <MetabotSetup id={SETUP_SECTION_ID} />
          <DisabledSection disabled={!isConfigured}>
            <MetabotSettingsSection
              hasEmbedding={hasEmbedding}
              id={METABOT_SECTION_ID}
              selectedMetabotId={selectedMetabotId}
            />
          </DisabledSection>
          <Divider />
        </>
      )}

      <ToggleSettingsSection
        checked={!areAiFeaturesEnabled}
        description={t`Turn this on to hide AI features across your instance.`}
        disabled={isUpdatingAiFeatures}
        id={AI_FEATURES_ENABLED_SECTION_ID}
        onChange={handleAiFeaturesEnabledChange}
        title={t`Disable all AI features`}
      />
    </SettingsPageWrapper>
  );
}

<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
export function McpSettingsPage() {
  const { value: aiFeaturesEnabledValue } = useAdminSetting(
    "ai-features-enabled?",
  );
  const areAiFeaturesEnabled = aiFeaturesEnabledValue !== false;

  return (
    <SettingsPageWrapper
      title={t`MCP`}
      description={t`Manage MCP server and Agent API access.`}
    >
      <DisabledSection disabled={!areAiFeaturesEnabled}>
        <McpAppsSettings id={MCP_SECTION_ID} />

        <AgentApiSettingsSection disabled={!areAiFeaturesEnabled} />
      </DisabledSection>
    </SettingsPageWrapper>
  );
}

function AgentApiSettingsSection({ disabled }: { disabled: boolean }) {
  const {
    value: agentApiEnabledValue,
    updateSetting: updateAgentApiSetting,
    isLoading: isUpdatingAgentApi,
  } = useAdminSetting("agent-api-enabled?");
  const isAgentApiEnabled = agentApiEnabledValue !== false;

  // eslint-disable-next-line metabase/no-unconditional-metabase-links-render -- Admin settings
  const { url: agentApiDocsUrl } = useDocsUrl("ai/agent-api");

  const handleAgentApiChange = async (checked: boolean) => {
    await updateAgentApiSetting({
      key: "agent-api-enabled?",
      value: checked,
    });
  };

  return (
    <ToggleSettingsSection
      checked={isAgentApiEnabled}
      description={jt`Enable external access to the Agent API. ${(
        <ExternalLink key="docs" href={agentApiDocsUrl}>
          {t`Learn more`}
        </ExternalLink>
      )}`}
      disabled={disabled || isUpdatingAgentApi}
      id={AGENT_API_SECTION_ID}
      onChange={handleAgentApiChange}
      title={t`Agent API`}
    />
  );
}

||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
=======
export function McpSettingsPage() {
  const { value: aiFeaturesEnabledValue } = useAdminSetting(
    "ai-features-enabled?",
  );
  const areAiFeaturesEnabled = aiFeaturesEnabledValue !== false;

  return (
    <SettingsPageWrapper
      title={t`MCP`}
      description={t`Manage MCP server and Agent API access.`}
    >
      <DisabledSection disabled={!areAiFeaturesEnabled}>
        <McpAppsSettings id={MCP_SECTION_ID} />

        <AgentApiSettingsSection disabled={!areAiFeaturesEnabled} />
      </DisabledSection>
    </SettingsPageWrapper>
  );
}

function AgentApiSettingsSection({ disabled }: { disabled: boolean }) {
  const {
    value: agentApiEnabledValue,
    updateSetting: updateAgentApiSetting,
    isLoading: isUpdatingAgentApi,
  } = useAdminSetting("agent-api-enabled?");
  const isAgentApiEnabled = agentApiEnabledValue !== false;

  const { url: agentApiDocsUrl } = useDocsUrl("ai/agent-api");

  const handleAgentApiChange = async (checked: boolean) => {
    await updateAgentApiSetting({
      key: "agent-api-enabled?",
      value: checked,
    });
  };

  return (
    <ToggleSettingsSection
      checked={isAgentApiEnabled}
      description={jt`Enable external access to the Agent API. ${(
        <ExternalLink key="docs" href={agentApiDocsUrl}>
          {t`Learn more`}
        </ExternalLink>
      )}`}
      disabled={disabled || isUpdatingAgentApi}
      id={AGENT_API_SECTION_ID}
      onChange={handleAgentApiChange}
      title={t`Agent API`}
    />
  );
}

>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx
function MetabotSettingsSection({
  hasEmbedding,
  id,
  selectedMetabotId,
}: {
  hasEmbedding: boolean;
  id: string;
  selectedMetabotId: MetabotTabId;
}) {
<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
  const { data, isLoading, error } = useListMetabotsQuery();
  const activeMetabot = data?.items.find((m) => m.id === selectedMetabotId);
  const showTabs = hasEmbedding;
||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
  const activeMetabot =
    selectedTab === "embedded" ? EMBEDDED_METABOT : INTERNAL_METABOT;
  const showTabs = hasEmbedding;
=======
  const { data, isLoading, error } = useListMetabotsQuery();
  const shouldShowUpsell =
    !hasEmbedding && selectedMetabotId === FIXED_METABOT_IDS.EMBEDDED;
  const activeMetabot = !shouldShowUpsell
    ? data?.items.find((m) => m.id === selectedMetabotId)
    : null;
>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx

  return (
    <SettingsSection id={id} title={t`Metabot settings`}>
<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
      {showTabs && (
        <Tabs value={String(selectedMetabotId)}>
          <Tabs.List>
            <Tabs.Tab
              renderRoot={(props) => (
                <Link
                  {...props}
                  to={getMetabotTabPath(FIXED_METABOT_IDS.DEFAULT)}
                />
              )}
              value={String(FIXED_METABOT_IDS.DEFAULT)}
            >
              {t`Internal`}
            </Tabs.Tab>
            <Tabs.Tab
              renderRoot={(props) => (
                <Link
                  {...props}
                  to={getMetabotTabPath(FIXED_METABOT_IDS.EMBEDDED)}
                />
              )}
              value={String(FIXED_METABOT_IDS.EMBEDDED)}
            >
              {t`Embedded`}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
      {showTabs && (
        <Tabs value={selectedTab}>
          <Tabs.List>
            <Tabs.Tab
              renderRoot={(props) => (
                <Link {...props} to={getMetabotTabPath("internal")} />
              )}
              value="internal"
            >
              {t`Internal`}
            </Tabs.Tab>
            <Tabs.Tab
              renderRoot={(props) => (
                <Link {...props} to={getMetabotTabPath("embedded")} />
              )}
              value="embedded"
            >
              {t`Embedded`}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
=======
      <Tabs value={String(selectedMetabotId)}>
        <Tabs.List>
          <Tabs.Tab
            renderRoot={(props) => (
              <Link
                {...props}
                to={getMetabotTabPath(FIXED_METABOT_IDS.DEFAULT)}
              />
            )}
            value={String(FIXED_METABOT_IDS.DEFAULT)}
          >
            {t`Internal`}
          </Tabs.Tab>
          <Tabs.Tab
            renderRoot={(props) => (
              <Link
                {...props}
                to={getMetabotTabPath(FIXED_METABOT_IDS.EMBEDDED)}
              />
            )}
            value={String(FIXED_METABOT_IDS.EMBEDDED)}
            rightSection={!hasEmbedding && <UpsellGem.New size={14} />}
          >
            {t`Embedded`}
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx

<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
      {activeMetabot ? (
        <MetabotSettingsPanel metabot={activeMetabot} />
      ) : (
        <LoadingAndErrorWrapper
          loading={isLoading}
          error={error ? t`Error loading Metabot configuration` : null}
        />
      )}
||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
      <MetabotSettingsPanel metabot={activeMetabot} />
=======
      {activeMetabot ? (
        <MetabotSettingsPanel metabot={activeMetabot} />
      ) : shouldShowUpsell ? (
        <EmbeddedMetabotUpsell />
      ) : (
        <LoadingAndErrorWrapper
          loading={isLoading}
          error={error ? t`Error loading Metabot configuration` : null}
        />
      )}
>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx
    </SettingsSection>
  );
}

function ToggleSettingsSection({
  checked,
  description,
  disabled,
  id,
  onChange,
  title,
}: {
  checked: boolean;
  description: ReactNode;
  disabled: boolean;
  id: string;
  onChange: (checked: boolean) => Promise<void>;
  title: string;
}) {
  return (
    <SettingsSection
      id={id}
      title={
        <Flex align="center" gap="md" justify="space-between" w="100%">
          <div>{title}</div>
          <Switch
            aria-label={title}
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked)}
            size="sm"
            w="auto"
          />
        </Flex>
      }
      description={description}
    >
      <></>
    </SettingsSection>
  );
}

function DisabledSection({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled: boolean;
}) {
  return (
    <Stack
      gap="lg"
      opacity={disabled ? 0.4 : 1}
      aria-disabled={disabled || undefined}
      {...(disabled ? { inert: "" } : {})}
    >
      {children}
    </Stack>
  );
}

<<<<<<< HEAD:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
function getSelectedMetabotId(
  metabotId: string | undefined,
  {
    hasEmbedding,
  }: {
    hasEmbedding: boolean;
  },
): MetabotTabId {
  if (metabotId === String(FIXED_METABOT_IDS.EMBEDDED) && hasEmbedding) {
    return FIXED_METABOT_IDS.EMBEDDED;
||||||| 0a60f2436f:frontend/src/metabase/metabot/components/MetabotAdmin/AISettingsPage.tsx
function getSelectedMetabotTab(
  metabotId: string | undefined,
  pathname: string,
  {
    hasEmbedding,
  }: {
    hasEmbedding: boolean;
  },
): MetabotTabValue {
  if (
    (metabotId === String(FIXED_METABOT_IDS.EMBEDDED) ||
      pathname === EMBEDDED_METABOT_PATH) &&
    hasEmbedding
  ) {
    return "embedded";
=======
function getSelectedMetabotId(metabotId: string | undefined): MetabotTabId {
  if (metabotId === String(FIXED_METABOT_IDS.EMBEDDED)) {
    return FIXED_METABOT_IDS.EMBEDDED;
>>>>>>> v0.62.1:frontend/src/metabase/admin/ai/AISettingsPage.tsx
  }

  return FIXED_METABOT_IDS.DEFAULT;
}

function getMetabotTabPath(metabotId: MetabotTabId) {
  return {
    pathname: METABOT_SETTINGS_PATH,
    query: {
      [METABOT_ID_QUERY_PARAM]: String(metabotId),
    },
  };
}
