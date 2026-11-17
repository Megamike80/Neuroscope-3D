// =========================================================================
// NEUROSCOPE 3D: Architettura Integrata delle 4 Schermate Didattiche
// =========================================================================

// Gestione Navigazione a Schede
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const targetId = btn.dataset.tab;
    document.getElementById(targetId).classList.add('active');

    // Notifica i motori 3D e inizializza le scene al primo accesso
    setTimeout(() => {
      onWindowResize();
      if (targetId === 'tab-semantic-map' && !mapSceneInitialized) initMapScene();
      if (targetId === 'tab-learning' && !trainingSceneInitialized) initTrainingScene();
      if (targetId === 'tab-orchestra' && !orchestraSceneInitialized) initOrchestraScene();
    }, 50);
  });
});


// =========================================================================
// 1. I NEURONI DETECTIVE: 3 MESTIERI A CONFRONTO (Cibo, Cuccioli, Spazio)
// =========================================================================

const detectivePresets = {
  food: {
    icon: '🍕',
    title: 'Neurone Specialista in "Cibo & Cucina"',
    desc: 'Questo neurone è sintonizzato per riconoscere se un dato in arrivo appartiene al mondo del mangiare.',
    meterLabel: 'Vicinanza Semantica al Cibo',
    sensorLabels: {
      s1: '🌿 Canale A: È commestibile?',
      s2: '🍽️ Canale B: Sta a tavola / in cucina?',
      s3: '⚡ Canale C: Dona nutrimento ed energia?'
    },
    levels: {
      total: {
        word: 'Pizza 🍕',
        badge: '1. Associazione Totale',
        score: 1.0,
        sensors: {
          s1: { text: 'SÌ (100%)', class: 'yes' },
          s2: { text: 'SÌ (100%)', class: 'yes' },
          s3: { text: 'SÌ (100%)', class: 'yes' }
        },
        activeDendrites: [0, 1, 2, 3],
        reason: 'Alimento gustoso e completo: è commestibile, si trova a tavola e dona nutrimento.',
        narrative: 'Tutti e 3 i sensori d\'ingresso confermano le caratteristiche del cibo. I canali azzurri pompano carica, il nucleo dorato raggiunge il 100% e <strong>il tubo di uscita a destra spara una scarica verde smeraldo viva</strong>: decisione positiva trasmessa!'
      },
      partial: {
        word: 'Forchetta 🍴',
        badge: '2. Associazione Parziale',
        score: 0.55,
        sensors: {
          s1: { text: 'NO (0%)', class: 'no' },
          s2: { text: 'SÌ (100%)', class: 'yes' },
          s3: { text: 'NO (0%)', class: 'no' }
        },
        activeDendrites: [1],
        reason: 'Sta sul tavolo e serve per mangiare, ma non è cibo e non nutre!',
        narrative: '<strong>Un solo canale d\'ingresso su tre si accende</strong> (la forchetta sta a tavola, ma non è commestibile né nutre). Il nucleo riceve mezza carica (Oro tiepido) e <strong>il tubo di uscita a destra si accende solo a metà potenza</strong>, segnalando un legame parziale di contesto.'
      },
      none: {
        word: 'Galassia 🌌',
        badge: '3. Differenza Totale',
        score: 0.0,
        sensors: {
          s1: { text: 'NO (0%)', class: 'no' },
          s2: { text: 'NO (0%)', class: 'no' },
          s3: { text: 'NO (0%)', class: 'no' }
        },
        activeDendrites: [],
        reason: 'Il cosmo profondo non ha alcuna parentela con l\'alimentazione.',
        narrative: 'Nessun sensore d\'ingresso rileva caratteristiche del cibo: tutti i canali azzurri restano spenti. Il nucleo non riceve energia e <strong>il tubo di uscita a destra diventa TOTALMENTE NERO e opaco</strong>. Zero corrente: circuito interrotto!'
      }
    }
  },
  animals: {
    icon: '🐶',
    title: 'Neurone Specialista in "Cuccioli & Animali"',
    desc: 'Questo neurone è addestrato per scoprire se ciò che incontra è un fedele animale a quattro zampe o un essere vivente.',
    meterLabel: 'Vicinanza Semantica agli Animali',
    sensorLabels: {
      s1: '🐾 Canale A: È un essere vivente che respira?',
      s2: '🦮 Canale B: Ha pelo, zampe e si muove da solo?',
      s3: '❤️ Canale C: Ha bisogno di cibo e affetto?'
    },
    levels: {
      total: {
        word: 'Cane 🐶',
        badge: '1. Associazione Totale',
        score: 1.0,
        sensors: {
          s1: { text: 'SÌ (100%)', class: 'yes' },
          s2: { text: 'SÌ (100%)', class: 'yes' },
          s3: { text: 'SÌ (100%)', class: 'yes' }
        },
        activeDendrites: [0, 1, 2, 3],
        reason: 'Un vero cucciolo: respira, cammina su quattro zampe e cerca coccole!',
        narrative: 'Tutti i dendriti d\'ingresso si illuminano! Il nucleo si riempie di luce dorata ed emette una forte scarica verde: <strong>«Questo è un animale al 100%!»</strong>'
      },
      partial: {
        word: 'Peluche 🧸',
        badge: '2. Associazione Parziale',
        score: 0.50,
        sensors: {
          s1: { text: 'NO (0%)', class: 'no' },
          s2: { text: 'SÌ (100%)', class: 'yes' },
          s3: { text: 'NO (0%)', class: 'no' }
        },
        activeDendrites: [1],
        reason: 'Ha il pelo morbido e la forma di un orsetto, ma è un giocattolo: non è vivo né mangia!',
        narrative: 'Solo il sensore dell\'aspetto si accende. Il neurone capisce che è una somiglianza solo esteriore: l\'uscita si illumina solo a metà (luce ambrata).'
      },
      none: {
        word: 'Bicicletta 🚲',
        badge: '3. Differenza Totale',
        score: 0.0,
        sensors: {
          s1: { text: 'NO (0%)', class: 'no' },
          s2: { text: 'NO (0%)', class: 'no' },
          s3: { text: 'NO (0%)', class: 'no' }
        },
        activeDendrites: [],
        reason: 'Un veicolo a due ruote di metallo non ha alcuna caratteristica animale.',
        narrative: 'Nessun indizio vivente! I canali d\'ingresso restano spenti e il tubo d\'uscita diventa completamente nero: zero parentela col regno animale.'
      }
    }
  },
  space: {
    icon: '🚀',
    title: 'Neurone Specialista in "Esplorazione Spaziale"',
    desc: 'Questo neurone cerca veicoli e tecnologie capaci di volare oltre l\'atmosfera della Terra verso le stelle.',
    meterLabel: 'Vicinanza Semantica allo Spazio',
    sensorLabels: {
      s1: '🌌 Canale A: Viaggia nello spazio profondo?',
      s2: '🔥 Canale B: Ha motori potenti per vincere la gravità?',
      s3: '👨‍🚀 Canale C: Trasporta astronauti o satelliti?'
    },
    levels: {
      total: {
        word: 'Razzo 🚀',
        badge: '1. Associazione Totale',
        score: 1.0,
        sensors: {
          s1: { text: 'SÌ (100%)', class: 'yes' },
          s2: { text: 'SÌ (100%)', class: 'yes' },
          s3: { text: 'SÌ (100%)', class: 'yes' }
        },
        activeDendrites: [0, 1, 2, 3],
        reason: 'Veicolo spaziale per eccellenza: motori a razzo fiammeggianti e rotta interplanetaria!',
        narrative: 'Tripla conferma da tutti i dendriti! Il nucleo si carica al massimo e spara un fascio verde splendente: rotta per le stelle agganciata!'
      },
      partial: {
        word: 'Aquilone 🪁',
        badge: '2. Associazione Parziale',
        score: 0.50,
        sensors: {
          s1: { text: 'NO (0%)', class: 'no' },
          s2: { text: 'NO (0%)', class: 'no' },
          s3: { text: 'SÌ (100%)', class: 'yes' }
        },
        activeDendrites: [2],
        reason: 'Vola alto nell\'aria grazie al vento, ma non può uscire dall\'atmosfera né ha motori!',
        narrative: 'L\'aquilone vola nel cielo terrestre ma non può arrivare nello spazio. Il neurone riconosce il volo ma capisce il limite: uscita a mezza luce.'
      },
      none: {
        word: 'Mela 🍏',
        badge: '3. Differenza Totale',
        score: 0.0,
        sensors: {
          s1: { text: 'NO (0%)', class: 'no' },
          s2: { text: 'NO (0%)', class: 'no' },
          s3: { text: 'NO (0%)', class: 'no' }
        },
        activeDendrites: [],
        reason: 'Un frutto della terra saporito, senza alcuna parentela con l\'astronautica.',
        narrative: 'Nessun segnale di propulsione né di orbita: il neurone spegne tutti i canali, il nucleo resta al buio e l\'assone è totalmente spento.'
      }
    }
  }
};

let currentDetectiveKey = 'food';
let currentFoodLevel = 'total'; // 'total' | 'partial' | 'none'

let nScene, nCamera, nRenderer;
let neuronGroup; // Gruppo per centratura 3D perfetta
let neuronCore, coreGlowMesh, axonMesh;
let dendriteMeshes = [];
let particlesMesh, particlePositions, particleSpeeds;
const PARTICLE_COUNT = 150;
let nMouseIsDown = false, nPrevMouseX = 0, nPrevMouseY = 0;
let nTargetRotX = 0.15, nTargetRotY = 0.35;
let nCurrentRotX = 0.15, nCurrentRotY = 0.35;
let neuronCurrentEnergy = 1.0;

function initNeuron3D() {
  const container = document.getElementById('canvas3d-container');
  if (!container) return;

  const w = container.clientWidth || 600;
  const h = container.clientHeight || 500;

  nScene = new THREE.Scene();
  nScene.background = new THREE.Color(0x03050a);

  nCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  nCamera.position.set(0, 0, 14.5);

  nRenderer = new THREE.WebGLRenderer({ antialias: true });
  nRenderer.setSize(w, h);
  nRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(nRenderer.domElement);

  // Luci
  const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
  nScene.add(ambLight);
  const pointLight = new THREE.PointLight(0xffffff, 1.8, 25);
  pointLight.position.set(5, 5, 5);
  nScene.add(pointLight);

  // GRUPPO DEL NEURONE: CENTRATURA VISIVA PRECISA (Y: -0.4)
  // Il canvas ora si estende per l'intera altezza del card, ponendo il nucleo al centro esatto!
  neuronGroup = new THREE.Group();
  neuronGroup.position.set(0, -0.4, 0);
  nScene.add(neuronGroup);

  // 1. INGRESSI (Dendriti a sinistra) -> AZZURRO / CIANO (#38bdf8)
  const dendriteCurves = [
    new THREE.CatmullRomCurve3([ new THREE.Vector3(-6, 3, 1), new THREE.Vector3(-3, 1.5, 0.5), new THREE.Vector3(0, 0, 0) ]),
    new THREE.CatmullRomCurve3([ new THREE.Vector3(-6, -1, 1.5), new THREE.Vector3(-3, -0.5, 0.5), new THREE.Vector3(0, 0, 0) ]),
    new THREE.CatmullRomCurve3([ new THREE.Vector3(-5, 4, -2), new THREE.Vector3(-2.5, 2, -1), new THREE.Vector3(0, 0, 0) ]),
    new THREE.CatmullRomCurve3([ new THREE.Vector3(-5, -4, -1), new THREE.Vector3(-2.5, -2, -0.5), new THREE.Vector3(0, 0, 0) ])
  ];

  dendriteCurves.forEach((curve, idx) => {
    const tubeGeo = new THREE.TubeGeometry(curve, 30, 0.16, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
      roughness: 0.4
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    neuronGroup.add(tube);
    dendriteMeshes.push({ mesh: tube, curve: curve, index: idx });
  });

  // 2. NUCLEO (Soma al centro) -> ORO / AMBRA (#fbbf24)
  const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x271e05,
    emissive: 0xfbbf24,
    emissiveIntensity: 1.5,
    roughness: 0.3
  });
  neuronCore = new THREE.Mesh(coreGeo, coreMat);
  neuronGroup.add(neuronCore);

  const glowGeo = new THREE.SphereGeometry(1.9, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  coreGlowMesh = new THREE.Mesh(glowGeo, glowMat);
  neuronGroup.add(coreGlowMesh);

  // 3. USCITA (Assone a destra) -> VERDE SMERALDO (#34d399) O NERO SPENTO (#000000)
  const axonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, 0.4, -0.2),
    new THREE.Vector3(6.5, 0.1, 0)
  ]);
  const axonGeo = new THREE.TubeGeometry(axonCurve, 30, 0.28, 12, false);
  const axonMat = new THREE.MeshStandardMaterial({
    color: 0x34d399,
    emissive: 0x34d399,
    emissiveIntensity: 1.8,
    roughness: 0.2
  });
  axonMesh = new THREE.Mesh(axonGeo, axonMat);
  neuronGroup.add(axonMesh);

  // 4. Particelle d'impulso azzurre lungo gli ingressi
  const pGeo = new THREE.BufferGeometry();
  particlePositions = new Float32Array(PARTICLE_COUNT * 3);
  particleSpeeds = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const cIdx = i % dendriteCurves.length;
    const curve = dendriteCurves[cIdx];
    const t = Math.random();
    const pt = curve.getPoint(t);

    particlePositions[i * 3] = pt.x;
    particlePositions[i * 3 + 1] = pt.y;
    particlePositions[i * 3 + 2] = pt.z;

    particleSpeeds.push({
      curve: curve,
      cIdx: cIdx,
      t: t,
      speed: 0.006 + Math.random() * 0.008
    });
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.22,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  particlesMesh = new THREE.Points(pGeo, pMat);
  neuronGroup.add(particlesMesh);

  // Eventi Mouse Drag per ruotare la visuale
  container.addEventListener('mousedown', (e) => {
    nMouseIsDown = true;
    nPrevMouseX = e.clientX;
    nPrevMouseY = e.clientY;
  });
  window.addEventListener('mouseup', () => { nMouseIsDown = false; });
  container.addEventListener('mousemove', (e) => {
    if (!nMouseIsDown) return;
    nTargetRotY += (e.clientX - nPrevMouseX) * 0.008;
    nTargetRotX += (e.clientY - nPrevMouseY) * 0.008;
    nPrevMouseX = e.clientX;
    nPrevMouseY = e.clientY;
  });

  animateNeuron();
  applyDetectiveState('total');
  initDetectiveEvents();
}

function animateNeuron() {
  requestAnimationFrame(animateNeuron);

  nCurrentRotX += (nTargetRotX - nCurrentRotX) * 0.08;
  nCurrentRotY += (nTargetRotY - nCurrentRotY) * 0.08;
  neuronGroup.rotation.x = nCurrentRotX;
  neuronGroup.rotation.y = nCurrentRotY;

  const time = Date.now() * 0.002;
  const pulse = 1.0 + (Math.sin(time * 3) * 0.08 * neuronCurrentEnergy);
  coreGlowMesh.scale.set(pulse, pulse, pulse);
  coreGlowMesh.rotation.y += 0.01;

  // Movimento particelle d'ingresso azzurre verso il nucleo
  const posArr = particlesMesh.geometry.attributes.position.array;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const pData = particleSpeeds[i];
    pData.t += pData.speed * (0.2 + neuronCurrentEnergy * 1.5);
    if (pData.t > 1.0) pData.t = 0.0;

    const pt = pData.curve.getPoint(pData.t);
    posArr[i * 3] = pt.x;
    posArr[i * 3 + 1] = pt.y;
    posArr[i * 3 + 2] = pt.z;
  }
  particlesMesh.geometry.attributes.position.needsUpdate = true;

  nRenderer.render(nScene, nCamera);
}

// Applica uno dei 3 stati del Neurone Detective selezionato
function applyDetectiveState(levelKey) {
  currentFoodLevel = levelKey;
  const preset = detectivePresets[currentDetectiveKey] || detectivePresets.food;
  const data = preset.levels[levelKey];
  neuronCurrentEnergy = data.score;

  // Aggiorna bottoni attivi nella UI
  document.querySelectorAll('.state-choice-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === levelKey);
  });

  // Aggiorna Sensori Dendritici a video
  ['1', '2', '3'].forEach(num => {
    const sEl = document.getElementById(`sensor-${num}-val`);
    const sData = data.sensors[`s${num}`];
    if (sEl && sData) {
      sEl.textContent = sData.text;
      sEl.className = `sensor-val ${sData.class}`;
    }
  });

  // Misuratore percentuale
  const pct = Math.round(data.score * 100);
  const meterPctEl = document.getElementById('meter-percent');
  const meterFillEl = document.getElementById('meter-fill');
  if (meterPctEl) meterPctEl.textContent = `${pct}%`;
  if (meterFillEl) meterFillEl.style.width = `${pct}%`;

  const hudIndicator = document.getElementById('hud-indicator');
  const hudText = document.getElementById('hud-text');
  const expBox = document.getElementById('explanation-box');

  if (levelKey === 'total') {
    // 1. TOTALE (100% Affinità)
    dendriteMeshes.forEach(d => {
      d.mesh.material.emissive.setHex(0x38bdf8);
      d.mesh.material.emissiveIntensity = 0.8;
    });
    if (particlesMesh) particlesMesh.visible = true;

    // Nucleo: Oro splendente
    if (neuronCore) {
      neuronCore.material.color.setHex(0x271e05);
      neuronCore.material.emissive.setHex(0xfbbf24);
      neuronCore.material.emissiveIntensity = 1.8;
    }
    if (coreGlowMesh) {
      coreGlowMesh.material.color.setHex(0xfbbf24);
      coreGlowMesh.visible = true;
    }

    // Tubo di uscita: VERDE SMERALDO BRILLANTE ACCESO AL 100%!
    if (axonMesh) {
      axonMesh.material.color.setHex(0x34d399);
      axonMesh.material.emissive.setHex(0x34d399);
      axonMesh.material.emissiveIntensity = 1.9;
    }

    if (hudIndicator) hudIndicator.className = 'hud-indicator active';
    if (hudText) hudText.textContent = `Uscita: ACCESA AL 100% (Verde Smeraldo)! Segnale approvato.`;

  } else if (levelKey === 'partial') {
    // 2. PARZIALE (~50% Affinità)
    dendriteMeshes.forEach((d, idx) => {
      if (data.activeDendrites && data.activeDendrites.includes(idx)) {
        d.mesh.material.emissive.setHex(0x38bdf8);
        d.mesh.material.emissiveIntensity = 0.7;
      } else {
        d.mesh.material.emissive.setHex(0x000000);
        d.mesh.material.emissiveIntensity = 0.0;
      }
    });
    if (particlesMesh) particlesMesh.visible = true;

    // Nucleo: Oro a mezza potenza
    if (neuronCore) {
      neuronCore.material.color.setHex(0x1a1403);
      neuronCore.material.emissive.setHex(0xfbbf24);
      neuronCore.material.emissiveIntensity = 0.7;
    }
    if (coreGlowMesh) {
      coreGlowMesh.material.color.setHex(0xfbbf24);
      coreGlowMesh.visible = true;
    }

    // Tubo di uscita: Verde tenue / ambra a mezza luce
    if (axonMesh) {
      axonMesh.material.color.setHex(0x064e3b);
      axonMesh.material.emissive.setHex(0x10b981);
      axonMesh.material.emissiveIntensity = 0.4;
    }

    if (hudIndicator) hudIndicator.className = 'hud-indicator partial';
    if (hudText) hudText.textContent = `Uscita: MEZZA POTENZA (~50%). Passa solo un segnale parziale.`;

  } else {
    // 3. ESTRANEO (0% Affinità)
    dendriteMeshes.forEach(d => {
      d.mesh.material.emissive.setHex(0x000000);
      d.mesh.material.emissiveIntensity = 0.0;
    });
    if (particlesMesh) particlesMesh.visible = false;

    // Nucleo: Nero carbone opaco
    if (neuronCore) {
      neuronCore.material.color.setHex(0x090d16);
      neuronCore.material.emissive.setHex(0x000000);
      neuronCore.material.emissiveIntensity = 0.0;
    }
    if (coreGlowMesh) coreGlowMesh.visible = false;

    // Tubo d'uscita: totalmente nero opaco e spento
    if (axonMesh) {
      axonMesh.material.color.setHex(0x090d16);
      axonMesh.material.emissive.setHex(0x000000);
      axonMesh.material.emissiveIntensity = 0.0;
    }

    if (hudIndicator) hudIndicator.className = 'hud-indicator inactive';
    if (hudText) hudText.textContent = `Uscita: TOTALMENTE SPENTA (0%). Circuito interrotto.`;
  }

  // Spiegazione didattica aggiornata
  if (expBox) {
    expBox.innerHTML = `
      <strong>Parola testata: "${data.word}" (${pct}% Affinità)</strong><br>
      ${data.reason}<br><br>
      <em>Cosa vedi nel 3D:</em> ${data.narrative}
    `;
  }
}

