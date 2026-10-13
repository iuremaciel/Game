import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Search, Star, Trophy, Lock, ArrowLeft, Lightbulb, RotateCcw, Home, Volume2, CheckCircle2} from 'lucide-react';
import './style.css';

const ITEMS = [
 {id:'gift',name:'Presente',emoji:'🎁'},{id:'glasses',name:'Óculos',emoji:'🕶️'},{id:'camera',name:'Câmera',emoji:'📷'},
 {id:'melon',name:'Melancia',emoji:'🍉'},{id:'teddy',name:'Ursinho',emoji:'🧸'},{id:'starfish',name:'Estrela-do-mar',emoji:'⭐'},
 {id:'hat',name:'Chapéu',emoji:'👒'},{id:'icecream',name:'Sorvete',emoji:'🍦'},{id:'clock',name:'Relógio',emoji:'⏰'},
 {id:'book',name:'Livro',emoji:'📘'},{id:'ball',name:'Bola',emoji:'🏀'},{id:'flashlight',name:'Lanterna',emoji:'🔦'},
 {id:'umbrella',name:'Guarda-chuva',emoji:'☂️'},{id:'bag',name:'Bolsa',emoji:'👛'},{id:'shoe',name:'Sapato',emoji:'👟'},
 {id:'key',name:'Chave',emoji:'🔑'},{id:'apple',name:'Maçã',emoji:'🍎'},{id:'duck',name:'Patinho',emoji:'🦆'},
 {id:'flower',name:'Flor',emoji:'🌻'},{id:'crown',name:'Coroa',emoji:'👑'}
];
const THEMES=[['Vila Encantada','🏡','#b9eaa2','#55b86a'],['Praia Alegre','🏖️','#9ce9fa','#35b8d6'],['Floresta Mágica','🌳','#b8e7a0','#369b61'],['Fazenda Feliz','🐮','#f7e3a0','#7abf55'],['Cidade Colorida','🏙️','#bde6ff','#6795d8'],['Castelo dos Sonhos','🏰','#e2c8ff','#9b77d7'],['Parque Divertido','🎡','#b9f2cc','#58bf9a'],['Inverno Nevado','⛄','#e0f5ff','#8fc8eb'],['Acampamento','⛺','#c9e7a2','#579f68'],['Ilha do Tesouro','🏝️','#ffe1a3','#49c6b5']];
const names=['Vila Encantada','Praia Alegre','Floresta Mágica','Fazenda Feliz','Cidade Colorida','Castelo dos Sonhos','Parque Divertido','Inverno Nevado','Acampamento','Ilha do Tesouro'];
const levels=Array.from({length:100},(_,i)=>({n:i+1,theme:THEMES[Math.floor(i/10)%10],title:THEMES[Math.floor(i/10)%10][0],difficulty:i<10?'Fácil':i<30?'Normal':i<60?'Difícil':i<85?'Muito difícil':'Lendária',count:10+Math.min(5,Math.floor(i/20))}));
function seeded(n){let x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function makeTargets(level){let count=levels[level-1].count;return Array.from({length:count},(_,i)=>{let item=ITEMS[(level*3+i*7)%ITEMS.length];return {...item,x:8+seeded(level*31+i*3)*84,y:12+seeded(level*17+i*11)*72,size:25+seeded(level+i)*9,found:false}})}
function Scene({level,targets,onFind,hintId}){
 const theme=levels[level-1].theme; const [title,emoji,bg,accent]=theme;
 const trees=Array.from({length:22},(_,i)=>({x:(i*47+13)%960,y:120+(i*73)%650,r:20+(i%4)*5}));
 const houses=Array.from({length:5},(_,i)=>({x:65+i*190,y:200+(i%2)*150}));
 return <svg className="scene" viewBox="0 0 1000 800" role="img" aria-label={'Mapa '+title}>
  <defs><pattern id="grass" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M5 27l4-7m7 10l2-5m7-12l3-5" stroke="#72b86b" strokeWidth="2" opacity=".5"/></pattern><linearGradient id="sky" x2="0" y2="1"><stop stopColor={bg}/><stop offset="1" stopColor="#e9f7bd"/></linearGradient></defs>
  <rect width="1000" height="800" fill="url(#sky)"/><rect y="100" width="1000" height="700" fill={bg}/><rect y="100" width="1000" height="700" fill="url(#grass)"/>
  <path d="M-20 510 Q180 390 330 520 T650 510 T1020 390" fill="none" stroke="#e9c98b" strokeWidth="100" strokeLinecap="round"/><path d="M-20 510 Q180 390 330 520 T650 510 T1020 390" fill="none" stroke="#fff0c8" strokeWidth="72" strokeLinecap="round"/>
  <path d="M-10 730 Q170 650 310 710 T610 690 T1010 650" fill="none" stroke="#75d8ec" strokeWidth="54"/><path d="M-10 730 Q170 650 310 710 T610 690 T1010 650" fill="none" stroke="#a6edf7" strokeWidth="38"/>
  {houses.map((h,i)=><g key={i} transform={`translate(${h.x} ${h.y})`}><rect x="0" y="35" width="125" height="105" rx="5" fill={['#fff4d8','#ffe3a9','#c9f1f1','#f9d4e5','#e8ddff'][i]} stroke="#80543c" strokeWidth="5"/><path d="M-12 40 L62 -18 L138 40Z" fill={['#e65b61','#55a9d8','#b57bdf','#e7a344','#dc6e80'][i]} stroke="#80543c" strokeWidth="5"/><rect x="48" y="82" width="30" height="58" rx="12" fill="#8acde2" stroke="#80543c" strokeWidth="4"/><rect x="12" y="60" width="25" height="25" fill="#9be1f5" stroke="#80543c" strokeWidth="3"/><rect x="88" y="60" width="25" height="25" fill="#9be1f5" stroke="#80543c" strokeWidth="3"/></g>)}
  {trees.map((t,i)=><g key={i}><path d={`M${t.x} ${t.y+14}v${t.r+13}`} stroke="#95623c" strokeWidth="10" strokeLinecap="round"/><circle cx={t.x} cy={t.y} r={t.r+7} fill={i%3===0?'#55a85e':i%3===1?'#70c96c':'#329b5b'} stroke="#32864b" strokeWidth="3"/><circle cx={t.x-8} cy={t.y-7} r="5" fill="#b7e77c"/><circle cx={t.x+10} cy={t.y+5} r="4" fill="#b7e77c"/></g>)}
  {Array.from({length:17},(_,i)=><g key={'p'+i} transform={`translate(${40+(i*113)%910} ${130+(i*157)%620})`}><circle r="13" fill={['#f6b4cf','#fff2a6','#b3d7ff','#e9c0ff'][i%4]} stroke="#fff" strokeWidth="3"/><circle cy="-3" r="4" fill="#fff"/></g>)}
  {Array.from({length:11},(_,i)=><g key={'char'+i} transform={`translate(${55+(i*83)%900} ${360+(i*67)%360})`}><circle cy="-13" r="12" fill={['#f5bd8d','#d69b72','#edc9a1'][i%3]} stroke="#754f43" strokeWidth="2"/><path d="M-13 -19q13 -18 26 0" fill={['#65452f','#e6c55e','#7b5ac7'][i%3]}/><rect x="-13" y="0" width="26" height="28" rx="8" fill={['#ff7e8e','#68bde8','#ffd05c','#8bd5a0'][i%4]} stroke="#754f43" strokeWidth="2"/><path d="M-8 28l-4 12m16-12l4 12" stroke="#754f43" strokeWidth="5" strokeLinecap="round"/></g>)}
  {targets.map((t,i)=><g key={t.id+'-'+i} onClick={()=>!t.found&&onFind(t.id)} className={'target '+(t.found?'found':'')+(hintId===t.id?' hinted':'')} transform={`translate(${t.x*10} ${t.y*8})`}><circle className="tap-area" r={Math.max(t.size,26)}/><text x="0" y="8" textAnchor="middle" fontSize={t.size} style={{filter:'drop-shadow(1px 2px 1px #5438)'}}>{t.emoji}</text>{hintId===t.id&&<circle r={t.size+12} className="hint-ring"/>}<circle r="25" className="hitbox"/></g>)}
  <g transform="translate(30 35)"><rect width="310" height="55" rx="20" fill="#fffdf1" stroke="#efad61" strokeWidth="4"/><text x="20" y="35" fontSize="25" fontWeight="900" fill="#654032">{title}</text></g>
 </svg>
}
function App(){
 const [screen,setScreen]=useState('home'); const [level,setLevel]=useState(1); const [targets,setTargets]=useState(()=>makeTargets(1)); const [hintId,setHintId]=useState(null); const [hints,setHints]=useState(3); const [score,setScore]=useState(0); const [toast,setToast]=useState('');
 const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('hidden-object-save'))||{unlocked:1,completed:{},score:0}}catch{return {unlocked:1,completed:{},score:0}}});
 useEffect(()=>{localStorage.setItem('hidden-object-save',JSON.stringify(saved))},[saved]);
 useEffect(()=>{if(!toast)return;let t=setTimeout(()=>setToast(''),2200);return()=>clearTimeout(t)},[toast]);
 const found=targets.filter(t=>t.found).length; const allFound=found===targets.length;
 function startLevel(n){setLevel(n);setTargets(makeTargets(n));setHintId(null);setHints(3);setScreen('game')}
 function findItem(id){let t=targets.find(x=>x.id===id);if(!t||t.found)return;setTargets(old=>old.map(x=>x.id===id?{...x,found:true}:x));setScore(s=>s+100);setSaved(old=>({...old,score:old.score+100}));}
 useEffect(()=>{if(allFound&&screen==='game'){setSaved(old=>({...old,unlocked:Math.max(old.unlocked,Math.min(100,level+1)),completed:{...old.completed,[level]:true},score:old.score+500}));setScore(s=>s+500);setToast('Fase concluída! +500 pontos ⭐')}},[allFound,screen,level]);
 function hint(){if(allFound)return;if(hints<=0){setToast('Você usou todas as lupas desta fase!');return}const next=targets.find(t=>!t.found);if(next){setHints(h=>h-1);setHintId(next.id);setToast('Olhe o brilho no mapa!');setTimeout(()=>setHintId(null),3000)}}
 const pct=Math.round(found/targets.length*100);
 return <div className="app-shell"><header className="topbar"><div className="brand-icon">🔎</div><div className="brand"><b>Objetos Escondidos</b><small>Uma aventura cheia de descobertas!</small></div><div className="score"><Star size={18} fill="#ffd44f" color="#ffae00"/><b>{saved.score}</b></div></header>
 {screen==='home'&&<main className="home"><div className="hero"><div className="hero-copy"><span className="eyebrow">AVENTURA • CURIOSIDADE • DIVERSÃO</span><h1>Encontre todos<br/><span>os objetos!</span></h1><p>Explore cenários encantadores e teste seu olhar de detetive.</p><button className="primary" onClick={()=>startLevel(Math.min(saved.unlocked,100))}>▶ Jogar agora</button><div className="mini-stats"><span>⭐ {Object.keys(saved.completed).length}/100 fases</span><span>🏆 {saved.score} pontos</span></div></div><div className="hero-art"><div className="sun">☀️</div><div className="cloud">☁️</div><div className="house-art">🏡</div><div className="tree-art">🌳</div><div className="detective">🧒🏻🔍</div><div className="dog">🐶</div><div className="flowers">🌼🌷🌻</div></div></div>
 <div className="section-head"><div><h2>Escolha uma fase</h2><p>Complete fases para desbloquear novas aventuras.</p></div><span className="pill">{saved.unlocked}/100 abertas</span></div><div className="level-grid">{levels.map(l=><button key={l.n} disabled={l.n>saved.unlocked} onClick={()=>startLevel(l.n)} className={'level-tile '+(saved.completed[l.n]?'completed':'')+(l.n===saved.unlocked?' current':'')}><span>{l.n>saved.unlocked?<Lock size={18}/>:saved.completed[l.n]?'⭐':l.theme[1]}</span><b>{l.n}</b></button>)}</div>
 <div className="feature-row"><div><span>🔍</span><b>Lupa de ajuda</b><small>3 dicas por fase</small></div><div><span>🗺️</span><b>10 mundos</b><small>100 mapas diferentes</small></div><div><span>🏆</span><b>Conquistas</b><small>Ganhe pontos e estrelas</small></div></div></main>}
 {screen==='game'&&<main className="game-screen"><div className="game-heading"><button className="round-btn" onClick={()=>setScreen('home')} aria-label="Voltar"><ArrowLeft/></button><div><b>Fase {level}: {levels[level-1].title}</b><small>{levels[level-1].difficulty} • Encontre {targets.length} objetos</small></div><button className="round-btn" onClick={()=>{setTargets(makeTargets(level));setHintId(null);setHints(3)}} aria-label="Reiniciar"><RotateCcw/></button></div>
 <div className="progress-card"><div className="progress-line"><span>Encontrados</span><b>{found}/{targets.length}</b></div><div className="progress-bg"><div style={{width:pct+'%'}}/></div><div className="progress-sub"><span>⭐ +{found*100} pontos</span><span>{pct}% completo</span></div></div>
 <div className="map-frame"><Scene level={level} targets={targets} onFind={findItem} hintId={hintId}/>{allFound&&<div className="win-overlay"><div className="win-card"><div className="win-emoji">🏆✨</div><h2>Parabéns!</h2><p>Você encontrou todos os objetos!</p><div className="win-stars">⭐⭐⭐</div><button className="primary" onClick={()=>level<100?startLevel(level+1):setScreen('home')}>{level<100?'Próxima fase →':'Voltar ao menu'}</button><button className="text-btn" onClick={()=>setScreen('home')}>Escolher outra fase</button></div></div>}</div>
 <div className="objects-header"><div><h3>Encontre estes objetos</h3><p>Toque no objeto quando encontrá-lo no mapa.</p></div><button className="hint-btn" onClick={hint} disabled={allFound}><Search size={21}/><span>Lupa <b>{hints}</b></span></button></div><div className="object-grid">{targets.map((t,i)=><div className={'object-chip '+(t.found?'is-found':'')} key={t.id+'-'+i}><span className="object-emoji">{t.found?'✓':t.emoji}</span><span>{t.name}</span></div>)}</div><div className="tip"><Lightbulb size={18}/><span>Dica: observe os cantinhos, árvores, casas e caminhos!</span></div></main>}
 {toast&&<div className="toast">{toast}</div>}<footer>Feito para jogar no celular • Seu progresso fica salvo neste aparelho</footer></div>
}

createRoot(document.getElementById('root')).render(<App/>);
