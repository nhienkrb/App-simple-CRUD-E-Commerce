import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const ChatBotSupport = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    // Hiển thị tin nhắn người dùng
    setMessages((prev) => [...prev, { text: userMessage, from: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply || "Xin lỗi, không có phản hồi.", from: "bot" },
      ]);
    } catch (error) {
      console.error("Lỗi gửi chatbot:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Lỗi máy chủ. Vui lòng thử lại sau.", from: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Nút bật/tắt chat */}
      {!open ? (
        <IconButton
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: '#a4161a',
          color: '#fff',
          boxShadow: '0 0 0 10px rgba(164, 22, 26, 0.2)',
          '&:hover': { background: '#870d11' },
          }}
          onClick={() => setOpen(true)}
        >
          <ChatIcon />
        </IconButton>
      ) : (
        <Paper
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 320,
            height: 400,
            maxHeight: 500,
            display: "flex",
            flexDirection: "column",
            boxShadow: 6,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1,
              backgroundColor: "#1976d2",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Trợ lý tư vấn</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Tin nhắn */}
          <Box sx={{ p: 1, flex: 1, overflowY: "auto", backgroundColor: "#f5f5f5" }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: msg.from === "user" ? "#1976d2" : "#e0e0e0",
                    color: msg.from === "user" ? "#fff" : "#000",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Box
            sx={{
              display: "flex",
              borderTop: "1px solid #ccc",
              p: 1,
              backgroundColor: "#fff",
            }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              sx={{ ml: 1 }}
            >
              Gửi
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatBotSupport;