// Cambio mestiere neurone detective
function switchDetective(detectiveKey) {
  currentDetectiveKey = detectiveKey;
  const p = detectivePresets[detectiveKey];
  if (!p) return;

  // Aggiorna pill attiva
  document.querySelectorAll('.detective-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.detective === detectiveKey);
  });

  // Aggiorna badge e testi
  const iconEl = document.getElementById('neuron-focus-icon');
  const titleEl = document.getElementById('neuron-focus-title');
  const descEl = document.getElementById('neuron-focus-desc');
  const meterLbl = document.getElementById('meter-category-label');

  if (iconEl) iconEl.textContent = p.icon;
  if (titleEl) titleEl.textContent = p.title;
  if (descEl) descEl.textContent = p.desc;
  if (meterLbl) meterLbl.textContent = p.meterLabel;

  // Aggiorna testi sensori
  ['1', '2', '3'].forEach(num => {
    const lbl = document.getElementById(`sensor-${num}-label`);
    if (lbl && p.sensorLabels[`s${num}`]) {
      lbl.textContent = p.sensorLabels[`s${num}`];
    }
  });

  // Aggiorna etichette dei 3 pulsanti
  const wTotal = document.getElementById('state-word-total');
  const wPartial = document.getElementById('state-word-partial');
  const wNone = document.getElementById('state-word-none');

  if (wTotal) wTotal.textContent = p.levels.total.word;
  if (wPartial) wPartial.textContent = p.levels.partial.word;
  if (wNone) wNone.textContent = p.levels.none.word;

  applyDetectiveState('total');
}

function initDetectiveEvents() {
  document.querySelectorAll('.detective-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchDetective(btn.dataset.detective);
    });
  });

  document.querySelectorAll('.state-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyDetectiveState(btn.dataset.level);
    });
  });
}


// =========================================================================
// 2. LA SFERA DI FIBONACCI DEI CONCETTI & CONTINUUM CROMATICO A 360°
//    Sfera omogenea senza buchi né rami vuoti: ogni punto è un concetto reale
// =========================================================================

let mapScene, mapCamera, mapRenderer;
let mapSceneInitialized = false;
let mapGroup;
let mapMouseDown = false, mapPrevX = 0, mapPrevY = 0;
let mapTargetRotX = 0.15, mapTargetRotY = 0.0;
let mapCurrentRotX = 0.15, mapCurrentRotY = 0.0;
let targetCameraZ = 18.0;
let currentCameraZ = 18.0;

let mapAllNodes = [];       // { mesh, auraMesh, spriteMat, isHub, zone, word, colorHex, pos }
let mapAllFibers = [];      // { line, zoneA, zoneB, mat, baseOpacity }
let activeBridgeId = 'all';

// 54 Concetti Reali disposti lungo l'anello continuo delle parentele semantiche
const ALL_54_CONCEPTS = [
  // 1. Cibo, Gusto & Cucina (Giallo / Oro)
  { word: 'Pizza 🍕', isHub: true, zone: 'food', hubTitle: 'Cibo & Cucina 🍕' },
  { word: 'Pasta 🍝', isHub: false, zone: 'food' },
  { word: 'Pane 🥖', isHub: false, zone: 'food' },
  { word: 'Frutta 🍎', isHub: false, zone: 'food' },
  { word: 'Zuppa 🍲', isHub: false, zone: 'food' },
  { word: 'Cuoco 👨‍🍳', isHub: false, zone: 'food' },
  { word: 'Tavola 🍽️', isHub: false, zone: 'food' },

  // Corridoio 1: Cibo ➔ Natura & Animali (Arancione caldo)
  { word: 'Ricetta 📜', isHub: false, zone: 'orange' },
  { word: 'Farina 🥣', isHub: false, zone: 'orange' },
  { word: 'Grano 🌾', isHub: false, zone: 'orange' },
  { word: 'Pascolo 🐄', isHub: false, zone: 'orange' },
  { word: 'Latte 🥛', isHub: false, zone: 'orange' },
  { word: 'Ciotola 🥣', isHub: false, zone: 'orange' },
  { word: 'Croccantini 🦴', isHub: false, zone: 'orange' },

  // 2. Natura, Animali & Vivente (Rosso / Corallo)
  { word: 'Cane 🐶', isHub: true, zone: 'animals', hubTitle: 'Natura & Animali 🐶' },
  { word: 'Gatto 🐱', isHub: false, zone: 'animals' },
  { word: 'Lupo 🐺', isHub: false, zone: 'animals' },
  { word: 'Cucciolo 🐾', isHub: false, zone: 'animals' },
  { word: 'Bosco 🌲', isHub: false, zone: 'animals' },
  { word: 'Albero 🌳', isHub: false, zone: 'animals' },
  { word: 'Fauna 🦁', isHub: false, zone: 'animals' },
  { word: 'Aquila 🦅', isHub: false, zone: 'animals' },

  // Corridoio 2: Natura ➔ Cultura & Emozioni (Magenta / Rosa vivo)
  { word: 'Istinto ⚡', isHub: false, zone: 'magenta' },
  { word: 'Affetto ❤️', isHub: false, zone: 'magenta' },
  { word: 'Fedeltà 🐕', isHub: false, zone: 'magenta' },
  { word: 'Favola 📖', isHub: false, zone: 'magenta' },
  { word: 'Mitologia 🦄', isHub: false, zone: 'magenta' },
  { word: 'Bellezza 🌸', isHub: false, zone: 'magenta' },
  { word: 'Emozione ✨', isHub: false, zone: 'magenta' },

  // 3. Cultura, Arte & Pensiero (Viola / Porpora)
  { word: 'Musica 🎵', isHub: true, zone: 'culture', hubTitle: 'Cultura & Emozioni 🎭' },
  { word: 'Poesia 🖋️', isHub: false, zone: 'culture' },
  { word: 'Teatro 🎭', isHub: false, zone: 'culture' },
  { word: 'Arte 🎨', isHub: false, zone: 'culture' },
  { word: 'Filosofia 🏛️', isHub: false, zone: 'culture' },
  { word: 'Memoria 💭', isHub: false, zone: 'culture' },
  { word: 'Linguaggio 🗣️', isHub: false, zone: 'culture' },

  // Corridoio 3: Cultura ➔ Scienza & Tecnologia (Indaco / Blu profondo)
  { word: 'Idee 💡', isHub: false, zone: 'indigo' },
  { word: 'Cinema 🎬', isHub: false, zone: 'indigo' },
  { word: 'Fantascienza 🚀', isHub: false, zone: 'indigo' },
  { word: 'Videogiochi 🎮', isHub: false, zone: 'indigo' },
  { word: 'Musica Digitale 🎧', isHub: false, zone: 'indigo' },
  { word: 'Logica 🧠', isHub: false, zone: 'indigo' },

  // 4. Scienza, Elettronica & Tecnologia (Ciano / Blu Elettrico)
  { word: 'Computer 💻', isHub: true, zone: 'tech', hubTitle: 'Tecnologia & Scienza 💻' },
  { word: 'Software 💾', isHub: false, zone: 'tech' },
  { word: 'Internet 🌐', isHub: false, zone: 'tech' },
  { word: 'Algoritmo ⚙️', isHub: false, zone: 'tech' },
  { word: 'Codice 🧑‍💻', isHub: false, zone: 'tech' },
  { word: 'Chip ⚡', isHub: false, zone: 'tech' },
  { word: 'Robot 🤖', isHub: false, zone: 'tech' },

  // Corridoio 4: Tecnologia ➔ Cibo & Cucina (Verde Smeraldo / Lime)
  { word: 'Cane Robot 🦾🐕', isHub: false, zone: 'green' },
  { word: 'Biotecnologia 🧬', isHub: false, zone: 'green' },
  { word: 'Sensore 📡', isHub: false, zone: 'green' },
  { word: 'Serra Smart 🌿', isHub: false, zone: 'green' },
  { word: 'Forno Digitale 🔥', isHub: false, zone: 'green' },
  { word: 'Robot Cucina 🤖🍲', isHub: false, zone: 'green' }
];

// Funzione matematica per calcolare il gradiente cromatico continuo a 360°
function getSemanticColor(t) {
  // t va da 0.0 a 1.0 lungo i 54 concetti
  const stops = [
    { t: 0.00, h: 0.12, s: 0.95, l: 0.55 }, // Giallo Cibo
    { t: 0.13, h: 0.08, s: 0.95, l: 0.55 }, // Arancione
    { t: 0.26, h: 0.98, s: 0.90, l: 0.55 }, // Rosso Vivo Natura
    { t: 0.39, h: 0.88, s: 0.85, l: 0.60 }, // Magenta Emozioni
    { t: 0.52, h: 0.77, s: 0.85, l: 0.62 }, // Viola Cultura
    { t: 0.65, h: 0.64, s: 0.90, l: 0.58 }, // Indaco Fantascienza
    { t: 0.78, h: 0.54, s: 0.95, l: 0.55 }, // Ciano Tecnologia
    { t: 0.90, h: 0.38, s: 0.85, l: 0.52 }, // Verde Bio-Tech
    { t: 1.00, h: 0.12, s: 0.95, l: 0.55 }  // Ritorno continuo al Giallo
  ];

  let s0 = stops[0], s1 = stops[1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].t && t <= stops[i + 1].t) {
      s0 = stops[i];
      s1 = stops[i + 1];
      break;
    }
  }

  const localT = (t - s0.t) / (s1.t - s0.t);
  const h = s0.h + (s1.h - s0.h) * localT;
  const s = s0.s + (s1.s - s0.s) * localT;
  const l = s0.l + (s1.l - s0.l) * localT;
  return new THREE.Color().setHSL(h, s, l);
}

function initMapScene() {
  const container = document.getElementById('canvas-map-container');
  if (!container || mapSceneInitialized) return;
  mapSceneInitialized = true;

  const w = container.clientWidth || 600;
  const h = container.clientHeight || 540;

  mapScene = new THREE.Scene();
  mapScene.background = new THREE.Color(0x02040a);

  mapCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  mapCamera.position.set(0, 0, currentCameraZ);

  mapRenderer = new THREE.WebGLRenderer({ antialias: true });
  mapRenderer.setSize(w, h);
  mapRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(mapRenderer.domElement);

  // Luci calibrate per far brillare la sfera
  const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
  mapScene.add(ambLight);
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight1.position.set(6, 10, 8);
  mapScene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.4);
  dirLight2.position.set(-6, -6, -6);
  mapScene.add(dirLight2);

  mapGroup = new THREE.Group();
  mapScene.add(mapGroup);

  // Costruzione della Sfera di Fibonacci (Zero gabbie vuote!)
  buildFibonacciSphere();

  // Gestione Rotazione 3D via Mouse & Touch
  container.addEventListener('mousedown', (e) => {
    mapMouseDown = true;
    mapPrevX = e.clientX;
    mapPrevY = e.clientY;
  });
  window.addEventListener('mouseup', () => { mapMouseDown = false; });
  container.addEventListener('mousemove', (e) => {
    if (!mapMouseDown) return;
    mapTargetRotY += (e.clientX - mapPrevX) * 0.007;
    mapTargetRotX += (e.clientY - mapPrevY) * 0.007;
    mapTargetRotX = Math.max(-1.1, Math.min(1.1, mapTargetRotX));
    mapPrevX = e.clientX;
    mapPrevY = e.clientY;
  });

  // Gestione Zoom con Rotellina
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetCameraZ += e.deltaY * 0.015;
    targetCameraZ = Math.max(7.5, Math.min(22.0, targetCameraZ));
    syncZoomUI(true);
  }, { passive: false });

  // Touch Pinch per Smartphone/Tablet
  let initialPinchDist = null;
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1) {
      mapMouseDown = true;
      mapPrevX = e.touches[0].clientX;
      mapPrevY = e.touches[0].clientY;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialPinchDist) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = initialPinchDist - currentDist;
      targetCameraZ += diff * 0.03;
      targetCameraZ = Math.max(7.5, Math.min(22.0, targetCameraZ));
      initialPinchDist = currentDist;
      syncZoomUI(true);
    } else if (e.touches.length === 1 && mapMouseDown) {
      mapTargetRotY += (e.touches[0].clientX - mapPrevX) * 0.007;
      mapTargetRotX += (e.touches[0].clientY - mapPrevY) * 0.007;
      mapTargetRotX = Math.max(-1.1, Math.min(1.1, mapTargetRotX));
      mapPrevX = e.touches[0].clientX;
      mapPrevY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mapMouseDown = false;
    initialPinchDist = null;
  });

  // Controlli Zoom UI
  const btnMacro = document.getElementById('btn-zoom-macro');
  const btnMicro = document.getElementById('btn-zoom-micro');
  const zoomSlider = document.getElementById('map-zoom-slider');

  if (btnMacro) {
    btnMacro.addEventListener('click', () => {
      targetCameraZ = 20.0;
      syncZoomUI(true);
    });
  }
  if (btnMicro) {
    btnMicro.addEventListener('click', () => {
      targetCameraZ = 9.2;
      syncZoomUI(true);
    });
  }
  if (zoomSlider) {
    zoomSlider.addEventListener('input', (e) => {
      targetCameraZ = parseFloat(e.target.value);
      syncZoomUI(false);
    });
  }

  // Pulsanti Filtro Corridoi
  document.querySelectorAll('.bridge-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bridge-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.route-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      highlightBridge(btn.dataset.bridge);
      const infoBox = document.getElementById('route-info-box');
      if (infoBox) infoBox.style.display = 'none';
    });
  });

  // Pulsanti Rotte Segrete (Caccia al Tesoro dei Significati per Ragazzi)
  document.querySelectorAll('.route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activateSecretRoute(btn.dataset.route);
    });
  });

  // Inizializza lo Switch di Realtà (Modello 3D vs Dentro la Macchina)
  initRealityScreen();

  animateMap();
}

// Genera la Sfera di Fibonacci: 54 concetti equamente spaziati a 360°
function buildFibonacciSphere() {
  const N = ALL_54_CONCEPTS.length;
  const SPHERE_RADIUS = 5.5;
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

  // 1. Calcolo posizioni ottimali secondo Fibonacci
  const rawPoints = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2; // Latitudine da +1 a -1
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = 2 * Math.PI * i / phi;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const angle = Math.atan2(z, x); // Angolo azimutale in [-PI, PI]
    rawPoints.push({ x, y, z, angle });
  }

  // Ordiniamo per angolo azimutale per far corrispondere il ciclo concettuale continuo
  rawPoints.sort((a, b) => a.angle - b.angle);

  // 2. Creazione dei 54 nodi e delle etichette
  for (let i = 0; i < N; i++) {
    const pt = rawPoints[i];
    const data = ALL_54_CONCEPTS[i];
    const t = i / N;
    const colorObj = getSemanticColor(t);
    const colorHex = colorObj.getHex();

    const pos = new THREE.Vector3(pt.x, pt.y, pt.z).normalize().multiplyScalar(SPHERE_RADIUS);

    // Nodo 3D: sfera lucida
    const radius = data.isHub ? 0.52 : 0.28;
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: data.isHub ? 1.5 : 0.9,
      roughness: 0.25
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mapGroup.add(mesh);

    // Aura pulsante per i 4 poli principali
    let auraMesh = null;
    if (data.isHub) {
      const aGeo = new THREE.SphereGeometry(radius * 1.45, 12, 12);
      const aMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.45
      });
      auraMesh = new THREE.Mesh(aGeo, aMat);
      auraMesh.position.copy(pos);
      mapGroup.add(auraMesh);
    }

    // Etichetta testuale (LOD)
    const labelText = data.isHub ? data.hubTitle : data.word;
    const labelObj = createWordSprite(labelText, colorHex, data.isHub);
    const labelOffset = pos.clone().normalize().multiplyScalar(data.isHub ? 0.75 : 0.48);
    labelObj.sprite.position.copy(pos.clone().add(labelOffset));
    mapGroup.add(labelObj.sprite);

    mapAllNodes.push({
      mesh,
      auraMesh,
      spriteMat: labelObj.mat,
      isHub: data.isHub,
      zone: data.zone,
      word: data.word,
      colorHex,
      pos,
      idx: i
    });
  }

  // 3. Connessioni a Ragnatela: Niente rami vuoti, solo filamenti tra parole vicine
  for (let i = 0; i < N; i++) {
    const nodeA = mapAllNodes[i];

    // Connessione sequenziale ciclica (la spina dorsale del cerchio)
    const nextIdx = (i + 1) % N;
    const nodeNext = mapAllNodes[nextIdx];
    createFiber(nodeA, nodeNext, 0.45);

    // Connessione al secondo vicino per densità armonica
    const nextIdx2 = (i + 2) % N;
    const nodeNext2 = mapAllNodes[nextIdx2];
    if (nodeA.pos.distanceTo(nodeNext2.pos) < 3.2) {
      createFiber(nodeA, nodeNext2, 0.3);
    }

    // Connessioni per vicinanza spaziale (k-Nearest Neighbors attraverso le latitudini)
    const neighbors = [];
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      const nodeB = mapAllNodes[j];
      const d = nodeA.pos.distanceTo(nodeB.pos);
      if (d < 2.9 && Math.abs(i - j) > 2) {
        neighbors.push({ node: nodeB, dist: d });
      }
    }
    neighbors.sort((a, b) => a.dist - b.dist);
    // Collega ai 2 vicini trasversali più prossimi
    for (let k = 0; k < Math.min(2, neighbors.length); k++) {
      createFiber(nodeA, neighbors[k].node, 0.25);
    }
  }
}

// Crea un filamento ottico tridimensionale leggermente ispessito con gradiente di colore
function createFiber(nodeA, nodeB, baseOpacity) {
  // Evita duplicati controllando gli indici
  if (nodeA.idx > nodeB.idx && Math.abs(nodeA.idx - nodeB.idx) !== mapAllNodes.length - 1) return;

  const colA = new THREE.Color(nodeA.colorHex);
  const colB = new THREE.Color(nodeB.colorHex);

  const curve = new THREE.LineCurve3(nodeA.pos, nodeB.pos);
  // Raggio 0.018: filamento ottico consistente e nitido, visibile senza appesantire la scena
  const tubeGeo = new THREE.TubeGeometry(curve, 2, 0.018, 6, false);

  // Calcolo gradiente cromatico continuo lungo il tubo da colA a colB
  const count = tubeGeo.attributes.position.count;
  const colors = new Float32Array(count * 3);
  const posAttr = tubeGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    v.fromBufferAttribute(posAttr, i);
    const distA = v.distanceTo(nodeA.pos);
    const distB = v.distanceTo(nodeB.pos);
    const t = THREE.MathUtils.clamp(distA / (distA + distB), 0, 1);
    const c = colA.clone().lerp(colB, t);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  tubeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: baseOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const mesh = new THREE.Mesh(tubeGeo, mat);
  mapGroup.add(mesh);
  mapAllFibers.push({ line: mesh, nodeA, nodeB, mat, baseOpacity });
}

