/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { styled, t, useTheme } from '@superset-ui/core';
import { useState } from 'react';
import { DatePicker, RangePicker } from 'src/components/DatePicker';
import { FormItem } from 'src/components/Form';
import Icons from 'src/components/Icons';
import { Input } from 'src/components/Input';
import Tabs from 'src/components/Tabs';
import { Tooltip } from 'src/components/Tooltip';

const StyledFormItem = styled(FormItem)`
  display: flex;
  flex-direction: column;

  .ant-form-item-label {
    text-align: left;
  }
`;

function TimeRangePickerControl() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(true);
  };
  const theme = useTheme();
  const DatePickersWrapper = styled.div`
    display: flex;
    width: inherit;
    justify-content: space-between;
    padding: 0 ${theme.gridUnit * 5}px;
  `;

  const StyledPanelWrapper = styled.div`
    width: 600px;
  `;
  return (
    <RangePicker
      open={isOpen}
      onOpenChange={handleOpenChange}
      panelRender={panelNode => (
        <StyledPanelWrapper>
          <Tabs fullWidth={false} defaultActiveKey="basic">
            <Tabs.TabPane tab={t('Basic')} key="basic">
              {panelNode}
              <DatePickersWrapper>
                <StyledFormItem
                  name="start"
                  rules={[
                    {
                      required: true,
                      message: t('Title is required'),
                      whitespace: true,
                    },
                  ]}
                  label={
                    <>
                      <span>{t('Start')}</span>
                      <Tooltip
                        placement="top"
                        title={t(
                          'The start date is inclusive. The end date is exclusive.',
                        )}
                      >
                        <Icons.InfoCircleOutlined />
                      </Tooltip>
                    </>
                  }
                >
                  <Input />
                </StyledFormItem>
                <FormItem name="end" label={t('End')}>
                  <DatePicker />
                </FormItem>
              </DatePickersWrapper>
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('Last')} key="last" />
            <Tabs.TabPane tab={t('Custom')} key="custom" />
            <Tabs.TabPane tab={t('Advanced')} key="advanced" />
          </Tabs>
        </StyledPanelWrapper>
      )}
    />
  );
}
export default TimeRangePickerControl;
