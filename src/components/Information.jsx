import React, { useState } from 'react'

export default function Information(props) {
  const {output } = props
  const [tab, setTab] = useState('transcription')
  const [translation, setTranslation] = useState(null)
  const [toLanguage, setToLanguage] = useState('Select Language')
  const [translating, setTranslating] = useState(null)

  function handleCopy() {
    navigator.clipboard.writeText()
  }

  function handleDownload() {
    const element = document.createElement('a')
    const file = new Blob([], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download(`Freescribe_${new Date().toString()}.txt`)
    document.body.appendChild(element)
    element.click()
  }

  function generateTranslation() {
    if (translating || toLanguage === 'Select language'){
      return
    }

    setTranslating(true)

    Worker.current.postMessage({
      text: output.map(val => val.text),
      src_language: 'eng_Latin',
      tgt_lang: toLanguage
    })
  }


  const textElement = tab == 'transcription' ? output.map(val => val.text) : ''

  return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-72 sm:w-96 max-w-prose w-full mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>
    
        <div className='grid grid-cols-2 sm:mx-auto bg-white  rounded overflow-hidden items-center p-1 blueShadow border-[2px] border-solid border-blue-300'>
                <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>
            </div>
            <div className='my-8 flex flex-col'>
            {tab === 'transcription' ? (
                <Transcription {...props} textElement={textElement} />
            ) : (
                <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation}/>
            )}
            </div>
            <div className='flex items-center gap-4 mx-auto'>
              <button onClick={generateTranslation} title="Copy" className='bg-white hover:text-blue-500 duration-200 text-blue px-2 aspect-square grid place-items-center rounded'>
                <i className="fa-solid fa-copy"></i>
              </button>
              <button title="Download" className='bg-white hover:text-blue-500 duration-200 text-blue px-2 aspect-square grid place-items-center rounded'>
                <i className="fa-solid fa-download"></i>
              </button>
            </div>
    </main>
  )
}
