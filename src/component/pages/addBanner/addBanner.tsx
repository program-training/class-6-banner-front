import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './AddBanner.css';
import { useNavigate, useParams } from 'react-router-dom';

interface BannerFormData {
    id: number;
    image: {
        url:  File | null;
        alt: string;
    };
    text: string;
    createAt: Date;
    author: string;
    rating: number;
    sale: number;
    category: string;
    productID?: string;
}

const schema = yup.object().shape({
    id: yup.number().required('ID is required'),
    image: yup.object().shape({
        url:yup.mixed().required('Image is required') as yup.Schema<File | null>,
        alt: yup.string().required('Alt text is required'),
    }),
    text: yup.string().required('Text is required'),
    createAt: yup.date().required('Creation date is required'),
    author: yup.string().required('Author is required'),
    rating: yup.number().required('Rating is required'),
    sale: yup.number().required('Sale is required'),
    category: yup.string().required('Category is required'),
});

const AddBanner: React.FC = () => {
    const Navigate = useNavigate()
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [status, setStatus] = useState('');
    const {id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BannerFormData>({
        resolver: yupResolver(schema),
    });

    const getBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImage(reader.result);
        };
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            getBase64(e.target.files[0]);
        }
    }
    
    const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
        const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
    
        try {
            const requestData = {
                "id": data.id,
                "image": {
                    "url": image,
                    "alt": data.image.alt,
                },
                "text": data.text,
                "createAt": data.createAt,
                "author": data.author,
                "rating": data.rating,
                "sale": data.sale,
                "category": data.category,
                "productID": id,
            };
            const response = await axios.post('http://localhost:8008/api/banners', requestData, options);
            if (response.status < 210) {
                console.log('Banner added successfully');
                setStatus('Banner added successfully!');
                Navigate('/userBanners')
            } else {
                console.error('Failed to add banner');
                setStatus('Failed to add banner! please try again!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <Box sx={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <Typography sx={{ textAlign: "center", fontSize: "30px" }}>Add New Banner</Typography>
            <Box component="form" sx={{ backgroundColor: "#f9f9f9", padding: "20px", paddingLeft: "85px", borderRadius: "8px" }} onSubmit={handleSubmit(onSubmit)}>
                <TextField className='formField'
                    label="ID:"
                    {...register('id')}
                    error={!!errors.id}
                    helperText={errors.id?.message}
                />
                <TextField className='formField'
                    type='file'
                    label="Upload image"
                    {...register('image.url')}
                    onChange={onImageChange}
                    error={!!errors.image?.url}
                    helperText={errors.image?.url?.message}
                />
                <TextField className='formField'
                    label="Alt"
                    {...register('image.alt')}
                    error={!!errors.image?.alt}
                    helperText={errors.image?.alt?.message}
                />
                <TextField className='formField'
                    label="Text:"
                    {...register('text')}
                    error={!!errors.text}
                    helperText={errors.text?.message}
                />
                <TextField className='formField'
                    sx={{ width: "222px" }}
                    type='date'
                    label="Create at:"
                    {...register('createAt')}
                    error={!!errors.createAt}
                    helperText={errors.createAt?.message}
                />
                <TextField className='formField'
                    label="Author:"
                    {...register('author')}
                    error={!!errors.author}
                    helperText={errors.author?.message}
                />
                <TextField className='formField'
                    type='number'
                    label="Rating:"
                    {...register('rating')}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                />
                <TextField className='formField'
                    type='number'
                    label="sale"
                    {...register('sale')}
                    error={!!errors.sale}
                    helperText={errors.sale?.message}
                />
                <TextField className='formField'
                    label="category"
                    {...register('category')}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                />
                <Button type='submit' variant="contained">
                    Add Banner
                </Button>
                <Typography color={status === 'Banner added successfully!' ? 'success' : 'error'}>
                    {status}
                </Typography>
            </Box>
        </Box>
    );
};

export default AddBanner;