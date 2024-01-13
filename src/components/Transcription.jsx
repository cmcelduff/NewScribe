import React from 'react'

export default function Transcription(props) {
    const { textElement } = props

    const finalText = output.map(val => val.text)
    return (
        <div>{finalText}</div>
    )
}