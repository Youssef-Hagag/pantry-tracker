"use client";
import { useState } from 'react';
import { usePantry } from '@/context/PantryContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const AddItem = () => {
  const { addItem } = usePantry();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';
    if (image) {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addItem({ name, quantity: parseInt(quantity, 10), imageUrl });
    setName('');
    setQuantity('');
    setImage(null);
    setLoading(false);
    router.push('/list');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        px: { xs: 2, sm: 4, md: 6, lg: 10 },  
        py: { xs: 4, sm: 6 },  
        boxShadow: 0,
        backgroundColor: theme.palette.background.main,
        width: '100%', 
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Add New Item
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        type="file"
        onChange={handleImageChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddItem;
