import React from 'react';
import { ReactSelect, useCMEditViewDataManager } from '@strapi/helper-plugin';

import { useReviewWorkflows } from '../../../../pages/SettingsPage/pages/ReviewWorkflows/hooks/useReviewWorkflows';
import Information from '../../../../../../admin/src/content-manager/pages/EditView/Information';

const ATTRIBUTE_NAME = 'strapi_reviewWorkflows_stage';

export function InformationBoxEE() {
  const { initialData } = useCMEditViewDataManager();
  const activeWorkflowStage = initialData?.[ATTRIBUTE_NAME] ?? null;
  const {
    workflows: { data: workflow },
  } = useReviewWorkflows(1);
  // stages are empty while the workflow is loaded
  const options = (workflow?.stages ?? []).map(({ id, name }) => ({ value: id, label: name }));

  return (
    <Information.Root>
      <Information.Title />
      {activeWorkflowStage && (
        <ReactSelect
          options={options}
          name={ATTRIBUTE_NAME}
          value={activeWorkflowStage?.id}
          isSearchable={false}
          isClearable={false}
        />
      )}
      <Information.Body />
    </Information.Root>
  );
}
