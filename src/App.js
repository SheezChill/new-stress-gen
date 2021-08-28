import { useEffect, useRef, useState } from 'react';
import './style/app.scss';
import Templates from './Templates.json'

function App() {
  const [populated, setPopulated] = useState(true);
  const [currentHovered, setCurrentHovered] = useState(false);
  const [rawName, setRawName] = useState('keqing');
  const [name, setName] = useState(`<strong>${rawName}</strong>`)
  const [nameCaps, setNameCaps] = useState(rawName.toUpperCase());
  const [currentActive, setCurrentActive] = useState('wangy');
  const [rawTemplate, setRawTemplate] = useState('${nameCaps} ${nameCaps} ${nameCaps} ❤️ ❤️ ❤️ WANGI WANGI WANGI WANGI HU HA HU HA HU HA, aaaah baunya rambut ${name} wangi aku mau nyiumin aroma wanginya ${name} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~~~ AAAAAH ${name} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${nameCaps} AAAAA LUCCUUUUUUUUUUUUUUU............${nameCaps} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${name} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${name} gw ...${name} di laptop ngeliatin gw, ${name} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${name} aku gak mau merelakan ${name} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${nameCaps} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH')
  const [currentTemplate, setCurrentTemplate] = useState(eval('`' + rawTemplate + '`'));
  const hoveredBefore = useRef('');

  const populatedListener = (e) => {
    if (e.target.value) {
      setPopulated(true)
    } else {
      setPopulated(false)
    }
  }

  const moveButtonHighlight = (e) => {
    hoveredBefore.current = e.relatedTarget;
    setCurrentHovered(e.target);
  }

  useEffect(() => {
    setCurrentTemplate(eval('`' + rawTemplate + '`'));
  }, [rawTemplate])

  useEffect(() => {
    setName(`<strong>${rawName}</strong>`);
  }, [rawName])

  useEffect(() => {
    setNameCaps(name.toUpperCase());
  }, [name])

  useEffect(() => {
    setCurrentTemplate(eval('`' + rawTemplate + '`'));
  }, [nameCaps])

  return (
    <div className="App">
      <div className={populated ? 'wrap populated' : 'wrap'}>
        <input type="text" className="input" maxLength="20" spellCheck="false" value={rawName} onKeyUp={e => populatedListener(e)} onChange={e => setRawName(e.target.value.toLowerCase())} />
        <label>Name</label>
      </div>
      <div>
        <p>Templates</p>
        <div className="buttons-container">
          <div 
            className="highlight"
            style={{
              width: currentHovered.offsetWidth || 0,
              transform: `translate(${currentHovered.offsetLeft || 0}px, ${currentHovered.offsetTop || 0}px)`,
              transitionDuration: hoveredBefore.current instanceof HTMLButtonElement ? '150ms' : '0ms'
            }}
          ></div>
          {
            Templates.map((template, index) => {
              return <button className={currentActive === template.templateName ? 'active': null} key={index} onMouseEnter={e => moveButtonHighlight(e)} onClick={() => {setRawTemplate(template.copypasta); setCurrentActive(template.templateName)}}>{template.templateName}</button>
            })
          }
        </div>
      </div>
    <div className="output" dangerouslySetInnerHTML={{ __html: rawName ? currentTemplate : 'Input name' }}></div>
    </div>
  );
}

export default App;
