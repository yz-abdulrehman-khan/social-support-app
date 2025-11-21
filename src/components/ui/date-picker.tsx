import { forwardRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { arSA } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '@/lib/utils';
import { useIntl } from 'react-intl';

// Register Arabic locale
registerLocale('ar', arSA);

// Helper function to convert Western numerals to Arabic numerals
const toArabicNumerals = (str: string | number): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(str).replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
};

interface DatePickerProps {
  id?: string;
  value?: string;
  onChange: (date: string) => void;
  className?: string;
  language?: 'en' | 'ar';
  placeholder?: string;
}

const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder, className, language }, ref) => {
  // Convert date to Arabic numerals if language is Arabic
  const displayValue = language === 'ar' && value ? toArabicNumerals(value) : value;

  return (
    <input
      type="text"
      data-slot="input"
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

export function DatePicker({ id, value, onChange, className, language = 'en', placeholder }: DatePickerProps) {
  const isRTL = language === 'ar';

  // Convert string date to Date object
  const dateValue = value ? new Date(value) : null;

  // Handle date change
  const handleChange = (date: Date | null) => {
    if (date) {
      // Format as YYYY-MM-DD for the form
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange('');
    }
  };

  // Render day numbers in Arabic numerals when Arabic is selected
  const renderDayContents = (day: number) => {
    return <span>{formatNumber(day, language)}</span>;
  };

  // Render custom header with Arabic numerals for year
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
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 mb-2">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="text-xs sm:text-sm font-semibold bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1.5 outline-none cursor-pointer hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            style={{ minWidth: '70px' }}
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
            className="text-xs sm:text-sm font-semibold bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1.5 outline-none cursor-pointer hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            style={{ minWidth: '75px' }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {formatNumber(year, language)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
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
      locale={language}
      dateFormat="dd/MM/yyyy"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      maxDate={new Date()}
      placeholderText={placeholder}
      customInput={<CustomInput className={className} placeholder={placeholder} language={language} />}
      wrapperClassName="w-full block"
      calendarClassName={isRTL ? 'rtl-calendar' : ''}
      popperPlacement={isRTL ? 'bottom-end' : 'bottom-start'}
      renderDayContents={renderDayContents}
      renderCustomHeader={renderCustomHeader}
    />
  );
}
