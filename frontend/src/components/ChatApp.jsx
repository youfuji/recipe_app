import { useState , useEffect, useRef } from "react";
//import "./ChatApp.css"; // CSSをインポート
import { Box, Button, Input, VStack, HStack, Text, Image, Link } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import bgImage from '../png/cooking_chef.png';
import food1Image from '../png/food_hamburg.png';
import food2Image from '../png/food_moritsuke_good.png';
import food3Image from '../png/food_omurice.png';
import food4Image from '../png/nabe_chanko.png';
import mameImage from '../png/sweets_mamegashi.png';
import oniImage from '../png/setsubun_akaoni_mame.png';


function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null); 
  const API_URL = "http://localhost:8000/chat"; // FastAPIのエンドポイント

    // **右から左へ流れるアニメーション**
  const movingxImage = keyframes`
    0% { transform: translateX(100vw); }
    100% { transform: translateX(-99vw); }
  `;
  const movingyImage = keyframes`
    0% { transform: translateY(0vh); }
    100% { transform: translateY(70vh); }
  `;
  // **右から左へ流れるアニメーション**
  const movingImage = keyframes`
    0% { transform: translateX(75vw); }
    50% { transform: translateX(0vw); }
    100% { transform: translateX(75vw); }
  `;

  // 画像を回転させるアニメーション
  const rotateImage = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;



  // 送信処理
  const sendMessage = async () => {
    if (!input.trim()) return;

    // ユーザーのメッセージを追加
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");




    try {
      // APIにリクエストを送信
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }), // JSON形式で送信
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)

      // Geminiまたは楽天レシピの応答を追加
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: ` ${data[0].message}`, url: `${data[0].url}`, image: `${data[0].image}`,sender: "gemini" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "エラーが発生しました。", sender: "gemini" },
      ]);
    }
  };
// // 送信処理
// const sendMessage = async () => {
//     if (!input.trim()) return;

//     // ユーザーのメッセージを追加
//     setMessages((prev) => [...prev, { text: input, sender: "user" }]);
//     setInput("");

//     try {
//       // APIリクエスト
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);


//       // レシピ情報をメッセージに追加
//       if (data.message.recipes && data.message.recipes.length > 0)
//         {
//         const recipeMessages = data.recipes.map((recipe) => ({
//           text: recipe.title,
//           url: recipe.url,
//           sender: "gemini",
//         }));

