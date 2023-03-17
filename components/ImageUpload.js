import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

export default function ImageUpload ({ 
    onChange, 
    label, 
    value, 
    disabled 
}) {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64) => {
        onChange(base64);
    },[onChange]);

    const handleDrop = useCallback((files) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setBase64(e.target.result);
            handleChange(e.target.result);
        }

        reader.readAsDataURL(file)
    }, [handleChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, 
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg' : [],
            'image/png' : []
        }
    });

    return (
        <div 
            {...getRootProps({
                className: 'w-full p-4 text-space-black text-center border-2 border-dotted rounded-md border-neutral-700'
            })}>
            <input {...getInputProps()} />
            { base64 ? (
                <div className="flex items-center justify-center">
                    <Image 
                        src={base64}
                        height="100"
                        width="100"
                        alt="Uploaded image"
                    />
                </div>
            ) : (
                <p className="text-space-black">{label}</p>
            )}
        </div>
    )
}
