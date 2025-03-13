
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ExpirationPickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const ExpirationPicker: React.FC<ExpirationPickerProps> = ({ date, onDateChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      onDateChange(updatedDate);
    }
  };

  const handleTimeChange = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes);
    onDateChange(updatedDate);
  };

  const handleQuickSelect = (days: number) => {
    const now = new Date();
    const newDate = new Date(now);
    newDate.setDate(now.getDate() + days);
    onDateChange(newDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickSelect(1)}
          className="text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/30"
        >
          1 day
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickSelect(3)}
          className="text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/30"
        >
          3 days
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickSelect(7)}
          className="text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/30"
        >
          1 week
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickSelect(30)}
          className="text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/30"
        >
          1 month
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[180px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-40">
          <Select
            onValueChange={handleTimeChange}
            defaultValue={`${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`}
          >
            <SelectTrigger className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <React.Fragment key={hour}>
                  {minutes.map((minute) => (
                    <SelectItem 
                      key={`${hour}:${minute}`} 
                      value={`${hour}:${minute}`}
                    >
                      {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ExpirationPicker;
