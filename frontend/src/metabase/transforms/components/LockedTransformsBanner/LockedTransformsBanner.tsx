import { t } from "ttag";

import { ExternalLink } from "metabase/common/components/ExternalLink";
import { useStoreUrl } from "metabase/common/hooks";
import { useSelector } from "metabase/redux/hooks";
import { getStoreUsers } from "metabase/selectors/store-users";
<<<<<<< HEAD
=======
import { getUserIsAdmin } from "metabase/selectors/user";
>>>>>>> v0.62.2
import { Box, Button, Flex, Stack, Text } from "metabase/ui";

export const LockedTransformsBanner = () => {
  const { isStoreUser, anyStoreUserEmailAddress } = useSelector(getStoreUsers);
<<<<<<< HEAD
=======
  const isAdmin = useSelector(getUserIsAdmin);
  const canPurchaseTransforms = isStoreUser || isAdmin;
>>>>>>> v0.62.2
  const storeUrl = useStoreUrl("account/manage/plans");

  return (
    <Flex
      bg="background-tertiary"
      p="lg"
      mb="sm"
      bdrs="md"
      lh="lg"
      align="center"
      justify="space-between"
    >
      <Stack gap="sm">
        <Text component="h2" fw={600} fz="1rem" lh="inherit">
          {t`You've used all the transform runs included in your trial.`}
        </Text>
        <Text c="text-secondary" lh="inherit">
          {t`To keep using transforms you can end your trial early and start your subscription.`}
        </Text>
<<<<<<< HEAD
        {!isStoreUser && (
=======
        {!canPurchaseTransforms && (
>>>>>>> v0.62.2
          <Text c="text-secondary" fw="bold" lh="inherit">
            {anyStoreUserEmailAddress
              ? t`Please ask a Store Admin (${anyStoreUserEmailAddress}) to enable this for you.`
              : t`Please ask a Store Admin to enable this for you.`}
          </Text>
        )}
      </Stack>
<<<<<<< HEAD
      {isStoreUser && (
=======
      {canPurchaseTransforms && (
>>>>>>> v0.62.2
        <Box ml="md">
          <Button
            component={ExternalLink}
            href={storeUrl}
          >{t`Start paid subscription`}</Button>
        </Box>
      )}
    </Flex>
  );
};