// Crea etichette flottanti 2D nitide in Three.js (Canvas Texture)
function createWordSprite(text, colorHex, isHub = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 70;
  const ctx = canvas.getContext('2d');

  const hexStr = '#' + colorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = isHub ? 'rgba(5, 10, 24, 0.94)' : 'rgba(10, 16, 32, 0.88)';
  ctx.strokeStyle = hexStr;
  ctx.lineWidth = isHub ? 3 : 1.5;

  const r = 18;
  const x = 6, y = 6, w = 288, h = 58;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.font = isHub ? 'bold 22px Space Grotesk, sans-serif' : '600 18px Space Grotesk, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 150, 35);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: isHub ? 0.95 : 0.0,
    depthTest: false
  });

  const sprite = new THREE.Sprite(mat);
  const scale = isHub ? 2.6 : 1.9;
  sprite.scale.set(scale, scale * (70 / 300), 1);
  return { sprite, mat, isHub };
}

// Sincronizza l'interfaccia UI dello Zoom
function syncZoomUI(updateSliderInput = true) {
  const zoomSlider = document.getElementById('map-zoom-slider');
  const zoomLevelText = document.getElementById('zoom-level-text');
  const btnMacro = document.getElementById('btn-zoom-macro');
  const btnMicro = document.getElementById('btn-zoom-micro');

  if (zoomSlider && updateSliderInput) {
    zoomSlider.value = targetCameraZ.toFixed(1);
  }

  if (targetCameraZ >= 17.5) {
    if (zoomLevelText) zoomLevelText.textContent = '🌍 Vista Globale (Compattezza 100%)';
    if (btnMacro) btnMacro.classList.add('active');
    if (btnMicro) btnMicro.classList.remove('active');
  } else if (targetCameraZ <= 11.5) {
    if (zoomLevelText) zoomLevelText.textContent = '🔬 Vista Micro (Singole Parole & Sentieri)';
    if (btnMacro) btnMacro.classList.remove('active');
    if (btnMicro) btnMicro.classList.add('active');
  } else {
    if (zoomLevelText) zoomLevelText.textContent = '🧭 Vista Media (Ponti & Corridoi)';
    if (btnMacro) btnMacro.classList.remove('active');
    if (btnMicro) btnMicro.classList.remove('active');
  }
}

// Loop di Animazione: Rotazione, Lerp Zoom e LOD Etichette
function animateMap() {
  requestAnimationFrame(animateMap);

  // Rotazione fluida con inerzia
  mapCurrentRotX += (mapTargetRotX - mapCurrentRotX) * 0.08;
  mapCurrentRotY += (mapTargetRotY - mapCurrentRotY) * 0.08;
  mapGroup.rotation.x = mapCurrentRotX;
  mapGroup.rotation.y = mapCurrentRotY;

  // Auto-rotazione dolce se non si trascina
  if (!mapMouseDown && activeBridgeId === 'all') {
    mapTargetRotY += 0.0012;
  }

  // Lerp Camera Z (Zoom fluido e cinematico)
  currentCameraZ += (targetCameraZ - currentCameraZ) * 0.09;
  mapCamera.position.z = currentCameraZ;

  // Livello di Dettaglio (LOD): da lontano compaiono solo i 4 Poli; da vicino compaiono tutte le 54 parole
  const zoomProgress = (16.5 - currentCameraZ) / (16.5 - 9.0); // 0 (lontano) -> 1 (vicino)
  const subLabelOpacity = THREE.MathUtils.clamp(zoomProgress, 0.0, 0.95);

  mapAllNodes.forEach(node => {
    const w = getZoneActivationWeight(node.zone, activeBridgeId);

    if (node.isHub) {
      node.spriteMat.opacity = THREE.MathUtils.lerp(0.35, 0.98, w);
      if (node.auraMesh) {
        node.auraMesh.rotation.y += 0.01;
        node.auraMesh.material.opacity = THREE.MathUtils.lerp(0.12, 0.55, w);
      }
      node.mesh.material.emissiveIntensity = THREE.MathUtils.lerp(0.4, 1.85, w);
    } else {
      node.spriteMat.opacity = subLabelOpacity * THREE.MathUtils.lerp(0.2, 1.0, w);
      node.mesh.material.emissiveIntensity = THREE.MathUtils.lerp(0.25, 1.25, w);
    }
  });

  // Intensità dei filamenti regolata con la vicinanza e decadimento continuo dell'attenzione
  const fiberFactor = THREE.MathUtils.lerp(0.8, 1.35, THREE.MathUtils.clamp(zoomProgress, 0, 1));
  mapAllFibers.forEach(f => {
    const wA = getZoneActivationWeight(f.nodeA.zone, activeBridgeId);
    const wB = getZoneActivationWeight(f.nodeB.zone, activeBridgeId);
    // Peso continuo del filamento: media dell'attivazione dei due nodi
    const fiberWeight = (wA + wB) * 0.5;

    // Decadimento sfumato continuo (niente cavi tranciati, il verde verso il cibo resta acceso al ~75%!)
    const effectiveOpacity = f.baseOpacity * fiberFactor * THREE.MathUtils.lerp(0.14, 1.0, fiberWeight);
    f.mat.opacity = effectiveOpacity;
  });

  mapRenderer.render(mapScene, mapCamera);
}

// Ordine topologico circolare delle 8 zone semantiche a 360°
const SEMANTIC_ZONE_ORDER = ['food', 'orange', 'animals', 'magenta', 'culture', 'indigo', 'tech', 'green'];

// Calcola il peso di attivazione continuo (Softmax Falloff) per ogni zona rispetto al corridoio attivo
function getZoneActivationWeight(zone, filter) {
  if (filter === 'all') return 1.0;

  const zoneIdx = SEMANTIC_ZONE_ORDER.indexOf(zone);
  if (zoneIdx === -1) return 0.5;

  let coreIndices = [];
  if (filter === 'orange') coreIndices = [0, 1, 2];       // Cibo ➔ Arancione ➔ Natura
  else if (filter === 'magenta') coreIndices = [2, 3, 4]; // Natura ➔ Magenta ➔ Cultura
  else if (filter === 'indigo') coreIndices = [4, 5, 6];  // Cultura ➔ Indaco ➔ Tech
  else if (filter === 'green') coreIndices = [6, 7, 0];   // Tech ➔ Verde ➔ Cibo
  else return 1.0;

  // Zona nel cuore del corridoio: 100%
  if (coreIndices.includes(zoneIdx)) return 1.0;

  // Distanza circolare minima dal cuore del corridoio
  let minDistance = 99;
  for (const cIdx of coreIndices) {
    const directDiff = Math.abs(zoneIdx - cIdx);
    const circularDiff = Math.min(directDiff, 8 - directDiff);
    if (circularDiff < minDistance) {
      minDistance = circularDiff;
    }
  }

  // Decadimento continuo e graduale ispirato alla vera attenzione dell'IA:
  if (minDistance === 1) return 0.48; // Zone prossimali di confine (es. verde adiacente al cibo)
  if (minDistance === 2) return 0.22; // Zone a media distanza
  return 0.08;                        // Antipodi nello spazio profondo
}

function isNodeInActiveCorridor(zone, filter) {
  return getZoneActivationWeight(zone, filter) >= 0.9;
}

// Calcola la rotazione 3D ottimale per centrare perfettamente qualsiasi corridoio davanti alla camera
function centerCorridorInView(type) {
  if (type === 'all') {
    mapTargetRotX = 0.15;
    return;
  }

  let zones = [];
  if (type === 'orange') zones = ['food', 'orange', 'animals'];
  else if (type === 'magenta') zones = ['animals', 'magenta', 'culture'];
  else if (type === 'indigo') zones = ['culture', 'indigo', 'tech'];
  else if (type === 'green') zones = ['tech', 'green', 'food'];
  else return;

  const nodes = mapAllNodes.filter(n => zones.includes(n.zone));
  if (!nodes.length) return;

  // Centroide geometrico dei nodi del corridoio
  const center = new THREE.Vector3();
  nodes.forEach(n => center.add(n.pos));
  center.normalize();

  // Calcolo angolare esatto per orientare il centroide dritto davanti all'osservatore (X=0, Y=0, Z>0)
  // Con ordine di rotazione standard Three.js 'XYZ' (Ry eseguita prima di Rx):
  let ry = Math.atan2(-center.x, center.z);
  const zPrime = Math.hypot(center.x, center.z);
  const rx = Math.atan2(center.y, zPrime);

  // Percorso angolare più breve su Y per una rotazione morbida e naturale
  while (ry - mapCurrentRotY > Math.PI) ry -= 2 * Math.PI;
  while (ry - mapCurrentRotY < -Math.PI) ry += 2 * Math.PI;

  mapTargetRotX = rx;
  mapTargetRotY = ry;
}

// Filtro dei 4 Grandi Corridoi con rotazione automatica mirata e centratura perfetta
function highlightBridge(type) {
  activeBridgeId = type;
  centerCorridorInView(type);
  const card = document.getElementById('bridge-explanation-card');

  if (type === 'orange') {
    card.innerHTML = `
      <h4 style="color: #fb923c;">🟠 Corridoio 1: Cibo 🍕 ➔ Natura & Animali 🐶</h4>
      <p>
        <strong>Nodi del Corridoio: Cuoco 👨‍🍳 · Ricetta 📜 · Farina 🥣 · Grano 🌾 · Pascolo 🐄 · Latte 🥛 · Ciotola 🥣 · Croccantini 🦴 · Cane 🐶</strong><br>
        La sfumatura continua tra il Giallo oro e il Rosso corallo attraversa il mondo agricolo e dell'alimentazione. Qui l'IA impara naturalmente che il cane si nutre attraverso la ciotola e che il pane nasce dal grano nei campi, senza alcuna confusione logica!
      </p>
      <div style="margin-top: 0.55rem; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.45rem; line-height: 1.4;">
        💡 <em>Attenzione Continua:</em> I collegamenti con i corridoi vicini (es. il verde della Tecnologia) mantengono una luce soffusa (~48%): nell'IA reale l'attenzione non si spegne mai a zero, ma sfuma morbidamente con la distanza!
      </div>
    `;
  } else if (type === 'magenta') {
    card.innerHTML = `
      <h4 style="color: #f472b6;">🟣 Corridoio 2: Natura 🐶 ➔ Cultura & Emozioni 🎭</h4>
      <p>
        <strong>Nodi del Corridoio: Lupo 🐺 · Cucciolo 🐾 · Istinto ⚡ · Affetto ❤️ · Fedeltà 🐕 · Favola 📖 · Mitologia 🦄 · Musica 🎵 · Poesia 🖋️</strong><br>
        Dalla biologia vivente nascono le emozioni umane: la fedeltà del cane ispira favole, miti e capolavori poetici. La Cultura non è isolata: è il ponte emotivo con cui gli esseri umani raccontano la natura e gli animali.
      </p>
      <div style="margin-top: 0.55rem; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.45rem; line-height: 1.4;">
        💡 <em>Attenzione Continua:</em> I nodi adiacenti (Arancione e Indaco) conservano una sfumatura intermedia, mostrando che la sfera non ha scomparti chiusi ma un continuum organico.
      </div>
    `;
  } else if (type === 'indigo') {
    card.innerHTML = `
      <h4 style="color: #38bdf8;">🔵 Corridoio 3: Cultura 🎭 ➔ Scienza & Tecnologia 💻</h4>
      <p>
        <strong>Nodi del Corridoio: Arte 🎨 · Filosofia 🏛️ · Idee 💡 · Cinema 🎬 · Fantascienza 🚀 · Videogiochi 🎮 · Musica Digitale 🎧 · Algoritmo ⚙️ · Computer 💻</strong><br>
        La creatività umana genera la tecnica: è l'immaginazione fantascientifica e la logica filosofica che hanno portato all'invenzione dei computer, degli algoritmi e delle reti neurali!
      </p>
      <div style="margin-top: 0.55rem; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.45rem; line-height: 1.4;">
        💡 <em>Attenzione Continua:</em> I ponti di confine con la Cultura e con la Bio-Tecnologia restano illuminati a mezza luce per testimoniare la continuità del sapere.
      </div>
    `;
  } else if (type === 'green') {
    card.innerHTML = `
      <h4 style="color: #34d399;">🟢 Corridoio 4: Tecnologia 💻 ➔ Cibo & Cucina 🍕</h4>
      <p>
        <strong>Nodi del Corridoio: Robot 🤖 · Cane Robot 🦾🐕 · Biotecnologia 🧬 · Serra Smart 🌿 · Forno Digitale 🔥 · Robot Cucina 🤖🍲 · Pizza 🍕</strong><br>
        Il ciclo si chiude perfettamente: l'ingegneria e i sensori tornano a servire la vita quotidiana, con elettrodomestici intelligenti, forni digitali e agricoltura hi-tech per sfornare la pizza perfetta!
      </p>
      <div style="margin-top: 0.55rem; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.45rem; line-height: 1.4;">
        💡 <em>Attenzione Continua:</em> Il ponte smeraldo sfuma direttamente nel giallo della Pizza senza interruzioni, completando l'anello circolare a 360°.
      </div>
    `;
  } else {
    // Tutta la Sfera Interconnessa
    card.innerHTML = `
      <h4>🌐 La Sfera Completa del Linguaggio (360°)</h4>
      <p>
        Tutti i 54 concetti formano una <strong>sfera armonica continua senza vuoti</strong>. Ogni parola è circondata dalle sue affini e collegata a 360°. L'Intelligenza Artificiale naviga attraverso queste sfumature di colore per formulare metafore, ragionamenti e risposte coerenti.
      </p>
    `;
  }
}

// -------------------------------------------------------------------------
// 2A-bis. ROTTE SEGRETE (Caccia al Tesoro dei Significati per Ragazzi)
// -------------------------------------------------------------------------

const secretRoutes = {
  farm: {
    title: '🍕 Rotta 1: Dalla Fattoria alla Pizza',
    sequence: ['Pascolo 🐄', 'Latte 🥛', 'Ciotola 🥣', 'Farina 🥣', 'Pizza 🍕'],
    targetRotY: 0.1,
    targetRotX: 0.25,
    zoom: 14.2,
    bridge: 'orange',
    desc: '🐄 ➔ 🥛 ➔ 🥣 ➔ 🍕<br><strong>Come pensa l\'IA:</strong> La mucca vive nel <em>Pascolo</em> e produce il <em>Latte</em>; il latte si versa nella <em>Ciotola</em> accanto alla <em>Farina</em> con cui il cuoco impasta la <em>Pizza</em>! L\'IA usa questi ponti per comprendere la cucina e gli alimenti.'
  },
  fable: {
    title: '🎬 Rotta 2: Dal Lupo delle Fiabe al Cinema',
    sequence: ['Lupo 🐺', 'Favola 📖', 'Emozione ✨', 'Poesia 🖋️', 'Musica 🎵', 'Cinema 🎬'],
    targetRotY: 2.3,
    targetRotX: 0.15,
    zoom: 14.2,
    bridge: 'magenta',
    desc: '🐺 ➔ 📖 ➔ ✨ ➔ 🖋️ ➔ 🎵 ➔ 🎬<br><strong>Come pensa l\'IA:</strong> La natura selvaggia del <em>Lupo</em> ispira le <em>Favole</em> e l\'<em>Emozione</em>, che diventano <em>Poesia</em> e melodia per la <em>Musica</em> delle grandi colonne sonore del <em>Cinema</em>!'
  },
  cyborg: {
    title: '🦾 Rotta 3: Dal Microchip al Cane Robot',
    sequence: ['Chip ⚡', 'Software 💾', 'Robot 🤖', 'Cane Robot 🦾🐕'],
    targetRotY: 4.6,
    targetRotX: -0.1,
    zoom: 14.2,
    bridge: 'green',
    desc: '⚡ ➔ 💾 ➔ 🤖 ➔ 🦾🐕<br><strong>Come pensa l\'IA:</strong> Dal silicio microscopico del <em>Chip</em> si programma il <em>Software</em> che governa i motori del <em>Robot</em>, fino a creare un vero cucciolo bionico: il <em>Cane Robot</em>!'
  }
};

function activateSecretRoute(routeKey) {
  const route = secretRoutes[routeKey];
  if (!route) return;

  // Aggiorna bottoni attivi
  document.querySelectorAll('.route-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.route === routeKey);
  });
  document.querySelectorAll('.bridge-btn').forEach(b => b.classList.remove('active'));

  // Mostra box info dedicato
  const infoBox = document.getElementById('route-info-box');
  if (infoBox) {
    infoBox.style.display = 'block';
    infoBox.innerHTML = `
      <strong style="color: #fbbf24; font-size: 0.95rem;">${route.title}</strong><br>
      <div style="margin: 0.45rem 0; font-size: 0.84rem; color: #38bdf8; font-weight: 700;">${route.sequence.join(' ➔ ')}</div>
      <div style="font-size: 0.86rem; color: #f1f5f9; line-height: 1.45;">${route.desc}</div>
    `;
  }

  // Ruota e zooma la sfera sul percorso
  highlightBridge(route.bridge);
  mapTargetRotY = route.targetRotY;
  mapTargetRotX = route.targetRotX;
  targetCameraZ = route.zoom;
  const slider = document.getElementById('map-zoom-slider');
  if (slider) slider.value = route.zoom;
}

// -------------------------------------------------------------------------
// 2B. GESTIONE DELLO SWITCH DI REALTÀ: DENTRO LA MACCHINA
//     Confronto tra Sfera 3D, Vettori a 4.096D e Meccanismo di Attenzione
// -------------------------------------------------------------------------

const EMBEDDING_REALITY_VECTORS = {
  pizza: {
    name: 'Pizza 🍕',
    content: `Pizza = [
  dim_0001: +0.8412  // Indice: Commestibile / Cibo
  dim_0002: +0.6520  // Indice: Temperatura elevata / Forno
  dim_0003: +0.4811  // Indice: Cultura italiana / Tradizione
  dim_0004: -0.0120  // Indice: Elettronica / Circuiti
  dim_0005: +0.7203  // Indice: Socialità / Sabato sera
  dim_0006: -0.9210  // Indice: Geologia / Rocce
  dim_0007: +0.3341  // Indice: Lievitazione / Farina
  dim_0008: +0.1504  // Indice: Pomodoro / Salsa
  ... e altre 4.088 coordinate matematiche!
]`
  },
  cane: {
    name: 'Cane 🐶',
    content: `Cane = [
  dim_0001: +0.9125  // Indice: Essere vivente / Zoologia
  dim_0002: +0.8540  // Indice: Animale domestico / Fedeltà
  dim_0003: +0.7310  // Indice: Mammifero a 4 zampe
  dim_0004: -0.8402  // Indice: Elettronica / Circuiti
  dim_0005: +0.6120  // Indice: Affetto familiare / Gioco
  dim_0006: -0.7301  // Indice: Geometria astratta
  dim_0007: +0.5821  // Indice: Istinto / Olfatto acuto
  dim_0008: +0.4200  // Indice: Ciotola / Nutrizione animale
  ... e altre 4.088 coordinate matematiche!
]`
  },
  computer: {
    name: 'Computer 💻',
    content: `Computer = [
  dim_0001: -0.9510  // Indice: Essere vivente / Biologia
  dim_0002: +0.9840  // Indice: Elettronica / Microchip
  dim_0003: +0.9120  // Indice: Calcolo aritmetico / Logica
  dim_0004: +0.8412  // Indice: Schermo / Tastiera / Software
  dim_0005: -0.7840  // Indice: Gusto / Commestibile
  dim_0006: +0.7250  // Indice: Internet / Reti digitali
  dim_0007: +0.6914  // Indice: Intelligenza Artificiale
  dim_0008: -0.8120  // Indice: Bosco / Alberi naturali
  ... e altre 4.088 coordinate matematiche!
]`
  },
  musica: {
    name: 'Musica 🎵',
    content: `Musica = [
  dim_0001: +0.9420  // Indice: Arte / Creatività umana
  dim_0002: +0.8841  // Indice: Onde sonore / Udito
  dim_0003: +0.8120  // Indice: Emozione / Sensibilità
  dim_0004: +0.6725  // Indice: Strumenti (pianoforte, chitarra)
  dim_0005: -0.6510  // Indice: Gusto / Cibo
  dim_0006: +0.5910  // Indice: Teatro / Spettacolo
  dim_0007: +0.4520  // Indice: Matematica armonica / Ritmo
  dim_0008: -0.7810  // Indice: Geologia minerale
  ... e altre 4.088 coordinate matematiche!
]`
  }
};

