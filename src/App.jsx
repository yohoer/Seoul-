import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Plane, Hotel, Navigation, 
  Wallet, ShoppingBag, Calculator, CloudSun, 
  Plus, Trash2, CheckCircle2, Circle, ArrowRightLeft,
  Sun, Cloud, CloudRain, Palette, CheckSquare, Edit3, CreditCard, Coins, Tag
} from 'lucide-react';

// --- 五種柔和色彩主題定義 ---
const THEMES = {
  milkTea: {
    id: 'milkTea', name: 'Milk Tea',
    bg: 'bg-[#FDFBF7]', card: 'bg-[#F5EEE6]', cardDark: 'bg-[#E6DCCB]',
    primary: 'bg-[#C8B6A6]', primaryHover: 'hover:bg-[#B39E8A]',
    textMain: 'text-[#5C544D]', textSub: 'text-[#8C7F73]', accent: 'text-[#B38D73]',
    border: 'border-[#E6DCCB]', navActive: 'bg-[#F5EEE6]',
    textPrimary: 'text-[#C8B6A6]', dotBorder: 'border-[#FDFBF7]',
    swatch: 'bg-[#C8B6A6]', svgStroke: '#C8B6A6'
  },
  babyBlue: {
    id: 'babyBlue', name: 'Baby Blue',
    bg: 'bg-[#F0F8FF]', card: 'bg-[#E1F0FA]', cardDark: 'bg-[#C4E1F6]',
    primary: 'bg-[#89CFF0]', primaryHover: 'hover:bg-[#6CB4D8]',
    textMain: 'text-[#2C3E50]', textSub: 'text-[#547392]', accent: 'text-[#4A90E2]',
    border: 'border-[#C4E1F6]', navActive: 'bg-[#E1F0FA]',
    textPrimary: 'text-[#89CFF0]', dotBorder: 'border-[#F0F8FF]',
    swatch: 'bg-[#89CFF0]', svgStroke: '#89CFF0'
  },
  custardYellow: {
    id: 'custardYellow', name: 'Custard Yellow',
    bg: 'bg-[#FFFCF2]', card: 'bg-[#FFF5D1]', cardDark: 'bg-[#FCE799]',
    primary: 'bg-[#FFD966]', primaryHover: 'hover:bg-[#F2C544]',
    textMain: 'text-[#594B22]', textSub: 'text-[#8C7A40]', accent: 'text-[#D99A2B]',
    border: 'border-[#FCE799]', navActive: 'bg-[#FFF5D1]',
    textPrimary: 'text-[#FFD966]', dotBorder: 'border-[#FFFCF2]',
    swatch: 'bg-[#FFD966]', svgStroke: '#D99A2B'
  },
  sageGreen: {
    id: 'sageGreen', name: 'Sage Green',
    bg: 'bg-[#F4F7F4]', card: 'bg-[#E3EBE3]', cardDark: 'bg-[#C8D9C8]',
    primary: 'bg-[#9CB39C]', primaryHover: 'hover:bg-[#829982]',
    textMain: 'text-[#3E4D3E]', textSub: 'text-[#637A63]', accent: 'text-[#557355]',
    border: 'border-[#C8D9C8]', navActive: 'bg-[#E3EBE3]',
    textPrimary: 'text-[#9CB39C]', dotBorder: 'border-[#F4F7F4]',
    swatch: 'bg-[#9CB39C]', svgStroke: '#9CB39C'
  },
  offWhite: {
    id: 'offWhite', name: 'Off-White',
    bg: 'bg-[#FAFAFA]', card: 'bg-[#EFEFEF]', cardDark: 'bg-[#E0E0E0]',
    primary: 'bg-[#757575]', primaryHover: 'hover:bg-[#616161]',
    textMain: 'text-[#212121]', textSub: 'text-[#616161]', accent: 'text-[#424242]',
    border: 'border-[#E0E0E0]', navActive: 'bg-[#EFEFEF]',
    textPrimary: 'text-[#757575]', dotBorder: 'border-[#FAFAFA]',
    swatch: 'bg-[#757575]', svgStroke: '#757575'
  }
};

// --- 極簡線條插圖 SVG 元件 ---

