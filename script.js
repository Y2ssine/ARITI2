const STORAGE_KEY = 'ariti.reasons.v1'

const defaultReasons = [
  {title: 'Your smile', text: 'It brightens my darkest days and makes everything feel possible.'},
  {title: 'Your personality', text: 'You are kind, curious and brave in small ways that matter.'},
  {title: 'Your hair', text: 'I love the way it moves when you laugh or when the wind plays with it.'},
  {title: 'Your humor', text: 'You make me laugh from my belly — even at silly things.'},
  {title: 'Your eyes', text: 'They are warm and honest; I get lost in them.'},
  {title: 'Your voice', text: 'The sound of your voice calms me; I love hearing you talk about things you care about.'},
  {title: 'Your hugs', text: 'They feel like home — safe, warm and perfectly timed.'},
  {title: 'Your small gestures', text: 'The little things you do show how thoughtful you are.'},
  {title: 'How you listen', text: 'You make me feel heard, and that makes us stronger.'},

  // More meaningful reasons
  {title: 'Your patience', text: 'You stay calm when things get messy, and that steadiness means everything.'},
  {title: 'Your curiosity', text: 'You always want to learn and see the world; it inspires me.'},
  {title: 'Your support', text: 'You believe in me on days I doubt myself.'},
  {title: 'The way you care', text: 'You remember the little details about people and make them feel special.'},
  {title: 'Our quiet moments', text: 'Sitting beside you doing nothing feels like the best place to be.'},
  {title: 'Your courage', text: 'You try hard things and admit when you\'re scared — real bravery.'},

  // Funny / playful reasons
  {title: 'Your weird dance moves', text: 'No one dances like you; it\'s gloriously awkward and I adore it.'},
  {title: 'How you steal my fries', text: 'It\'s a crime I never report because I love sharing food with you.'},
  {title: 'Your dramatic gasps', text: 'Those perfectly timed reactions deserve an Oscar.'},
  {title: 'How you make weird faces', text: 'You can turn any serious moment into a comedy skit.'},
  {title: 'Your late-night snack skills', text: 'You\'re the CEO of midnight cereals and cozy recipes.'},
  {title: 'You laugh at my bad jokes', text: 'Even the terrible ones feel like hits because you\'re laughing.'},
  {title: 'Your playlist choices', text: 'You mix guilty pleasures and deep cuts perfectly.'},

  // Silly and sweet micro-reasons
  {title: 'You make weird nicknames', text: 'I keep them because they\'re our private language.'},
  {title: 'Your sleepy hair', text: 'The morning mess is my favorite look.'},
  {title: 'You try new foods', text: 'You\'re always open to silly culinary adventures with me.'},
  {title: 'How you say my name', text: 'The way you say it makes it feel special every time.'},

  // Little everyday things
  {title: 'You text back', text: 'Even a short message from you makes my day.'},
  {title: 'You plan surprises', text: 'Those thoughtful little surprises show how much you care.'},
  {title: 'You read with me', text: 'Sharing a book or a show makes simple moments meaningful.'},
  {title: 'Your courage to apologize', text: 'You own mistakes and grow — one of the most beautiful things.'},

  // Light-hearted compliments
  {title: 'You\'re my favorite weirdo', text: 'Perfectly imperfect and absolutely lovable.'},
  {title: 'You\'re dangerously cute', text: 'I\'m easily distracted by you (and I don\'t mind).'},
  {title: 'You make Mondays better', text: 'Even Mondays feel softer when you\'re around.'},

  // Finish with an invitation to add more
  {title: 'And many more…', text: 'I could write a thousand reasons and still find new ones every day.'}
]

function loadReasons(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw) return defaultReasons.slice()
    return JSON.parse(raw)
  }catch(e){
    console.error('Failed to load reasons', e)
    return defaultReasons.slice()
  }
}

function saveReasons(arr){
  try{localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))}catch(e){console.error(e)}
}

function createCard(reason){
  const el = document.createElement('article')
  el.className = 'card'
  const title = document.createElement('h3')
  title.textContent = reason.title
  const p = document.createElement('p')
  p.textContent = reason.text || ''
  el.appendChild(title)
  el.appendChild(p)
  return el
}

function render(){
  const container = document.getElementById('reasons')
  container.innerHTML = ''
  const reasons = loadReasons()
  if(reasons.length === 0){
    const empty = document.createElement('div')
    empty.className = 'empty'
    empty.textContent = 'No reasons yet — add the first one ❤️'
    container.appendChild(empty)
    return
  }
  reasons.forEach(r => container.appendChild(createCard(r)))
}

document.getElementById('addReasonForm').addEventListener('submit', e =>{
  e.preventDefault()
  const input = document.getElementById('reasonInput')
  const raw = input.value.trim()
  if(!raw) return
  const parts = raw.split(/\s*-\s*/)
  const title = parts[0]
  const text = parts[1] || ''
  const reasons = loadReasons()
  reasons.unshift({title,text})
  saveReasons(reasons)
  input.value = ''
  render()
})

