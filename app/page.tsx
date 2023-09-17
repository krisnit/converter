import UploadFile from './UploadFile'

export default function Home() {
  return (
    <main className="flex flex-col gap-10 m-10 p-3">
      <h1>Upload file</h1>
      <UploadFile />
    </main>
  )
}
