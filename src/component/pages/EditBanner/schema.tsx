import * as yup from 'yup';

const schema = yup.object().shape({
    id: yup.number(),
    image: yup.object().shape({
        url: yup.mixed() as yup.Schema<File | null>,
        alt: yup.string().required('Alt text is required'),
    }),
    text: yup.string().required('Text is required'),
    createAt: yup.date().required('Creation date is required'),
    author: yup.string().required('Author is required'),
    rating: yup.number().required('Rating is required'),
    sale: yup.number().required('Sale is required'),
    category: yup.string().required('Category is required'),
});

export default schema