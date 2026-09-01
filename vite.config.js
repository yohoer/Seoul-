import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const shoppingPatch = `
 const renderShopping=()=>{const totalKrw=shoppingList.reduce((sum,i)=>sum+Number(i.amountKrw||0),0);const boughtKrw=shoppingList.filter(i=>i.isBought).reduce((sum,i)=>sum+Number(i.amountKrw||0),0);const pendingKrw=totalKrw-boughtKrw;const add=()=>{if(!newShopItem.item)return;setShoppingList([...shoppingList,{...newShopItem,id:Date.now(),amountKrw:Number(newShopItem.amountKrw)||0,isBought:false}]);setNewShopItem({item:'',for:'',amountKrw:''})};const toggle=id=>setShoppingList(shoppingList.map(i=>i.id===id?{...i,isBought:!i.isBought}:i));return <div className='space-y-6 pb-24'><div className={\`${theme.cardDark} rounded-2xl p-5 shadow-sm text-center\`}><p className={\`text-sm \${theme.textSub} font-medium\`}>代購總額</p><h2 className={\`text-3xl font-bold \${theme.textMain} my-1\`}>₩ {totalKrw.toLocaleString()}</h2><p className={\`text-sm \${theme.accent} font-bold\`}>約 NT$ {Math.round(totalKrw/EXCHANGE_RATE).toLocaleString()}</p><div className='grid grid-cols-2 gap-2 mt-4'><div className='bg-white/70 rounded-xl p-2'><p className='text-[11px] text-gray-400'>已購</p><p className={\`font-bold \${theme.textMain}\`}>₩ {boughtKrw.toLocaleString()}</p></div><div className='bg-white/70 rounded-xl p-2'><p className='text-[11px] text-gray-400'>未購</p><p className={\`font-bold \${theme.textMain}\`}>₩ {pendingKrw.toLocaleString()}</p></div></div></div><div className={\`${theme.card} rounded-2xl p-4 shadow-sm flex flex-col gap-3\`}><input type='text' placeholder='要買什麼？' className='w-full bg-white rounded-xl px-4 py-3 text-sm' value={newShopItem.item} onChange={e=>setNewShopItem({...newShopItem,item:e.target.value})}/><div className='flex gap-2'><input type='text' placeholder='幫誰買？ (可留空)' className='flex-1 bg-white rounded-xl px-4 py-3 text-sm' value={newShopItem.for} onChange={e=>setNewShopItem({...newShopItem,for:e.target.value})}/><div className='relative flex-1'><span className='absolute left-3 top-3 text-gray-400 font-bold'>₩</span><input type='number' placeholder='金額' className='w-full bg-white rounded-xl pl-7 pr-3 py-3 text-sm' value={newShopItem.amountKrw} onChange={e=>setNewShopItem({...newShopItem,amountKrw:e.target.value})}/></div></div><button onClick={add} className={\`${theme.primary} text-white py-3 rounded-xl font-bold\`}><Plus className='w-5 h-5 inline mr-2'/>新增代購</button></div><div className='space-y-2'>{shoppingList.map(item=><div key={item.id} className={\`bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 border border-black/5 \${item.isBought?'opacity-60':''}\`}><button onClick={()=>toggle(item.id)} className='shrink-0'>{item.isBought?<CheckCircle2 className={\`w-6 h-6 \${theme.textPrimary}\`}/>:<Circle className='w-6 h-6 text-gray-300'/>}</button><div className='flex-1 min-w-0'><p className={\`font-medium \${theme.textMain} \${item.isBought?'line-through':''}\`}>{item.item}</p>{item.for&&<p className={\`text-xs \${theme.textSub}\`}>幫 {item.for} 買</p>}</div><div className='text-right shrink-0'><p className={\`font-bold \${theme.accent}\`}>₩ {Number(item.amountKrw||0).toLocaleString()}</p><p className='text-[10px] text-gray-400'>NT$ {Math.round(Number(item.amountKrw||0)/EXCHANGE_RATE).toLocaleString()}</p></div><button onClick={()=>setShoppingList(shoppingList.filter(i=>i.id!==item.id))} className='text-gray-300 p-1'><Trash2 className='w-4 h-4'/></button></div>)}</div>{shoppingList.length===0&&<div className='text-center py-10'><HanokRoofIllustration strokeColor={theme.svgStroke}/><span className={\`text-xs \${theme.textSub}\`}>尚未新增代購項目</span></div>}</div>};
 const renderChecklist`;

function patchApp(source) {
  let s = source;
  s = s.replace("const [newShopItem,setNewShopItem]=useState({item:'',for:''});", "const [newShopItem,setNewShopItem]=useState({item:'',for:'',amountKrw:''});");
  s = s.replace("const [shoppingList,setShoppingList]=useState(()=>JSON.parse(localStorage.getItem('seoul-shopping')||JSON.stringify([{id:1,item:'Olive Young 面膜',for:'自己',isBought:false},{id:2,item:'Tamburins 護手霜',for:'朋友A',isBought:false}])));", "const [shoppingList,setShoppingList]=useState(()=>{const raw=JSON.parse(localStorage.getItem('seoul-shopping')||JSON.stringify([{id:1,item:'Olive Young 面膜',for:'自己',amountKrw:0,isBought:false},{id:2,item:'Tamburins 護手霜',for:'朋友A',amountKrw:0,isBought:false}]));return raw.map(i=>({...i,amountKrw:Number(i.amountKrw)||0}))});");
  const pattern = / const renderShopping=\(\)=>\{[\\s\\S]*?\};\n const renderChecklist/;
  if (!pattern.test(s)) throw new Error('Shopping renderer not found');
  return s.replace(pattern, shoppingPatch);
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'patch-shopping-ui',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('/src/App.jsx')) return { code: patchApp(code), map: null };
      },
    },
  ],
});