// 首爾塔與南山纜車 (用於 Header 背景裝飾)
const SeoulTowerIllustration = ({ className = "w-24 h-24", strokeColor = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* 山丘 */}
    <path d="M10 90 Q 50 70 90 90" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    {/* 首爾塔主體 */}
    <path d="M50 80 L50 20" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    {/* 塔頂展望台 */}
    <path d="M43 35 C 43 30, 57 30, 57 35 L 54 42 C 54 44, 46 44, 46 42 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" opacity="0.6" />
    <path d="M47 25 C 47 22, 53 22, 53 25 L 52 30 C 52 31, 48 31, 48 30 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" opacity="0.6" />
    {/* 避雷針 */}
    <path d="M50 20 L50 10" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    {/* 雲朵/愛心 */}
    <path d="M70 30 C 72 26, 78 26, 80 30 C 82 34, 76 38, 70 42 C 64 38, 58 34, 60 30 C 62 26, 68 26, 70 30 Z" stroke={strokeColor} strokeWidth="0.8" opacity="0.3" />
    {/* 纜車索道 */}
    <path d="M15 40 L 45 60" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
    {/* 小纜車 */}
    <rect x="25" y="48" width="6" height="5" rx="1" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
  </svg>
);

// 景福宮光化門 (用於行程底部裝飾)
const GyeongbokgungIllustration = ({ className = "w-full h-20", strokeColor = "currentColor" }) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* 基座大門 */}
    <path d="M30 50 L 170 50" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <rect x="50" y="35" width="100" height="15" rx="1" stroke={strokeColor} strokeWidth="1.2" opacity="0.5" />
    <path d="M90 50 C 90 42, 110 42, 110 50 Z" stroke={strokeColor} strokeWidth="1.2" opacity="0.6" />
    {/* 飛檐雙層屋頂 */}
    <path d="M40 35 C 60 33, 140 33, 160 35 L 155 30 C 135 28, 65 28, 45 30 Z" stroke={strokeColor} strokeWidth="1.2" opacity="0.6" />
    <path d="M55 28 L 60 18 C 80 16, 120 16, 140 18 L 145 28" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
    <path d="M50 18 C 70 14, 130 14, 150 18 L 145 12 C 125 10, 75 10, 55 12 Z" stroke={strokeColor} strokeWidth="1.2" opacity="0.6" />
  </svg>
);

// 傳統韓屋飛檐 (用於備忘錄/清單底部裝飾)
const HanokRoofIllustration = ({ className = "w-32 h-16", strokeColor = "currentColor" }) => (
  <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 35 C 30 33, 90 33, 110 35" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <path d="M5 38 C 30 30, 90 30, 115 38 L 105 28 C 80 22, 40 22, 15 28 Z" stroke={strokeColor} strokeWidth="1.2" opacity="0.5" />
    {/* 瓦片細節 */}
    <path d="M35 27 L 37 32" stroke={strokeColor} strokeWidth="0.8" opacity="0.4" />
    <path d="M60 25 L 60 31" stroke={strokeColor} strokeWidth="0.8" opacity="0.4" />
    <path d="M85 27 L 83 32" stroke={strokeColor} strokeWidth="0.8" opacity="0.4" />
  </svg>
);

// --- 分類與卡別 ---
const CATEGORIES = ['機票', '住宿', '醫美', '美食', '交通', '購物', '其他'];
const CREDIT_CARDS = ['台新', '星展', '聯邦', '中信'];

// --- 行程資料 ---
const ITINERARY = [
  {
    date: '8/30 (日)',
    items: [
      { type: 'flight', time: '13:45 - 17:40', title: '出發前往首爾', desc: '航班 TW652 (KHH → GMP)' },
      { type: 'place', time: '晚上', title: '樂天超市 金浦店', query: '롯데몰 김포공항점' },
    ]
  },
  {
    date: '8/31 (一)',
    items: [
      { type: 'place', time: '上午', title: '汝矣島現代百貨', query: '더현대 서울', desc: '首爾最大最美的百貨公司' },
      { type: 'place', time: '下午', title: '聖水洞', query: '성수동', desc: '喝咖啡、逛文創小店' },
      { type: 'place', time: '傍晚', title: '首爾林', query: '서울숲', desc: '散步看夕陽' },
    ]
  },
  {
    date: '9/1 (二)',
    items: [
      { type: 'place', time: '全天', title: '弘大商圈', query: '홍대거리', desc: '逛街、吃美食' },
      { type: 'place', time: '全天', title: '延南洞', query: '연남동', desc: '文青咖啡廳、沿線公園' },
      { type: 'clinic', time: '17:00', title: '吳微儷珠皮膚科 Ohvelyjoo', query: '오블리주의원 홍대', desc: '相進大廈11樓 (弘大入口站2號出口前)' },
    ]
  },
  {
    date: '9/2 (三)',
    items: [
      { type: 'flight', time: '10:50 - 12:45', title: '準備回程', desc: '航班 TW651 (GMP → KHH)' },
    ]
  }
];