// initial render
render()

// -------- question interaction: play sound + hearts
const audioCtx = (typeof AudioContext !== 'undefined') ? new AudioContext() : null

function playHappyTone(){
  if(!audioCtx) return
  const o = audioCtx.createOscillator()
  const g = audioCtx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(880, audioCtx.currentTime)
  g.gain.setValueAtTime(0, audioCtx.currentTime)
  g.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.02)
  o.connect(g)
  g.connect(audioCtx.destination)
  o.start()
  o.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.25)
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.9)
  o.stop(audioCtx.currentTime + 1)
}

function makeHeart(){
  const wrapper = document.createElement('div')
  wrapper.className = 'heart-anim'
  wrapper.style.left = (20 + Math.random()*60) + '%'
  wrapper.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s-7.5-4.9-9.2-7.1C1.8 11.8 3.4 6.9 7.5 5.3 9.6 4.4 11.8 5 12 6.1c.2-1.1 2.4-1.7 4.5-.8 4.1 1.6 5.7 6.5 4.7 8.6C19.5 16.1 12 21 12 21z" fill="#ff6b9a"/>
    </svg>`
  return wrapper
}

function spawnHearts(times=6){
  const container = document.getElementById('hearts')
  for(let i=0;i<times;i++){
    const h = makeHeart()
    h.style.left = (10 + Math.random()*80) + '%'
    h.style.animationDelay = (i * 120) + 'ms'
    container.appendChild(h)
    setTimeout(()=>{ h.remove() }, 1600 + (i*120))
  }
}

document.querySelectorAll('.q-btn').forEach(btn =>{
  btn.addEventListener('click', async ()=>{
    if(audioCtx && audioCtx.state === 'suspended') await audioCtx.resume()
    playHappyTone()
    spawnHearts(6)
  })
})

// -------- mini 4x4 Sudoku implementation
const sudokuRoot = document.getElementById('sudoku')
const sudokuMessage = document.getElementById('sudokuMessage')

// easy 4x4 puzzle: 0 are empty spots. solution is known.
const sudokuPuzzle = [
  1,0,0,4,
  4,3,0,0,
  0,1,4,0,
  3,0,0,1
]
// We'll use a correct 4x4 solution (rows of 4 numbers 1-4 without repeats)
const sudokuCorrect = [
  1,2,3,4,
  4,3,2,1,
  2,1,4,3,
  3,4,1,2
]

function renderSudoku(){
  sudokuRoot.innerHTML = ''
  sudokuPuzzle.forEach((v,i)=>{
    const input = document.createElement('input')
    input.type = 'text'
    input.inputMode = 'numeric'
    input.maxLength = 1
    input.dataset.idx = i
    if(v !== 0){
      input.value = v
      input.disabled = true
      input.classList.add('prefill')
    }
    input.addEventListener('input', ()=>{
      input.value = input.value.replace(/[^1-4]/g,'')
    })
    sudokuRoot.appendChild(input)
  })
}

function readSudoku(){
  const vals = []
  sudokuRoot.querySelectorAll('input').forEach(inp => vals.push(parseInt(inp.value || '0',10)))
  return vals
}

function checkSudoku(){
  const vals = readSudoku()
  // validate rows and columns contain 1-4
  const ok = () => {
    for(let r=0;r<4;r++){
      const seen = new Set()
      for(let c=0;c<4;c++){
        const v = vals[r*4+c]
        if(!v || v<1 || v>4) return false
        if(seen.has(v)) return false
        seen.add(v)
      }
    }
    for(let c=0;c<4;c++){
      const seen = new Set()
      for(let r=0;r<4;r++){
        const v = vals[r*4+c]
        if(!v || v<1 || v>4) return false
        if(seen.has(v)) return false
        seen.add(v)
      }
    }
    return true
  }
  return ok()
}

document.getElementById('checkSudoku').addEventListener('click', async ()=>{
  const good = checkSudoku()
  if(good){
    sudokuMessage.textContent = 'You win! Now send me a funny picture of you 😄'
    if(audioCtx && audioCtx.state === 'suspended') await audioCtx.resume()
    playHappyTone()
    spawnHearts(10)
  }else{
    sudokuMessage.textContent = 'Not quite yet — try again! Tip: numbers 1–4, no repeats in rows/columns.'
  }
})

document.getElementById('resetSudoku').addEventListener('click', ()=>{
  // reset inputs to puzzle defaults
  sudokuRoot.querySelectorAll('input').forEach((inp)=>{
    const i = parseInt(inp.dataset.idx,10)
    if(sudokuPuzzle[i] !== 0){ inp.value = sudokuPuzzle[i]; inp.disabled = true }
    else { inp.value = ''; inp.disabled = false }
  })
  sudokuMessage.textContent = ''
})

// initialize
renderSudoku()
