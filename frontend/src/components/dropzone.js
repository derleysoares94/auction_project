import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/dropzone.css';

const MyDropzone = ({ onImageSelect }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const onDrop = (acceptedFiles) => {
        // Gera uma URL temporária para o arquivo carregado
        const file = acceptedFiles[0];
        if (file) {
            onImageSelect(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className='dropzine-div' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag 'n' drop the product's image.</p>
            )}
            {/* Exibe a pré-visualização da imagem */}
            {imagePreview && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '60px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default MyDropzone;