// --- 預設檢查清單 ---
const DEFAULT_CHECKLIST = [
  { id: 1, item: '護照 (有效期限6個月以上)', checked: true },
  { id: 2, item: '韓國電子入境卡 / Q-CODE 申報', checked: false },
  { id: 3, item: 'E-sim / 網卡開通', checked: true },
  { id: 4, item: 'T-money 交通卡 (確認餘額)', checked: false },
  { id: 5, item: '轉接頭 (韓國4.8mm雙圓孔)', checked: false },
  { id: 6, item: '海外消費高回饋信用卡 (台新/星展等)', checked: true },
  { id: 7, item: '韓元現金準備', checked: true },
  { id: 8, item: '皮膚科預約確認單 / 護膚保養清單', checked: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [themeKey, setThemeKey] = useState('milkTea');
  const theme = THEMES[themeKey];
  
  // 記帳 State
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ 
    title: '', 
    amountKrw: '', 
    category: '美食', 
    paymentMethod: 'cash', 
    cardBank: '台新' 
  });

  // Checklist State
  const [checkList, setCheckList] = useState(DEFAULT_CHECKLIST);
  const [newCheckItem, setNewCheckItem] = useState('');

  // 自由備忘錄 State
  const [notes, setNotes] = useState('弘大吳微儷珠皮膚科記得提前10分鐘到！\n退稅記得在機場樂天超市或金浦機場辦理。');

  // 代購 State
  const [shoppingList, setShoppingList] = useState([
    { id: 1, item: 'Olive Young 面膜', for: '自己', isBought: false },
    { id: 2, item: 'Tamburins 護手霜', for: '朋友A', isBought: false }
  ]);
  const [newShopItem, setNewShopItem] = useState({ item: '', for: '' });

  // 匯率設定
  const EXCHANGE_RATE = 42.5; 
  const [calcInput, setCalcInput] = useState({ krw: '', twd: '' });

  // --- 輔助元件：Naver Map 連結按鈕 ---
  const NaverLink = ({ query, label, className = "" }) => (
    <a 
      href={`https://map.naver.com/v5/search/${query}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${theme.primary} text-white ${theme.primaryHover} transition-colors shadow-sm ${className}`}
    >
      <Navigation className="w-4 h-4" />
      {label || 'NAVER導航'}
    </a>
  );

  // --- 分頁內容：行程表 ---
  const renderItinerary = () => (
    <div className="space-y-6 pb-24 relative">
      <div className={`${theme.card} rounded-2xl p-5 shadow-sm border ${theme.border}`}>
        <div className="flex items-center gap-2 mb-3">
          <Hotel className={`w-5 h-5 ${theme.accent}`} />
          <h2 className={`text-lg font-bold ${theme.textMain}`}>我的住宿 (弘大)</h2>
        </div>
        <p className={`${theme.textSub} text-sm mb-3`}>地址：마포구 양화로 157</p>
        <NaverLink query="마포구 양화로 157" label="開啟 NAVER Map 導航" className="w-full justify-center" />
      </div>

      {ITINERARY.map((day, idx) => (
        <div key={idx} className={`relative pl-4 border-l-2 ${theme.border} ml-2 space-y-4`}>
          <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${theme.primary} border-4 ${theme.dotBorder}`} />
          <h3 className={`text-lg font-bold ${theme.textMain} pl-2`}>{day.date}</h3>
          
          <div className="space-y-3 pl-2">
            {day.items.map((item, i) => (
              <div key={i} className={`${theme.card} rounded-xl p-4 shadow-sm relative overflow-hidden`}>
                {item.type === 'flight' && <div className={`absolute top-0 right-0 w-12 h-12 ${theme.primary} rounded-bl-full flex items-start justify-end p-2 opacity-30`}><Plane className={`w-4 h-4 ${theme.accent}`} /></div>}
                {item.type === 'clinic' && <div className="absolute top-0 right-0 w-2 h-full bg-rose-300 opacity-60" />}
                
                <div className={`text-xs font-bold ${theme.accent} mb-1`}>{item.time}</div>
                <h4 className={`font-bold ${theme.textMain} text-base mb-1`}>{item.title}</h4>
                {item.desc && <p className={`${theme.textSub} text-sm mb-3`}>{item.desc}</p>}
                
                {item.query && (
                  <div className="mt-2">
                    <NaverLink query={item.query} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 空白處景福宮極簡線條插圖 */}
      <div className="pt-6 pb-2 flex flex-col items-center justify-center opacity-70">
        <GyeongbokgungIllustration strokeColor={theme.svgStroke} />
        <span className={`text-[11px] ${theme.textSub} tracking-widest mt-1`}>SEOUL TRIP 2026</span>
      </div>
    </div>
  );

  // --- 分頁內容：記帳 ---
  const renderExpenses = () => {
    const totalKrw = expenses.reduce((sum, exp) => sum + Number(exp.amountKrw), 0);
    const totalTwd = Math.round(totalKrw / EXCHANGE_RATE);

    const handleAddExpense = () => {
      if (!newExpense.title || !newExpense.amountKrw) return;
      setExpenses([{ ...newExpense, id: Date.now() }, ...expenses]);
      setNewExpense({ 
        title: '', 
        amountKrw: '', 
        category: newExpense.category, 
        paymentMethod: newExpense.paymentMethod, 
        cardBank: newExpense.cardBank 
      });
    };

    return (
      <div className="space-y-6 pb-24">
        {/* 總結與匯率提示 */}
        <div className={`${theme.cardDark} rounded-2xl p-6 text-center shadow-sm relative overflow-hidden`}>
          <div className="absolute top-2 right-3 text-[10px] font-bold text-black/30">
            1 TWD ≈ {EXCHANGE_RATE} KRW
          </div>
          <p className={`${theme.textSub} text-sm font-medium mb-1 mt-2`}>總累積花費</p>
          <h2 className={`text-3xl font-bold ${theme.textMain} mb-2`}>
            ₩ {totalKrw.toLocaleString()}
          </h2>
          <p className={`text-sm ${theme.accent} font-bold bg-white/60 inline-block px-3 py-1 rounded-full`}>
            約 NT$ {totalTwd.toLocaleString()}
          </p>
        </div>

        {/* 新增記帳表單 */}
        <div className={`${theme.card} rounded-2xl p-4 shadow-sm flex flex-col gap-3`}>
          <input 
            type="text" placeholder="花費項目 (如：Olive Young 購物)" 
            className="w-full bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            value={newExpense.title} onChange={e => setNewExpense({...newExpense, title: e.target.value})}
          />
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400 font-bold">₩</span>
            <input 
              type="number" placeholder="金額 (韓元)" 
              className="w-full bg-white rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              value={newExpense.amountKrw} onChange={e => setNewExpense({...newExpense, amountKrw: e.target.value})}
            />
          </div>

          {/* 消費類別選單 */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            <Tag className="w-4 h-4 text-gray-400 shrink-0" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewExpense({...newExpense, category: cat})}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${newExpense.category === cat ? `${theme.primary} text-white` : 'bg-white text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 支付方式 (現金/信用卡) */}
          <div className="flex flex-col gap-2 pt-2 border-t border-black/5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setNewExpense({...newExpense, paymentMethod: 'cash'})}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${newExpense.paymentMethod === 'cash' ? `${theme.primary} text-white` : 'bg-white text-gray-600'}`}
              >
                <Coins className="w-4 h-4" /> 現金 (Cash)
              </button>
              <button
                type="button"
                onClick={() => setNewExpense({...newExpense, paymentMethod: 'card'})}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${newExpense.paymentMethod === 'card' ? `${theme.primary} text-white` : 'bg-white text-gray-600'}`}
              >
                <CreditCard className="w-4 h-4" /> 信用卡 (Card)
              </button>
            </div>

            {newExpense.paymentMethod === 'card' && (
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {CREDIT_CARDS.map(bank => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setNewExpense({...newExpense, cardBank: bank})}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${newExpense.cardBank === bank ? `${theme.accent} border-current bg-white` : 'border-transparent bg-white/50 text-gray-400'}`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={handleAddExpense}
            className={`w-full mt-2 ${theme.primary} text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${theme.primaryHover} transition-colors shadow-sm`}
          >
            <Plus className="w-5 h-5" /> 新增此筆記帳
          </button>
        </div>

        {/* 花費列表 */}
        <div className="space-y-3">
          {expenses.map(exp => (
            <div key={exp.id} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center border border-black/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${theme.card} ${theme.textMain}`}>
                    {exp.category}
                  </span>
                  <p className={`font-medium ${theme.textMain}`}>{exp.title}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{exp.paymentMethod === 'cash' ? '💵 現金' : `💳 信用卡 (${exp.cardBank})`}</span>
                  <span>•</span>
                  <span>約 NT$ {Math.round(exp.amountKrw / EXCHANGE_RATE).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold ${theme.accent}`}>₩ {Number(exp.amountKrw).toLocaleString()}</span>
                <button 
                  onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))}
                  className="text-gray-300 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {expenses.length === 0 && (
            <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
              <HanokRoofIllustration strokeColor={theme.svgStroke} />
              <span className={`text-xs ${theme.textSub}`}>尚未新增任何花費記錄</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- 分頁內容：代購清單 ---
  const renderShopping = () => {
    const handleAddItem = () => {
      if (!newShopItem.item) return;
      setShoppingList([...shoppingList, { ...newShopItem, id: Date.now(), isBought: false }]);
      setNewShopItem({ item: '', for: '' });
    };

    const toggleBought = (id) => {
      setShoppingList(shoppingList.map(item => 
        item.id === id ? { ...item, isBought: !item.isBought } : item
      ));
    };

    return (
      <div className="space-y-6 pb-24">
        <div className={`${theme.card} rounded-2xl p-4 shadow-sm flex flex-col gap-3`}>
          <input 
            type="text" placeholder="要買什麼？ (如：Tamburins 香水)" 
            className="w-full bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            value={newShopItem.item} onChange={e => setNewShopItem({...newShopItem, item: e.target.value})}
          />
          <div className="flex gap-2">
            <input 
              type="text" placeholder="幫誰買？ (可留空)" 
              className="flex-1 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              value={newShopItem.for} onChange={e => setNewShopItem({...newShopItem, for: e.target.value})}
            />
            <button 
              onClick={handleAddItem}
              className={`${theme.primary} text-white px-4 rounded-xl flex items-center justify-center ${theme.primaryHover} transition-colors`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {shoppingList.map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleBought(item.id)}
              className={`bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 border border-black/5 cursor-pointer transition-all ${item.isBought ? `opacity-60 ${theme.bg}` : ''}`}
            >
              {item.isBought ? (
                <CheckCircle2 className={`w-6 h-6 ${theme.textPrimary}`} />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${theme.textMain} ${item.isBought ? 'line-through' : ''}`}>
                  {item.item}
                </p>
                {item.for && (
                  <p className={`text-xs ${theme.textSub}`}>幫 {item.for} 買</p>
                )}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setShoppingList(shoppingList.filter(i => i.id !== item.id)); }}
                className="text-gray-300 hover:text-red-400 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- 分頁內容：Checklist 與 備忘錄 ---
  const renderChecklist = () => {
    const toggleCheck = (id) => {
      setCheckList(checkList.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
    };

    const handleAddCheckItem = () => {
      if (!newCheckItem.trim()) return;
      setCheckList([...checkList, { id: Date.now(), item: newCheckItem.trim(), checked: false }]);
      setNewCheckItem('');
    };

    return (
      <div className="space-y-6 pb-24">
        {/* 新增準備清單 */}
        <div className={`${theme.card} rounded-2xl p-4 shadow-sm flex gap-2`}>
          <input 
            type="text" placeholder="新增準備物品..." 
            className="flex-1 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            value={newCheckItem} onChange={e => setNewCheckItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddCheckItem()}
          />
          <button 
            onClick={handleAddCheckItem}
            className={`${theme.primary} text-white px-4 rounded-xl flex items-center justify-center ${theme.primaryHover} transition-colors`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* 準備清單 */}
        <div className="space-y-2">
          <h3 className={`font-bold ${theme.textMain} text-sm flex items-center gap-1.5 px-1`}>
            <CheckSquare className="w-4 h-4" /> 行前準備 Checklist
          </h3>
          {checkList.map(c => (
            <div 
              key={c.id} 
              onClick={() => toggleCheck(c.id)}
              className={`bg-white rounded-xl p-3.5 shadow-sm flex items-center gap-3 border border-black/5 cursor-pointer transition-all ${c.checked ? 'opacity-50 bg-gray-50' : ''}`}
            >
              {c.checked ? (
                <CheckCircle2 className={`w-5 h-5 ${theme.textPrimary}`} />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
              <span className={`text-sm flex-1 ${theme.textMain} ${c.checked ? 'line-through' : ''}`}>
                {c.item}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setCheckList(checkList.filter(i => i.id !== c.id)); }}
                className="text-gray-300 hover:text-red-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* 自由備忘錄 Notes */}
        <div className={`${theme.card} rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden`}>
          <h3 className={`font-bold ${theme.textMain} text-sm flex items-center gap-1.5`}>
            <Edit3 className="w-4 h-4" /> 自由備忘錄 (Notes)
          </h3>
          <textarea
            rows={5}
            placeholder="在這裡寫下隨手筆記、想去的咖啡廳清單、注意事項等..."
            className="w-full bg-white rounded-xl p-3.5 text-sm leading-relaxed text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/10 resize-none border border-black/5"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
      </div>
    );
  };

  // --- 分頁內容：實用工具與設定 ---
  const renderTools = () => {
    const handleKrwChange = (e) => {
      const krw = e.target.value;
      setCalcInput({ krw, twd: krw ? Math.round(Number(krw) / EXCHANGE_RATE).toString() : '' });
    };
    const handleTwdChange = (e) => {
      const twd = e.target.value;
      setCalcInput({ twd, krw: twd ? Math.round(Number(twd) * EXCHANGE_RATE).toString() : '' });
    };

    return (
      <div className="space-y-6 pb-24">
        
        {/* 主題切換器 */}
        <div className={`${theme.card} rounded-2xl p-5 shadow-sm`}>
          <h3 className={`font-bold ${theme.textMain} flex items-center gap-2 mb-4`}>
            <Palette className="w-5 h-5" /> 主題風格
          </h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            {Object.values(THEMES).map((t) => (
              <button 
                key={t.id}
                onClick={() => setThemeKey(t.id)}
                className={`flex flex-col items-center gap-1.5 transition-transform ${themeKey === t.id ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className={`w-8 h-8 rounded-full ${t.swatch} shadow-md border-2 ${themeKey === t.id ? 'border-white ring-2 ring-black/20' : 'border-transparent'}`} />
                <span className={`text-[9px] font-bold ${themeKey === t.id ? theme.textMain : 'text-gray-400'}`}>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 匯率換算 */}
        <div className={`${theme.card} rounded-2xl p-5 shadow-sm`}>
          <div className="flex flex-col mb-4">
            <h3 className={`font-bold ${theme.textMain} flex items-center gap-2`}>
              <Calculator className="w-5 h-5" /> 匯率換算機
            </h3>
            <div className={`mt-2 inline-block self-start text-xs font-bold bg-white/60 px-3 py-1.5 rounded-full ${theme.accent}`}>
              目前參考匯率：1 TWD = {EXCHANGE_RATE} KRW
            </div>
          </div>
          
          <div className="space-y-3 relative mt-2">
            <div className="flex items-center bg-white rounded-xl p-3 shadow-sm border border-black/5">
              <span className="text-gray-400 font-medium w-12">KRW</span>
              <input 
                type="number" 
                className={`flex-1 text-right text-lg font-bold focus:outline-none ${theme.textMain}`}
                value={calcInput.krw} onChange={handleKrwChange} placeholder="0"
              />
            </div>
            
            <div className={`absolute top-1/2 left-4 -translate-y-1/2 ${theme.primary} p-1.5 rounded-full text-white shadow-sm z-10 border-2 ${theme.dotBorder}`}>
              <ArrowRightLeft className="w-3 h-3 rotate-90" />
            </div>

            <div className="flex items-center bg-white rounded-xl p-3 shadow-sm border border-black/5">
              <span className="text-gray-400 font-medium w-12">TWD</span>
              <input 
                type="number" 
                className={`flex-1 text-right text-lg font-bold focus:outline-none ${theme.textMain}`}
                value={calcInput.twd} onChange={handleTwdChange} placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* 天氣預報 */}
        <div className={`${theme.card} rounded-2xl p-5 shadow-sm`}>
          <h3 className={`font-bold ${theme.textMain} flex items-center gap-2 mb-4`}>
            <CloudSun className="w-5 h-5" /> 首爾天氣預報
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { date: '8/30', temp: '22-29°', icon: <Sun className="w-6 h-6 text-amber-400" /> },
              { date: '8/31', temp: '23-28°', icon: <Cloud className="w-6 h-6 text-gray-400" /> },
              { date: '9/1', temp: '21-27°', icon: <CloudRain className="w-6 h-6 text-blue-400" /> },
              { date: '9/2', temp: '20-26°', icon: <Sun className="w-6 h-6 text-amber-400" /> },
            ].map((w, i) => (
              <div key={i} className="bg-white p-2 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-black/5 text-center">
                <span className={`text-xs font-bold ${theme.textMain}`}>{w.date}</span>
                {w.icon}
                <span className={`text-xs ${theme.textSub}`}>{w.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme.bg} font-app transition-colors duration-500`}>
      {/* 載入 Dongle 與 Zen Maru Gothic 字體 */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
          
          .font-app { 
            font-family: 'Dongle', 'Zen Maru Gothic', sans-serif;
            font-size: 1.25rem;
          }
          
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* 頂部導覽 (附帶首爾塔藝術插圖背景) */}
      <header className={`${theme.card} rounded-b-3xl shadow-sm px-6 pt-12 pb-6 sticky top-0 z-10 transition-colors duration-500 overflow-hidden relative`}>
        {/* 背景首爾塔裝飾插圖 */}
        <div className="absolute -right-2 top-2 pointer-events-none opacity-80">
          <SeoulTowerIllustration strokeColor={theme.svgStroke} className="w-28 h-28" />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className={`text-3xl font-bold ${theme.textMain} leading-none mb-1 transition-colors`}>Seoul♡</h1>
            <p className={`text-sm ${theme.textSub} flex items-center gap-1 transition-colors`}>
              <Calendar className="w-3.5 h-3.5" /> 8/30 - 9/2
            </p>
          </div>
          <div className={`w-11 h-11 rounded-full ${theme.primary} flex items-center justify-center text-white shadow-md transition-colors duration-500 mr-12`}>
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* 主要內容區 */}
      <main className="p-6 max-w-md mx-auto">
        {activeTab === 'itinerary' && renderItinerary()}
        {activeTab === 'expenses' && renderExpenses()}
        {activeTab === 'shopping' && renderShopping()}
        {activeTab === 'checklist' && renderChecklist()}
        {activeTab === 'tools' && renderTools()}
      </main>

      {/* 底部導覽列 */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-black/5 pb-safe z-50">
        <div className="max-w-md mx-auto px-4 py-2 flex justify-between items-center">
          {[
            { id: 'itinerary', icon: MapPin, label: '行程' },
            { id: 'expenses', icon: Wallet, label: '記帳' },
            { id: 'shopping', icon: ShoppingBag, label: '代購' },
            { id: 'checklist', icon: CheckSquare, label: '清單' },
            { id: 'tools', icon: Calculator, label: '工具' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 w-12 transition-colors ${isActive ? theme.accent : theme.textSub}`}
              >
                <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? theme.navActive : 'bg-transparent'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                </div>
                <span className="text-xs font-bold leading-none">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  );
}