const ATTENTION_CONTEXTS = {
  finance: {
    route: '🪙 Settore Finanziario (Denaro, Cassaforte, Economia)',
    tags: ['Assegno 📑', 'Versare 💶', 'Conto Corrente 💳', 'Filiale 🏛️']
  },
  river: {
    route: '🌿 Ambiente Naturale (Fiume, Argine, Pesca, Acqua)',
    tags: ['Fiume 🏞️', 'Pesco 🎣', 'Seduto 🪑', 'Argine / Riva 🌿']
  }
};

let realityScreenInitialized = false;

function initRealityScreen() {
  if (realityScreenInitialized) return;
  const btn3D = document.getElementById('btn-mode-3d');
  const btnReality = document.getElementById('btn-mode-reality');
  const mapCanvasContainer = document.getElementById('canvas-map-container');
  const mapHudOverlay = document.getElementById('map-hud-overlay');
  const mapZoomControls = document.getElementById('map-zoom-controls');
  const realityScreen = document.getElementById('reality-screen');

  if (!btn3D || !btnReality || !realityScreen) return;
  realityScreenInitialized = true;

  // Toggle Modalità Sfera 3D <-> Realtà
  btn3D.addEventListener('click', () => {
    btn3D.classList.add('active');
    btnReality.classList.remove('active');
    if (mapCanvasContainer) mapCanvasContainer.style.display = 'block';
    if (mapHudOverlay) mapHudOverlay.style.display = 'flex';
    if (mapZoomControls) mapZoomControls.style.display = 'flex';
    realityScreen.style.display = 'none';
    setTimeout(onWindowResize, 30);
  });

  btnReality.addEventListener('click', () => {
    btnReality.classList.add('active');
    btn3D.classList.remove('active');
    if (mapCanvasContainer) mapCanvasContainer.style.display = 'none';
    if (mapHudOverlay) mapHudOverlay.style.display = 'none';
    if (mapZoomControls) mapZoomControls.style.display = 'none';
    realityScreen.style.display = 'flex';
  });

  // Selettore Chip Vettori
  document.querySelectorAll('.word-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.word-chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wKey = btn.dataset.word;
      const data = EMBEDDING_REALITY_VECTORS[wKey];
      if (data) {
        const titleEl = document.getElementById('term-word-name');
        const codeEl = document.getElementById('term-vector-content');
        if (titleEl) titleEl.textContent = `Vettore di Embedding Reale: ${data.name}`;
        if (codeEl) codeEl.textContent = data.content;
      }
    });
  });

  // Interruttore Contesto (Self-Attention)
  document.querySelectorAll('.att-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.att-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cKey = btn.dataset.context;
      const cData = ATTENTION_CONTEXTS[cKey];
      if (cData) {
        const routeEl = document.getElementById('res-vector-route');
        const tagsContainer = document.getElementById('res-tags');
        if (routeEl) routeEl.textContent = cData.route;
        if (tagsContainer) {
          tagsContainer.innerHTML = cData.tags.map(t => `<span class="r-tag">${t}</span>`).join('');
        }
      }
    });
  });
}


// =========================================================================
// 3. L'ADDESTRAMENTO CON IL TESTO BUCATO (Disposizione spaziale ad arco arioso)
//    Base Blu a (-0.5, -1.2, 0) | Giallo alzato in alto a (0.5, 2.8, 0)
// =========================================================================

let tScene, tCamera, tRenderer;
let trainingSceneInitialized = false;
let trainingAntenna;
let targetSpheres = {};
let currentTrainStep = 1; // 1 | 2 | 3

const baseNeuronPos = new THREE.Vector3(-0.5, -1.2, 0);

const trainingStories = {
  pasta: {
    id: 'pasta',
    title: '🍝 1. A Tavola con la Pasta',
    sentence: '« Oggi a pranzo ho mangiato un gustoso piatto di <span class="cloze-blank" id="cloze-slot">... ?</span> »',
    steps: {
      1: {
        word: 'GALASSIA 🌌',
        colorClass: 'red',
        pos: new THREE.Vector3(-4.5, -2.5, 0),
        colorHex: 0xf43f5e,
        title: '🔴 Inizio: Scelta Fuori Tema',
        desc: 'L\'antenna punta su "Galassia 🌌" (Zero senso col cibo! Errore totale).',
        log: '❌ <strong>Passo 1 (Errore buffo!):</strong> «Ho mangiato un piatto di GALASSIA». Il neurone punta a caso nello spazio! Errore madornale (-100 punti). L\'antenna riceve una correzione e ruota verso il cibo.'
      },
      2: {
        word: 'PIETANZE 🍲',
        colorClass: 'yellow',
        pos: new THREE.Vector3(0.5, 2.8, 0),
        colorHex: 0xfbbf24,
        title: '🟡 Correzione: Scelta Astratta',
        desc: 'L\'antenna ruota su "Pietanze 🍲" (È cibo, ma nessuno dice "un piatto di pietanze"!).',
        log: '⚠️ <strong>Passo 2 (Fuocherello!):</strong> «Ho mangiato un piatto di PIETANZE». Più vicino! È cibo, ma è una parola generica e robotica. Nessun umano direbbe così: serve un\'altra correzione.'
      },
      3: {
        word: 'SPAGHETTI 🍝',
        colorClass: 'green',
        pos: new THREE.Vector3(4.8, 2.0, 0),
        colorHex: 0x34d399,
        title: '🟢 Bersaglio: Scelta Naturale',
        desc: 'L\'antenna si aggancia su "Spaghetti 🍝" (Preciso, appetitoso e naturale al 100%).',
        log: '🎯 <strong>Passo 3 (Bersaglio Centrato al 100%!):</strong> «Ho mangiato un gustoso piatto di SPAGHETTI». Perfetto, naturale e appetitoso! Errore azzerato: l\'addestramento è completato con successo!'
      }
    }
  },
  dragon: {
    id: 'dragon',
    title: '🐉 2. La Sfida del Drago',
    sentence: '« Il valoroso cavaliere estrasse la spada per affrontare il <span class="cloze-blank" id="cloze-slot">... ?</span> »',
    steps: {
      1: {
        word: 'TIRAMISÙ 🍰',
        colorClass: 'red',
        pos: new THREE.Vector3(-4.5, -2.5, 0),
        colorHex: 0xf43f5e,
        title: '🔴 Inizio: Scelta Buffa',
        desc: 'L\'antenna punta su "Tiramisù 🍰" (La spada non serve per il dolce!).',
        log: '❌ <strong>Passo 1 (Errore buffo!):</strong> «Estrarre la spada per affrontare il TIRAMISÙ». Nessun cavaliere combatte un dolce! Il neurone era confuso tra armi e forchette.'
      },
      2: {
        word: 'ANIMALE 🐾',
        colorClass: 'yellow',
        pos: new THREE.Vector3(0.5, 2.8, 0),
        colorHex: 0xfbbf24,
        title: '🟡 Correzione: Scelta Generica',
        desc: 'L\'antenna ruota su "Animale 🐾" (È un essere vivente, ma poco fiabesco!).',
        log: '⚠️ <strong>Passo 2 (Fuocherello!):</strong> «Per affrontare l\'ANIMALE». Categoria giusta (è un essere vivente), ma è generico: non crea suspence in una fiaba medievale!'
      },
      3: {
        word: 'DRAGO 🐉',
        colorClass: 'green',
        pos: new THREE.Vector3(4.8, 2.0, 0),
        colorHex: 0x34d399,
        title: '🟢 Bersaglio: Scelta Epica',
        desc: 'L\'antenna si aggancia su "Drago 🐉" (Perfetto, leggendario e sputafuoco!).',
        log: '🎯 <strong>Passo 3 (Bersaglio Centrato al 100%!):</strong> «Per affrontare il DRAGO». Epico, maestoso e perfettamente adatto al contesto cavalleresco!'
      }
    }
  },
  space: {
    id: 'space',
    title: '🔴 3. Destinazione Marte',
    sentence: '« L\'astronauta salì a bordo del razzo diretto verso <span class="cloze-blank" id="cloze-slot">... ?</span> »',
    steps: {
      1: {
        word: 'FORCHETTA 🍴',
        colorClass: 'red',
        pos: new THREE.Vector3(-4.5, -2.5, 0),
        colorHex: 0xf43f5e,
        title: '🔴 Inizio: Rotta Sbagliata',
        desc: 'L\'antenna punta su "Forchetta 🍴" (Cosa c\'entra nello spazio siderale?!).',
        log: '❌ <strong>Passo 1 (Errore buffo!):</strong> «Un razzo diretto verso FORCHETTA». Una posata nello spazio profondo? Errore di rotta totale!'
      },
      2: {
        word: 'SASSO 🪨',
        colorClass: 'yellow',
        pos: new THREE.Vector3(0.5, 2.8, 0),
        colorHex: 0xfbbf24,
        title: '🟡 Correzione: Oggetto Spaziale Astratto',
        desc: 'L\'antenna ruota su "Sasso 🪨" (Gli asteroidi sono rocce, ma non una meta!).',
        log: '⚠️ <strong>Passo 2 (Fuocherello!):</strong> «Diretto verso SASSO». Nello spazio ci sono asteroidi rocciosi, ma non sono una meta ambita per una missione con equipaggio!'
      },
      3: {
        word: 'MARTE 🔴',
        colorClass: 'green',
        pos: new THREE.Vector3(4.8, 2.0, 0),
        colorHex: 0x34d399,
        title: '🟢 Bersaglio: Pianeta Rosso',
        desc: 'L\'antenna si aggancia su "Marte 🔴" (Precisione astronomica al 100%).',
        log: '🎯 <strong>Passo 3 (Bersaglio Centrato al 100%!):</strong> «Diretto verso MARTE». Il Pianeta Rosso! Precisione astronomica, rotta memorizzata nel neurone con successo!'
      }
    }
  }
};

let currentTrainingStory = 'pasta';

function initTrainingScene() {
  const container = document.getElementById('canvas-training-container');
  if (!container || trainingSceneInitialized) return;
  trainingSceneInitialized = true;

  const w = container.clientWidth || 500;
  const h = container.clientHeight || 500;

  tScene = new THREE.Scene();
  tScene.background = new THREE.Color(0x050711);

  tCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  tCamera.position.set(0, 0, 14);

  tRenderer = new THREE.WebGLRenderer({ antialias: true });
  tRenderer.setSize(w, h);
  tRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(tRenderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 0.5);
  tScene.add(light);
  const pLight = new THREE.PointLight(0xffffff, 1.5, 25);
  pLight.position.set(0, 4, 8);
  tScene.add(pLight);

  const baseGeo = new THREE.SphereGeometry(1.0, 24, 24);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.8
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.copy(baseNeuronPos);
  tScene.add(baseMesh);

  const story = trainingStories[currentTrainingStory];
  const initDir = story.steps[1].pos.clone().sub(baseNeuronPos).normalize();
  trainingAntenna = new THREE.ArrowHelper(initDir, baseNeuronPos, 3.6, 0xf43f5e, 0.8, 0.4);
  tScene.add(trainingAntenna);

  targetSpheres.galassia = createLabeledTargetSphere(story.steps[1].pos, 0xf43f5e, 0.75);
  targetSpheres.pietanze = createLabeledTargetSphere(story.steps[2].pos, 0xfbbf24, 0.85);
  targetSpheres.spaghetti = createLabeledTargetSphere(story.steps[3].pos, 0x34d399, 1.1);

  // Inizializza selettore storie
  document.querySelectorAll('.story-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTrainingStory(btn.dataset.story);
    });
  });

  animateTraining();
  goToTrainingStep(1);
}

function createLabeledTargetSphere(pos, colorHex, radius) {
  const geo = new THREE.SphereGeometry(radius, 20, 20);
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.6,
    roughness: 0.3
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(pos);
  tScene.add(mesh);

  const glowGeo = new THREE.SphereGeometry(radius * 1.3, 12, 12);
  const glowMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true, transparent: true, opacity: 0.35 });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  mesh.add(glow);

  return mesh;
}

function animateTraining() {
  requestAnimationFrame(animateTraining);
  if (targetSpheres.spaghetti) {
    targetSpheres.spaghetti.rotation.y += 0.01;
  }
  if (targetSpheres.pietanze) {
    targetSpheres.pietanze.rotation.y += 0.008;
  }
  tRenderer.render(tScene, tCamera);
}

function goToTrainingStep(stepNum) {
  currentTrainStep = stepNum;
  const story = trainingStories[currentTrainingStory] || trainingStories.pasta;
  const sData = story.steps[stepNum];

  if (trainingAntenna) {
    const newDir = sData.pos.clone().sub(baseNeuronPos).normalize();
    trainingAntenna.setDirection(newDir);
    trainingAntenna.setColor(sData.colorHex);
  }

  const slot = document.getElementById('cloze-slot');
  if (slot) {
    slot.textContent = sData.word;
    slot.className = `cloze-blank ${sData.colorClass}`;
  }

  [1, 2, 3].forEach(i => {
    document.getElementById(`step-ui-${i}`)?.classList.toggle('active', i === stepNum);
  });

  const logEl = document.getElementById('training-log');
  if (logEl) logEl.innerHTML = sData.log;
}

function switchTrainingStory(storyKey) {
  currentTrainingStory = storyKey;
  const story = trainingStories[storyKey];
  if (!story) return;

  // Aggiorna bottoni pill attivi
  document.querySelectorAll('.story-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.story === storyKey);
  });

  // Aggiorna frase mostrata
  const display = document.getElementById('cloze-display');
  if (display) display.innerHTML = story.sentence;

  // Aggiorna titoli e descrizioni dei 3 passi
  [1, 2, 3].forEach(i => {
    const s = story.steps[i];
    const tEl = document.getElementById(`step-${i}-title`);
    const dEl = document.getElementById(`step-${i}-desc`);
    if (tEl) tEl.textContent = s.title;
    if (dEl) dEl.textContent = s.desc;
  });

  goToTrainingStep(1);
}

document.getElementById('btn-train-single')?.addEventListener('click', () => {
  const next = currentTrainStep < 3 ? currentTrainStep + 1 : 1;
  goToTrainingStep(next);
});

document.getElementById('btn-train-full')?.addEventListener('click', () => {
  let step = 1;
  goToTrainingStep(1);
  const timer = setInterval(() => {
    step++;
    if (step <= 3) {
      goToTrainingStep(step);
    } else {
      clearInterval(timer);
    }
  }, 900);
});

document.getElementById('btn-train-reset')?.addEventListener('click', () => {
  goToTrainingStep(1);
});


// =========================================================================
// 4. L'ORCHESTRA 3D DI CHATGPT & LA SCATOLA DELLE PAROLE
//    Stato iniziale di Standby, Scatola delle parole reattiva,
//    Fasci laser sequenziali e verdetto a 3 giudici
// =========================================================================

let oScene, oCamera, oRenderer, oGroup;
let oMouseIsDown = false, oPrevMouseX = 0, oPrevMouseY = 0;
let oTargetRotX = 0.1, oTargetRotY = 0.0;
let oCurrentRotX = 0.1, oCurrentRotY = 0.0;
let orchestraSceneInitialized = false;

let judgeMeshes = {};
let oJudgeSprites = {};
let oTargetMesh = null;
let oTargetAura = null;
let oTargetSprite = null;
let energyBeams = [];
let orchestraTimeouts = [];
let currentOrchestraCandKey = null;

