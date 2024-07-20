import React, { useEffect, useRef, useState } from 'react';
import styles from './Chats.module.css';
import { ArrowBackRounded, AttachFile, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../utils';
import { useSelector } from 'react-redux';
import text from '../../../mockData/chats.json';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Chats = ({ name }) => {
  const navigate = useNavigate();
  const messages = text;
  const [message, setMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const isSidebarOpen = useSelector((state) => state.global.isSidebarOpen);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [message, imagePreviews]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      messages.push(newMessage);
      setMessage('');
    }
  };

  const handleSendImages = () => {
    if (imageFiles.length > 0) {
      imageFiles.forEach((file, index) => {
        const newMessage = {
          id: messages.length + 1 + index,
          type: 'sent',
          content: `<img src="${imagePreviews[index]}" alt="image" />`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        messages.push(newMessage);
      });
      setImagePreviews([]);
      setImageFiles([]);
    }
  };

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const goBack = () => {
    navigate('../whatsapp');
  };

  const handleFileAttach = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = [];
    const newImageFiles = [];

    files.forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          newImagePreviews.push(fileReader.result);
          newImageFiles.push(file);
          if (newImagePreviews.length === files.length) {
            setImagePreviews(newImagePreviews);
            setImageFiles(newImageFiles);
          }
        };
        fileReader.readAsDataURL(file);
      }
    });
  };

  const handleClosePreview = () => {
    setImagePreviews([]);
    setImageFiles([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <a onClick={goBack} style={{ cursor: 'pointer' }}>
          <ArrowBackRounded sx={{ margin: 0, padding: 0 }} />
        </a>
        <div className={styles.profilePic}>
          <img src={getImageUrl('img.jpeg')} alt="profile" />
        </div>
        <div>{name}</div>
      </div>
      <div ref={messageContainerRef} className={styles.messages}>
        {messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${styles[message.type]}`}>
            <div className={styles['message-content']} dangerouslySetInnerHTML={{ __html: message.content }}></div>
            <div className={styles['message-time']}>{message.time}</div>
          </div>
        ))}
      </div>
      <div className={isSidebarOpen ? styles.chatBarOpen : styles.chatBarClose}>
        <label htmlFor="file-input" className={styles.fileAttachLabel} style={{ margin: 0, padding: 0 }}>
          <AttachFile />
        </label>
        <input
          type="file"
          id="file-input"
          className={styles.fileInput}
          accept="image/*"
          multiple
          onChange={handleFileAttach}
        />
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.sendBtn} onClick={handleSendMessage}>
          <Send />
        </button>
      </div>
      {imagePreviews.length > 0 && (
        <div className={styles.imagePreviewOverlay}>
          <div className={styles.imagePreviewContainer}>
            <Slider {...sliderSettings} className={styles.imageSlider}>
              {imagePreviews.map((preview, index) => (
                <div key={index} className={styles.imageSlide}>
                  <img src={preview} alt={`Image Preview ${index + 1}`} className={styles.imagePreview} />
                </div>
              ))}
            </Slider>
            <div className={styles.imagePreviewButtons}>
              <button onClick={handleClosePreview} className={styles.closePreviewButton}>Cancel</button>
              <button onClick={handleSendImages} className={styles.sendPreviewButton}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
