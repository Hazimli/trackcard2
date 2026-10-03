const $=(s)=>document.querySelector(s);
const $$=(s)=>document.querySelectorAll(s);

const toast=(msg)=>{
 const t=$("#toast"); t.textContent=msg; t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),3200);
};

const video=$("#productVideo"), play=$("#videoPlay");
play.addEventListener("click",()=>{ video.paused ? video.play() : video.pause(); });
video.addEventListener("play",()=>play.style.display="none");
video.addEventListener("pause",()=>play.style.display="grid");
video.addEventListener("ended",()=>play.style.display="grid");

const modal=$("#videoModal"), modalVideo=$("#modalVideo");
$("#playHero").addEventListener("click",()=>{
 modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); modalVideo.play().catch(()=>{});
});
$$("[data-close]").forEach(x=>x.addEventListener("click",()=>{
 modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); modalVideo.pause();
}));

const locations={
 track:["TRACK","Last detected location"],
 ring:["RING","Nearby buzzer activated"],
 lost:["LOST MODE","Notifications enabled"],
 design:["DESIGN","Smart wallet architecture"]
};
$$(".feature-card").forEach(card=>{
 card.addEventListener("click",()=>{
   $$(".feature-card").forEach(c=>c.classList.remove("active")); card.classList.add("active");
   const [label,caption]=locations[card.dataset.feature];
   $("#featureLabel").textContent=label; $("#featureCaption").textContent=caption;
   if(card.dataset.feature==="ring") $("#locationText").textContent="Buzzer ready • nearby";
   else if(card.dataset.feature==="lost") $("#locationText").textContent="Lost Mode • active";
   else if(card.dataset.feature==="design") $("#locationText").textContent="TrackCard • connected";
   else $("#locationText").textContent="Library, Campus";
 });
});

$("#ringBtn").addEventListener("click",()=>{
 $("#locationText").textContent="Buzzer sounding • nearby";
 toast("🔊 Demo: TrackCard would activate its buzzer.");
});
$("#lostBtn").addEventListener("click",()=>{
 $("#locationText").textContent="Lost Mode • notifications on";
 toast("⚠ Demo: Lost Mode notifications enabled.");
});
$("#locationBtn").addEventListener("click",()=>{
 $("#locationText").textContent="Last seen • Library, Campus";
 toast("⌖ Demo: opening the last detected location.");
});

function investorMessage(){
 toast("Thanks for your interest! In the live pitch, this button can connect to your team's investor contact or email.");
}
$("#interestBtn").addEventListener("click",investorMessage);
$("#contactBtn").addEventListener("click",investorMessage);

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(e=>observer.observe(e));

$$("a[href^='#']").forEach(a=>{
 a.addEventListener("click",e=>{
   const id=a.getAttribute("href"); if(id.length>1){e.preventDefault();document.querySelector(id)?.scrollIntoView({behavior:"smooth"})}
 });
});
