import { NO_TIME_RANGE, styled, t } from '@superset-ui/core';
import dayjs from 'dayjs';
import { useState, useCallback, useEffect } from 'react';
import { RangePicker } from 'src/components/DatePicker';
import { FormItem } from 'src/components/Form';
import { Input } from 'src/components/Input';
import Tabs from 'src/components/Tabs';
import { Tooltip } from 'src/components/Tooltip';
import Icons from 'src/components/Icons';

const START_SUGGESTIONS = ['7 days ago', '30 days ago'];
const END_SUGGESTIONS = ['now', 'yesterday'];

const StyledFormItem = styled(FormItem)`
  display: flex;
  flex-direction: column;

  .ant-form-item-label {
    text-align: left;
    height: ${({ theme }) => 7 * theme.gridUnit}px;
  }
`;

const StyledLabel = styled.span`
  margin-right: ${({ theme }) => theme.gridUnit}px;
  font-size: ${({ theme }) => theme.typography.sizes.m}px;
`;

const Sugestion = styled.span`
  color: ${({ theme }) => theme.colors.primary.base};
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const SuggestionWrapper = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.s}px;
  color: ${({ theme }) => theme.colors.grayscale.light1};
`;

const DatePickersWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.gridUnit * 8}px;
`;

const StyledPanelWrapper = styled.div`
  width: 600px;

  .antd5-picker-panel-layout {
    justify-self: center;
  }

  .ant-tabs-nav-list {
    padding-left: ${({ theme }) => theme.gridUnit * 4}px;
  }
`;

export interface TimeRangePickerControlProps {
  value?: string;
  onChange: (timeRange: string) => void;
}

function TimeRangePickerControl({
  value,
  onChange,
}: TimeRangePickerControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRangeValues, setDateRangeValues] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [rangeInputs, setRangeInputs] = useState<[string, string]>(['', '']);

  useEffect(() => {
    if (value === NO_TIME_RANGE) {
      setDateRangeValues([null, null]);
    } else if (value === 'Last week') {
      setDateRangeValues([dayjs().subtract(7, 'day'), dayjs()]);
    }
  }, [value]);

  useEffect(() => {
    const newRangeInputs: [string, string] = ['', ''];

    if (dateRangeValues[0]) {
      newRangeInputs[0] = dateRangeValues[0].format('YYYY-MM-DD');
    }
    if (dateRangeValues[1]) {
      newRangeInputs[1] = dateRangeValues[1].format('YYYY-MM-DD');
    }

    setRangeInputs(newRangeInputs);
  }, [dateRangeValues]);

  const locale = dayjs.locale();
  const panelRender = useCallback(
    panelNode => (
      <StyledPanelWrapper>
        <Tabs fullWidth={false} defaultActiveKey="basic" animated>
          <Tabs.TabPane tab={t('Basic')} key="basic">
            {panelNode}
            <DatePickersWrapper>
              <StyledFormItem
                name="start"
                rules={[
                  { required: true, message: t('Start date is required') },
                ]}
                label={
                  <>
                    <StyledLabel>{t('Start')}</StyledLabel>
                    <Tooltip
                      placement="top"
                      title={t(
                        'The start date is inclusive. The end date is exclusive.',
                      )}
                    >
                      <Icons.InfoCircleOutlined iconSize="s" />
                    </Tooltip>
                  </>
                }
              >
                <Input
                  value={rangeInputs[0]}
                  placeholder={t('Select in calendar or type')}
                  onChange={e => handleInputChange(0, e.target.value)}
                  allowClear
                  onClear={() => handleInputChange(0, '')}
                />
                <SuggestionWrapper>
                  <span>{t('Suggested: ')}</span>
                  <Sugestion
                    onClick={() => handleInputChange(0, START_SUGGESTIONS[0])}
                  >
                    {`${START_SUGGESTIONS[0]}, `}
                  </Sugestion>
                  <Sugestion
                    onClick={() => handleInputChange(0, START_SUGGESTIONS[1])}
                  >
                    {START_SUGGESTIONS[1]}
                  </Sugestion>
                </SuggestionWrapper>
              </StyledFormItem>
              <StyledFormItem
                name="end"
                label={
                  <>
                    <StyledLabel>{t('End')}</StyledLabel>
                    <Tooltip
                      placement="top"
                      title={t(
                        'The start date is inclusive. The end date is exclusive.',
                      )}
                    >
                      <Icons.InfoCircleOutlined iconSize="s" />
                    </Tooltip>
                  </>
                }
              >
                <Input
                  value={rangeInputs[1]}
                  placeholder={t('Leave blank, select in calendar or type')}
                  onChange={e => handleInputChange(1, e.target.value)}
                  allowClear
                  onClear={() => handleInputChange(1, '')}
                />
                <SuggestionWrapper>
                  <span>{t('Suggested: ')}</span>
                  <Sugestion
                    onClick={() => handleInputChange(1, END_SUGGESTIONS[0])}
                  >
                    {`${END_SUGGESTIONS[0]}, `}
                  </Sugestion>
                  <Sugestion
                    onClick={() => handleInputChange(1, END_SUGGESTIONS[1])}
                  >
                    {END_SUGGESTIONS[1]}
                  </Sugestion>
                </SuggestionWrapper>
              </StyledFormItem>
            </DatePickersWrapper>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('Last')} key="last" />

          <Tabs.TabPane tab={t('Custom')} key="custom" />
          <Tabs.TabPane tab={t('Advanced')} key="advanced" />
        </Tabs>
      </StyledPanelWrapper>
    ),
    [rangeInputs],
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleInputChange = (index: number, value: string) => {
    const newRangeInputs: [string, string] = [...rangeInputs];
    const parsedDate = dayjs(value, ['L', 'YYYY-MM-DD'], true);

    if (parsedDate.isValid()) {
      const formattedDate = parsedDate.locale(locale).format('YYYY-MM-DD');
      newRangeInputs[index] = formattedDate;

      const newDateRangeValues = [...dateRangeValues] as [
        dayjs.Dayjs | null,
        dayjs.Dayjs | null,
      ];
      newDateRangeValues[index] = parsedDate;
    } else {
      newRangeInputs[index] = value;
    }

    setRangeInputs(newRangeInputs);
  };

  return (
    <RangePicker
      open={isOpen}
      value={dateRangeValues}
      onOpenChange={handleOpenChange}
      panelRender={panelRender}
    />
  );
}

export default TimeRangePickerControl;
