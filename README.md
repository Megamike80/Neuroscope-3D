# 🌌 NeuroScope 3D — La Bussola Semantica dell'Intelligenza Artificiale

<div align="center">

![Badge Tecnologia](https://img.shields.io/badge/Three.js-r128-blue?logo=threedotjs)
![Badge Licenza](https://img.shields.io/badge/Licenza-MIT-green)
![Badge Linguaggio](https://img.shields.io/badge/Linguaggio-HTML%20%2F%20CSS%20%2F%20JS-orange)
![Badge Dipendenze](https://img.shields.io/badge/Dipendenze-Zero-brightgreen)
![Badge Target](https://img.shields.io/badge/Target-Non%20tecnico-purple)

**Un simulatore 3D interattivo in WebGL per comprendere le reti neurali artificiali e ChatGPT — senza formule, senza codice, senza laurea.**

[▶ Demo Live](https://megamike80.github.io/Neuroscope-3D/) · [📖 Documentazione](#documentazione) · [🚀 Avvia in locale](#avvio-rapido)

</div>

---

## 🎯 Cos'è NeuroScope 3D?

NeuroScope 3D è un'applicazione didattica interattiva costruita con **Three.js** (WebGL) che visualizza in tempo reale i meccanismi fondamentali dell'Intelligenza Artificiale moderna: dai singoli neuroni artificiali fino all'architettura Transformer che alimenta ChatGPT, Gemini e Claude.

**Obiettivo:** spiegare a chiunque — studenti, insegnanti, curiosi, professionisti non tecnici — come ragiona davvero un sistema di IA, non attraverso metafore emotive o promesse fantascientifiche, ma attraverso la visualizzazione concreta delle **distanze semantiche** e dei **collegamenti tra idee** nello spazio tridimensionale.

---

## ✨ Caratteristiche principali

- 🌐 **Rendering 3D WebGL** con Three.js — ruota, zooma e naviga la sfera dei concetti a 360°
- 🎓 **4 schermate didattiche progressive** che coprono l'intero ciclo: neurone → spazio semantico → addestramento → inferenza
- 📡 **Glossario tecnico progressivo** con micro-badge `?` non invasivi: chi non vuole approfondire non è disturbato, chi vuole capire ottiene la definizione tecnica corretta
- ⚡ **"Schermo della Realtà"** — interruttore che passa dalla metafora 3D alla realtà tecnologica (vettori a 4096 dimensioni, chip TPU/GPU, Self-Attention)
- 📱 **Responsive e multi-dispositivo** — funziona su desktop, tablet e smartphone; supporta touch, pinch-zoom e drag
- 🚫 **Zero installazione, zero dipendenze locali** — un solo doppio clic su `index.html` e il simulatore è operativo

---

## 🏗️ Struttura del Progetto

```
NeuroScope-3D/
├── index.html          # Struttura HTML delle 4 schede didattiche
├── styles.css          # Design system, animazioni, tooltip, layout responsive
├── app.js              # Logica Three.js: scene 3D, animazioni, interazioni
└── README.md           # Questo file
```

Il progetto è un **sito statico puro**: non richiede Node.js, npm, webpack né alcun server backend. Funziona direttamente dal filesystem del browser.

---

## 🚀 Avvio Rapido

### Locale (senza server)
```
Scarica o clona il repository → Apri index.html con Chrome, Edge, Firefox o Safari
```

### Con server locale (facoltativo, per sviluppo)
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

### GitHub Pages
La demo live è disponibile su: **https://megamike80.github.io/Neuroscope-3D/**

---

## 📚 Le 4 Schermate Didattiche

### 1. 🧠 Il Neurone 3D — Il Modello Focalizzato del Cibo

La prima scheda mostra un singolo neurone artificiale specializzato nel riconoscimento del cibo, con la sua anatomia funzionale completa resa in 3D:

| Componente | Biologico | Artificiale |
|---|---|---|
| **Dendriti** | Rami riceventi degli stimoli | Canali d'ingresso numerici |
| **Soma / Nucleo** | Centro vitale di accumulo | Somma pesata degli ingressi |
| **Assone** | Cavo biologico di trasmissione | Canale d'uscita verso gli strati successivi |

**I 3 canali d'ingresso (pesi sinaptici):**
- 🌿 *Canale A:* È commestibile?
- 🍽️ *Canale B:* Sta a tavola / in cucina?
- ⚡ *Canale C:* Dona nutrimento ed energia?

**I 3 livelli di attivazione dimostrabili:**

| Selezione | Attivazione | Descrizione |
|---|:---:|---|
| Pizza 🍕 | **100%** | Tutti e 3 i canali si attivano → nucleo dorato → uscita verde smeraldo |
| Forchetta 🍴 | **55%** | Solo il canale B (a tavola) → nucleo tiepido → uscita ambrata a metà potenza |
| Galassia 🌌 | **0%** | Nessun canale risponde → nucleo spento → uscita completamente nera |

---

### 2. 🌍 La Sfera 3D dei Concetti & Ponti Cromatici

La seconda scheda visualizza lo **spazio degli embedding** come una sfera rotante con 54 concetti distribuiti su 8 zone tematiche:

| Colore | Zona Semantica | Esempi |
|:---:|---|---|
| 🟡 Oro | Cibo & Cucina | Pizza, Pasta, Pane, Zuppa, Cuoco |
| 🔴 Corallo | Natura & Animali | Cane, Gatto, Lupo, Bosco, Aquila |
| 🔵 Ciano | Tecnologia & Scienza | Robot, Algoritmo, Computer, Chip |
| 🟣 Viola | Cultura & Pensiero | Musica, Poesia, Amore, Arte |
| 🟠 Arancione | Ponte Cibo ↔ Animali | Ciotola, Latte, Pascolo, Miele |
| 🟢 Verde | Ponte Cibo ↔ Tecnologia | Robot da Cucina, Forno Smart, Serra Idroponica |
| 🩵 Indaco | Ponte Cultura ↔ Tecnologia | Bioinformatica, Algoritmo Musicale |
| 🩷 Magenta | Ponte Animali ↔ Cultura | Totem, Favola, Bestiario |

**Funzionalità interattive:**
- **Vista Globale / Dettaglio** — zoom cinematico che rivela le etichette delle 54 parole in dissolvenza
- **4 Corridoi di Transizione** — selezione filtra e centra la camera sul corridoio scelto, con decadimento dell'attenzione ispirato alla vera Self-Attention (100% → 48% → 22% → 8%)
- **Drag & rotazione** con inerzia fluida, supporto touchscreen e pinch-zoom

**⚡ Schermo della Realtà — "Dentro la Macchina"**

Un interruttore passa dalla sfera 3D a tre pannelli di approfondimento scientifico:

1. **Iper-Spazio a 4.096 Dimensioni** — Il vettore di embedding reale di Pizza, Cane, Computer e Musica con le coordinate commentate dimension per dimension
2. **Fisica & Hardware** — Confronto scientifico: cervello umano (86 miliardi di cellule, 20W) vs data center AI (chip TPU/GPU, Megawatt)
3. **Self-Attention Dinamica** — La parola "banca" si sposta istantaneamente tra il cluster finanziario e quello fluviale a seconda del contesto della frase

---

### 3. 📝 L'Addestramento — Il Testo Bucato

La terza scheda simula il **Masked Language Modeling**, la tecnica di pre-addestramento alla base di GPT, BERT e dei moderni LLM:

```
Frase: « Oggi a pranzo ho mangiato un gustoso piatto di [ ??? ] »
```

L'antenna di un neurone parte disorientata nello spazio 3D e viene corretta in 3 passi:

```
❌ Passo 1 — GALASSIA 🌌   → Errore di dominio (puntamento casuale)
⚠️ Passo 2 — PIETANZE 🍲   → Categoria giusta, ma parola robotica e astratta
✅ Passo 3 — SPAGHETTI 🍝  → Precisione 100%: naturale, appetitoso, contestuale
```

Tre modalità di esplorazione: passo singolo, percorso completo animato (900ms/passo), ricomincia.

---

### 4. 🎼 L'Orchestra 3D di ChatGPT

La quarta scheda mostra come ChatGPT genera la parola successiva attraverso la **votazione parallela di miliardi di neuroni specializzati**, rappresentati da 3 Giudici:

| Giudice | Colore | Domanda posta |
|---|:---:|---|
| Giudice Cibo | 🟡 Giallo | "È una pietanza commestibile adatta al contesto?" |
| Giudice Emozione | 🔴 Rosso | "Si adatta al tono emotivo della frase?" |
| Giudice Grammatica | 🔵 Blu | "Concorda grammaticalmente con l'articolo «una bella»?" |

**La frase di test:**
> *«Dopo una giornata di pioggia gelida, che gioia sedersi a tavola e scaldarsi con una bella [ ... ]»*

Questa frase è costruita per massimizzare la varietà degli errori, generando 5 categorie di risultato:

| Categoria | Esempi | Esito |
|---|---|---|
| 🟢 Consenso unanime | Zuppa, Cioccolata, Tisana | Tutti e 3 i fasci convergono (+30 pt → 99.8%) |
| 🔴 Veto grammaticale | Minestrone, Brodo, Tè | Il fascio Blu si spezza (maschili, incompatibili con «una bella») |
| ❄️ Veto emotivo | Granita, Insalata, Gelato | Il fascio Rosso si spezza (freddi, contraddittori col contesto) |
| 🧣 Veto semantico | Coperta, Doccia | Il fascio Giallo si spezza (non è cibo da tavola) |
| ⛔ Doppio veto | Gelato | Due fasci si spezzano simultaneamente (-12 pt) |
| 🌌 Fuori contesto | Galassia | Silenzio totale (0 pt) |

**Il collegamento Punteggio → Percentuale (Logit → Softmax):**

Un tooltip tecnico `?` affiancato al verdetto spiega:
- I neuroni assegnano prima **voti numerici grezzi** (Logit): +10 per ogni approvazione, -10 per ogni veto
- La formula **Softmax** trasforma la somma in probabilità: +30 pt → **99.8%** (parola scelta), veto → **< 0.1%** (parola scartata)

**Campo di input libero** — L'utente può digitare qualsiasi parola italiana e ricevere un'analisi simulata in tempo reale, con autocompletamento sui 12 vocaboli determinati.

---

## 🛠️ Stack Tecnologico

| Componente | Tecnologia | Versione |
|---|---|---|
| Rendering 3D | [Three.js](https://threejs.org/) via CDN | r128 |
| Linguaggio | Vanilla JavaScript (ES6+) | — |
| Stile | CSS3 (Custom Properties, Grid, Flex) | — |
| Font | Google Fonts (Plus Jakarta Sans, Space Grotesk) | — |
| Framework | **Nessuno** | — |
| Build tool | **Nessuno** | — |
| Server | **Nessuno richiesto** | — |

---

## 🔬 Accuratezza Scientifica

Il progetto opera su **semplificazioni consapevoli** — ogni compromesso è documentato e non introduce errori concettuali:

| Semplificazione | Realtà | Giustificazione |
|---|---|---|
| 3 dimensioni | 768–4096 dimensioni | Dichiarato nello Schermo della Realtà |
| 3 Giudici | Decine di testine di attenzione multi-head | L'idea del voto parallelo specializzato è preservata |
| +10 / -10 discreto | Punteggi Logit continui | Colmato dal tooltip Logit → Softmax |
| Assenza di bias *b* | W·x + b | Il gradiente cromatico rappresenta la non-linearità |
| 54 concetti fissi | Vocabolario di miliardi di token | Sufficiente per mostrare la topologia semantica |

I concetti tecnici corretti inclusi: **Embedding Space**, **Peso Sinaptico**, **Backpropagation**, **Masked Language Modeling**, **Self-Attention**, **Transformer**, **Logit**, **Softmax**, **TPU/GPU**.

---

## 📖 Documentazione

### Glossario Tecnico Integrato

Ogni scheda contiene micro-badge `?` cliccabili/toccabili che espongono la definizione tecnica precisa di:

`Dendriti` · `Soma / Nucleo` · `Assone` · `Pesi Sinaptici` · `Vicinanza Semantica` · `Cluster Semantico` · `Correzione dell'Errore (Backpropagation)` · `Soglia di Consenso` · `Iper-Spazio Semantico` · `Vettore di Embedding` · `Chip TPU / GPU` · `Moltiplicazione di Matrici` · `Meccanismo di Attenzione (Self-Attention)` · `Logit → Softmax`

### Controlli

| Azione | Desktop | Mobile |
|---|---|---|
| Rotazione sfera | Trascina con mouse | Trascina con dito |
| Zoom | Rotellina del mouse | Pinch-to-zoom |
| Zoom slider | Cursore in basso | Cursore in basso |
| Tooltips `?` | Hover o clic | Tap |
| Navigazione Tab | Clic sui pulsanti | Tap sui pulsanti |

---

## 🎨 Design System

- **Palette:** sfondo `#03050a` (quasi nero) con accenti ciano `#38bdf8`, ambra `#fbbf24`, smeraldo `#34d399`, corallo `#f43f5e`, viola `#a78bfa`
- **Tipografia:** Plus Jakarta Sans (testo UI), Space Grotesk (titoli e badge)
- **Filamenti 3D:** `TubeGeometry` con raggio `0.018` e gradiente cromatico vertex-by-vertex + `AdditiveBlending`
- **Sprite label:** texture 1024×256 px (POT) con `LinearFilter` per testo razor-sharp

---

## 📄 Licenza

Distribuito sotto licenza **MIT**. Sei libero di usare, modificare e distribuire questo progetto anche per scopi commerciali, a condizione di mantenere l'attribuzione.

---

## 👤 Autore

Progetto ideato e sviluppato da **Megamike80**
Repository: [github.com/Megamike80/Neuroscope-3D](https://github.com/Megamike80/Neuroscope-3D)

---

## 🏷️ Tag

`three.js` · `neural-networks` · `webgl` · `education` · `ai` · `chatgpt` · `embedding` · `transformer` · `didattica` · `divulgazione-scientifica`

---

<div align="center">

*«La comprensione non richiede formule — richiede le immagini giuste.»*

</div>
