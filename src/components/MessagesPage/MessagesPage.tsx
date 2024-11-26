import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GlobalContext } from "../../context/GlobalContext.tsx";
import * as S from "./messagePage.ts";
import { Avatar, CircularProgress, TextField } from "@mui/material";
import BannerSend from "../BannerSend/BannerSend.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from "../Header/Header.tsx";
import OneMessage from "../../Message/Message.tsx";

const MessagePage = () => {
  const { member, fachMemeber, messages, connectedUser } =
    useContext(GlobalContext);
  const defaultImage = "https://example.com/images/noa_cohen.jpg";
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const scrollableContainerRef = useRef<HTMLDivElement>(null);


  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fachMemeber();
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [location.pathname]);  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (container && !loading) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]); 

  const filteredAndSortedMessages = useMemo(() => {
    if (!messages || !connectedUser || !member) return [];
    return messages
      .filter(
        ({ to, from }) =>
          (to === connectedUser.code && from === member.code) ||
          (to === member.code && from === connectedUser.code)
      )
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
  }, [messages, connectedUser, member]);

  return (
    <S.Container>
      <Header icon={<ArrowForwardIcon onClick={handleBack} />} user={member} />
      <S.MessagesList ref={scrollableContainerRef}>
        {loading ? (
          <CircularProgress />
        ) : filteredAndSortedMessages.length > 0 ? (
          filteredAndSortedMessages.map((message) => (
            <OneMessage message={message}/>
          ))
        ) : (
          <S.EmptyState>No messages found</S.EmptyState>
        )}
      </S.MessagesList>
      <BannerSend />
    </S.Container>
  );
};

export default MessagePage;
