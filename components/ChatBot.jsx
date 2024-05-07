"use client"

import { Button } from "@nextui-org/button"

import ChatMessage from "@/components/ChatMessage"

import { GiBroom } from "react-icons/gi"
import { IoSend } from "react-icons/io5"

import useLocalStorage from "@/hooks/useLocalStorage"
import { useState, useEffect } from "react"

import { Configuration, OpenAIApi } from "openai"

export default function ChatBot() {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
  )

  const $ = selector => document.querySelector(selector)

  const [chatHistory, setChatHistory] = useLocalStorage("chatBotHistory", [])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addMessageToHistory = async ({ user = false, message = "" }) => {
    await setChatHistory(prevChatHistory => [...prevChatHistory, { user, message }])
  }

  const sendMessage = async message => {
    addMessageToHistory({ user: true, message })
    setIsLoading(true)

    await new Promise(res => setTimeout(res, 2000))

    // const response = await openai.takataka()

    setIsLoading(false)
    await addMessageToHistory({ user: false, message: "Response from ChatBot (Work In Progress)" })
    setTimeout(() => {
      animateResponse($(`#chatBotMessage-${chatHistory.length + 2}`))
    }, 0)
  }

  const animateResponse = element => {
    const responseText = element.innerText
    element.innerText = ""
    let index = 0
    const animationInterval = setInterval(() => {
      element.innerText = responseText.slice(0, ++index)
      if (index >= responseText.length) clearInterval(animationInterval)
    }, 20)
  }

  return (
    <div className='flex flex-col w-full text-primary-foreground'>
      <div id='aiChat' className='flex flex-col gap-4 p-4'>
        {/* advice */}
        <ChatMessage rounded type='glass' className='p-4'>
          Hola! Soy un bot de diagnóstico, describe el problema que tienes con tu vehículo y te
          ayudaré a encontrar una solución.
        </ChatMessage>
        {/* chatHistory.map tuqui tuqui */}
        {chatHistory &&
          chatHistory.map(({ user, message }, index) => {
            const messageID = `chatBotMessage-${index + 1}`
            return (
              <div
                key={messageID}
                className={`w-full flex ${user ? "justify-end" : "justify-start"}`}>
                <ChatMessage
                  id={messageID}
                  rounded
                  type={user ? "gradient" : "glass"}
                  className='p-4 max-w-[75vw] [overflow-wrap:break-word]'
                  key={index}>
                  {message}
                </ChatMessage>
              </div>
            )
          })}
        {isLoading && <div className='text-lg p-4'>•••</div>}
      </div>
      <div className='flex gap-4 p-4 sticky bottom-0 bg-poly'>
        <div
          id='chatInput'
          contentEditable
          onInput={async e => await setChatInput(await e.target.innerText)}
          className='bg-gradient-to-b from-[#fff1] to-[#fff3] flex-grow border-none outline-none rounded-[2rem] py-2 px-6 backdrop-blur-sm min-h-12 max-h-40 overflow-hidden flex flex-col justify-end'
        />
        <Button
          radius='full'
          isIconOnly
          className='text-primary-foreground text-2xl self-end bg-gradient h-12 w-12 aspect-square  shadow-md active:opacity-70'
          onClick={async () => {
            const input = $("#chatInput")
            const message = input.innerText.trim()
            if (message) {
              input.innerText = ""
              setChatInput("")
              await sendMessage(message)
            } else {
              setChatHistory([])
            }
          }}>
          {chatInput ? <IoSend /> : <GiBroom />}
        </Button>
      </div>
    </div>
  )
}
