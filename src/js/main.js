import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Chart, registerables } from 'chart.js'
import { supabase, supabaseConfigured, getUser } from './supabase.js'
Chart.register(...registerables)

const demoKey='finance-demo-transactions'
const demoTransactions=[
 {id:'1',description:'Salary',category:'Salary',type:'income',amount:35000,date:'2026-09-25',account:'Bank'},
 {id:'2',description:'Rent',category:'Housing',type:'expense',amount:12000,date:'2026-09-24',account:'Bank'},
 {id:'3',description:'Groceries',category:'Food',type:'expense',amount:1850,date:'2026-09-23',account:'Card'},
 {id:'4',description:'Freelance',category:'Business',type:'income',amount:8500,date:'2026-09-20',account:'Bank'},
 {id:'5',description:'Transport',category:'Transport',type:'expense',amount:620,date:'2026-09-19',account:'Card'}
]
const currency=new Intl.NumberFormat('th-TH',{style:'currency',currency:'THB',maximumFractionDigits:2})
const $=s=>document.querySelector(s)
const $$=s=>document.querySelectorAll(s)
function fmt(n){return currency.format(Number(n)||0)}
function localData(){return JSON.parse(localStorage.getItem(demoKey)||'null')||demoTransactions}
function saveLocal(rows){localStorage.setItem(demoKey,JSON.stringify(rows))}
async function transactions(){
 if(supabaseConfigured){const {data,error}=await supabase.from('transactions').select('*').order('date',{ascending:false}); if(!error&&data) return data}
 return localData()
}
async function addTransaction(row){
 if(supabaseConfigured){const user=await getUser(); const {error}=await supabase.from('transactions').insert({...row,user_id:user?.id}); if(!error)return}
 const rows=localData(); rows.unshift({...row,id:crypto.randomUUID()}); saveLocal(rows)
}
async function deleteTransaction(id){
 if(supabaseConfigured){await supabase.from('transactions').delete().eq('id',id)}
 saveLocal(localData().filter(x=>x.id!==id))
}
function setupCommon(){
 $$('[data-toggle="theme"]').forEach(b=>b.onclick=()=>{document.documentElement.dataset.bsTheme=document.documentElement.dataset.bsTheme==='dark'?'light':'dark';localStorage.setItem('theme',document.documentElement.dataset.bsTheme)})
 const saved=localStorage.getItem('theme'); if(saved)document.documentElement.dataset.bsTheme=saved
 const toggle=$('[data-toggle="sidebar"]'); if(toggle)toggle.onclick=()=>$('.sidebar')?.classList.toggle('show')
}
async function guard(){if(!supabaseConfigured)return true; const u=await getUser(); if(!u){location.href='./pages/login.html';return false} return true}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v}
async function dashboard(){
 if(!await guard())return
 const rows=await transactions(), income=rows.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount),0), expense=rows.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount),0)
 setText('totalBalance',fmt(income-expense));setText('totalIncome',fmt(income));setText('totalExpenses',fmt(expense));setText('transactionCount',rows.length)
 const list=$('#recentTransactions'); if(list)list.innerHTML=rows.slice(0,6).map(x=>`<tr><td>${x.description}</td><td>${x.category}</td><td>${x.date}</td><td class="text-end ${x.type==='income'?'text-success':'text-danger'}">${x.type==='income'?'+':'-'}${fmt(x.amount)}</td></tr>`).join('')
 const cats={}; rows.filter(x=>x.type==='expense').forEach(x=>cats[x.category]=(cats[x.category]||0)+Number(x.amount))
 const ctx=$('#expenseChart'); if(ctx)new Chart(ctx,{type:'doughnut',data:{labels:Object.keys(cats),datasets:[{data:Object.values(cats)}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}})
 const cash=$('#cashflowChart'); if(cash){const labels=['May','Jun','Jul','Aug','Sep']; const vals=labels.map((_,i)=>Math.max(0,income-expense-i*1200));new Chart(cash,{type:'line',data:{labels,datasets:[{label:'Balance',data:vals,tension:.35,fill:true}]},options:{responsive:true,plugins:{legend:{display:false}}}})}
}
async function tablePage(){if(!await guard())return; const rows=await transactions(); const body=$('#transactionRows'); if(!body)return; body.innerHTML=rows.map(x=>`<tr><td>${x.date}</td><td>${x.description}</td><td>${x.category}</td><td>${x.type}</td><td class="text-end">${x.type==='income'?'+':'-'}${fmt(x.amount)}</td><td>${x.account||''}</td><td><button class="btn btn-sm btn-outline-danger delete-tx" data-id="${x.id}"><i class="bi bi-trash"></i></button></td></tr>`).join(''); $$('.delete-tx').forEach(b=>b.onclick=async()=>{await deleteTransaction(b.dataset.id);tablePage()});
 const form=$('#transactionForm'); if(form)form.onsubmit=async e=>{e.preventDefault();const fd=new FormData(form);await addTransaction({description:fd.get('description'),category:fd.get('category'),type:fd.get('type'),amount:Number(fd.get('amount')),date:fd.get('date'),account:fd.get('account')});form.reset();$('#txModal')&&bootstrap.Modal.getOrCreateInstance($('#txModal')).hide();tablePage()}
}
async function authPage(){
 const form=$('#authForm'); if(!form)return
 form.onsubmit=async e=>{e.preventDefault();const email=$('#email').value,password=$('#password').value; const status=$('#authStatus'); if(!supabaseConfigured){status.textContent='Demo mode: add Supabase keys in .env to enable real accounts.';return} const {error}=await supabase.auth.signInWithPassword({email,password}); if(error){status.textContent=error.message;return} location.href='../'}
}
async function registerPage(){const form=$('#registerForm');if(!form)return;form.onsubmit=async e=>{e.preventDefault();if(!supabaseConfigured)return alert('Add Supabase environment variables first.');const {email,password,name}=Object.fromEntries(new FormData(form));const {error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}});$('#registerStatus').textContent=error?error.message:'Account created. Check your email if confirmation is enabled.'}}
async function forgotPage(){const form=$('#forgotForm');if(!form)return;form.onsubmit=async e=>{e.preventDefault();if(!supabaseConfigured)return;const {error}=await supabase.auth.resetPasswordForEmail($('#email').value,{redirectTo:location.origin+'/pages/settings.html'});$('#forgotStatus').textContent=error?error.message:'Reset email sent.'}}
function pageShell(title,active,content){return `<!doctype html><html lang="en" data-bs-theme="light"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | My Finance</title></head><body><div class="wrapper"><aside class="sidebar bg-body-tertiary border-end"><div class="p-3 border-bottom"><a href="../" class="fw-bold text-primary text-decoration-none fs-5">My Finance</a></div><nav class="sidebar-nav p-3"><div class="nav-header">MAIN</div><a class="nav-link ${active==='dashboard'?'active':''}" href="../"><i class="bi bi-grid-1x2-fill"></i>Dashboard</a><a class="nav-link ${active==='transactions'?'active':''}" href="./tables.html"><i class="bi bi-arrow-left-right"></i>Transactions</a><a class="nav-link" href="./tables.html?type=income"><i class="bi bi-arrow-down-circle"></i>Income</a><a class="nav-link" href="./tables.html?type=expense"><i class="bi bi-arrow-up-circle"></i>Expenses</a><a class="nav-link" href="./settings.html"><i class="bi bi-pie-chart"></i>Budgets</a><a class="nav-link" href="./tables.html"><i class="bi bi-bar-chart"></i>Reports</a><div class="nav-header mt-3">ACCOUNT</div><a class="nav-link" href="./profile.html"><i class="bi bi-person"></i>Profile</a><a class="nav-link" href="./settings.html"><i class="bi bi-gear"></i>Settings</a></nav></aside><main class="main-content"><header class="border-bottom p-3 d-flex justify-content-between"><button class="btn btn-link d-lg-none" data-toggle="sidebar"><i class="bi bi-list fs-4"></i></button><h1 class="h5 mb-0">${title}</h1><button class="btn btn-outline-secondary btn-sm" data-toggle="theme"><i class="bi bi-moon"></i></button></header><div class="container-fluid p-4">${content}</div></main></div><script type="module" src="../js/main.js"></script></body></html>`}
setupCommon(); dashboard(); tablePage(); authPage(); registerPage(); forgotPage()
