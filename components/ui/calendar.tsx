"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type ChevronProps } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  reservationData?: Record<string, { male: boolean; female: boolean }>;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  reservationData = {},
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      className={cn("p-3 md:p-4 bg-neutral-800 rounded-2xl border border-neutral-700 w-full", className)}
      classNames={{
        months: "w-full",
        month: "space-y-4 w-full",
        month_caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-base font-bold text-white",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity absolute left-1"
        ),
        button_next: cn(
          "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity absolute right-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex w-full justify-between",
        weekday:
          "text-neutral-500 rounded-md flex-1 font-normal text-[0.8rem] dark:text-neutral-400 text-center",
        week: "flex w-full mt-2 justify-between",
        day: "flex-1 aspect-square text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-800/50 [&:has([aria-selected])]:bg-neutral-800 dark:[&:has([aria-selected].day-outside)]:bg-neutral-700/50 dark:[&:has([aria-selected])]:bg-neutral-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          "h-full w-full p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-xl transition-all flex flex-col items-center justify-center relative"
        ),
        range_end: "day-range-end",
        selected:
          "!bg-[#3182F6] !text-white hover:!bg-[#3182F6] hover:text-white focus:!bg-[#3182F6] focus:text-white font-bold",
        today: "bg-neutral-700 text-[#3182F6] font-bold",
        outside:
          "day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-800/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-700/50 dark:aria-selected:text-neutral-400",
        disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        range_middle:
          "aria-selected:bg-neutral-800 aria-selected:text-white dark:aria-selected:bg-neutral-700 dark:aria-selected:text-white",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }: ChevronProps) => {
          if (orientation === "left") return <ChevronLeft className="h-4 w-4 text-[#3182F6]" />;
          if (orientation === "right") return <ChevronRight className="h-4 w-4 text-[#3182F6]" />;
          return <></>;
        },
        DayButton: ({ day, modifiers, ...buttonProps }) => {
          const dateStr = format(day.date, "yyyy-MM-dd");
          const hasReservation = reservationData[dateStr];
          
          return (
            <button {...buttonProps} className={cn(buttonProps.className)}>
              <span className="z-10">{day.date.getDate()}</span>
              {hasReservation && (
                <div className="absolute bottom-1.5 flex gap-1 justify-center w-full">
                  {hasReservation.male && (
                    <div className="w-1 h-1 rounded-full bg-[#3182F6]"></div>
                  )}
                  {hasReservation.female && (
                    <div className="w-1 h-1 rounded-full bg-[#3182F6]"></div>
                  )}
                </div>
              )}
            </button>
          );
        },
        MonthCaption: ({ calendarMonth }) => {
          return (
            <div className="flex justify-center items-center h-9">
              <span className="text-base font-bold text-[#3182F6] tracking-tight">
                {format(calendarMonth.date, "yyyy년 M월", { locale: ko })}
              </span>
            </div>
          );
        }
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
