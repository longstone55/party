"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/logo";
import { Calendar } from "@/components/ui/calendar";
import { ReservationForm } from "@/components/reservation-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock reservation data
const MOCK_RESERVATIONS: Record<string, { male: boolean; female: boolean }> = {
  "2026-04-10": { male: true, female: true },
  "2026-04-11": { male: true, female: false },
  "2026-04-12": { male: false, female: true },
  "2026-04-15": { male: true, female: true },
  "2026-04-18": { male: true, female: true },
};

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedParty, setSelectedParty] = useState<"male" | "female" | null>(null);
  const formRef = React.useRef<HTMLDivElement>(null);

  // Reset selected party when date changes
  useEffect(() => {
    setSelectedParty(null);
  }, [date]);

  // Scroll to form when party is selected
  useEffect(() => {
    if (selectedParty && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedParty]);

  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";
  const dayReservation = MOCK_RESERVATIONS[selectedDateStr];

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-12 gap-6 md:gap-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-700">
        <Logo />
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          <a href="#" className="hover:text-[#3182F6] transition-colors">홈</a>
          <a href="#" className="hover:text-[#3182F6] transition-colors">갤러리</a>
          <a href="#" className="hover:text-[#3182F6] transition-colors">공지사항</a>
          <a href="#" className="hover:text-[#3182F6] transition-colors">마이페이지</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center w-full">
        {/* Left: Calendar Section */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black text-[#3182F6] uppercase leading-tight">
              Reservation
            </h1>
            <p className="text-neutral-400 text-sm max-w-sm">
              날짜를 선택하고 원하는 파티를 클릭하여 예약을 진행하세요.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                1. Select Date
              </label>
              <span className="text-[10px] font-bold text-[#3182F6]">
                {date ? format(date, "yyyy.MM.dd") : "날짜 미선택"}
              </span>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
              reservationData={MOCK_RESERVATIONS}
            />
          </div>

          <div className="hidden lg:flex flex-col gap-3 p-6 bg-neutral-800 rounded-2xl border border-neutral-700">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#3182F6]"></div>
              <span className="text-xs font-medium text-neutral-400">실시간 24명 예약 진행 중</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#3182F6]"></div>
              <span className="text-xs font-medium text-neutral-400">강남구 논현동 123-45 (잭슨 빌딩)</span>
            </div>
          </div>
        </div>

        {/* Right: Party List & Form Section */}
        <div className="flex flex-col gap-6 w-full lg:flex-1 max-w-2xl">
          <div className="flex flex-col gap-4">
            <div className="px-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                2. Select Party Option
              </label>
            </div>

            {dayReservation ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {dayReservation.male && (
                  <button 
                    onClick={() => setSelectedParty("male")}
                    className={cn(
                      "flex items-center justify-between p-5 bg-neutral-800 rounded-2xl border transition-all group text-left",
                      selectedParty === "male" 
                        ? "border-2 border-[#3182F6]" 
                        : "border-neutral-700 hover:border-neutral-500"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                        selectedParty === "male" ? "bg-[#3182F6] border-[#3182F6]" : "bg-neutral-700 border-neutral-600"
                      )}>
                        <span className={cn("font-black text-sm", selectedParty === "male" ? "text-white" : "text-neutral-400")}>M</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-white uppercase">Male Hall Party</span>
                        <span className="text-[10px] text-neutral-400 font-medium">PM 10:00 - AM 05:00</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={cn("text-lg font-black transition-colors", selectedParty === "male" ? "text-white" : "text-[#3182F6]")}>60,000원</span>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-tighter">Click to select</span>
                    </div>
                  </button>
                )}
                {dayReservation.female && (
                  <button 
                    onClick={() => setSelectedParty("female")}
                    className={cn(
                      "flex items-center justify-between p-5 bg-neutral-800 rounded-2xl border transition-all group text-left",
                      selectedParty === "female" 
                        ? "border-2 border-[#3182F6]" 
                        : "border-neutral-700 hover:border-neutral-500"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                        selectedParty === "female" ? "bg-[#3182F6] border-[#3182F6]" : "bg-neutral-700 border-neutral-600"
                      )}>
                        <span className={cn("font-black text-sm", selectedParty === "female" ? "text-white" : "text-neutral-400")}>F</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-white uppercase">Female Hall Party</span>
                        <span className="text-[10px] text-neutral-400 font-medium">PM 10:00 - AM 05:00</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={cn("text-lg font-black transition-colors", selectedParty === "female" ? "text-white" : "text-[#3182F6]")}>30,000원</span>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-tighter">Click to select</span>
                    </div>
                  </button>
                )}
              </div>
            ) : (
              <div className="p-12 text-center bg-neutral-800 rounded-2xl border border-neutral-700 text-neutral-400 text-sm">
                {date ? "선택하신 날짜에는 예약 가능한 파티가 없습니다." : "먼저 달력에서 날짜를 선택해주세요."}
              </div>
            )}
          </div>

          {/* 3. Input Section (Visible only when party is selected) */}
          {selectedParty && (
            <div ref={formRef} className="mt-4 animate-in slide-in-from-top-4 duration-500 pt-4">
              <div className="px-1 mb-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  3. Enter Reservation Info
                </label>
              </div>
              <ReservationForm 
                selectedDate={date} 
                selectedGender={selectedParty} 
                onCancel={() => setSelectedParty(null)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Party Detail Image Section */}
      <section className="mt-12 md:mt-24 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-1 bg-[#3182F6] rounded-full mb-2"></div>
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3182F6]">
            Party Details
          </label>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            잭슨파티 상세 안내
          </h2>
        </div>
        <div className="w-full max-w-4xl relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-neutral-700 bg-neutral-900">
          <img 
            src="https://jacksonparty.com/data/editor/2506/90e5279b6b81393f8317e515c0774f49_1749737845_6983_1764599197.png" 
            alt="Jackson Party Detail Introduction" 
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>

        <div className="mt-8 p-6 bg-neutral-800 border border-neutral-700 rounded-2xl max-w-2xl w-full text-center">
          <p className="text-xs text-neutral-400 leading-relaxed italic">
            "잭슨파티는 건전하고 즐거운 파티 문화를 지향합니다. <br />
            타인에게 불쾌감을 주는 행위나 규정 위반 시 예고 없이 퇴장 조치될 수 있습니다."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto text-center text-neutral-500 text-[10px] md:text-xs py-8 md:py-12 border-t border-neutral-700">
        © 2026 JACKSON PARTY. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
