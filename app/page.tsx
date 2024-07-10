"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [chats, setChat] = useState<{ type: number; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setChat((prevItems) => [...prevItems, { type: 1, text: inputValue }]);
    setInputValue("");
    try {
      const response = await axios.post(
        "https://2s7x22jza5.execute-api.us-east-1.amazonaws.com/dev",
        {
          message: inputValue,
        }
      );

      const mensajeRes = JSON.parse(response.data.body)?.message;
      setChat((prevItems) => [...prevItems, { type: 0, text: mensajeRes }]);
      console.log("Respuesta del servidor:");
    } catch (error) {
      // Manejar errores, como mostrar un mensaje de error
      console.error("Error al enviar datos:", error);
      alert("Error al enviar datos. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <main className="">
      <div className="absolute h-screen w-screen bg-amber-100">
        <div className="w-36 h-36 relative bg-orange-400 top-24 left-24 rounded-full blur-xl"></div>
        <div className="relative w-96 h-96 bg-orange-300 top-56 left-72 rounded-full blur-xl"></div>
        <div className="relative w-96 h-96 bg-orange-300 bottom-[200px] left-[800px] rounded-full blur-xl"></div>
      </div>
      <div className="h-[95vh] flex flex-col w-full m-5 p-10 backdrop-blur-3xl rounded-lg fixed bg-black/30">
        <div id="chats" className="grow flex flex-col-reverse gap-2 mb-5">
          {chats
            .slice()
            .reverse()
            .map((chat, index) => (
              <div
                className={
                  chat.type == 1
                    ? "bg-gray-300 rounded-lg text-start p-2 w-max self-end"
                    : "rounded-lg text-end p-2 w-max"
                }
                key={index}
              >
                <span>{chat.text}</span>
              </div>
            ))}
        </div>
        <div className="flex gap-2 w-full ">
          <input
            className="grow rounded-lg p-2"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            onClick={handleButtonClick}
            className="rounded-lg bg-orange-400 p-2"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