// Vocabolario e Scenari Determinato della Scatola delle Parole (Per Ragazzi)
const orchestraScenarios = {
  winter: {
    id: 'winter',
    name: '🍲 Inverno Gelido',
    sentence: '« Dopo una giornata di pioggia gelida, che gioia sedersi a tavola e scaldarsi con una bella <span class="orchestra-target standby" id="orchestra-target-word">[ ... ? ]</span> »',
    judges: {
      cibo: { name: 'Giudice Cibo (Giallo)', label: '🟡 CIBO', color: 0xfbbf24, role: 'Pietanza commestibile adatta alla tavola' },
      emo: { name: 'Giudice Emozione (Rosso)', label: '🔴 EMOZIONE', color: 0xf43f5e, role: 'Scalda e toglie il gelo' },
      gram: { name: 'Giudice Grammatica (Blu)', label: '🔵 GRAMMATICA', color: 0x38bdf8, role: 'Femminile singolare ("una bella")' }
    },
    chipGroups: [
      {
        label: '🟢 Consenso Unanime (Cibi Caldi):',
        color: 'green',
        words: [
          { key: 'zuppa', label: '🍲 Zuppa' },
          { key: 'cioccolata', label: '☕ Cioccolata' },
          { key: 'tisana', label: '🍵 Tisana' }
        ]
      },
      {
        label: '🔴 Veto Grammatica (Falsi Amici Maschili):',
        color: 'red',
        words: [
          { key: 'minestrone', label: '🥣 Minestrone' },
          { key: 'brodo', label: '🍲 Brodo' },
          { key: 'te', label: '🫖 Tè' }
        ]
      },
      {
        label: '❄️ Veto Emozione (Freddo Incongruente):',
        color: 'cyan',
        words: [
          { key: 'granita', label: '🍧 Granita' },
          { key: 'insalata', label: '🥗 Insalata' },
          { key: 'gelato', label: '🍦 Gelato' }
        ]
      },
      {
        label: '🧣 Veto Cibo (Scalda ma non si mangia a tavola):',
        color: 'purple',
        words: [
          { key: 'coperta', label: '🧣 Coperta' },
          { key: 'doccia', label: '🚿 Doccia' }
        ]
      },
      {
        label: '🌌 Fuori Contesto Totale:',
        color: 'gray',
        words: [
          { key: 'galassia', label: '🌌 Galassia' }
        ]
      }
    ],
    vocabulary: {
      zuppa: {
        word: 'Zuppa 🍲', label: 'ZUPPA 🍲', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Pietanza commestibile calda e gustosa' },
        emoVote: { val: '+10', pass: true, text: 'Confortante e perfetta contro il gelo' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella zuppa»' },
        narrative: 'Tutti e 3 i fasci laser 3D convergono all\'unisono sulla sfera! Parola perfetta: calore semantico, accordo emotivo e concordanza grammaticale impeccabile.'
      },
      cioccolata: {
        word: 'Cioccolata ☕', label: 'CIOCCOLATA ☕', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Bevanda densa dolce ed energetica' },
        emoVote: { val: '+10', pass: true, text: 'Calda e corroborante dopo il freddo' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella cioccolata»' },
        narrative: 'Consenso pieno dei 3 giudici: il piacere del gusto, la risposta al freddo e la concordanza femminile creano una scarica di probabilità massima!'
      },
      tisana: {
        word: 'Tisana 🍵', label: 'TISANA 🍵', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Infuso caldo commestibile' },
        emoVote: { val: '+10', pass: true, text: 'Bollente e ideale per scaldarsi' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella tisana»' },
        narrative: 'Fasci convergenti senza ostacoli! Anche per «tisana» tutti e 3 i giudici votano a favore: la parola viene approvata all\'unanimità.'
      },
      minestrone: {
        word: 'Minestrone 🥣', label: 'MINESTRONE 🥣', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Ottimo cibo caldo per scaldarsi' },
        emoVote: { val: '+10', pass: true, text: 'Dona calore immediato contro la pioggia' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («una bella minestrone» è errore)' },
        narrative: 'I fasci del Cibo (Giallo) e dell\'Emozione (Rosso) arrivano a destinazione, ma il fascio del Giudice Grammatica (Blu) si spezza a metà in una barriera di sbarramento rossa! In italiano è «un bel minestrone», non «una bella»: parola scartata!'
      },
      brodo: {
        word: 'Brodo 🍲', label: 'BRODO 🍲', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Piatto caldo fumante della tradizione' },
        emoVote: { val: '+10', pass: true, text: 'Scalda a fondo corpo e spirito' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («una bella brodo» è errato)' },
        narrative: 'Ideale contro la pioggia gelida, ma la concordanza morfosintattica dell\'articolo «una bella» fallisce. Il neurone della grammatica blocca l\'attivazione.'
      },
      te: {
        word: 'Tè 🫖', label: 'TÈ 🫖', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Bevanda corroborante calda' },
        emoVote: { val: '+10', pass: true, text: 'Confortevole e rilassante nel freddo' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un bel tè», non «una bella»)' },
        narrative: 'Il fascio della Grammatica non raggiunge la sfera: l\'accordo al femminile viene violato, impedendo a ChatGPT di generare questa scelta.'
      },
      granita: {
        word: 'Granita 🍧', label: 'GRANITA 🍧', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '❄️ BOCCIATO PER CONTRADDIZIONE EMOTIVA! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'È un dolce/alimento commestibile' },
        emoVote: { val: '-10', pass: false, text: 'VETO: È GHIACCIATA! Contrasto totale con pioggia e freddo' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella granita»' },
        narrative: 'Grammatica e Cibo approvano, ma il fascio del Giudice Emozione si spezza in un muro di ghiaccio: dopo una pioggia gelida, proporre una granita è un contrasto semantico inaccettabile!'
      },
      insalata: {
        word: 'Insalata 🥗', label: 'INSALATA 🥗', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '❄️ BOCCIATO PER MANCANZA DI CALORE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Alimento fresco e commestibile' },
        emoVote: { val: '-10', pass: false, text: 'VETO: È FREDDA! Non serve a scaldarsi' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella insalata»' },
        narrative: 'L\'insalata è femminile ed è cibo, ma il testo richiede esplicitamente l\'azione di «scaldarsi». Il Giudice Emozione rifiuta di accendersi.'
      },
      gelato: {
        word: 'Gelato 🍦', label: 'GELATO 🍦', score: '-12', totalScoreNum: -12, statusType: 'veto',
        verdictTitle: '⛔ DOPPIO VETO (EMOZIONE + GRAMMATICA)! (-12 Punti)',
        ciboVote: { val: '+8', pass: true, text: 'È un alimento dolce commestibile' },
        emoVote: { val: '-10', pass: false, text: 'VETO: È FREDDO CONGELATO!' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un bel gelato»)' },
        narrative: 'Solo il Giudice Cibo lancia un flebile raggio. Gli altri due giudici alzano un doppio sbarramento: è ghiacciato ed è maschile. Punteggio negativo, la parola rimane spenta!'
      },
      coperta: {
        word: 'Coperta 🧣', label: 'COPERTA 🧣', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🧣 BOCCIATO DAL GIUDICE CIBO! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: NON È CIBO! Non si consuma a tavola' },
        emoVote: { val: '+10', pass: true, text: 'Dona calore e sollievo immediato' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella coperta»' },
        narrative: '«Una bella coperta» è ottima contro il freddo ed è grammaticalmente corretta, ma il fascio del Giudice Cibo si spezza: il contesto specifica «sedersi a tavola», quindi l\'attenzione semantica esige una pietanza o bevanda commestibile!'
      },
      doccia: {
        word: 'Doccia 🚿', label: 'DOCCIA 🚿', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🚿 BOCCIATO DAL GIUDICE CIBO! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: NON È CIBO! Non è una portata da tavola' },
        emoVote: { val: '+10', pass: true, text: 'Bollente e perfetta per togliere il freddo' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare: «una bella doccia»' },
        narrative: 'Una doccia calda toglie il gelo, ma non si consuma a tavola: il neurone culinario alza immediatamente il suo sbarramento di veto.'
      },
      galassia: {
        word: 'Galassia 🌌', label: 'GALASSIA 🌌', score: '0', totalScoreNum: 0, statusType: 'neutral',
        verdictTitle: '🌌 ZERO RISONANZA (FUORI TEMA)! (0 Punti)',
        ciboVote: { val: '0', pass: false, text: 'Nessuna relazione culinaria' },
        emoVote: { val: '0', pass: false, text: 'Nessuna relazione col calore' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'Nessuna affinità semantica o termica con la frase. Solo la concordanza morfologica è valida, ma la frase non riceve carica: l\'orchestra tace.'
      }
    }
  },
  wizard: {
    id: 'wizard',
    name: '🧙 La Torre del Mago',
    sentence: '« Nella torre antica il vecchio mago preparò con cura una potente <span class="orchestra-target standby" id="orchestra-target-word">[ ... ? ]</span> »',
    judges: {
      cibo: { name: 'Giudice Magia (Viola)', label: '🔮 MONDO MAGICO', color: 0xc084fc, role: 'Alchimia, incantesimi e arti magiche' },
      emo: { name: 'Giudice Mistero (Rosso)', label: '🌙 MISTERO', color: 0xf43f5e, role: 'Tono epico, solenne e antico' },
      gram: { name: 'Giudice Grammatica (Blu)', label: '🔵 GRAMMATICA', color: 0x38bdf8, role: 'Femminile singolare ("una potente")' }
    },
    chipGroups: [
      {
        label: '🟢 Consenso Unanime (Magie Femminili):',
        color: 'green',
        words: [
          { key: 'pozione', label: '🧪 Pozione' },
          { key: 'formula', label: '📜 Formula' },
          { key: 'pergamena', label: '📜 Pergamena' }
        ]
      },
      {
        label: '🔴 Veto Grammatica (Magie Maschili):',
        color: 'red',
        words: [
          { key: 'incantesimo', label: '🪄 Incantesimo' },
          { key: 'sortilegio', label: '🔮 Sortilegio' },
          { key: 'rituale', label: '🕯️ Rituale' }
        ]
      },
      {
        label: '☕ Veto Magia (Troppo Banali per uno Stregone):',
        color: 'cyan',
        words: [
          { key: 'tisana', label: '🍵 Tisana' },
          { key: 'zuppa', label: '🍲 Zuppa' }
        ]
      },
      {
        label: '🗡️ Veto Oggetto (Un Mago non è un Fabbro):',
        color: 'purple',
        words: [
          { key: 'spada', label: '🗡️ Spada' },
          { key: 'corazza', label: '🛡️ Corazza' }
        ]
      },
      {
        label: '🌌 Fuori Contesto Totale:',
        color: 'gray',
        words: [
          { key: 'galassia', label: '🌌 Galassia' }
        ]
      }
    ],
    vocabulary: {
      pozione: {
        word: 'Pozione 🧪', label: 'POZIONE 🧪', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Preparato alchemico magico autentico' },
        emoVote: { val: '+10', pass: true, text: 'Misteriosa e adatta al vecchio mago' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una potente pozione»' },
        narrative: 'Tutti e 3 i fasci laser convergono sul bersaglio! È magica, epica e grammaticalmente perfetta: ChatGPT la sceglie al 99%!'
      },
      formula: {
        word: 'Formula 📜', label: 'FORMULA 📜', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Parole arcane e misteriose' },
        emoVote: { val: '+10', pass: true, text: 'Potente e sapiente' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una potente formula»' },
        narrative: 'Consenso pieno! Preparare una potente formula magica rispetta tutti i vincoli dell\'orchestra neurale.'
      },
      pergamena: {
        word: 'Pergamena 📜', label: 'PERGAMENA 📜', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Supporto antico per incantesimi' },
        emoVote: { val: '+10', pass: true, text: 'Atmosfera antica e solenne' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una potente pergamena»' },
        narrative: 'Tutti i 3 giudici concordano: la pergamena si prepara con cura e si adatta alla torre antica.'
      },
      incantesimo: {
        word: 'Incantesimo 🪄', label: 'INCANTESIMO 🪄', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Magia purissima da stregone' },
        emoVote: { val: '+10', pass: true, text: 'Perfetto per il tono della frase' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un potente incantesimo»)' },
        narrative: 'Il significato è ottimo, ma in italiano diciamo «un potente incantesimo», non «una potente»! Il Giudice Grammatica alza la barriera di sbarramento!'
      },
      sortilegio: {
        word: 'Sortilegio 🔮', label: 'SORTILEGIO 🔮', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Atto magico potente' },
        emoVote: { val: '+10', pass: true, text: 'Misterioso e oscuro' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un potente sortilegio»)' },
        narrative: 'Parola fantastica ma grammaticalmente incompatibile: il fascio blu si spezza a metà tragitto!'
      },
      rituale: {
        word: 'Rituale 🕯️', label: 'RITUALE 🕯️', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Azione magica e solenne' },
        emoVote: { val: '+10', pass: true, text: 'Atmosfera di mistero nella torre' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un potente rituale»)' },
        narrative: 'Anche qui la grammatica impone il veto maschile: parola scartata dalla selezione.'
      },
      tisana: {
        word: 'Tisana 🍵', label: 'TISANA 🍵', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🍵 BOCCIATO DAL GIUDICE MAGIA! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: NON È MAGIA! È un rimedio casalingo per la gola' },
        emoVote: { val: '+10', pass: true, text: 'Scalda e rilassa' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una potente tisana»' },
        narrative: 'Una tisana farà bene contro l\'influenza, ma nella torre di un mago antico non evoca incantesimi: il Giudice del Mondo Magico alza il veto!'
      },
      zuppa: {
        word: 'Zuppa 🍲', label: 'ZUPPA 🍲', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🍲 BOCCIATO DAL GIUDICE MAGIA! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: È CIBO, NON MAGIA!' },
        emoVote: { val: '+10', pass: true, text: 'Calda e sostanziosa' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'Il mago forse avrà fame, ma una «potente zuppa» è un controsenso in una storia fantasy epica!'
      },
      spada: {
        word: 'Spada 🗡️', label: 'SPADA 🗡️', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🗡️ BOCCIATO: IL MAGO NON È UN FABBRO! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: ARMA METALLICA! Si forgia nell\'armeria, non si prepara con cura alchemica' },
        emoVote: { val: '+10', pass: true, text: 'Epica e potente' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una potente spada»' },
        narrative: 'Le spade le usano i cavalieri e le battono i fabbri. L\'azione «preparò con cura nella torre» richiede alchimia o magia spirituale!'
      },
      corazza: {
        word: 'Corazza 🛡️', label: 'CORAZZA 🛡️', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🛡️ BOCCIATO: NON ADATTO AD UN MAGO! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: ARMATURA DIFENSIVA! Non è arte magica' },
        emoVote: { val: '+10', pass: true, text: 'Resistente e forte' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'Un mago indossa tuniche e usa bastoni magici: la corazza appartiene al mondo dei guerrieri.'
      },
      galassia: {
        word: 'Galassia 🌌', label: 'GALASSIA 🌌', score: '0', totalScoreNum: 0, statusType: 'neutral',
        verdictTitle: '🌌 ZERO RISONANZA (0 Punti)',
        ciboVote: { val: '0', pass: false, text: 'Nessuna relazione con la pozione del mago' },
        emoVote: { val: '0', pass: false, text: 'Troppo distante' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'Nessun legame logico o semantico: silenzio totale.'
      }
    }
  },
  soccer: {
    id: 'soccer',
    name: '⚽ La Partita Decisiva',
    sentence: '« Al novantesimo minuto il capitano calciò forte segnando una splendida <span class="orchestra-target standby" id="orchestra-target-word">[ ... ? ]</span> »',
    judges: {
      cibo: { name: 'Giudice Azione Sportiva (Verde)', label: '⚽ AZIONE GOL', color: 0x10b981, role: 'Calcio, tiri e azioni da rete' },
      emo: { name: 'Giudice Vittoria (Ambra)', label: '🏆 VITTORIA', color: 0xf59e0b, role: 'Trionfo, entusiasmo e gioia allo stadio' },
      gram: { name: 'Giudice Grammatica (Blu)', label: '🔵 GRAMMATICA', color: 0x38bdf8, role: 'Femminile singolare ("una splendida")' }
    },
    chipGroups: [
      {
        label: '🟢 Consenso Unanime (Termini di Gol Femminili):',
        color: 'green',
        words: [
          { key: 'rete', label: '🥅 Rete' },
          { key: 'doppietta', label: '⚽ Doppietta' },
          { key: 'marcatura', label: '🎯 Marcatura' }
        ]
      },
      {
        label: '🔴 Veto Grammatica (Falsi Amici Maschili nel Calcio):',
        color: 'red',
        words: [
          { key: 'gol', label: '⚽ Gol' },
          { key: 'rigore', label: '🥅 Rigore' },
          { key: 'tiro', label: '👟 Tiro' }
        ]
      },
      {
        label: '🧤 Veto Azione (Ruoli Sbagliati in Partita):',
        color: 'cyan',
        words: [
          { key: 'parata', label: '🧤 Parata' },
          { key: 'ammonizione', label: '🟨 Ammonizione' }
        ]
      },
      {
        label: '🍕 Veto Calcio (Cose che non si segnano in porta):',
        color: 'purple',
        words: [
          { key: 'pizza', label: '🍕 Pizza' },
          { key: 'macchina', label: '🚗 Macchina' }
        ]
      },
      {
        label: '🌌 Fuori Contesto Totale:',
        color: 'gray',
        words: [
          { key: 'galassia', label: '🌌 Galassia' }
        ]
      }
    ],
    vocabulary: {
      rete: {
        word: 'Rete 🥅', label: 'RETE 🥅', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Segnare a rete è il culmine del calcio!' },
        emoVote: { val: '+10', pass: true, text: 'Apoteosi di gioia al 90° minuto' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una splendida rete»' },
        narrative: 'Tutti e 3 i fasci convergono al massimo splendore! «Segnare una splendida rete» è l\'espressione perfetta e più usata dai telecronisti!'
      },
      doppietta: {
        word: 'Doppietta ⚽', label: 'DOPPIETTA ⚽', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Due gol segnati dallo stesso giocatore!' },
        emoVote: { val: '+10', pass: true, text: 'Trionfo epico al novantesimo minuto' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una splendida doppietta»' },
        narrative: 'Punteggio pieno (+30)! L\'accordo sportivo ed emotivo è al 100%.'
      },
      marcatura: {
        word: 'Marcatura 🎯', label: 'MARCATURA 🎯', score: '+30', totalScoreNum: 30, statusType: 'consensus',
        verdictTitle: '🟢 CONSENSO UNANIME! (+30 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Termine tecnico per il gol segnato' },
        emoVote: { val: '+10', pass: true, text: 'Decisivo per vincere la partita' },
        gramVote: { val: '+10', pass: true, text: 'Femminile: «una splendida marcatura»' },
        narrative: 'L\'orchestra approva: termine calcistico corretto e grammaticalmente perfetto.'
      },
      gol: {
        word: 'Gol ⚽', label: 'GOL ⚽', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'È il gol decisivo al 90°!' },
        emoVote: { val: '+10', pass: true, text: 'Tripudio allo stadio' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («uno splendido gol», non «una splendida»)' },
        narrative: 'La parola più ovvia nel calcio viene bocciata dalla grammatica! In italiano «gol» è maschile: dire «una splendida gol» è un errore marchiano. Il Giudice Blu spezza il fascio!'
      },
      rigore: {
        word: 'Rigore 🥅', label: 'RIGORE 🥅', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Tiro dagli undici metri' },
        emoVote: { val: '+10', pass: true, text: 'Tensione al novantesimo minuto' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un rigore»)' },
        narrative: 'Il rigore è maschile, quindi la concordanza con «una splendida» fallisce irrimediabilmente.'
      },
      tiro: {
        word: 'Tiro 👟', label: 'TIRO 👟', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🔴 BOCCIATO DAL VETO GRAMMATICALE! (+10 Punti)',
        ciboVote: { val: '+10', pass: true, text: 'Azione di calciare il pallone' },
        emoVote: { val: '+10', pass: true, text: 'Forza e decisione' },
        gramVote: { val: '-10', pass: false, text: 'VETO: È MASCHILE! («un tiro»)' },
        narrative: 'Incompatibile con l\'articolo femminile «una bella / splendida». Parola scartata.'
      },
      parata: {
        word: 'Parata 🧤', label: 'PARATA 🧤', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🧤 BOCCIATO: IL CAPITANO HA SEGNATO, NON PARATO! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: AZIONE DEL PORTIERE! Chi calcia in attacco non può "segnare una parata"' },
        emoVote: { val: '+10', pass: true, text: 'Momento spettacolare' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'La parata la fa il portiere avversario! Il testo dice «calciò segnando...», quindi un giocatore non può "segnare una parata": il Giudice dell\'Azione Sportiva blocca il laser!'
      },
      ammonizione: {
        word: 'Ammonizione 🟨', label: 'AMMONIZIONE 🟨', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🟨 BOCCIATO: NON SI SEGNA UN CARTELLINO! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: SANZIONE DELL\'ARBITRO! Non è un gol' },
        emoVote: { val: '-10', pass: false, text: 'Fallo o protesta negativa' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'L\'ammonizione è un cartellino dell\'arbitro, non un gol da esultare al novantesimo: l\'orchestra alza doppio veto.'
      },
      pizza: {
        word: 'Pizza 🍕', label: 'PIZZA 🍕', score: '+10', totalScoreNum: 10, statusType: 'veto',
        verdictTitle: '🍕 BOCCIATO DAL GIUDICE DELLO SPORT! (+10 Punti)',
        ciboVote: { val: '-10', pass: false, text: 'VETO: NON È UN\'AZIONE DA GOL! Non si segna una pizza' },
        emoVote: { val: '+10', pass: true, text: 'Buona dopo la partita tra amici' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'La pizza è squisita dopo il match con i compagni di squadra, ma non si calcia dentro la porta da calcio!'
      },
      macchina: {
        word: 'Macchina 🚗', label: 'MACCHINA 🚗', score: '0', totalScoreNum: 0, statusType: 'neutral',
        verdictTitle: '🚗 ZERO RISONANZA NEL CALCIO (0 Punti)',
        ciboVote: { val: '0', pass: false, text: 'Nessun legame con la rete di calcio' },
        emoVote: { val: '0', pass: false, text: 'Fuori contesto sportivo' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'Un veicolo non ha alcuna parentela con l\'azione di gioco: l\'orchestra non si attiva.'
      },
      galassia: {
        word: 'Galassia 🌌', label: 'GALASSIA 🌌', score: '0', totalScoreNum: 0, statusType: 'neutral',
        verdictTitle: '🌌 ZERO RISONANZA (0 Punti)',
        ciboVote: { val: '0', pass: false, text: 'Spazio profondo' },
        emoVote: { val: '0', pass: false, text: 'Nessun legame con lo stadio' },
        gramVote: { val: '+10', pass: true, text: 'Femminile singolare' },
        narrative: 'Le stelle non giocano a calcio: zero probabilità.'
      }
    }
  }
};

let currentScenarioKey = 'winter';
let currentTemperature = 0.7;

function getCurrentVocabulary() {
  const scen = orchestraScenarios[currentScenarioKey] || orchestraScenarios.winter;
  return scen.vocabulary;
}

// Fallback per parole libere digitate non presenti nel vocabolario
function getCustomWordData(customWord) {
  const clean = customWord.trim();
  return {
    word: clean,
    label: clean.toUpperCase(),
    category: 'Fuori Vocabolario',
    score: '0',
    totalScoreNum: 0,
    statusType: 'neutral',
    verdictTitle: `🔍 PAROLA SCONOSCIUTA O A PROBABILITÀ ZERO (0 Punti)`,
    ciboVote: { val: '0', pass: false, text: 'Nessuna attivazione nei pesi del neurone Cibo' },
    emoVote: { val: '0', pass: false, text: 'Nessun vettore di risonanza per il Calore' },
    gramVote: { val: '?', pass: false, text: 'Regola di accordo non calcolata' },
    narrative: `La parola «${clean}» non genera sufficiente risonanza con i pesi sinaptici addestrati su questa frase. In ChatGPT, le parole con probabilità prossima allo zero vengono scartate ancor prima della generazione finale!`
  };
}

// Inizializzazione Scena Orchestra 3D
function initOrchestraScene() {
  const container = document.getElementById('canvas-orchestra-container');
  if (!container || orchestraSceneInitialized) return;
  orchestraSceneInitialized = true;

  const w = container.clientWidth || 600;
  const h = container.clientHeight || 500;

  oScene = new THREE.Scene();
  oScene.background = new THREE.Color(0x04060d);

  oCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  oCamera.position.set(0, 0.9, 15.0);

  oRenderer = new THREE.WebGLRenderer({ antialias: true });
  oRenderer.setSize(w, h);
  oRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(oRenderer.domElement);

  oGroup = new THREE.Group();
  oScene.add(oGroup);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.65);
  oScene.add(ambLight);

  // 1. I 3 NEURONI GIUDICI (In alto): Giallo (Cibo), Rosso (Emozione), Blu (Grammatica)
  //    Simmetria perfetta rispetto al centro ottico (Y: 0.9)
  const posCibo = new THREE.Vector3(-3.8, 2.4, 0);
  const posEmo = new THREE.Vector3(0, 3.2, 0);
  const posGram = new THREE.Vector3(3.8, 2.4, 0);

  judgeMeshes.cibo = createJudgeNeuron(posCibo, 0xfbbf24); // Giallo 🟡
  judgeMeshes.emo = createJudgeNeuron(posEmo, 0xf43f5e);   // Rosso 🔴
  judgeMeshes.gram = createJudgeNeuron(posGram, 0x38bdf8); // Blu 🔵

  // Etichette fluttuanti nitide ad alta risoluzione per i 3 giudici
  oJudgeSprites.cibo = createOrchestraSprite('🟡 CIBO', 0xfbbf24, 3.2);
  oJudgeSprites.cibo.position.set(posCibo.x, posCibo.y + 1.85, posCibo.z);
  oGroup.add(oJudgeSprites.cibo);

  oJudgeSprites.emo = createOrchestraSprite('🔴 EMOZIONE', 0xf43f5e, 3.2);
  oJudgeSprites.emo.position.set(posEmo.x, posEmo.y + 1.85, posEmo.z);
  oGroup.add(oJudgeSprites.emo);

  oJudgeSprites.gram = createOrchestraSprite('🔵 GRAMMATICA', 0x38bdf8, 3.2);
  oJudgeSprites.gram.position.set(posGram.x, posGram.y + 1.85, posGram.z);
  oGroup.add(oJudgeSprites.gram);

  // 2. IL NODO FOCALE BERSAGLIO (In basso al centro, Y: -1.45)
  const targetPos = new THREE.Vector3(0, -1.45, 0);
  const targetGeo = new THREE.SphereGeometry(0.85, 28, 28);
  const targetMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x1e293b,
    emissiveIntensity: 0.2,
    roughness: 0.35
  });
  oTargetMesh = new THREE.Mesh(targetGeo, targetMat);
  oTargetMesh.position.copy(targetPos);
  oGroup.add(oTargetMesh);

  // Halo / Aura intorno al nodo bersaglio
  const auraGeo = new THREE.SphereGeometry(1.18, 18, 18);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  oTargetAura = new THREE.Mesh(auraGeo, auraMat);
  oTargetMesh.add(oTargetAura);

  // Etichetta fluttuante per la parola bersaglio
  updateTargetSprite('[ ... ? ]', 0xfbbf24);

  // Rotazione Orbitale col Mouse
  container.addEventListener('mousedown', (e) => {
    oMouseIsDown = true;
    oPrevMouseX = e.clientX;
    oPrevMouseY = e.clientY;
  });
  window.addEventListener('mouseup', () => { oMouseIsDown = false; });
  container.addEventListener('mousemove', (e) => {
    if (!oMouseIsDown) return;
    oTargetRotY += (e.clientX - oPrevMouseX) * 0.008;
    oTargetRotX += (e.clientY - oPrevMouseY) * 0.008;
    oPrevMouseX = e.clientX;
    oPrevMouseY = e.clientY;
  });

  // Collega gli eventi della Scatola delle Parole (Input, Chip, Pulsanti)
  setupWordBoxEvents();

  // Avvia ciclo animazione 3D
  animateOrchestra();

  // Assicura aspect ratio e dimensioni perfette
  setTimeout(onWindowResize, 60);

  // Imposta lo STATO INIZIALE DI STANDBY (nessun laser, neuroni pronti all'ascolto)
  setOrchestraStandby();
}

function createJudgeNeuron(pos, colorHex) {
  const geo = new THREE.SphereGeometry(0.82, 24, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 1.15,
    roughness: 0.3
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(pos);
  oGroup.add(mesh);

  const glowGeo = new THREE.SphereGeometry(1.12, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true, transparent: true, opacity: 0.35 });
  mesh.add(new THREE.Mesh(glowGeo, glowMat));

  return mesh;
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createOrchestraSprite(text, colorHex, scaleW = 2.5) {
  const canvas = document.createElement('canvas');
  // Risoluzione 4x per eliminare qualsiasi effetto sfocato o sgranato (1024x256 POT)
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const hexStr = '#' + colorHex.toString(16).padStart(6, '0');

  const x = 18, y = 18, w = 988, h = 220, r = 40;

  // Sfondo scuro compatto e profondo (nessuna trasparenza che lasci trapelare wireframe)
  ctx.fillStyle = 'rgba(6, 11, 25, 0.96)';
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  // Bordo neon lucido e vibrante
  ctx.strokeStyle = hexStr;
  ctx.lineWidth = 7;
  ctx.stroke();

  // Secondo bordo interno sottile per rifinitura grafica e profondità
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 2.5;
  drawRoundedRect(ctx, x + 6, y + 6, w - 12, h - 12, r - 6);
  ctx.stroke();

  // Calcolo dinamico dimensione font per massima grandezza e nitidezza
  let fontSize = 86;
  ctx.font = `800 ${fontSize}px "Space Grotesk", "Plus Jakarta Sans", -apple-system, sans-serif`;
  const maxWidth = w - 80;
  const textWidth = ctx.measureText(text).width;
  if (textWidth > maxWidth) {
    fontSize = Math.floor(fontSize * (maxWidth / textWidth));
    ctx.font = `800 ${fontSize}px "Space Grotesk", "Plus Jakarta Sans", -apple-system, sans-serif`;
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 1. Alone luminoso posteriore (Glow)
  ctx.shadowColor = hexStr;
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, 512, 128);

  // 2. Passaggio core bianco puro solido senza sfocatura (contrasto tagliente)
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, 512, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  // LinearFilter evita il campionamento dei mipmap inferiori sfocati a distanza
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  if (oRenderer && oRenderer.capabilities) {
    texture.anisotropy = Math.min(oRenderer.capabilities.getMaxAnisotropy(), 8);
  }
  texture.needsUpdate = true;

  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 1.0,
    depthTest: false
  });

  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(scaleW, scaleW * (256 / 1024), 1);
  return sprite;
}

function updateTargetSprite(text, colorHex) {
  if (oTargetSprite) {
    oGroup.remove(oTargetSprite);
    if (oTargetSprite.material.map) oTargetSprite.material.map.dispose();
    if (oTargetSprite.material) oTargetSprite.material.dispose();
  }
  // Posizionato sotto la sfera bersaglio (Y: -3.45) per massima chiarezza e zero sovrapposizione con l'aura wireframe
  oTargetSprite = createOrchestraSprite(text, colorHex, 3.6);
  oTargetSprite.position.set(0, -3.45, 0);
  oGroup.add(oTargetSprite);
}

function animateOrchestra() {
  requestAnimationFrame(animateOrchestra);

  oCurrentRotX += (oTargetRotX - oCurrentRotX) * 0.08;
  oCurrentRotY += (oTargetRotY - oCurrentRotY) * 0.08;
  oGroup.rotation.x = oCurrentRotX;
  oGroup.rotation.y = oCurrentRotY;

  // Lieve pulsazione di vita per l'aura del target quando in standby
  if (oTargetAura) {
    const time = Date.now() * 0.002;
    if (currentOrchestraCandKey === null) {
      oTargetAura.rotation.y = time * 0.3;
      oTargetAura.rotation.x = time * 0.2;
    } else {
      oTargetAura.rotation.y += 0.02;
    }
  }

  oRenderer.render(oScene, oCamera);
}

// Crea un fascio laser 3D (o un fascio interrotto da barriera in caso di veto)
function createLaserBeam(posFrom, posTo, colorHex, isPassed) {
  const group = new THREE.Group();
  let endPt = posTo;

  if (!isPassed) {
    // Il fascio si ferma a metà tragitto
    endPt = new THREE.Vector3().lerpVectors(posFrom, posTo, 0.46);
    colorHex = 0xf43f5e; // Rosso fuoco di sbarramento
  }

  const curve = new THREE.LineCurve3(posFrom, endPt);
  const tubeGeo = new THREE.TubeGeometry(curve, 20, isPassed ? 0.15 : 0.08, 8, false);
  const tubeMat = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: isPassed ? 0.95 : 0.65
  });
  const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
  group.add(tubeMesh);

  // Se respinto (VETO), aggiungi un disco di impatto/barriera
  if (!isPassed) {
    const shieldGeo = new THREE.RingGeometry(0.1, 0.55, 16);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.copy(endPt);
    shieldMesh.lookAt(posFrom);
    group.add(shieldMesh);
  }

  return group;
}

// Pulisce tutti i raggi laser ed i timer pendenti
function clearOrchestraBeams() {
  orchestraTimeouts.forEach(t => clearTimeout(t));
  orchestraTimeouts = [];

  energyBeams.forEach(b => {
    oGroup.remove(b);
    b.traverse(c => {
      if (c.geometry) c.geometry.dispose();
      if (c.material) c.material.dispose();
    });
  });
  energyBeams = [];
}

// =========================================================================
// STATO DI STANDBY INIZIALE
// =========================================================================

function setOrchestraStandby() {
  currentOrchestraCandKey = null;
  clearOrchestraBeams();

  // Aggiorna HUD 3D
  const hudDot = document.getElementById('orchestra-hud-dot');
  const hudStatus = document.getElementById('orchestra-hud-status');
  if (hudDot) hudDot.className = 'orchestra-hud-dot standby';
  if (hudStatus) hudStatus.textContent = 'Stato Orchestra: IN ATTESA (Standby)';

  // Aggiorna parola bersaglio nella frase
  const targetWordSpan = document.getElementById('orchestra-target-word');
  if (targetWordSpan) {
    targetWordSpan.textContent = '[ ... ? ]';
    targetWordSpan.className = 'orchestra-target standby';
  }

  // Resetta nodo 3D bersaglio
  if (oTargetMesh) {
    oTargetMesh.material.emissive.setHex(0x1e293b);
    oTargetMesh.material.emissiveIntensity = 0.2;
  }
  if (oTargetAura) {
    oTargetAura.material.color.setHex(0x38bdf8);
    oTargetAura.material.opacity = 0.2;
  }
  updateTargetSprite('[ ... ? ]', 0xfbbf24);

  // Rimuovi selezione attiva dai chip
  document.querySelectorAll('.word-chip').forEach(c => c.classList.remove('active'));

  // Reset campo input
  const input = document.getElementById('orchestra-input');
  if (input) input.value = '';
  const btnClear = document.getElementById('btn-clear-input');
  if (btnClear) btnClear.style.display = 'none';
  const hintsBar = document.getElementById('word-hints-bar');
  if (hintsBar) hintsBar.style.display = 'none';

  // Renderizza la Card di Standby nel verdetto
  const scen = orchestraScenarios[currentScenarioKey] || orchestraScenarios.winter;
  const vBox = document.getElementById('judges-verdict-box');
  if (vBox) {
    vBox.innerHTML = `
      <div class="verdict-standby-card">
        <div class="standby-badge">⚡ MACCHINA IN ASCOLTO (STANDBY)</div>
        <h4>I 3 neuroni giudici sono pronti a votare</h4>
        <p>
          L'orchestra di ChatGPT è in attesa di un segnale. I 3 neuroni in alto (<strong>${scen.judges.cibo.label}</strong>, <strong>${scen.judges.emo.label}</strong>, <strong>${scen.judges.gram.label}</strong>) sono pronti a sparare i loro fasci di luce per valutare ogni parola candidata.
        </p>
        <div class="standby-call-to-action">
          👉 <strong>Digita una parola</strong> nella casella qui sopra oppure <strong>clicca una delle tessere colorate</strong> per osservare la convergenza dei laser in tempo reale!
        </div>
      </div>
    `;
  }
}

// =========================================================================
// SELEZIONE E VALUTAZIONE CANDIDATO (DINAMICA DEI FASCI 3D)
// =========================================================================

function selectOrchestraCandidate(candKey, customData = null) {
  clearOrchestraBeams();
  currentOrchestraCandKey = candKey;

  const vocab = getCurrentVocabulary();
  const data = customData || vocab[candKey] || getCustomWordData(candKey);

  // Aggiorna stato attivo chip
  document.querySelectorAll('.word-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.cand === candKey);
  });

  // Aggiorna la frase immediatamente con stato neutro di caricamento
  const targetWordSpan = document.getElementById('orchestra-target-word');
  if (targetWordSpan) {
    targetWordSpan.textContent = data.word;
    targetWordSpan.className = 'orchestra-target neutral';
  }

  // Aggiorna HUD temporaneo
  const hudDot = document.getElementById('orchestra-hud-dot');
  const hudStatus = document.getElementById('orchestra-hud-status');
  if (hudDot) hudDot.className = 'orchestra-hud-dot standby';
  if (hudStatus) hudStatus.textContent = `Analisi per «${data.word}» in corso...`;

  // Prepara il nodo 3D e lo sprite
  if (oTargetMesh) {
    oTargetMesh.material.emissive.setHex(0xd97706);
    oTargetMesh.material.emissiveIntensity = 0.4;
  }
  updateTargetSprite(data.label, 0xfbbf24);

  const tPos = oTargetMesh.position;
  const scen = orchestraScenarios[currentScenarioKey] || orchestraScenarios.winter;

  // ANIMAZIONE SEQUENZIALE DEI 3 FASCI
  // 1. Fascio Giudice 1 - Subito a t = 0ms
  const t1 = setTimeout(() => {
    const beamCibo = createLaserBeam(judgeMeshes.cibo.position, tPos, scen.judges.cibo.color, data.ciboVote.pass);
    oGroup.add(beamCibo);
    energyBeams.push(beamCibo);
  }, 40);
  orchestraTimeouts.push(t1);

  // 2. Fascio Giudice 2 - t = 180ms
  const t2 = setTimeout(() => {
    const beamEmo = createLaserBeam(judgeMeshes.emo.position, tPos, scen.judges.emo.color, data.emoVote.pass);
    oGroup.add(beamEmo);
    energyBeams.push(beamEmo);
  }, 180);
  orchestraTimeouts.push(t2);

  // 3. Fascio Giudice 3 (Grammatica) - t = 320ms
  const t3 = setTimeout(() => {
    const beamGram = createLaserBeam(judgeMeshes.gram.position, tPos, scen.judges.gram.color, data.gramVote.pass);
    oGroup.add(beamGram);
    energyBeams.push(beamGram);
  }, 320);
  orchestraTimeouts.push(t3);

  // 4. Risultato finale e impatto energetico - t = 460ms
  const t4 = setTimeout(() => {
    renderOrchestraVerdict(data);
  }, 460);
  orchestraTimeouts.push(t4);
}

function renderOrchestraVerdict(data) {
  const isConsensus = data.statusType === 'consensus';
  const isVeto = data.statusType === 'veto';
  const scen = orchestraScenarios[currentScenarioKey] || orchestraScenarios.winter;

  // Colora la sfera bersaglio 3D in base all'esito
  if (oTargetMesh && oTargetAura) {
    if (isConsensus) {
      oTargetMesh.material.emissive.setHex(0x34d399); // Smeraldo vivo
      oTargetMesh.material.emissiveIntensity = 2.4;
      oTargetAura.material.color.setHex(0x34d399);
      oTargetAura.material.opacity = 0.65;
      updateTargetSprite(data.label, 0x34d399);
    } else if (isVeto) {
      oTargetMesh.material.emissive.setHex(0xf43f5e); // Rosso sbarramento
      oTargetMesh.material.emissiveIntensity = 0.7;
      oTargetAura.material.color.setHex(0xf43f5e);
      oTargetAura.material.opacity = 0.35;
      updateTargetSprite(data.label, 0xf43f5e);
    } else {
      oTargetMesh.material.emissive.setHex(0x334155); // Spento
      oTargetMesh.material.emissiveIntensity = 0.15;
      oTargetAura.material.opacity = 0.1;
      updateTargetSprite(data.label, 0x94a3b8);
    }
  }

  // Aggiorna HUD 3D
  const hudDot = document.getElementById('orchestra-hud-dot');
  const hudStatus = document.getElementById('orchestra-hud-status');
  if (hudDot && hudStatus) {
    if (isConsensus) {
      hudDot.className = 'orchestra-hud-dot consensus';
      hudStatus.textContent = `🟢 CONSENSO UNANIME (+30 Pt): ${data.word} APPROVATA!`;
    } else if (isVeto) {
      hudDot.className = 'orchestra-hud-dot veto';
      hudStatus.textContent = `🔴 VETO RILEVATO: ${data.word} SCARTATA DALL'ACCORDO`;
    } else {
      hudDot.className = 'orchestra-hud-dot standby';
      hudStatus.textContent = `⚪ PAROLA NON RICONOSCIUTA (0 Pt)`;
    }
  }

  // Aggiorna classe nella frase
  const targetWordSpan = document.getElementById('orchestra-target-word');
  if (targetWordSpan) {
    targetWordSpan.className = `orchestra-target ${data.statusType}`;
  }

  // Calcolo probabilità stimata influenzata dalla temperatura
  let probText = '99.8%';
  if (isConsensus) {
    if (currentTemperature <= 0.3) probText = '99.9% (Scelta sicura al 100%)';
    else if (currentTemperature <= 0.8) probText = '99.2% (Scelta ideale e naturale)';
    else if (currentTemperature <= 1.2) probText = '85.4% (Più spazio ad alternative)';
    else probText = '55.0% (Probabilità appiattita: alto rischio di allucinazione!)';
  } else if (isVeto) {
    if (currentTemperature >= 1.3) {
      probText = '12.5% (ATTENZIONE: con la temperatura così alta, l\'IA potrebbe sbagliare e sceglierla!)';
    } else {
      probText = '< 0.1% (Scartata)';
    }
  } else {
    probText = '0.0%';
  }

  // Renderizza pannello verdetto dettagliato
  const vBox = document.getElementById('judges-verdict-box');
  if (vBox) {
    vBox.innerHTML = `
      <div class="verdict-header">
        <span class="verdict-title-text">${data.verdictTitle}</span>
        <span class="info-tip tip-down tip-right" tabindex="0">
          <span class="info-badge">?</span>
          <span class="tip-popover">
            <span class="tip-header"><span>⚡ Dal Punteggio (+30) alla Percentuale (${probText})</span><span class="badge-tag">Logit ➔ Softmax</span></span>
            <span class="tip-row"><strong>Perché i Punti (+10 / -10)?</strong> I neuroni assegnano prima voti numerici grezzi (chiamati <em>Logit</em>).</span>
            <span class="tip-row"><strong>La Softmax e la Temperatura:</strong> La formula matematica Softmax trasforma i voti in probabilità. Con la manopola della temperatura puoi vedere come l'IA diventa più rigida o più fantasiosa!</span>
          </span>
        </span>
      </div>
      <div class="judge-votes-list">
        <div class="judge-vote-row">
          <span class="judge-name-col yellow">
            <span class="color-dot" style="background: #${scen.judges.cibo.color.toString(16).padStart(6, '0')};"></span> ${scen.judges.cibo.name}:
          </span>
          <span class="vote-badge ${data.ciboVote.pass ? 'yes' : 'no'}">${data.ciboVote.val} (${data.ciboVote.text})</span>
        </div>
        <div class="judge-vote-row">
          <span class="judge-name-col red">
            <span class="color-dot" style="background: #${scen.judges.emo.color.toString(16).padStart(6, '0')};"></span> ${scen.judges.emo.name}:
          </span>
          <span class="vote-badge ${data.emoVote.pass ? 'yes' : 'no'}">${data.emoVote.val} (${data.emoVote.text})</span>
        </div>
        <div class="judge-vote-row">
          <span class="judge-name-col blue">
            <span class="color-dot" style="background: #${scen.judges.gram.color.toString(16).padStart(6, '0')};"></span> ${scen.judges.gram.name}:
          </span>
          <span class="vote-badge ${data.gramVote.pass ? 'yes' : 'no'}">${data.gramVote.val} (${data.gramVote.text})</span>
        </div>
      </div>
      <div class="verdict-narrative ${data.statusType}">${data.narrative}</div>
      <div style="margin-top: 0.65rem; padding: 0.55rem 0.85rem; background: rgba(168, 85, 247, 0.12); border-left: 3px solid #c084fc; border-radius: 6px; font-size: 0.82rem; color: #f1f5f9; line-height: 1.45;">
        🎛️ <strong>Probabilità Calcolata (Softmax): ${probText}</strong><br>
        <em>Effetto Manopola Fantasia (${currentTemperature.toFixed(1)}):</em> ${
          currentTemperature <= 0.3 ? 'Temperatura bassissima: il modello sceglie rigidamente la parola più ovvia.' :
          currentTemperature <= 0.8 ? 'Temperatura ideale: risposte equilibrate, corrette e fluide.' :
          currentTemperature <= 1.2 ? 'Temperatura creativa: maggiore libertà lessicale.' :
          'Temperatura folle: le probabilità sono quasi uguali, ChatGPT rischia di dire parole a caso!'
        }
      </div>
    `;
  }
}

// Aggiorna sprite fluttuante di un giudice
function updateJudgeSprite(key, text, colorHex) {
  if (oJudgeSprites[key]) {
    const pos = oJudgeSprites[key].position.clone();
    oGroup.remove(oJudgeSprites[key]);
    if (oJudgeSprites[key].material.map) oJudgeSprites[key].material.map.dispose();
    if (oJudgeSprites[key].material) oJudgeSprites[key].material.dispose();
    oJudgeSprites[key] = createOrchestraSprite(text, colorHex, 3.2);
    oJudgeSprites[key].position.copy(pos);
    oGroup.add(oJudgeSprites[key]);
  }
}

// Renderizza dinamicamente le tessere del vocabolario dello scenario corrente
function renderOrchestraChips(scenarioKey) {
  const scen = orchestraScenarios[scenarioKey];
  const area = document.getElementById('word-box-chips-area');
  if (!area || !scen) return;

  let html = `<div class="chips-category-heading">Tessere di Vocabolario Determinato:</div>`;
  scen.chipGroups.forEach(grp => {
    html += `
      <div class="chips-group">
        <span class="chip-group-label ${grp.color}">${grp.label}</span>
        <div class="chip-row">
          ${grp.words.map(w => `<button class="word-chip chip-${grp.color}" data-cand="${w.key}">${w.label}</button>`).join('')}
        </div>
      </div>
    `;
  });
  area.innerHTML = html;

  // Collega listener sui chip
  area.querySelectorAll('.word-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const candKey = chip.dataset.cand;
      const vocab = getCurrentVocabulary();
      if (vocab[candKey]) {
        const input = document.getElementById('orchestra-input');
        const btnClear = document.getElementById('btn-clear-input');
        if (input) {
          input.value = vocab[candKey].word;
          if (btnClear) btnClear.style.display = 'block';
        }
        selectOrchestraCandidate(candKey);
      }
    });
  });
}

// Cambio scenario narrativo dell'orchestra
function switchScenario(scenarioKey) {
  currentScenarioKey = scenarioKey;
  const scen = orchestraScenarios[scenarioKey];
  if (!scen) return;

  // Aggiorna bottoni pill attivi
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scenario === scenarioKey);
  });

  // Aggiorna frase mostrata
  const sentEl = document.getElementById('orchestra-sentence');
  if (sentEl) sentEl.innerHTML = scen.sentence;

  // Aggiorna colori e sprite dei 3 giudici 3D
  if (judgeMeshes.cibo && scen.judges.cibo) {
    judgeMeshes.cibo.material.color.setHex(scen.judges.cibo.color);
    judgeMeshes.cibo.material.emissive.setHex(scen.judges.cibo.color);
    updateJudgeSprite('cibo', scen.judges.cibo.label, scen.judges.cibo.color);
  }
  if (judgeMeshes.emo && scen.judges.emo) {
    judgeMeshes.emo.material.color.setHex(scen.judges.emo.color);
    judgeMeshes.emo.material.emissive.setHex(scen.judges.emo.color);
    updateJudgeSprite('emo', scen.judges.emo.label, scen.judges.emo.color);
  }
  if (judgeMeshes.gram && scen.judges.gram) {
    judgeMeshes.gram.material.color.setHex(scen.judges.gram.color);
    judgeMeshes.gram.material.emissive.setHex(scen.judges.gram.color);
    updateJudgeSprite('gram', scen.judges.gram.label, scen.judges.gram.color);
  }

  // Renderizza nuove tessere chip
  renderOrchestraChips(scenarioKey);

  // Riporta in standby
  setOrchestraStandby();
}

// Inizializzazione Slider Temperatura / Fantasia
function initTemperatureSlider() {
  const slider = document.getElementById('temp-slider');
  const badge = document.getElementById('temp-val-badge');
  const hint = document.getElementById('temp-hint-text');
  if (!slider) return;

  slider.addEventListener('input', (e) => {
    currentTemperature = parseFloat(e.target.value);
    let statusText = '';
    let hintText = '';

    if (currentTemperature <= 0.3) {
      statusText = `${currentTemperature.toFixed(1)} (Robot Rigido 🤖)`;
      hintText = 'A bassissima temperatura l\'IA non rischia mai: sceglie solo la parola più scontata in assoluto, quasi robotica!';
    } else if (currentTemperature <= 0.8) {
      statusText = `${currentTemperature.toFixed(1)} (Naturale ✨)`;
      hintText = 'Temperatura bilanciata tipica di ChatGPT: l\'IA è fluida, naturale ed espressiva senza commettere errori.';
    } else if (currentTemperature <= 1.2) {
      statusText = `${currentTemperature.toFixed(1)} (Fantasioso 🎨)`;
      hintText = 'Temperatura medio-alta: l\'IA inizia a sperimentare con parole meno comuni e più creative!';
    } else {
      statusText = `${currentTemperature.toFixed(1)} (Testa fra le Nuvole 🤪)`;
      hintText = 'Attenzione! Temperatura molto alta: la Softmax appiattisce le probabilità e l\'IA può allucinare o dire sciocchezze!';
    }

    if (badge) badge.textContent = statusText;
    if (hint) hint.textContent = hintText;

    if (currentOrchestraCandKey) {
      const vocab = getCurrentVocabulary();
      if (vocab[currentOrchestraCandKey]) {
        renderOrchestraVerdict(vocab[currentOrchestraCandKey]);
      }
    }
  });
}

// =========================================================================
// GESTIONE EVENTI: INPUT REATTIVO, AUTOCOMPLETAMENTO E CHIP
// =========================================================================

let typeDebounceTimer = null;

function setupWordBoxEvents() {
  const input = document.getElementById('orchestra-input');
  const btnClear = document.getElementById('btn-clear-input');
  const hintsBar = document.getElementById('word-hints-bar');
  const btnReset = document.getElementById('btn-orchestra-reset');

  // Listener Selettore Scenari Orchestra
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchScenario(btn.dataset.scenario);
    });
  });

  // Renderizza le tessere iniziali dello scenario predefinito
  renderOrchestraChips('winter');

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      setOrchestraStandby();
    });
  }

  if (btnClear && input) {
    btnClear.addEventListener('click', () => {
      input.value = '';
      btnClear.style.display = 'none';
      if (hintsBar) hintsBar.style.display = 'none';
      setOrchestraStandby();
      input.focus();
    });
  }

  // Digitazione in tempo reale nel campo di testo
  if (input) {
    input.addEventListener('input', () => {
      const rawVal = input.value;
      if (btnClear) btnClear.style.display = rawVal.length > 0 ? 'block' : 'none';

      // Normalizzazione stringa
      const cleanVal = rawVal.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');

      const vocab = getCurrentVocabulary();

      if (!cleanVal) {
        if (hintsBar) hintsBar.style.display = 'none';
        setOrchestraStandby();
        return;
      }

      // 1. Cerca corrispondenza esatta nel vocabolario
      if (vocab[cleanVal]) {
        if (hintsBar) hintsBar.style.display = 'none';
        selectOrchestraCandidate(cleanVal);
        return;
      }

      // 2. Cerca suggerimenti nel vocabolario
      const matches = Object.keys(vocab).filter(k => k.startsWith(cleanVal) || k.includes(cleanVal));
      if (matches.length > 0 && hintsBar) {
        hintsBar.innerHTML = `<span>💡 Trovate nel vocabolario:</span>` +
          matches.map(m => `<button class="word-chip chip-green" style="padding:0.2rem 0.5rem; font-size:0.8rem;" data-cand="${m}">${vocab[m].word}</button>`).join(' ');
        hintsBar.style.display = 'flex';

        hintsBar.querySelectorAll('.word-chip').forEach(btn => {
          btn.addEventListener('click', () => {
            input.value = vocab[btn.dataset.cand].word;
            hintsBar.style.display = 'none';
            selectOrchestraCandidate(btn.dataset.cand);
          });
        });

        if (matches.length === 1 && cleanVal.length >= 3) {
          selectOrchestraCandidate(matches[0]);
          return;
        }
      } else if (hintsBar) {
        hintsBar.style.display = 'none';
      }

      // 3. Debounce per parola personalizzata fuori vocabolario
      clearTimeout(typeDebounceTimer);
      typeDebounceTimer = setTimeout(() => {
        if (cleanVal.length >= 2 && !vocab[cleanVal]) {
          const custom = getCustomWordData(rawVal);
          selectOrchestraCandidate(cleanVal, custom);
        }
      }, 350);
    });

    // Se l'utente preme Invio
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(typeDebounceTimer);
        const rawVal = input.value.trim();
        const cleanVal = rawVal.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/g, '');

        const vocab = getCurrentVocabulary();
        if (vocab[cleanVal]) {
          selectOrchestraCandidate(cleanVal);
        } else if (rawVal) {
          const custom = getCustomWordData(rawVal);
          selectOrchestraCandidate(cleanVal || 'custom', custom);
        }
      }
    });
  }
}

