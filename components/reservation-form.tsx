"use client";

import React, { useState, useEffect } from "react";
import { format, differenceInYears } from "date-fns";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Info, AlertCircle, ChevronDown, Check } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  year: string;
  month: string;
  day: string;
}

interface ReservationFormProps {
  selectedDate: Date | undefined;
  selectedGender: "male" | "female";
  onCancel: () => void;
}

const KOREAN_PROVINCES = [
  "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", 
  "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", 
  "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
];

const REFUND_BANKS = [
  "국민은행", "신한은행", "우리은행", "하나은행", "IBK기업은행", "NH농협은행", 
  "카카오뱅크", "토스뱅크", "케이뱅크", "우체국", "SC제일은행", "새마을금고", "신협"
];

const BIRTH_YEARS = Array.from({ length: 80 }, (_, i) => (new Date().getFullYear() - i).toString());
const BIRTH_MONTHS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const BIRTH_DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

export const ReservationForm = ({ selectedDate, selectedGender, onCancel }: ReservationFormProps) => {
  const [formData, setFormData] = useState({
    od_name: "",
    od_pwd: "",
    od_data6: selectedGender === "male" ? "남성" : "여성",
    od_hp: "",
    od_addr1: "",
    od_data2: "", // Refund Bank
    od_data3: "", // Refund Account
    od_data4: "", // Refund Holder
    od_memo: "",
    personal_info_consent2: false,
    personal_info_consent: false,
    marketing_consent: false,
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      od_data6: selectedGender === "male" ? "남성" : "여성"
    }));
  }, [selectedGender]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const malePrice = 60000;
  const femalePrice = 30000;
  const unitPrice = formData.od_data6 === "남성" ? malePrice : femalePrice;
  const totalParticipants = 1;
  const totalPrice = unitPrice * totalParticipants;

  const accentColor = "text-[#3182F6]";
  const borderColor = "border-neutral-700";
  const bgColor = "bg-[#3182F6]";
  const shadowColor = "";

  if (!selectedDate) return null;

  return (
    <div className={cn(
      "flex flex-col gap-8 p-6 md:p-8 bg-neutral-800 rounded-2xl border mb-12 animate-in fade-in zoom-in-95 duration-500",
      borderColor, shadowColor
    )}>
      {/* Header */}
      <div className="flex justify-between items-start border-b border-neutral-700 pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold bg-[#3182F6]/10 uppercase tracking-widest", accentColor)}>
              {formData.od_data6} 전용 예약
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">잭슨파티 예약 신청</h2>
          </div>
          <p className="text-sm text-zinc-400">
            {format(selectedDate, "yyyy년 MM월 dd일")} • {formData.od_data6} 홀파티
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 text-zinc-500 hover:text-white transition-colors hover:bg-neutral-800 rounded-full"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Personal Info */}
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("w-1 h-4 rounded-full", bgColor)}></div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">예약자 기본 정보</h3>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">예약자 성함 (실명표기)</label>
              <input
                type="text"
                name="od_name"
                value={formData.od_name}
                onChange={handleInputChange}
                placeholder="실명을 입력해주세요"
                className="w-full p-4 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-white placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">비밀번호 (3~20자)</label>
              <input
                type="password"
                name="od_pwd"
                value={formData.od_pwd}
                onChange={handleInputChange}
                placeholder="예약 확인/취소 시 사용됩니다"
                className="w-full p-4 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-white placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">성별</label>
              <div className="w-full p-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white font-bold opacity-80 cursor-not-allowed flex items-center justify-between">
                <span>{formData.od_data6}</span>
                <span className="text-[10px] text-neutral-500 font-normal">선택 완료 (변경 불가)</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">연락처</label>
              <input
                type="tel"
                name="od_hp"
                value={formData.od_hp}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                className="w-full p-4 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-white placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">거주지 (광역시/도)</label>
              <div className="relative">
                <select
                  name="od_addr1"
                  value={formData.od_addr1}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-white appearance-none"
                >
                  <option value="">거주지를 선택하세요</option>
                  {KOREAN_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Dynamic Participants & Refund */}
        <div className="flex flex-col gap-6">

          <section className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("w-1 h-4 rounded-full", bgColor)}></div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">환불 계좌 정보</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">은행명</label>
                <div className="relative">
                  <select
                    name="od_data2"
                    value={formData.od_data2}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-sm text-white appearance-none"
                  >
                    <option value="">은행 선택</option>
                    {REFUND_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={14} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">예금주</label>
                <input
                  type="text"
                  name="od_data4"
                  value={formData.od_data4}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-sm text-white"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">계좌번호</label>
              <input
                type="text"
                name="od_data3"
                value={formData.od_data3}
                onChange={handleInputChange}
                placeholder="'-' 없이 숫자만 입력"
                className="w-full p-3 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-sm text-white"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6 border-t border-neutral-700">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">요청사항</label>
          <textarea
            name="od_memo"
            value={formData.od_memo}
            onChange={handleInputChange}
            rows={2}
            className="w-full p-4 bg-zinc-900/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-neon-blue transition-all text-white text-sm resize-none"
            placeholder="추가 요청사항이 있다면 입력해주세요"
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input 
                type="checkbox" 
                name="personal_info_consent2"
                checked={formData.personal_info_consent2}
                onChange={handleInputChange}
                className="peer hidden" 
              />
              <div className="w-5 h-5 border-2 border-zinc-700 rounded-md bg-zinc-900 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                <Check size={14} className="text-black scale-0 peer-checked:scale-100 transition-transform font-black" strokeWidth={4} />
              </div>
            </div>
            <span className="text-xs text-zinc-400 leading-tight">
              파티 규정 숙지 및 노쇼 발생 시 환불 불가 동의 <span className="text-neon-blue font-bold">(필수)</span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input 
                type="checkbox" 
                name="personal_info_consent"
                checked={formData.personal_info_consent}
                onChange={handleInputChange}
                className="peer hidden" 
              />
              <div className="w-5 h-5 border-2 border-zinc-700 rounded-md bg-zinc-900 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                <Check size={14} className="text-black scale-0 peer-checked:scale-100 transition-transform font-black" strokeWidth={4} />
              </div>
            </div>
            <span className="text-xs text-zinc-400 leading-tight">
              개인정보 수집 및 이용 동의 <span className="text-neon-blue font-bold">(필수)</span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input 
                type="checkbox" 
                name="marketing_consent"
                checked={formData.marketing_consent}
                onChange={handleInputChange}
                className="peer hidden" 
              />
              <div className="w-5 h-5 border-2 border-zinc-700 rounded-md bg-zinc-900 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                <Check size={14} className="text-black scale-0 peer-checked:scale-100 transition-transform font-black" strokeWidth={4} />
              </div>
            </div>
            <span className="text-xs text-zinc-400 leading-tight">
              마케팅 목적의 광고성 정보 수신 동의 (선택)
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">결제 방식</span>
              <span className="text-sm text-white font-bold">무통장 입금 (Jackson Bank)</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest text-right">예약 인원</span>
              <span className="text-sm text-white font-bold">1인 1예약 원칙 (추가불가)</span>
            </div>
          </div>
          
          <div className="h-px bg-[#3182F6]/10 w-full"></div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">최종 결제 금액</span>
              <span className="text-xs text-neutral-400">({unitPrice.toLocaleString()}원 × 1명)</span>
            </div>
            <span className={cn("text-3xl font-black italic tracking-tighter", accentColor)}>
              {totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>

        <button 
          disabled={!formData.personal_info_consent || !formData.personal_info_consent2}
          className={cn(
            "w-full py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale",
            bgColor, "text-white", shadowColor
          )}
        >
          {totalPrice.toLocaleString()}원 예약하기
        </button>
        
        <div className="flex flex-col gap-1 text-[10px] text-zinc-600 text-center leading-relaxed">
          <p>예약 확정 시 노쇼 방지를 위해 위 금액이 결제됩니다.</p>
          <p>입금 계좌: <span className="text-zinc-400 font-bold">신한은행 110-123-456789 (예금주: 잭슨파티)</span></p>
          <p>환불 규정에 따라 예약 24시간 전까지만 100% 환불이 가능합니다.</p>
        </div>
      </div>
    </div>
  );
};
