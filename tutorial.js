(function () {
  // 1. Vložení HTML struktury do body
  const tutorialHTML = `
    <div id="tutorial-overlay" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-md rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative">
        <div class="flex justify-between items-center p-6 pb-2">
          <div class="flex gap-1.5" id="tut-dots"></div>
          <button id="tut-close-btn" class="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors" title="Přeskočit tutoriál">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="tut-content" class="px-6 py-4 flex-1"></div>
        <div class="p-6 pt-2 flex justify-between items-center gap-4">
          <button id="tut-prev" class="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors invisible">Zpět</button>
          <button id="tut-next" class="px-6 py-2.5 text-sm font-bold text-white bg-[#0000dc] hover:bg-[#0000dc]/90 rounded-xl transition-colors shadow-md shadow-[#0000dc]/20 ml-auto flex items-center gap-2">
            Další <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  if (!document.getElementById('tutorial-overlay')) {
    document.body.insertAdjacentHTML('beforeend', tutorialHTML);
  }

  // 2. Definice kroků
  const steps = [
    {
      title: "Vítejte v novém losovátku!",
      text: "Tento nástroj vám pomůže s losováním zkouškových otázek nebo témat. Vše probíhá lokálně ve vašem prohlížeči – přehledně, plynule a s možností plného přizpůsobení. Pojďme si ukázat základní funkce.",
      visual: `
        <div class="w-full h-32 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#0000dc]">
          <i data-lucide="dices" class="w-16 h-16 opacity-80"></i>
        </div>`
    },
    {
      title: "Rozdělte si práci",
      text: `Základními stavebními kameny jsou <strong>Okruhy</strong> (jednotlivé losovací karty), u kterých si můžete nastavit číselné rozmezí (od–do). Pro lepší pořádek si můžete okruhy sdružovat do <strong>Sestav</strong> – například pro různé specializace studentů nebo komise. Novou sestavu snadno přidáte přes tlačítko <strong>ozubeného kola</strong> <i data-lucide="settings" class="w-4 h-4 inline text-slate-400 align-sub mx-0.5"></i>. Mezi sestavami následně přepínáte pomocí panelu vlevo nahoře.`,
      visual: `
        <div class="w-full h-40 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex gap-3">
          <div class="w-1/3 bg-white rounded-xl border border-slate-200 p-2 shadow-sm flex flex-col gap-2">
            <div class="h-2 w-1/2 bg-slate-200 rounded-full mb-1"></div>
            <div class="flex items-center gap-2 bg-indigo-50 p-1.5 rounded-lg text-[#0000dc] text-[10px] font-bold"><i data-lucide="folder-open" class="w-3 h-3"></i> Sestava 1</div>
            <div class="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 text-[10px] font-bold"><i data-lucide="folder" class="w-3 h-3"></i> Sestava 2</div>
          </div>
          <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-3 relative overflow-hidden">
            <div class="text-[8px] font-bold text-slate-400 uppercase">Okruh</div>
            <div class="h-6 mt-2 bg-slate-50 border border-slate-100 rounded text-xs flex items-center px-2 text-slate-800">Obecná psychologie</div>
            <div class="flex gap-2 mt-2">
              <div class="h-5 flex-1 bg-slate-50 border border-slate-100 rounded"></div>
              <div class="h-5 flex-1 bg-slate-50 border border-slate-100 rounded"></div>
            </div>
          </div>
        </div>`
    },
    {
      title: "Různé režimy losování",
      text: `U každého okruhu najdete ikonu šipek <i data-lucide="repeat" class="w-4 h-4 inline text-slate-400 align-sub mx-0.5"></i>. Pokud na ni kliknete, zapnete režim <strong>Losovat bez opakování</strong> <i data-lucide="repeat-off" class="w-4 h-4 inline text-orange-500 align-sub mx-0.5"></i>. Aplikace si začne pamatovat již tažená čísla a zajistí, že se žádné z nich nebude při dalším losování opakovat. Zároveň uvidíte, kolik otázek ještě zbývá k tažení.`,
      visual: `
        <div class="w-full h-32 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
          <div class="flex items-center justify-between w-full px-8">
             <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm"><i data-lucide="repeat" class="w-4 h-4"></i></div>
             <i data-lucide="arrow-right" class="w-5 h-5 text-slate-300"></i>
             <div class="px-3 py-1.5 rounded-full bg-white border border-orange-200 flex items-center justify-center gap-1.5 text-orange-500 shadow-sm">
               <i data-lucide="repeat-off" class="w-4 h-4"></i>
               <span class="text-xs font-bold">Zbývá 14</span>
             </div>
          </div>
        </div>`
    },
    {
      title: "Zkouškové otázky i s názvy",
      text: `Každý okruh můžete jednoduše propojit s textovou sadou otázek pomocí ikony sad <i data-lucide="layers" class="w-4 h-4 inline text-slate-400 align-sub mx-0.5"></i>. V aplikaci už rovnou najdete <strong>předpřipravené sady otázek pro státnicové předměty</strong>. Číselné rozmezí okruhu se pak automaticky přizpůsobí počtu otázek v dané sadě a ikona se změní na <i data-lucide="link" class="w-4 h-4 inline text-[#0000dc] align-sub mx-0.5"></i>.`,
      visual: `
        <div class="w-full h-36 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3 relative">
          <div class="flex justify-between items-center">
            <div class="text-[10px] font-bold text-slate-400 uppercase">Okruh</div>
            <div class="p-1 bg-indigo-50 text-[#0000dc] rounded-full"><i data-lucide="link" class="w-4 h-4"></i></div>
          </div>
          <div class="relative">
            <div class="w-full h-8 bg-slate-100 border border-slate-100 rounded-xl px-3 flex items-center text-sm text-slate-600 font-medium">Státnice - Klinika</div>
            <i data-lucide="lock" class="absolute right-3 top-2 w-4 h-4 text-slate-400"></i>
          </div>
          <div class="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-3 gap-3">
            <div class="text-2xl font-black text-[#0f172a]">7</div>
            <div class="w-px h-8 bg-slate-200"></div>
            <div class="text-xs font-medium text-slate-600 line-clamp-2">Základní diagnostická kritéria pro...</div>
          </div>
        </div>`
    },
    {
      title: "Vytvářejte a upravujte sady otázek",
      text: `Své vlastní seznamy otázek můžete spravovat kliknutím na ikonu ozubeného kola <i data-lucide="settings" class="w-4 h-4 inline text-slate-400 align-sub mx-0.5"></i> a výběrem možnosti <strong>Správa otázek</strong>. Nové sady vytvoříte tak, že do nich jednoduše zkopírujete seznam otázek z Excelu či Wordu nebo otázky (jejich názvy) napíšete ručně, každou na nový řádek.`,
      visual: `
        <div class="w-full h-40 bg-slate-50 rounded-2xl border border-slate-200 flex items-end justify-center pb-4 relative">
           <div class="absolute inset-0 flex items-center justify-center opacity-10"><i data-lucide="layers" class="w-24 h-24"></i></div>
           <div class="w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 relative z-10 mr-12 mb-4">
             <div class="px-3 py-2 text-sm font-medium text-slate-700 flex items-center gap-2"><i data-lucide="folder-plus" class="w-4 h-4"></i> Přidat sestavu</div>
             <div class="h-px bg-slate-100 my-1"></div>
             <div class="px-3 py-2 text-sm font-medium text-[#0000dc] bg-indigo-50 rounded-xl flex items-center gap-2"><i data-lucide="layers" class="w-4 h-4"></i> Správa otázek</div>
           </div>
           <div class="w-16 h-16 shrink-0 border border-slate-200 rounded-[20px] text-slate-600 bg-white flex items-center justify-center shadow-md relative z-10">
             <i data-lucide="settings" class="w-6 h-6"></i>
           </div>
        </div>`
    }
  ];

  // 3. Logika
  let currentStep = 0;
  const overlay = document.getElementById('tutorial-overlay');
  const modalBox = overlay.querySelector('.bg-white');
  const contentDiv = document.getElementById('tut-content');
  const dotsContainer = document.getElementById('tut-dots');
  const btnNext = document.getElementById('tut-next');
  const btnPrev = document.getElementById('tut-prev');
  const btnClose = document.getElementById('tut-close-btn');

  function initDots() {
    dotsContainer.innerHTML = '';
    steps.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-[#0000dc] w-4' : 'bg-slate-200'}`;
      dotsContainer.appendChild(dot);
    });
  }

  function renderStep() {
    const step = steps[currentStep];

    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-[#0000dc] w-4' : 'bg-slate-200'}`;
    });

    contentDiv.innerHTML = `
      <div class="slide-enter flex flex-col gap-6">
        ${step.visual}
        <div>
          <h2 class="text-xl font-extrabold text-slate-800 mb-2">${step.title}</h2>
          <p class="text-slate-600 text-sm leading-relaxed">${step.text}</p>
        </div>
      </div>`;

    btnPrev.style.visibility = currentStep === 0 ? 'hidden' : 'visible';

    if (currentStep === steps.length - 1) {
      btnNext.innerHTML = 'Začít používat <i data-lucide="check" class="w-4 h-4"></i>';
      btnNext.className = "px-6 py-2.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors shadow-md shadow-emerald-500/20 ml-auto flex items-center gap-2";
    } else {
      btnNext.innerHTML = 'Další <i data-lucide="arrow-right" class="w-4 h-4"></i>';
      btnNext.className = "px-6 py-2.5 text-sm font-bold text-white bg-[#0000dc] hover:bg-[#0000dc]/90 rounded-xl transition-colors shadow-md shadow-[#0000dc]/20 ml-auto flex items-center gap-2";
    }

    if (window.lucide) window.lucide.createIcons({ root: contentDiv });
    if (window.lucide) window.lucide.createIcons({ root: btnNext });
  }

  btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      closeTutorial();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  });

  function closeTutorial() {
    overlay.classList.add('hidden');
    modalBox.classList.remove('animate-modal-in');
    try {
      localStorage.setItem('tutorialSeen', 'true');
    } catch (e) { }
  }

  // Expose function globally so the header button can call it
  window.openTutorial = function () {
    currentStep = 0;
    initDots();
    renderStep();
    overlay.classList.remove('hidden');
    modalBox.classList.add('animate-modal-in');
  };

  btnClose.addEventListener('click', closeTutorial);

  // Auto-start on first visit
  function tryAutoStart() {
    try {
      if (!localStorage.getItem('tutorialSeen')) {
        setTimeout(() => {
          window.openTutorial();
        }, 500); // Mírné zpoždění pro plynulejší zážitek
      }
    } catch (e) { }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryAutoStart);
  } else {
    tryAutoStart();
  }

})();
