import { memo } from "react";
import { DatePicker } from "antd";
import { useDispatch } from "react-redux";

import { setFromDate, setToDate } from "../store/filterSlice";

const { RangePicker } = DatePicker;

const FilterSelector = memo(() => {
  const dispatch = useDispatch();

  const onChange = (dates: string[] | null) => {
    if (dates) {
      dispatch(setFromDate(dates[0].toISOString()));
      dispatch(setToDate(dates[1].toISOString()));
    } else {
      dispatch(setFromDate(null));
      dispatch(setToDate(null));
    }
  };

  return <RangePicker onChange={onChange} format="DD.MM.YYYY" />;
});

export default FilterSelector;
