import { t } from "ttag";

<<<<<<< HEAD
import { MetabotSetupInner } from "metabase/admin/ai/MetabotSetup";
import { Modal, type ModalProps } from "metabase/ui";

=======
import { Modal, type ModalProps } from "metabase/ui";

import { MetabotSetupInner } from "./MetabotAdmin/MetabotSetup";

>>>>>>> v0.61.2
export function AIProviderConfigurationModal({
  opened,
  onClose,
}: Pick<ModalProps, "opened" | "onClose">) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t`Connect to an AI provider`}
      size="lg"
      data-testid="ai-provider-configuration-modal"
    >
      <MetabotSetupInner isModal onClose={onClose} />
    </Modal>
  );
}
