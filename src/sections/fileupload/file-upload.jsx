import React, { useState } from 'react';

import {
Box,
List,
Stack,
Button,
ListItem,
Typography,
LinearProgress,
} from '@mui/material';

const FileUpload = () => {
const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);
const [uploadedFiles, setUploadedFiles] = useState([]);

const handleFileChange = (e) => {
setFile(e.target.files[0]);
};

const handleUpload = () => {
if (file) {
    setUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
    setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
    }, 500);

    // Simulate API call for file upload
    setTimeout(() => {
    clearInterval(interval);
    setUploading(false);
    setProgress(0);

    // Add the uploaded file's name and file object to the list
    setUploadedFiles((prevFiles) => [...prevFiles, { name: file.name, file }]);

    setFile(null);
    }, 5000);
}
};

return (
<>
    <Typography variant="h4" sx={{ mb: 5 }}>
    Upload Files
    </Typography>
    <Box
    component="label"
    htmlFor="fileInput"
    sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px dashed',
        borderRadius: 1.5,
        p: 1,
        '&:hover': { bgcolor: 'background.default' },
    }}
    >
        <Stack direction="row" spacing={2} alignItems="center">
            <input type="file" id="fileInput" onChange={handleFileChange} />
            <Typography variant="subtitle2" color="text.secondary">
            {file ? file.name : 'Choose a file'}
            </Typography>
        </Stack>
    </Box>

    <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2, mb: 2 }}>
    Upload
    </Button>

    {uploading && (
    <div>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
        {`${progress}% Uploaded`}
        </Typography>
    </div>
    )}
    <Typography variant="h6" sx={{ mt: 2 }}>
    Uploaded files:
    </Typography>
    <List sx={{ mt: 2 }}>
    {uploadedFiles.map(({ name, file: uploadedFile }, index) => (
        <ListItem key={index}>
        <Typography variant="body2" sx={{ marginRight: 1 }}>
            {name}:
        </Typography>
        <a href={URL.createObjectURL(uploadedFile)} download={name}>
            Download
        </a>
        </ListItem>
    ))}
    </List>
</>
);
};

export default FileUpload;
