import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image, X, Check } from 'lucide-react'

export default function ImageUpload({ onImageSelect, imageUrl, cloudName = "drbeg47fg" }) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const uploadImage = async (file) => {
    if (!file) return
    
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'crochet-upload') // Your preset name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      
      const data = await response.json()
      onImageSelect(data.secure_url)
    } catch (error) {
      alert('Upload failed! Use Google image link instead.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files.length > 0) uploadImage(files[0])
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <motion.div
        className={`relative border-2 rounded-3xl p-12 text-center cursor-pointer transition-all ${
          dragActive 
            ? 'border-crochet-pink bg-crochet-pink/10 border-4 shadow-2xl' 
            : 'border-dashed border-crochet-pink/50 hover:border-crochet-pink'
        }`}
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-crochet-pink/30 border-t-crochet-pink rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-600">Uploading...</p>
          </div>
        ) : (
          <>
            <Upload className="w-16 h-16 text-crochet-pink mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-700 mb-2">
              {dragActive ? 'Drop image here!' : 'Drag & drop or click'}
            </p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
          </>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </motion.div>

      {/* Preview */}
      {imageUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-sm mx-auto"
        >
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-2xl shadow-xl"
          />
          <button
            onClick={() => onImageSelect('')}
            className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-2xl shadow-lg hover:bg-red-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-xs text-green-600 mt-2 text-center font-medium">
            <Check className="w-4 h-4 inline mr-1" />
            Ready for shop!
          </p>
        </motion.div>
      )}
    </div>
  )
}
