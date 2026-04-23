# Jackson Party Reservation System - Design Guidelines (20s Target)

## 1. Core Concept & Mood
- **Theme:** Modern Dark Minimal + Solid Point Color
- **Vibe:** 군더더기 없이 시크하고 트렌디한 무드. 그래픽적 기교(그라데이션, 그림자, 빛 번짐)를 최소화하고, 타이포그래피와 여백의 미를 강조하는 모던 앱 스타일.
- **Typography:** `Pretendard` 폰트 필수 사용. 제목은 과감하게 두껍게(Bold/ExtraBold), 본문 및 라벨은 얇고 정갈하게(Regular/Medium) 대비를 주어 가독성 극대화.

## 2. Color System
- **Background (Base):** 차갑고 깊은 솔리드 다크 그레이 (`#17171C` 또는 `bg-neutral-900`). 완전한 블랙(`#000000`)은 피하여 눈의 피로를 줄임.
- **Card Background:** 섹션 구분을 위한 미세한 명도 차이 (`#222228` 또는 `bg-neutral-800`).
- **Text:** - Primary: 퓨어 화이트 (`#FFFFFF`)
  - Secondary (Labels/Placeholder): 명도가 높은 라이트 그레이 (`text-neutral-400`)
- **Point Color (Brand Accent):** 네온처럼 빛나는 것이 아닌, 선명하고 쨍한 솔리드 컬러 단일 사용.
  - *추천 1 (Trust & Trendy):* Electric Blue (`#3182F6` 계열)
  - *추천 2 (Hip & Street):* Acid Lime (`#D9F845` 계열)
- **Error/Warning:** 채도 높은 레드 (`#F04452`)

## 3. Layout & Structure
- **Mobile-First Card UI:** 각 정보 블록(예약자, 참가자, 결제)을 경계선이 뚜렷한 둥근 카드 형태로 배치.
  - *Tailwind Tokens:* `rounded-2xl`, `p-6`, `mb-5`
- **Flat Design:** 그림자(Shadow)를 완전히 배제하고, 배경색의 명도 차이나 1px의 얇은 테두리(`border-neutral-700`)로만 깊이감을 표현.

## 4. UI Component Details

### A. Input Fields
- 빛 번짐(Ring/Glow) 효과 제거.
- **기본 상태:** 둥근 모서리와 옅은 배경색을 가진 깔끔한 박스.
- **Focus 상태:** 포인트 컬러(예: Electric Blue)로 2px 두께의 선명한 테두리만 생성되어 직관적인 입력 상태 표시.
- *Tailwind Example:* `bg-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-2 focus:border-[#3182F6] transition-colors`

### B. Dynamic Action Buttons ('참가자 추가')
- 텍스트와 얇은 아이콘(+ 모양) 조합으로 심플하게 구성. 
- *Tailwind Example:* `flex items-center justify-center w-full py-3.5 rounded-xl bg-neutral-800 text-neutral-300 font-medium hover:bg-neutral-700 active:scale-[0.98] transition-transform`

### C. Sticky Bottom Bar (CTA & Total Price)
- 하단 고정 영역은 불투명한 다크 배경으로 스크롤 영역과 명확히 분리.
- 총 금액은 그라데이션 없이 크고 굵은 화이트 텍스트로 직관적으로 표시.
- '예약하기' 버튼에만 쨍한 포인트 컬러(Solid)를 꽉 채워 배치.
- *Tailwind Example (Button):* `w-full bg-[#3182F6] text-white font-bold text-lg py-4 rounded-xl active:bg-blue-600`

### D. Error Handling
- 인풋 필드 하단에 얇은 폰트 웨이트로 붉은색 에러 텍스트 표시. 아이콘(경고 모양)을 텍스트 앞에 배치하여 시각적 인지 강화.