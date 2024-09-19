import React, { useEffect, useRef, useState } from 'react';
import styles from './Chats.module.css';
import { ArrowBack, ArrowBackIos, ArrowBackRounded, ArrowForward, ArrowForwardIos, AttachFile, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../utils';
import { useSelector } from 'react-redux';
import text from '../../../mockData/chats.json';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import endpoints from "../../../APIendpoints.jsx";
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';


export const Chats = ({ name, contact_id, phone }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const isSidebarOpen = useSelector((state) => state.global.isSidebarOpen);
  const messageContainerRef = useRef(null);
  const [isTemplate, setIsTemplate] = useState();
  const user_id = useSelector((state) => state.login.user)


  console.log('user_id: ', user_id);
  console.log('isTemplate: ', isTemplate);
  console.log('Phone: ', phone);
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [message, imagePreviews]);

  const fetchMessages = async () => {
    const response = await axios.get(endpoints.chats, { params: { contact_id } })
    console.log('response: ', response.data);
    if (response.status == 200) {
      setMessages(response.data.chats)
      setIsTemplate(response.data.is_template)
    }

  }
  //Convert GMT to IST format
  const convertToIST = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-IN", options);
  };

  useEffect(() => {
    fetchMessages()
  }, [isTemplate])

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      const newMessage = {
        user_id: user_id,
        type: 'text',
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: contact_id,
        text: {
          preview_url: false,
          body: message
        }
      };

      const latestMessage = {
        type: "sent",
        content: message,
        time: new Date().toISOString()
      }

      setMessages(prevMessages => [...prevMessages, latestMessage]);
      try {
        // Send the message to the backend
        const response = await axios.post(endpoints.textMessage, newMessage);

        // Handle response if necessary
        console.log('Message sent successfully:', response.data);

        // Clear the input field after sending
        setMessage('');

      } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error sending message:', error);
      }
    }

  };

  //   {
  //     "user_id": "8e79227f0cb44413a67cc026396d8978",
  //     "messaging_product": "whatsapp",    
  //     "recipient_type": "individual",
  //     "to": "9108444564",
  //     "type": "text",
  //     "text": {
  //         "preview_url": false,
  //         "body": "message from auth svc API"
  //     }
  // }

  // const handleSendImages = () => {
  //   if (imageFiles.length > 0) {
  //     imageFiles.forEach((file, index) => {
  //       const newMessage = {
  //         id: messages.length + 1 + index,
  //         type: 'sent',
  //         content: `<img src="${imagePreviews[index]}" alt="image" />`,
  //         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       };
  //       messages.push(newMessage);
  //     });
  //     setImagePreviews([]);
  //     setImageFiles([]);
  //   }
  // };
  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ 
  //         ...style, 
  //         display: "flex", 
  //         justifyContent: "center", 
  //         alignItems: "center", 
  //         background: "gray", 
  //         borderRadius: "50%", 
  //         height: "50px", 
  //         width: "50px" 
  //       }}
  //       onClick={onClick}
  //     >
  //       <ArrowForward style={{ color: "white" }} />
  //     </div>
  //   );
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ 
  //         ...style, 
  //         display: "flex", 
  //         justifyContent: "center", 
  //         alignItems: "center", 
  //         background: "gray", 
  //         borderRadius: "50%", 
  //         height: "50px", 
  //         width: "50px",
  //         zIndex: 2
  //       }}
  //       onClick={onClick}
  //     >
  //       <ArrowBack style={{ color: "white", display: "flex", justifyContent: "center"}} />
  //     </div>
  //   );
  // }
  // const sliderSettings = {
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   swipeToSlide: true,
  //   adaptiveHeight: true,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   arrows: true
  // };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTemplateMessage = async () => {
    try {
      const response = await axios.post(endpoints.template, { params: { phone } }); // Adjust endpoint as necessary
      if (response.status === 200) {

        setIsTemplate(false);
      }
    }
    catch (error) {
      console.log('Error fetching template message:', error);
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

  const handleRefreshContacts = () => {
    fetchMessages();
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>

        <a onClick={goBack} style={{ cursor: 'pointer' }}>
          <ArrowBackRounded sx={{ margin: 0, padding: 0 }} />
        </a>
        <div className={styles.profilePic}>
          <img src={getImageUrl('img.jpeg')} alt="profile" />
        </div>
        <div>
          <div>
            {name}
          </div>
          <p className={styles.phone}>
            {phone}
          </p>
        </div>

        </div>
        <Tooltip title="Click to update the chats" componentsProps={{
          tooltip: {
            sx: {
              fontSize: "16px"
            },
          },
        }}>
          <IconButton className={styles.refreshIcon} onClick={handleRefreshContacts}><RefreshIcon sx={{ color: "#3d3d3d", fontSize: "36px" }} /></IconButton>
        </Tooltip>

      </div>
      <div ref={messageContainerRef} className={styles.messages}>
        {messages ? (messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${styles[message.type]}`}>
            <div className={styles['message-content']} dangerouslySetInnerHTML={{ __html: message.content }}></div>
            <div className={styles['message-time']}>{convertToIST(message.time)}</div>
          </div>
        ))) : (<div style={{ fontSize: "30px", width: "100%", textAlign: "center", paddingTop: "20px" }}>Start Messaging Now</div>)}

        {isTemplate && (
          <button className={styles.templateButton} onClick={handleTemplateMessage}>
            Send Template Message
          </button>
        )}
      </div>
      <div className={isSidebarOpen ? styles.chatBarOpen : styles.chatBarClose}>
        {/* <label htmlFor="file-input" className={styles.fileAttachLabel} style={{ margin: 0, padding: 0 }}>
          <AttachFile />
        </label>
        <input
          type="file"
          id="file-input"
          className={styles.fileInput}
          accept="image/*"
          multiple
          onChange={handleFileAttach}
        /> */}

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
      {/* {imagePreviews.length > 0 && (
        <div className={isSidebarOpen ? styles.imagePreviewOverlayOpen : styles.imagePreviewOverlayClosed}>
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
      )} */}
    </div>
  );
};
