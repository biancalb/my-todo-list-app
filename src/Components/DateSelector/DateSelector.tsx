import './DateSelector.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import { FaCalendar } from 'react-icons/fa';
import { DateRange } from 'rsuite/esm/DateRangePicker';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: any,
  value: DateRange | null
}

const DateSelector = (props: Props) => {
  return (
    <div className="date__picker">
      <DateRangePicker
        showOneCalendar
        format="dd/MM/yyyy" 
        character=" a " 
        caretAs={FaCalendar}
        value={props.value} 
        onChange={(value) => props.handleOnChange(value) }
      />
    </div>
  );
};

export default DateSelector;