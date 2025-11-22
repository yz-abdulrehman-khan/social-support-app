import { forwardRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { arSA } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '@/lib/utils';
import { toArabicNumerals } from '@/lib/i18n';
import { useRTL } from '@/hooks/useRTL';

registerLocale('ar', arSA);

interface DatePickerProps {
  id?: string;
  value?: string;
  onChange: (date: string) => void;
  onBlur?: () => void;
  className?: string;
  language?: 'en' | 'ar';
  placeholder?: string;
  hasError?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder, className, language, hasError }, ref) => {
  const displayValue = language === 'ar' && value ? toArabicNumerals(value) : value;

  return (
    <input
      type="text"
      data-slot="input"
      aria-invalid={hasError}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      onClick={onClick}
      value={displayValue}
      onChange={() => {}}
      placeholder={placeholder}
      ref={ref}
      readOnly
    />
  );
});

CustomInput.displayName = 'CustomInput';

export function DatePicker({ id, value, onChange, onBlur, className, language = 'en', placeholder, hasError }: DatePickerProps) {
  const { isRTL } = useRTL();
  const dateValue = value ? new Date(value) : null;

  const handleChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange('');
    }
  };

  const handleCalendarClose = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const renderDayContents = (day: number) => {
    return <span>{language === 'ar' ? toArabicNumerals(String(day)) : day}</span>;
  };

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: any) => {
    const months = language === 'ar'
      ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
      <div className="flex items-center justify-between px-4 py-3 mb-2">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="p-1.5 hover:bg-accent/10 rounded-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="text-sm font-semibold bg-white border border-gray-200 rounded-md px-3 py-1.5 outline-none cursor-pointer hover:border-accent focus:border-primary transition-colors min-w-[80px]"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="text-sm font-semibold bg-white border border-gray-200 rounded-md px-3 py-1.5 outline-none cursor-pointer hover:border-accent focus:border-primary transition-colors min-w-[85px]"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {language === 'ar' ? toArabicNumerals(String(year)) : year}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="p-1.5 hover:bg-accent/10 rounded-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <ReactDatePicker
      id={id}
      selected={dateValue}
      onChange={handleChange}
      onCalendarClose={handleCalendarClose}
      locale={language}
      dateFormat="dd/MM/yyyy"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      maxDate={new Date()}
      placeholderText={placeholder}
      customInput={<CustomInput className={className} placeholder={placeholder} language={language} hasError={hasError} />}
      wrapperClassName="w-full block"
      calendarClassName={isRTL ? 'rtl-calendar' : ''}
      popperPlacement={isRTL ? 'bottom-end' : 'bottom-start'}
      renderDayContents={renderDayContents}
      renderCustomHeader={renderCustomHeader}
    />
  );
}
