/* eslint-disable react/prop-types */
"use client";

import { Sidebar } from "flowbite-react";

// Icons
import { FiHome, FiUser, FiTerminal, FiShield, FiCpu, FiPocket, FiSettings  } from "react-icons/fi";


// Imgs
import logo from "../assets/hashicorp-logo.png";

export function MenuSidebar({ setView }) {
  return (
    <Sidebar aria-label="Hashicorp Sidebar" className="border border-gray-200">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            <h1 className="text-2xl font-thin text-gray-800 text-wrap text-center">
              Hashicorp
            </h1>
          </div>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={() => setView("home")} icon={FiHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item onClick={() => setView("users")} icon={FiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item onClick={() => setView("secrets")} icon={FiShield}>
            Secrets
          </Sidebar.Item>
          <Sidebar.Item onClick={() => setView("workers")} icon={FiCpu}>
            Workers
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse icon={FiSettings } label="Configuration">
            <Sidebar.Item onClick={() => setView("home")} icon={FiTerminal }>
              Enviroment
            </Sidebar.Item>
            <Sidebar.Item onClick={() => setView("home")} icon={FiPocket}>
              Auth
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default MenuSidebar;
