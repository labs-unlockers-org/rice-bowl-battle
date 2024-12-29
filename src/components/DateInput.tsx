import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  theme?: 'blue' | 'red';
  disabled?: boolean;
}

export function DateInput({ label, value, onChange, theme = 'blue', disabled = false }: DateInputProps) {
  const [year, setYear] = useState(value ? new Date(value).getFullYear() : new Date().getFullYear());
  const [month, setMonth] = useState(value ? new Date(value).getMonth() + 1 : 1);
  const [day, setDay] = useState(value ? new Date(value).getDate() : 1);
  const [isEditing, setIsEditing] = useState<'year' | 'month' | 'day' | null>(null);

  const currentYear = new Date().getFullYear();

  const updateDate = (newYear: number, newMonth: number, newDay: number) => {
    const date = new Date(newYear, newMonth - 1, newDay);
    if (!isNaN(date.getTime())) {
      onChange(`${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`);
    }
  };

  const handleWheel = (e: React.WheelEvent, type: 'year' | 'month' | 'day') => {
    if (disabled) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    
    if (type === 'year') {
      const newYear = year + delta;
      if (newYear >= 1900 && newYear <= currentYear) {
        setYear(newYear);
        updateDate(newYear, month, day);
      }
    } else if (type === 'month') {
      let newMonth = month + delta;
      if (newMonth < 1) newMonth = 12;
      if (newMonth > 12) newMonth = 1;
      setMonth(newMonth);
      updateDate(year, newMonth, day);
    } else {
      const lastDay = new Date(year, month, 0).getDate();
      let newDay = day + delta;
      if (newDay < 1) newDay = lastDay;
      if (newDay > lastDay) newDay = 1;
      setDay(newDay);
      updateDate(year, month, day);
    }
  };

  const handleClick = (type: 'year' | 'month' | 'day', direction: 'up' | 'down') => {
    if (disabled) return;
    const delta = direction === 'up' ? 1 : -1;
    
    if (type === 'year') {
      const newYear = year + delta;
      if (newYear >= 1900 && newYear <= currentYear) {
        setYear(newYear);
        updateDate(newYear, month, day);
      }
    } else if (type === 'month') {
      let newMonth = month + delta;
      if (newMonth < 1) newMonth = 12;
      if (newMonth > 12) newMonth = 1;
      setMonth(newMonth);
      updateDate(year, newMonth, day);
    } else {
      const lastDay = new Date(year, month, 0).getDate();
      let newDay = day + delta;
      if (newDay < 1) newDay = lastDay;
      if (newDay > lastDay) newDay = 1;
      setDay(newDay);
      updateDate(year, month, day);
    }
  };

  const handleInputChange = (type: 'year' | 'month' | 'day', value: string) => {
    const num = parseInt(value);
    if (isNaN(num)) return;

    if (type === 'year') {
      if (num >= 1900 && num <= currentYear) {
        setYear(num);
        updateDate(num, month, day);
      }
    } else if (type === 'month') {
      if (num >= 1 && num <= 12) {
        setMonth(num);
        updateDate(year, num, day);
      }
    } else {
      const lastDay = new Date(year, month, 0).getDate();
      if (num >= 1 && num <= lastDay) {
        setDay(num);
        updateDate(year, month, num);
      }
    }
  };

  const handleInputBlur = () => {
    setIsEditing(null);
  };

  const handleDoubleClick = (type: 'year' | 'month' | 'day') => {
    if (!disabled) {
      setIsEditing(type);
    }
  };

  const themeColor = theme === 'red' ? 'red' : 'blue';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className={`grid grid-cols-3 gap-4 ${disabledClass}`}>
        {/* 년 */}
        <div 
          className={`relative bg-white border border-gray-300 rounded-lg overflow-hidden transition-colors ${disabled ? '' : `hover:border-${themeColor}-500`}`}
          onWheel={(e) => handleWheel(e, 'year')}
        >
          <button 
            className={`w-full h-8 flex items-center justify-center ${disabled ? '' : `hover:bg-${themeColor}-50`}`}
            onClick={() => handleClick('year', 'up')}
            disabled={disabled}
          >
            <ChevronUp className={`h-5 w-5 text-${themeColor}-500`} />
          </button>
          <div 
            className="text-center py-2 text-lg font-medium"
            onDoubleClick={() => handleDoubleClick('year')}
          >
            {isEditing === 'year' ? (
              <input
                type="number"
                value={year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                onBlur={handleInputBlur}
                className="w-full text-center focus:outline-none"
                min="1900"
                max={currentYear}
                autoFocus
              />
            ) : (
              `${year}년`
            )}
          </div>
          <button 
            className={`w-full h-8 flex items-center justify-center ${disabled ? '' : `hover:bg-${themeColor}-50`}`}
            onClick={() => handleClick('year', 'down')}
            disabled={disabled}
          >
            <ChevronDown className={`h-5 w-5 text-${themeColor}-500`} />
          </button>
        </div>
        {/* 월 */}
        <div 
          className={`relative bg-white border border-gray-300 rounded-lg overflow-hidden transition-colors ${disabled ? '' : `hover:border-${themeColor}-500`}`}
          onWheel={(e) => handleWheel(e, 'month')}
        >
          <button 
            className={`w-full h-8 flex items-center justify-center ${disabled ? '' : `hover:bg-${themeColor}-50`}`}
            onClick={() => handleClick('month', 'up')}
            disabled={disabled}
          >
            <ChevronUp className={`h-5 w-5 text-${themeColor}-500`} />
          </button>
          <div 
            className="text-center py-2 text-lg font-medium"
            onDoubleClick={() => handleDoubleClick('month')}
          >
            {isEditing === 'month' ? (
              <input
                type="number"
                value={month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                onBlur={handleInputBlur}
                className="w-full text-center focus:outline-none"
                min="1"
                max="12"
                autoFocus
              />
            ) : (
              `${month}월`
            )}
          </div>
          <button 
            className={`w-full h-8 flex items-center justify-center ${disabled ? '' : `hover:bg-${themeColor}-50`}`}
            onClick={() => handleClick('month', 'down')}
            disabled={disabled}
          >
            <ChevronDown className={`h-5 w-5 text-${themeColor}-500`} />
          </button>
        </div>
        {/* 일 */}
        <div 
          className={`relative bg-white border border-gray-300 rounded-lg overflow-hidden transition-colors ${disabled ? '' : `hover:border-${themeColor}-500`}`}
          onWheel={(e) => handleWheel(e, 'day')}
        >
          <button 
            className={`w-full h-8 flex items-center justify-center ${disabled ? '' : `hover:bg-${themeColor}-50`}`}
            onClick={() => handleClick('day', 'up')}
            disabled={disabled}
          >
            <ChevronUp className={`h-5 w-5 text-${themeColor}-500`} />
          </button>
          <div 
            className="text-center py-2 text-lg font-medium"
            onDoubleClick={() => handleDoubleClick('day')}
          >
            {isEditing === 'day' ? (
              <input
                type="number"
                value={day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                onBlur={handleInputBlur}
                className="w-full text-center focus:outline-none"
                min="1"
                max={new Date(year, month, 0).getDate()}
                autoFocus
              />
            ) : (
              `${day}일`
            )}
          </div>
          <button 
            className={`w-full h-8 flex items-center justify-center ${disabled ? '' : `hover:bg-${themeColor}-50`}`}
            onClick={() => handleClick('day', 'down')}
            disabled={disabled}
          >
            <ChevronDown className={`h-5 w-5 text-${themeColor}-500`} />
          </button>
        </div>
      </div>
    </div>
  );
}