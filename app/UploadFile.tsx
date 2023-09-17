'use client'
import React from 'react'

const UploadFile = () => {
  const [file, setFile] = React.useState<File | null>(null)
  const [finalType, setFinalType] = React.useState<string>('')
  const [status, setStatus] = React.useState<string>('pending')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    try {
      const data = new FormData()
      data.set('file', file)
      data.set('finalType', finalType)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      if (!res.ok) {
        setStatus('error')
        throw new Error(await res.text())
      }
      setStatus('success')
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>{status}</h1>
      <form className="flex flex-col gap-5 w-[250px]" onSubmit={onSubmit}>
        <input
          className="border-2 border-gray-500"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <input
          className="border-2 border-gray-500"
          type="text"
          name="to"
          value={finalType}
          onChange={(e) => setFinalType(e.target.value)}
        />
        <button className="border-2 border-gray-500" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default UploadFile
