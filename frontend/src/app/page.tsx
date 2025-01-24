import FileUploader from "./components/FileUploader";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <main className="w-full max-w-md p-8 bg-white/80 backdrop:blur-lg rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Excel File Uploader
        </h1>
        <FileUploader />
      </main>
    </div>
  );
}
