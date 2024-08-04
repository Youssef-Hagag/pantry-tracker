"use client";
import { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Card, CardContent, CardMedia, Typography, Button, Box, Modal, TextField } from '@mui/material';

const PantryList = ({ items }) => {
  const { removeItem, updateItem } = usePantry();
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = (item) => {
    setEditingItem(item.id);
    setName(item.name);
    setQuantity(item.quantity);
    setImageUrl(item.imageUrl);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedImageUrl = imageUrl;

    if (image) {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      updatedImageUrl = await getDownloadURL(imageRef);
    }

    const updatedItem = { name, quantity: parseInt(quantity, 10), imageUrl: updatedImageUrl };
    await updateItem(editingItem, updatedItem);

    setEditingItem(null);
    setName('');
    setQuantity('');
    setImage(null);
    setImageUrl('');
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      {items.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          {item.imageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={item.imageUrl}
              alt={item.name}
            />
          )}
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {item.quantity}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(item)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Modal
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Item
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Item'}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => setEditingItem(null)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PantryList;
