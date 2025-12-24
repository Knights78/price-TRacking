"use client"

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import AuthModal from './AuthModal'
import { addProduct } from '@/app/action'
const AddProductForm = ({user}) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Submitting URL:", url);
    if(!user){
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    const formData=new FormData();
    formData.append("url",url);
    try{
      const response=await addProduct(formData);
      if(response.error){
        alert(response.error);
      }
      else{
        alert("Product added successfully");
        setUrl('');
      }
      setLoading(false);
    }
    catch{
      console.log("Error in adding product");
      setLoading(false);
    }
  }
  return (
    <>
     <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL (Amazon, Walmart, etc.)"
            className="h-12 text-base"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="
              bg-white 
              text-cyan-600 
              border 
              border-cyan-600 
              hover:bg-cyan-50 
              h-10 sm:h-12 px-8
            "
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>
      </form>
      <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
        />
      </>

      
  )
}

export default AddProductForm
