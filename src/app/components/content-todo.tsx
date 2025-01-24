"use client";

import ClipboardIcon from "@/../public/Clipboard.png";
import DeleteIcon from "@/../public/Delete.png";
import PlusCircleIcon from "@/../public/PlusCircle.png";
import { TodoItem } from "@/types/TodoItem";
import Image from "next/image";
import { useState } from "react";

export const ContentTodo = () => {
  const [itemInput, setItemInput] = useState("");
  const [list, setList] = useState<TodoItem[]>([]);

  const handleAddButton = () => {
    if (!itemInput.trim()) return;
    setList([
      ...list,
      { id: list.length + 1, label: itemInput, checked: false },
    ]);
    setItemInput("");
  };

  const deleteItem = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  const toggleItem = (id: number) => {
    let newList = [...list];
    for (let item in newList) {
      if (newList[item].id === id) {
        newList[item].checked = !newList[item].checked;
      }
    }
    setList(newList);
  };

  return (
    <div className="bg-[#F0EDF2] mb-20 antialiased flex flex-col w-screen h-screen">
      <div className="bg-[#E0DCE4] w-full h-56 flex items-center justify-center font-bold flex-col">
        <div className="mt-32 flex flex-col items-center justify-center mx-4">
          <h3 className="text-green-400 lg:text-6xl text-5xl">
            to<span className="text-purple-400 mb-52">do</span>
          </h3>
          <div className="flex gap-5 items-center justify-center mt-10">
            <input
              type="text"
              className="bg-[#F0EDF2] border border-[#E0DCE4] rounded-lg p-4 lg:w-96 w-52 text-[#6B6572] text-base placeholder:text-sm placeholder:font-sans"
              placeholder="Adicione uma nova tarefa"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
            />
            {<button
              className="bg-[#6F3CC3] text-[#F0EDF2] font-bold p-4 flex rounded-lg items-center justify-center gap-3"
              onClick={handleAddButton}
            >
              <h3 className="hidden lg:flex">Criar</h3>
              <Image src={PlusCircleIcon} alt="" className="w-5 h-5"/>
            </button>}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mt-16 lg:mt-24 font-bold">
          <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center border-b border-[#E0DCE4] pb-10 gap-3 lg:gap-10 text-nowrap lg:text-base text-sm">
              <div className="flex items-center gap-3">
                <h3 className="text-[#6B6572]">Tarefas criadas</h3>
                <span className="bg-[#DDD2EF] p-2 text-[#6F3CC3] rounded-full w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center font-bold">
                  {list.length}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-[#6B6572]">Concluídas</h3>
                <span className="bg-[#BFE3D0] text-[#2D6C4A] rounded-full p-2 w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center font-bold">
                  {list.filter((item) => item.checked).length}
                </span>
              </div>
            </div>
            <div className="lg:mt-6">
              {!list.length ? (
                <div className="flex flex-col items-center justify-center mt-10 lg:mt-20 lg:text-base text-sm">
                  <Image
                    src={ClipboardIcon}
                    alt="clipboard"
                    className="w-14 h-14 mb-5"
                  />
                  <h4 className="text-[#6B6572] font-bold">
                    Você ainda não tem tarefas cadastradas
                  </h4>
                  <h5 className="text-[#6B6572] font-normal">
                    Crie tarefas e organize seus itens a fazer
                  </h5>
                </div>
              ) : (
                <ul className="space-y-4">
                  {list.map((item) => (
                    <li
                      key={item.id}
                      className={`bg-[#F0EDF2] border-[#D1CBD7] border rounded-md flex items-start gap-4 p-4 ${
                        item.checked
                          ? "text-[#6B6572] bg-[]"
                          : "text-[#262428] bg-[#f3e7ff]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-6 h-6 shrink-0 mt-1 appearance-none border-2 border-[#9359F3] rounded-full flex items-center justify-center cursor-pointer checked:bg-green-500 checked:border-none"
                      />
                      <div
                        className={`flex-1 break-all leading-normal ${
                          item.checked ? "line-through" : ""
                        }`}
                      >
                        <h6 className="text-sm">{item.label}</h6>
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="shrink-0 mt-1"
                      >
                        <Image
                          src={DeleteIcon}
                          alt="delete"
                          className="w-6 h-6"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
