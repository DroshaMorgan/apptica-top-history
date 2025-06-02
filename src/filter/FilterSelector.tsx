import { memo } from "react";
import { DatePicker } from "antd";
import { useDispatch } from "react-redux";

import { resetDates, setFromDate, setToDate } from "../store/filterSlice";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const FilterSelector = memo(() => {
  const dispatch = useDispatch();

  const onChange = (dates: Dayjs[]) => {
    if (dates) {
      dispatch(setFromDate(dates[0].toISOString()));
      dispatch(setToDate(dates[1].toISOString()));
    } else {
      dispatch(resetDates());
    }
  };

  return <RangePicker onChange={onChange} format="DD.MM.YYYY" />;
});

export default FilterSelector;