// =========================================================================
// SFIDA QUIZ DIDATTICO PER RAGAZZI ("SEI UN CAMPIONE DEI NEURONI?")
// Con differenziazione per fasce: Primaria (8-10 anni) e Medie (11-14 anni)
// e selezione casuale dinamica di 5 domande per sessione da un pool di 12+12
// =========================================================================

const quizPools = {
  primaria: [
    {
      q: 'Nella prima scheda del "Neurone Detective", se facciamo analizzare la Pizza 🍕 al neurone del cibo, cosa fa il suo canale di uscita (l\'assone)?',
      options: [
        { text: 'Spara una luminosa scarica verde smeraldo viva al 100%: decisione positiva! ⚡', correct: true },
        { text: 'Diventa completamente nero e opaco perché il circuito si interrompe 🖤', correct: false },
        { text: 'Si accende solo a metà con una luce debole e tiepida 🟡', correct: false },
        { text: 'Inizia a suonare una canzone di buon compleanno 🎂', correct: false }
      ],
      feedback: 'Esatto! La pizza risponde con un triplo SÌ a tutti i canali d\'ingresso: il nucleo si carica d\'oro e l\'uscita spara verde al 100%!'
    },
    {
      q: 'Sempre nel neurone detective del cibo, perché la Forchetta 🍴 riceve un\'uscita solo a metà potenza (55%)?',
      options: [
        { text: 'Perché sta a tavola e serve per mangiare, ma non è commestibile né nutre! 🍴', correct: true },
        { text: 'Perché la forchetta è caduta dal tavolo ed è sporca 🥄', correct: false },
        { text: 'Perché al neurone artificiale non piacciono gli oggetti di metallo ⚙️', correct: false },
        { text: 'Perché le forchette si possono usare solo a cena e non a pranzo 🌙', correct: false }
      ],
      feedback: 'Proprio così! Solo il canale "Sta a tavola" si attiva; gli altri due dicono NO, quindi il legame con il cibo è solo parziale!'
    },
    {
      q: 'Nel neurone specialista dei Cuccioli 🐶, perché il Peluche 🧸 prende solo il 50% di punteggio rispetto al Cane vero?',
      options: [
        { text: 'Perché ha il pelo morbido e la forma da animale, ma è un giocattolo finto che non respira né mangia! 🧸', correct: true },
        { text: 'Perché è un cane troppo piccolo per riuscire ad abbaiare 🐾', correct: false },
        { text: 'Perché è scappato dal recinto del giardino 🐕', correct: false },
        { text: 'Perché costa meno di un cane vero nel negozio di animali 🪙', correct: false }
      ],
      feedback: 'Perfetto! Il peluche ha la forma di un cucciolo, ma non è un essere vivente: il neurone nota la differenza e si illumina solo a metà!'
    },
    {
      q: 'A cosa servono i Dendriti (i canali d\'ingresso azzurri con le ramificazioni) nel nostro neurone 3D?',
      options: [
        { text: 'A catturare gli indizi e le caratteristiche del mondo esterno 🌿', correct: true },
        { text: 'A fargli ascoltare la musica preferita alla radio 📻', correct: false },
        { text: 'A collegare il computer a una presa di corrente a muro 🔌', correct: false },
        { text: 'A pulire lo schermo del monitor dalla polvere 🧹', correct: false }
      ],
      feedback: 'Bravissimo! I dendriti sono i canali di ingresso del neurone: funzionano come antenne che raccolgono tutti i dati in arrivo!'
    },
    {
      q: 'Nella grande Sfera 3D delle parole (Scheda 2), perché Cane 🐶 e Gatto 🐱 si trovano vicini nel polo rosso?',
      options: [
        { text: 'Perché appartengono entrambi al tema della natura e degli animali a quattro zampe 🐾', correct: true },
        { text: 'Perché litigano sempre come nei cartoni animati in TV 📺', correct: false },
        { text: 'Perché iniziano entrambi con la stessa lettera dell\'alfabeto 🔤', correct: false },
        { text: 'Perché sono parole corte formate da sole quattro o cinque lettere ✏️', correct: false }
      ],
      feedback: 'Centro! Nella mappa 3D dell\'IA le parole con significato simile o che appartengono allo stesso tema vivono nello stesso quartiere!'
    },
    {
      q: 'Nella Caccia al Tesoro della Mappa 3D, quale percorso segue la rotta «Dalla Fattoria alla Pizza»?',
      options: [
        { text: 'Pascolo 🐄 ➔ Latte 🥛 ➔ Ciotola 🥣 ➔ Farina 🥣 ➔ Pizza 🍕', correct: true },
        { text: 'Razzo 🚀 ➔ Computer 💻 ➔ Robot 🤖 ➔ Pizza 🍕', correct: false },
        { text: 'Lupo 🐺 ➔ Albero 🌳 ➔ Bosco 🌲 ➔ Pizza 🍕', correct: false },
        { text: 'Cinema 🎬 ➔ Teatro 🎭 ➔ Musica 🎵 ➔ Pizza 🍕', correct: false }
      ],
      feedback: 'Grandioso! È la rotta segreta che unisce la natura degli ingredienti della fattoria fino alla pizza sfornata a tavola!'
    },
    {
      q: 'Nella scheda dell\'Allenamento (Scheda 3), quale risposta buffa sceglie il neurone al primo tentativo (Epoca 1) per completare «un piatto di...»?',
      options: [
        { text: '« Oggi a pranzo ho mangiato un gustoso piatto di... GALASSIA 🌌 »! 😆', correct: true },
        { text: '« Un piatto di squisiti spaghetti al pomodoro 🍝 »', correct: false },
        { text: '« Un piatto di calda zuppa di verdure 🍲 »', correct: false },
        { text: '« Un piatto di caramelle gommose alla frutta 🍬 »', correct: false }
      ],
      feedback: 'Esatto! All\'inizio l\'IA non sa nulla e tira a indovinare a caso nello spazio profondo: un piatto di galassia fa ridere ed è un errore al 100%!'
    },
    {
      q: 'Durante l\'allenamento dell\'IA (Scheda 3), cosa succede alla linea della Loss (l\'Errore) dopo 10 epoche di studio?',
      options: [
        { text: 'La linea scende dal 100% fino a toccare quasi lo 0%, perché l\'IA ha imparato la risposta giusta! 📉', correct: true },
        { text: 'La linea sale sempre più in alto verso un milione di errori 📈', correct: false },
        { text: 'La linea cambia forma e diventa un cerchio perfetto 🔴', correct: false },
        { text: 'La linea rimane immobile e bloccata per sempre al 100% 🛑', correct: false }
      ],
      feedback: 'Super! La Loss misura quanti sbagli fa la rete: allenandosi per tentativi ed errori, l\'errore scende al minimo e il neurone diventa bravissimo!'
    },
    {
      q: 'Nella frase «scaldarsi con una bella...» (Scheda 4), perché il Giudice della Grammatica alza un veto rosso contro "Minestrone 🥣"?',
      options: [
        { text: 'Perché "minestrone" è MASCHILE ("un bel minestrone") e non si accorda con "una bella"! ✍️', correct: true },
        { text: 'Perché il minestrone è una pietanza che si mangia solo d\'estate col caldo ☀️', correct: false },
        { text: 'Perché all\'Intelligenza Artificiale non piacciono le verdure cotte 🥦', correct: false },
        { text: 'Perché il minestrone è un piatto troppo liquido per essere mangiato 🥄', correct: false }
      ],
      feedback: 'Bravissimo! I giudici dell\'IA controllano anche la grammatica italiana: "una bella" richiede obbligatoriamente una parola femminile singolare come "Zuppa"!'
    },
    {
      q: 'Nello scenario della Torre del Mago (Scheda 4), «preparò con cura una potente...», quale parola vince l\'accordo di tutti i Giudici?',
      options: [
        { text: 'Pozione 🧪 (è magica, misteriosa e femminile: "una potente pozione"!) ✨', correct: true },
        { text: 'Incantesimo 🪄 (è scartata perché è maschile: "un potente incantesimo") ❌', correct: false },
        { text: 'Tisana 🍵 (è scartata perché non è un oggetto magico da stregoni) ❌', correct: false },
        { text: 'Sedia 🪑 (non c\'entra assolutamente nulla con la magia antica) ❌', correct: false }
      ],
      feedback: 'Perfetto! La "Pozione" riceve il consenso unanime: è un\'arte magica, crea l\'atmosfera misteriosa ed è grammaticalmente perfetta!'
    },
    {
      q: 'Cosa succede a ChatGPT se giriamo la Manopola della Fantasia (Temperatura) al valore massimo (1.6)?',
      options: [
        { text: 'Diventa stravagante e inventa parole bizzarre o curiose, con la "testa fra le nuvole"! 🤪', correct: true },
        { text: 'Il computer prende fuoco e fonde la scheda madre 🔥', correct: false },
        { text: 'L\'IA si blocca e sceglie solo la parola più noiosa ed evidente 🤖', correct: false },
        { text: 'Cancella per sbaglio tutta la memoria di internet 💾', correct: false }
      ],
      feedback: 'Giustissimo! A temperatura 1.6 l\'IA osa tantissimo e usa parole rare e fantasiose, divertenti per inventare favole ma rischiose per i compiti precisi!'
    },
    {
      q: 'L\'Intelligenza Artificiale di NeuroScope ha un vero cervello biologico vivente dentro allo schermo?',
      options: [
        { text: 'No! È fatta di formule matematiche e calcoli numerici velocissimi eseguiti su chip elettronici 💻⚡', correct: true },
        { text: 'Sì, c\'è una minuscola creatura viva rinchiusa nella tastiera del PC 🐾', correct: false },
        { text: 'Sì, è un vero robot umanoide con ossa e sangue di metallo 🤖', correct: false },
        { text: 'No, funziona a molla come gli antichi orologi da taschino 🕰️', correct: false }
      ],
      feedback: 'Centro! Non c\'è nulla di vivente né di magico: sono milioni di moltiplicazioni ed addizioni calcolate in millesimi di secondo dai microprocessori!'
    }
  ],
  secondaria: [
    {
      q: 'Nella prima scheda del Neurone 3D, cosa rappresentano i cursori dei Pesi Sinaptici (Canale A, B, C)?',
      options: [
        { text: 'Moltiplicatori numerici che determinano quanta importanza il neurone assegna a ciascun segnale d\'ingresso ⚖️', correct: true },
        { text: 'Il peso in chilogrammi dell\'alimentatore e del monitor del computer 🏋️', correct: false },
        { text: 'I gigabyte di memoria RAM consumati dalla scheda grafica durante il rendering 💾', correct: false },
        { text: 'La velocità in giri al minuto della ventola del processore 🌪️', correct: false }
      ],
      feedback: 'Esatto! Ciascun canale d\'ingresso viene moltiplicato per il proprio peso: una caratteristica decisiva riceve un peso alto, un\'informazione inutile riceve un peso vicino a zero.'
    },
    {
      q: 'Cosa accade nel neurone artificiale se spostiamo il cursore del Bias / Soglia verso un valore molto negativo (es. -0.8)?',
      options: [
        { text: 'Il neurone diventa diffidente: la somma pesata degli ingressi deve essere altissima per superare la soglia e attivare l\'uscita! 🛡️', correct: true },
        { text: 'L\'assone di uscita spara sempre luce verde anche se non c\'è nessun dato in ingresso 🟢', correct: false },
        { text: 'I dendriti invertono la loro posizione collegandosi al monitor 🔄', correct: false },
        { text: 'Il computer spegne automaticamente lo schermo per risparmiare energia 💡', correct: false }
      ],
      feedback: 'Corretto! Un bias negativo crea una barriera di attivazione in salita: serve una carica positiva combinata molto forte per far scattare la scintilla di output.'
    },
    {
      q: 'Nello "Schermo della Realtà - Dentro la Macchina" (Scheda 2), come sono rappresentati i concetti per il computer?',
      options: [
        { text: 'Come vettori di coordinate numeriche decimali ad alta dimensionalità [dim_0001: +0.8412, ...] 🌌', correct: true },
        { text: 'Come immagini fotografiche a colori compresse in formato JPEG 🖼️', correct: false },
        { text: 'Come registrazioni vocali lette a voce alta da un microfono 🎙️', correct: false },
        { text: 'Come semplici elenchi di lettere dell\'alfabeto memorizzate a caso 🔤', correct: false }
      ],
      feedback: 'Brillante! Per l\'IA le parole non sono lettere grafiche ma vettori numerici: due concetti sono simili quando le loro coordinate puntano nella stessa direzione geometrica.'
    },
    {
      q: 'Nella grande Sfera 3D dei 54 concetti, perché Computer 💻, Software 💾, Algoritmo ⚙️ e Robot 🤖 si trovano raggruppati nel polo ciano?',
      options: [
        { text: 'Perché appartengono allo stesso campo semantico legato alla tecnologia e all\'elettronica digitale ⚡', correct: true },
        { text: 'Perché sono le parole più lunghe e complesse del dizionario italiano 📖', correct: false },
        { text: 'Perché sono state coniate tutte nello stesso anno dallo stesso inventore 📜', correct: false },
        { text: 'Perché è un errore casuale causato da un difetto di rendering della scheda video 🐛', correct: false }
      ],
      feedback: 'Perfetto! L\'algoritmo di embedding raggruppa nello stesso quartiere dello spazio tridimensionale i termini che nei testi compaiono nei medesimi contesti.'
    },
    {
      q: 'Nella rotta segreta «Dal Microchip al Cane Robot» (Scheda 2), come si collegano la tecnologia e il mondo animale?',
      options: [
        { text: 'Attraverso il corridoio verde bio-tecnologico: Chip ⚡ ➔ Software 💾 ➔ Robot 🤖 ➔ Cane Robot 🦾🐕', correct: true },
        { text: 'Attraverso il corridoio del cibo: Chip ⚡ ➔ Pizza 🍕 ➔ Forchetta 🍴 ➔ Cane Robot 🦾🐕', correct: false },
        { text: 'Saltando a caso nello spazio vuoto senza alcuna connessione logica 🌌', correct: false },
        { text: 'Cancellando tutti i dati del percorso per ripartire da zero 🗑️', correct: false }
      ],
      feedback: 'Grandioso! Mostra visivamente come concetti all\'apparenza distanti (un microchip di silicio e un cane) trovino un ponte concettuale attraverso la robotica!'
    },
    {
      q: 'Nell\'avventura di addestramento su Marte (Scheda 3), l\'IA passa da "Forchetta 🍴" a "Marte 🔴" in 10 epoche. Come ha imparato?',
      options: [
        { text: 'Ha misurato l\'errore (Loss) commesso a ogni tentativo e ha corretto gradualmente i pesi delle proprie connessioni 🎯', correct: true },
        { text: 'Ha cancellato il programma e ha scaricato un testo già pronto da un motore di ricerca 🌐', correct: false },
        { text: 'Ha copiato la soluzione da Wikipedia dopo aver chiesto aiuto a un utente umano 📋', correct: false },
        { text: 'Il computer ha tirato a indovinare a caso finché per pura fortuna non ha azzeccato 🎲', correct: false }
      ],
      feedback: 'Esatto! Il Machine Learning consiste proprio nell\'apprendimento automatico: la rete corregge i propri parametri matematici per minimizzare l\'errore a ogni passaggio.'
    },
    {
      q: 'Cosa succederebbe se un modello di IA si addestrasse per milioni di epoche solo ed esclusivamente sulle 3 frasi di NeuroScope?',
      options: [
        { text: 'Rischio di Overfitting: memorizzerebbe quelle 3 frasi alla lettera, ma andrebbe in totale confusione su qualsiasi frase nuova! 🛑', correct: true },
        { text: 'Diventerebbe istantaneamente capace di comprendere qualsiasi lingua dell\'universo 🪐', correct: false },
        { text: 'I circuiti del computer si trasformerebbero in un vero cervello biologico umano 🧠', correct: false },
        { text: 'La velocità di calcolo della scheda video raddoppierebbe automaticamente ⚡', correct: false }
      ],
      feedback: 'Fondamentale! L\'overfitting (sovradattamento) accade quando una rete impara a memoria i dati di esercizio senza cogliere la regola generale, perdendo la capacità di generalizzare.'
    },
    {
      q: 'Nello scenario sportivo dell\'Orchestra (Scheda 4), perché la parola "Gol ⚽" viene scartata dal Giudice della Grammatica?',
      options: [
        { text: 'Perché la frase dice «una splendida...» (femminile), mentre "gol" richiede l\'articolo maschile «uno splendido gol»! ✍️', correct: true },
        { text: 'Perché segnare un gol all\'ultimo minuto non fa esultare i tifosi allo stadio 🏟️', correct: false },
        { text: 'Perché la parola "gol" non viene mai usata nelle cronache sportive del calcio 🥅', correct: false },
        { text: 'Perché l\'arbitro ha fischiato un fuorigioco prima del tiro in porta ⚽', correct: false }
      ],
      feedback: 'Esattamente! Come mostra il fascio laser blu di NeuroScope, un modello linguistico deve combinare contesto narrativo, emozione e concordanza grammaticale.'
    },
    {
      q: 'Come fa ChatGPT a decidere quale parola scegliere per completare una frase?',
      options: [
        { text: 'Calcola una graduatoria di probabilità combinando significato, contesto e grammatica, scegliendo la più idonea 📊', correct: true },
        { text: 'Lancia un dado virtuale a sei facce per ogni sillaba generata 🎲', correct: false },
        { text: 'Chiede conferma telefonica all\'utente prima di scrivere ogni singola parola ❓', correct: false },
        { text: 'Sceglie sempre la parola che occupa meno lettere per risparmiare tempo ⌨️', correct: false }
      ],
      feedback: 'Proprio così! I modelli linguistici non copiano testi fissi a memoria, ma calcolano una distribuzione di probabilità in base a tutte le parole precedenti nella frase.'
    },
    {
      q: 'In NeuroScope, se regoliamo la Temperatura di ChatGPT da 0.1 (Robot Rigido) a 0.7 (Naturale), che effetto osserviamo?',
      options: [
        { text: 'A 0.1 sceglie sempre e solo la parola più ovvia e rigida; a 0.7 il testo diventa fluido, espressivo e bilanciato ✨', correct: true },
        { text: 'A 0.7 la scena 3D comincia a ruotare a velocità ultrasonica creando vortici 🌀', correct: false },
        { text: 'A 0.1 il computer disattiva i chip grafici per risparmiare corrente elettrica 💤', correct: false },
        { text: 'Non cambia assolutamente nulla nel testo o nei colori dei fasci laser 🔄', correct: false }
      ],
      feedback: 'Bravissimo! La temperatura regola il campionamento probabilistico: valori bassi prediligono la certezza assoluta, valori medi rendono il linguaggio naturale e umano.'
    },
    {
      q: 'Se addestriamo una rete neurale fornendole dati con etichette errate (es. foto di gatti etichettate come "cane"), cosa accadrà?',
      options: [
        { text: 'L\'IA imparerà l\'errore e chiamerà "cane" ogni gatto: la qualità dei dati è il fattore più critico ("Garbage in, Garbage out") ⚠️', correct: true },
        { text: 'L\'IA correggerà da sola l\'errore perché i computer possiedono buon senso naturale 🧠', correct: false },
        { text: 'Non cambia nulla, perché le reti neurali riconoscono la verità in modo magico 🪄', correct: false },
        { text: 'La scheda madre del computer emetterà un fischio di allarme sonoro 🚨', correct: false }
      ],
      feedback: 'Regola cardine dell\'informatica: "Garbage In, Garbage Out". L\'IA non ha una coscienza autonoma del mondo: apprende fedelmente ciò che le viene mostrato nei dati!'
    },
    {
      q: 'Che differenza fondamentale c\'è tra un algoritmo tradizionale (come in Scratch) e la rete neurale di NeuroScope?',
      options: [
        { text: 'In Scratch stabiliamo noi tutte le regole passo per passo; la rete neurale impara le regole da sola regolando i pesi sugli esempi 🧩', correct: true },
        { text: 'In Scratch si possono programmare solo videogiochi, mentre le reti neurali servono solo per la matematica 🎮', correct: false },
        { text: 'Non c\'è alcuna differenza: usano esattamente le stesse identiche istruzioni a blocchi 🔄', correct: false },
        { text: 'I programmi Scratch funzionano solo sui tablet, le reti neurali solo nei satelliti spaziali 🛰️', correct: false }
      ],
      feedback: 'Splendido! Questa è l\'essenza del Machine Learning: passare dalla programmazione esplicita (dare regole rigide) all\'apprendimento automatico guidato dai dati!'
    }
  ]
};

