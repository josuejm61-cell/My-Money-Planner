/* My Money Planner — budget currency preferences.
   Currency selection is independent of language selection.
   No FX conversion is performed or implied. */
(()=>{'use strict';
const KEY='my-money-planner-currency';
const allowed=['USD','MXN','KRW','CNY','EUR'];
const picker=document.getElementById('currencySelect');
const note=document.getElementById('currencyNote');
const copy={
en:{note:'Currency sets the units used for your budget. It does not exchange or convert existing amounts.',confirm:'Switch from {old} to {new}? Existing numbers will NOT be converted. Only their currency label changes. Make sure your budget entries use {new} before relying on these totals.'},
es:{note:'La moneda indica la unidad de tu presupuesto. No convierte cantidades ni aplica tipos de cambio.',confirm:'¿Cambiar de {old} a {new}? Las cantidades existentes NO se convertirán. Solo cambiará la moneda indicada. Ajusta tus datos a {new} antes de confiar en los totales.'},
ko:{note:'선택한 통화는 예산의 단위입니다. 기존 금액은 환전되거나 자동 변환되지 않습니다.',confirm:'{old}에서 {new}(으)로 바꾸시겠습니까? 기존 금액은 환산되지 않고 통화 표시만 변경됩니다. 합계를 이용하기 전에 입력 금액을 {new} 기준으로 확인하세요.'},
zh:{note:'货币选项只设置预算的金额单位，不会按汇率转换已有金额。',confirm:'确定从 {old} 切换为 {new} 吗？现有金额不会换算，只会更改货币标识。请先核实或调整 {new} 金额再使用预算总计。'},
fr:{note:"La devise définit l'unité de votre budget. Aucun taux de change n'est appliqué et les montants ne sont pas convertis.",confirm:"Passer de {old} à {new} ? Les montants existants ne seront PAS convertis : seul le libellé changera. Vérifiez ou adaptez vos montants en {new} avant d'utiliser les totaux."}
};
let currency='USD';
try{const saved=localStorage.getItem(KEY);if(allowed.includes(saved))currency=saved}catch(e){}
window.mmpCurrencyCode=currency;
picker.value=currency;
function lang(){const val=document.getElementById('languageSelect')?.value||'en';return copy[val]?val:'en'}
function updateNote(){note.textContent=copy[lang()].note}
picker.addEventListener('change',()=>{
 const next=picker.value;
 if(!allowed.includes(next)){picker.value=currency;return}
 if(next===currency)return;
 const template=copy[lang()].confirm;
 const prompt=template.replace('{old}',currency).replaceAll('{new}',next);
 if(!confirm(prompt)){picker.value=currency;return}
 currency=next;window.mmpCurrencyCode=next;
 try{localStorage.setItem(KEY,next)}catch(e){}
 if(typeof window.mmpRefreshBudget==='function')window.mmpRefreshBudget();
});
document.getElementById('languageSelect')?.addEventListener('change',updateNote);
updateNote();
if(typeof window.mmpRefreshBudget==='function')window.mmpRefreshBudget();
})();