//         setMessages((prev) => [...prev, ...recipeMessages]);
//       } else {
//         setMessages((prev) => [...prev, { text: "ああああレシピが見つかりませんでした。", sender: "gemini" }]);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages((prev) => [...prev, { text: "エラーが発生しました。", sender: "gemini" }]);
//     }
//   };


  return (
    <Box
        display="flex"
        flexDirection="column"
        h="100vh"
        w="95vw"
        mx="auto"
        //bg="gray.100"
        borderRadius="3xl"
        boxShadow="lg"
        overflowX="hidden"
    >
    {/* <div className="chat-container"> */}
      {/* ヘッダー（アプリ名） */}
      <Box bg="orange.500" 
        color="white" 
        textAlign="center" 
        p={3} 
        fontSize="5xl" 
        fontWeight="bold"         
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl"
        borderBottomLeftRadius="none"
        borderBottomRightRadius="none"
        zIndex={1}
        data-state="open"
        >
        <Image
          src={food1Image}
          position="absolute"
          top="3%"
          left="5%"
          zIndex={0}
          boxSize="70px"
          objectFit="contain"
          animation={`${rotateImage} 10s linear infinite`}
        />
        <Image
          src={food4Image}
          position="absolute"
          top="3%"
          left="25%"
          zIndex={0}
          boxSize="70px"
          objectFit="contain"
          animation={`${rotateImage} 10s linear infinite`}
        />
        <Image
          src={food2Image}
          position="absolute"
          top="3%"
          left="70%"
          zIndex={0}
          boxSize="70px"
          objectFit="contain"
          animation={`${rotateImage} 10s linear infinite`}
        />
        <Image
          src={food3Image}
          position="absolute"
          top="3%"
          left="90%"
          zIndex={0}
          boxSize="70px"
          objectFit="contain"
          animation={`${rotateImage} 10s linear infinite`}
        />
        <Text fontFamily="'Potta One', cursive" letterSpacing="wide">
          konbanwa!
        </Text>
      </Box>
      {/* <div className="chat-header">deoxys</div> */}

      {/* チャット表示エリア */}
      <VStack
        flex={1}
        overflowY="auto"
        spacing={4}
        p={4}
        bg="orange.100"
        align="stretch"
        borderTopLeftRadius="none"
        borderTopRightRadius="none"
        borderBottomLeftRadius="3xl"
        borderBottomRightRadius="3xl"
      >

        {/* 背景画像 */}
        <Image src={bgImage} position="absolute" top="15%" left="5%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="15%" left="35%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="15%" left="65%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="30%" left="20%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="30%" left="50%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="30%" left="80%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="45%" left="5%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="45%" left="35%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="45%" left="65%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="60%" left="20%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="60%" left="50%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="60%" left="80%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="75%" left="5%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="75%" left="35%" opacity={0.1} zIndex={0} boxSize="100px"/>
        <Image src={bgImage} position="absolute" top="75%" left="65%" opacity={0.1} zIndex={0} boxSize="100px"/>

        <Image
          src={oniImage}
          position="absolute"
          top="70%"
          left="25%"
          zIndex={1}
          boxSize="100px"
          objectFit="contain"
          animation={`${movingxImage} 5s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="25%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 5s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="40%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 7s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="5%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 5s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="90%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 4s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="55%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 8s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="75%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 11s linear infinite`}
        />
        <Image
          src={mameImage}
          position="absolute"
          top="0%"
          left="45%"
          boxSize="30px"
          objectFit="contain"
          animation={`${movingyImage} 6s linear infinite`}
        />

          {messages.map((msg, index) => (
          <Box
          key={index}
          alignSelf={
            msg.sender === "user"
              ? "flex-end"
              : msg.sender === "gemini"
              ? "flex-start"
              : "center" // 中央配置の場合
          }
          bg={
            msg.sender === "user"
              ? "blue.500"
              : msg.sender === "gemini"
              ? "green.500" // Geminiのメッセージ用に色を変更
              : "gray.300"
          }
          color={
            msg.sender === "user"
              ? "white"
              : msg.sender === "gemini"
              ? "white" // Geminiのメッセージも白文字
              : "black"
          }
          p={3}
          borderRadius="md"
          maxW="70%"
          mb={2}
          zIndex={1}
        >
          <Text>{msg.text}</Text>
        
          {msg.url && msg.url.trim() !== "" && (
            <Box mt={2} p={2} bg="white" borderRadius="md">
              <Link href={msg.url} isExternal color="blue.200">
                {msg.url}
              </Link>
            </Box>
          )}

          {msg.image && (
            <Box mt={2} borderRadius="md" overflow="hidden">
              <Image src={msg.image} alt="画像説明" />
            </Box>
          )}

        </Box>
        
        ))}
        {/* <Box ref={chatEndRef} /> */}
        
      </VStack>
      {/* <div className="chat-messages"> */}
        {/* {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))} */}
      {/* </div> */}

      {/* 入力エリア */}
      <HStack p={3} bg="white" 
        color="black"       
        borderTopLeftRadius="none"
        borderTopRightRadius="none"
        borderBottomLeftRadius="3xl"
        borderBottomRightRadius="xl"
        Index={1}>

        <Input
          flex={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="メッセージを入力..."
          border="1px solid gray.300"
          _focus={{
            boxShadow: "0 0 0 2px var(--chakra-colors-blue-400)", 
            borderColor: "blue.400", 
          }}
        />
        <Button bg="blue.600" color="white" colorScheme="blue" onClick={sendMessage}>
          送信
        </Button>
      </HStack>
    </Box>
    // {/* <div className="chat-input">
    //     <input
    //       type="text"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       onKeyPress={(e) => e.key === "Enter" && sendMessage()}
    //     />
    //     <button onClick={sendMessage}>送信</button>
    //   </div>
    // </div> */}
  );
}

export default ChatApp;

// import { useState } from "react";
// import "./ChatApp.css"; // CSSをインポート

// function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   // 送信処理
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput("");

//     // 仮のGeminiの返信（ここはAPI連携予定）
//     setTimeout(() => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: `Gemini: ${input} の返信`, sender: "gemini" },
//       ]);
//     }, 1000);
//   };

//   return (
//     <div className="chat-container">
//       {/* ヘッダー（アプリ名） */}
//       <div className="chat-header">deoxys</div>

//       {/* チャット表示エリア */}
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             <div className="message-bubble">{msg.text}</div>
//           </div>
//         ))}
//       </div>

//       {/* 入力エリア */}
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage}>送信</button>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