let quizSelectedLevel = 'primaria';
let quizSessionQuestions = [];
let quizCurrentIndex = 0;
let quizScore = 0;
let quizAnswered = false;

// Utilità per rimescolare un array (Fisher-Yates)
function shuffleQuizArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Avvia una nuova sessione di 5 domande a sorpresa per il livello indicato
function startQuizSession(level) {
  if (level && quizPools[level]) {
    quizSelectedLevel = level;
  }

  // Aggiorna bottoni di selezione fascia
  document.querySelectorAll('.quiz-level-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === quizSelectedLevel);
  });

  // Aggiorna indicatore nel badge
  const indicator = document.getElementById('quiz-header-level-indicator');
  if (indicator) {
    indicator.textContent = quizSelectedLevel === 'primaria'
      ? '🧒 Fascia: Primaria (8-10 anni)'
      : '🎓 Fascia: Medie (11-14 anni)';
  }

  // Estrae casualmente 5 domande dal pool del livello corrente
  const pool = quizPools[quizSelectedLevel] || quizPools.primaria;
  const shuffledPool = shuffleQuizArray(pool);
  const picked = shuffledPool.slice(0, 5);

  // Rimescola anche l'ordine delle 4 opzioni per ogni domanda
  quizSessionQuestions = picked.map(item => {
    return {
      q: item.q,
      feedback: item.feedback,
      options: shuffleQuizArray(item.options.map(opt => ({ ...opt })))
    };
  });

  quizCurrentIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  renderQuizQuestion();
}

