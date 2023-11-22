import React, { useEffect, useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../addBanner/AddBanner.css';

interface BannerFormData {
    _id: string;
    id?: number;
    image: {
        url: File | null;
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
    _id: yup.string().required('ID is required'),
    id:yup.number(),
    image: yup.object().shape({
        url: yup.mixed().required('Image is required') as yup.Schema<File | null>,
        alt: yup.string().required('Alt text is required'),
    }),
    text: yup.string().required('Text is required'),
    createAt: yup.date().required('Creation date is required'),
    author: yup.string().required('Author is required'),
    rating: yup.number().required('Rating is required'),
    sale: yup.number().required('Sale is required'),
    category: yup.string().required('Category is required'),
});

const EditBanner: React.FC = () => {
    const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(null);
    const [status, setStatus] = useState('');
    const { _id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<BannerFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/banners/${_id}`)
                const bannerData = response.data;
                setValue('id', bannerData.id);
                setValue('image.url', bannerData.image?.url);
                setValue('image.alt', bannerData.image?.alt);
                setValue('text', bannerData.text);
                setValue('createAt', new Date());
                setValue('author', bannerData.author);
                setValue('rating', bannerData.rating);
                setValue('sale', bannerData.sale);
                setValue('category', bannerData.category);
                setValue('productID', bannerData.productID);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };
        fetchBanner();
    }, [_id, setValue]);

    const getBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageBase64(reader.result);
        };
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            getBase64(e.target.files[0]);
        }
    }

    const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
        try {
            const requestData = {
                "id": data.id,
                "image": {
                    "url": imageBase64,
                    "alt": data.image.alt,
                },
                "text": data.text,
                "createAt": data.createAt,
                "author": data.author,
                "rating": data.rating,
                "sale": data.sale,
                "category": data.category,
                "productID": data.productID,
            };
            const response = await axios.put(`http://localhost:8008/api/banners/${_id}`, requestData);
            if (response.status < 210) {
                console.log('Banner updated successfully');
                setStatus('Banner updated successfully!');
            } else {
                console.error('Failed to update banner');
                setStatus('Failed to update banner! please try again!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <Typography sx={{ textAlign: "center", fontSize: "30px" }}>Edit Banner</Typography>
            <Box component="form" sx={{ backgroundColor: "#f9f9f9", padding: "20px", paddingLeft: "85px", borderRadius: "8px" }} onSubmit={handleSubmit(onSubmit)}>
                <InputLabel htmlFor="id">ID:</InputLabel>
                <TextField className='formField'
                    {...register('id')}
                    error={!!errors.id}
                    helperText={errors.id?.message}
                />
                <InputLabel htmlFor="image.url">Image URL:</InputLabel>
                <TextField className='formField'
                    type='file'
                    {...register('image.url')}
                    onChange={onImageChange}
                    error={!!errors.image?.url}
                    helperText={errors.image?.url?.message}
                />
                <InputLabel htmlFor="image.alt">Alt:</InputLabel>
                <TextField className='formField'
                    {...register('image.alt')}
                    error={!!errors.image?.alt}
                    helperText={errors.image?.alt?.message}
                />
                <InputLabel htmlFor="text">Text:</InputLabel>
                <TextField className='formField'
                    {...register('text')}
                    error={!!errors.text}
                    helperText={errors.text?.message}
                />
                <InputLabel htmlFor="createAt">Create at:</InputLabel>
                <TextField className='formField'
                    sx={{ width: "222px" }}
                    {...register('createAt')}
                    error={!!errors.createAt}
                    helperText={errors.createAt?.message}
                />
                <InputLabel htmlFor="author">Author:</InputLabel>
                <TextField className='formField'
                    {...register('author')}
                    error={!!errors.author}
                    helperText={errors.author?.message}
                />
                <InputLabel htmlFor="rating">Rating:</InputLabel>
                <TextField className='formField'
                    type='number'
                    {...register('rating')}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                />
                <InputLabel htmlFor="sale">Sale:</InputLabel>
                <TextField className='formField'
                    type='number'
                    {...register('sale')}
                    error={!!errors.sale}
                    helperText={errors.sale?.message}
                />
                <InputLabel htmlFor="category">Category:</InputLabel>
                <TextField className='formField'
                    {...register('category')}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                />
                <Button type='submit' variant="contained">
                    Edit Banner
                </Button>
                <Typography color={status === 'Banner updated successfully!' ? 'green' : 'red'}>
                    {status}
                </Typography>
            </Box>
        </Box>
    );
};

export default EditBanner;