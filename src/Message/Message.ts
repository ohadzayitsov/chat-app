import styled from "styled-components";

export const ContainerMessage = styled.div<{ $isConnectedUser: boolean }>`
  direction: ${(props) => (props.$isConnectedUser ? "ltr" : "rtl")};
  display: flex;
  align-items: flex-start;
  margin: 10px;
`;
export const TimeStemp = styled.div`
  font-size: 8px;
  align-self: flex-end;
  padding: 2px 10px;
  flex: 1;
`;

export const Message = styled.div<{ $isConnectedUser: boolean }>`
  margin: 0 10px;
  display: inline-block;
  background: #ccc;
  border-radius: 5px;
  padding: 10px;
  direction: ltr;
  background-color: ${(props) =>
    props.$isConnectedUser ? "#c3d7ec" : "#e3e3e4"};
  min-width: -webkit-fill-available;
  word-break:break-all
`;