function initQuizModal() {
  const modal = document.getElementById('quiz-modal');
  const btnOpen = document.getElementById('btn-open-quiz');
  const btnClose = document.getElementById('btn-close-quiz');

  // Gestione pulsanti selezione fascia (Primaria / Medie)
  document.querySelectorAll('.quiz-level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLevel = btn.dataset.level;
      if (targetLevel) {
        startQuizSession(targetLevel);
      }
    });
  });

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => {
      modal.style.display = 'flex';
      startQuizSession(quizSelectedLevel);
    });
  }

  if (btnClose && modal) {
    btnClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-body');
  if (!container) return;

  if (!quizSessionQuestions || quizSessionQuestions.length === 0) {
    startQuizSession(quizSelectedLevel);
    return;
  }

  if (quizCurrentIndex >= quizSessionQuestions.length) {
    renderQuizFinalScreen();
    return;
  }

  quizAnswered = false;
  const qData = quizSessionQuestions[quizCurrentIndex];
  const total = quizSessionQuestions.length;
  const progressPct = ((quizCurrentIndex) / total) * 100;
  const isMedie = quizSelectedLevel === 'secondaria';

  container.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
    </div>
    <div class="quiz-q-num">
      <span>Domanda ${quizCurrentIndex + 1} di ${total}</span>
      <span style="opacity: 0.6;">•</span>
      <span>${isMedie ? '🎓 Livello Medie' : '🧒 Livello Primaria'}</span>
    </div>
    <div class="quiz-q-title">${qData.q}</div>
    <div class="quiz-options-list" id="quiz-opt-list">
      ${qData.options.map((opt, idx) => `
        <button type="button" class="quiz-opt-btn" data-opt-idx="${idx}">${opt.text}</button>
      `).join('')}
    </div>
    <div id="quiz-feedback-area"></div>
  `;

  container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const idx = parseInt(btn.dataset.optIdx, 10);
      const isCorrect = qData.options[idx].correct;

      if (isCorrect) quizScore++;

      container.querySelectorAll('.quiz-opt-btn').forEach((b, i) => {
        b.disabled = true;
        if (qData.options[i].correct) {
          b.classList.add('correct');
        } else if (i === idx) {
          b.classList.add('wrong');
        }
      });

      const fbArea = document.getElementById('quiz-feedback-area');
      if (fbArea) {
        fbArea.innerHTML = `
          <div class="quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}">
            <strong>${isCorrect ? '🎉 Risposta Esatta!' : '❌ Ops, non esattamente!'}</strong><br>
            ${qData.feedback}
          </div>
          <button type="button" class="quiz-next-btn" id="btn-quiz-next">
            ${quizCurrentIndex + 1 < total ? 'Domanda Successiva ➔' : 'Vedi Risultato Finale 🏆'}
          </button>
        `;

        document.getElementById('btn-quiz-next')?.addEventListener('click', () => {
          quizCurrentIndex++;
          renderQuizQuestion();
        });
      }
    });
  });
}

function renderQuizFinalScreen() {
  const container = document.getElementById('quiz-body');
  if (!container) return;

  const total = quizSessionQuestions.length || 5;
  const isMedie = quizSelectedLevel === 'secondaria';

  let medal = '🥇';
  let badgeTitle = isMedie ? 'Campione delle Medie dell\'IA!' : 'Maestro Detective dei Neuroni!';
  let praise = isMedie 
    ? 'Eccezionale! Hai capito alla perfezione come funziona l\'Intelligenza Artificiale: dai pesi delle decisioni alle probabilità di ChatGPT, senza farti ingannare dalle illusioni!' 
    : 'Incredibile! Hai capito benissimo come ragiona il cervello elettronico: sei un vero super detective dell\'IA!';

  if (quizScore <= 2) {
    medal = '🥉';
    badgeTitle = isMedie ? 'Esploratore Digitale' : 'Apprendista Detective';
    praise = isMedie
      ? 'Buon tentativo! Rivedi le scene 3D e le schede interattive, poi riprova con altre 5 domande a sorpresa per scalare la classifica!'
      : 'Bravo per averci provato! Gioca ancora con il neurone 3D e riprova subito: puoi conquistare la medaglia d\'oro!';
  } else if (quizScore <= 4) {
    medal = '🥈';
    badgeTitle = isMedie ? 'Esperto di Algoritmi!' : 'Tecnico dei Neuroni Digitali!';
    praise = isMedie
      ? 'Ottimo lavoro! Conosci molto bene come l\'IA si allena, come gestisce la fantasia e come calcola la parola successiva!'
      : 'Bravissimo! Conosci quasi tutti i segreti di come i computer riconoscono le cose e imparano dagli errori!';
  }

  container.innerHTML = `
    <div class="quiz-final-score">
      <div class="quiz-medal">${medal}</div>
      <div class="quiz-score-num">${quizScore} su ${total} Corrette!</div>
      <div class="quiz-badge-title">${badgeTitle}</div>
      <p class="quiz-praise-text">${praise}</p>
      
      <div class="quiz-actions-row">
        <button type="button" class="quiz-restart-btn" id="btn-restart-quiz">
          🔄 Altre 5 Domande a Sorpresa (${isMedie ? 'Medie' : 'Primaria'})
        </button>
        <button type="button" class="quiz-switch-level-btn" id="btn-switch-quiz-level">
          ${isMedie ? '🧒 Mettiti alla Prova con la Primaria (8-10)' : '🎓 Sfida il Livello Medie (11-14 anni)'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-restart-quiz')?.addEventListener('click', () => {
    startQuizSession(quizSelectedLevel);
  });

  document.getElementById('btn-switch-quiz-level')?.addEventListener('click', () => {
    const nextLevel = quizSelectedLevel === 'primaria' ? 'secondaria' : 'primaria';
    startQuizSession(nextLevel);
  });
}

// =========================================================================
// GESTIONE RESIZE AUTOMATICA PER TUTTE LE SCENE 3D
// =========================================================================

function onWindowResize() {
  const c1 = document.getElementById('canvas3d-container');
  if (c1 && nRenderer && nCamera) {
    const w = c1.clientWidth;
    const h = c1.clientHeight;
    if (w > 0 && h > 0) {
      nCamera.aspect = w / h;
      nCamera.updateProjectionMatrix();
      nRenderer.setSize(w, h);
    }
  }
  const c2 = document.getElementById('canvas-map-container');
  if (c2 && mapRenderer && mapCamera) {
    const w = c2.clientWidth;
    const h = c2.clientHeight;
    if (w > 0 && h > 0) {
      mapCamera.aspect = w / h;
      mapCamera.updateProjectionMatrix();
      mapRenderer.setSize(w, h);
    }
  }
  const c3 = document.getElementById('canvas-training-container');
  if (c3 && tRenderer && tCamera) {
    const w = c3.clientWidth;
    const h = c3.clientHeight;
    if (w > 0 && h > 0) {
      tCamera.aspect = w / h;
      tCamera.updateProjectionMatrix();
      tRenderer.setSize(w, h);
    }
  }
  const c4 = document.getElementById('canvas-orchestra-container');
  if (c4 && oRenderer && oCamera) {
    const w = c4.clientWidth;
    const h = c4.clientHeight;
    if (w > 0 && h > 0) {
      oCamera.aspect = w / h;
      oCamera.updateProjectionMatrix();
      oRenderer.setSize(w, h);
    }
  }
}

window.addEventListener('resize', onWindowResize);

// =========================================================================
// GESTIONE GLOSSARIO DIDATTICO (TAP & CLICK PER TOUCH E MOBILE)
// =========================================================================

function initGlossaryTips() {
  document.querySelectorAll('.info-tip').forEach(tip => {
    tip.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasActive = tip.classList.contains('active');
      document.querySelectorAll('.info-tip.active').forEach(t => t.classList.remove('active'));
      if (!wasActive) tip.classList.add('active');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.info-tip.active').forEach(t => t.classList.remove('active'));
  });
}

// Avvio applicazione
window.addEventListener('DOMContentLoaded', () => {
  initNeuron3D();
  initGlossaryTips();
  initRealityScreen();
  initTemperatureSlider();
  initQuizModal();
  setTimeout(onWindowResize, 120);
});
