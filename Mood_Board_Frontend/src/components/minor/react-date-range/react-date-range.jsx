/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import Images from 'assets/Images';
import styles from './react-date-range.module.scss';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePickerComp = () => {
  const [ open, setOpen ] = useState(false);
  const refOne = useRef(null);
  const [ range, setRange ] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  return (
    <div className={styles.calendarWrap} style={{ position: 'relative' }}>
      <span><img src={Images.CALENDAR} alt="calendar" width="14" onClick={() => setOpen((prev) => !prev)} /></span>
      <input
        value={`${format(range[0].startDate, 'MM/dd/yyyy')} - ${format(range[0].endDate, 'MM/dd/yyyy')}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((prev) => !prev)}
      />

      <div ref={refOne}>
        {open
          && (
            <div className={styles.dateRangePickerContainer}>
              <DateRangePicker
                onChange={(item) => { setRange([item.selection]); console.log('item', item); }}
                editableDateInputs
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={2}
                direction="horizontal"
                className="calendarElement"
              />
              {/* <div className={styles.btnConainer}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onSearch(range);
                  }}
                >
                  Search
                </button>
              </div> */}
            </div>
          )}

      </div>
    </div>
  );
};

export default DateRangePickerComp;
