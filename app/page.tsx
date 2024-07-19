"use client";

import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

export default function Home() {
  const [chats, setChat] = useState<{ type: number; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setChat((prevItems) => [...prevItems, { type: 1, text: inputValue }]);
    setInputValue("");

    const mensajeRes =
      "Hola, nuestros Horario de atención del servicio: Lunes a viernes de 9:00 a 17:00 horas. Gracias por su atención.";

    setChat((prevItems) => [...prevItems, { type: 0, text: mensajeRes }]);
    console.log("Respuesta del servidor:");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <main className="">
      <div className="absolute h-screen w-screen bg-black  flex justify-center">
        <div className="bg-gradient-to-tr from-orange-900 to-purple-900 rounded-full w-[50vw] h-[70vh] self-center flex justify-center">
          <div className="self-center w-1/2 h-[600px] bg-black rounded-full"></div>
        </div>
      </div>
      <div className="w-full h-[100vh] flex justify-center">
        <div className="h-[95vh] w-[95vw] self-center flex flex-col px-10 pb-10 pt-4 backdrop-blur-3xl rounded-lg fixed bg-white/15 shadow-xl shadow-gray-500/50">
          <Header
            title="ChatBot"
            className="text-2xl font-extrabold text-orange-500 bg-black/70 p-2 rounded-xl"
          />
          <div id="chats" className="grow flex flex-col-reverse gap-2 mb-5 overflow-y-auto">
            {chats
              .slice()
              .reverse()
              .map((chat, index) => (
                <div
                  className={
                    chat.type == 1
                      ? "bg-gray-700 text-white rounded-lg text-start p-2 w-max self-end"
                      : "rounded-lg text-white text-end p-2 w-max bg-orange-600/50"
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
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleButtonClick}
              className="rounded-lg bg-orange-600 p-2 text-white"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
