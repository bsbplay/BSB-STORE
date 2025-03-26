import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, LogIn, Users, PlusCircle, Bell } from "lucide-react";

const apps = [
  { id: 1, name: "App Exemplo 1", version: "1.0", url: "#" },
  { id: 2, name: "App Exemplo 2", version: "2.3", url: "#" },
  { id: 3, name: "App Exemplo 3", version: "1.5", url: "#" },
];

const initialResellers = [
  { id: 1, name: "Revendedor 1", expiry: "2025-04-15" },
  { id: 2, name: "Revendedor 2", expiry: "2025-03-30" },
];

export default function LojaAPK() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resellers, setResellers] = useState(initialResellers);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsAdmin(!isAdmin);
  };

  const addReseller = () => {
    const newReseller = {
      id: resellers.length + 1,
      name: `Revendedor ${resellers.length + 1}`,
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    setResellers([...resellers, newReseller]);
  };

  const removeReseller = (id) => {
    setResellers(resellers.filter(reseller => reseller.id !== id));
  };

  return (
    <div 
      className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center p-6"
      style={{ backgroundImage: "url('/praia.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <header className="relative flex justify-between items-center w-full max-w-5xl mb-6 p-4 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg z-10">
        <div className="flex items-center">
          <img src="/logo-bsb-play.png" alt="BSB PLAY" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold">BSB PLAY</h1>
        </div>
        <Button variant="outline" onClick={handleLogin}>
          <LogIn className="mr-2" size={16} /> {isLoggedIn ? "Sair" : "Entrar"}
        </Button>
      </header>
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
        {apps.map((app) => (
          <Card key={app.id} className="p-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg">
            <CardContent>
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <p className="text-gray-400">Versão: {app.version}</p>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" asChild>
                  <a href={app.url} download>
                    <Download className="mr-2" size={16} /> Baixar APK
                  </a>
                </Button>
                {isLoggedIn && (
                  <Button variant="secondary">
                    <Upload className="mr-2" size={16} /> Enviar APK
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdmin && (
        <div className="relative w-full max-w-5xl mt-10 z-10">
          <h2 className="text-2xl font-bold mb-4">Gerenciar Revendedores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resellers.map((reseller) => (
              <Card key={reseller.id} className="p-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg">
                <CardContent>
                  <h3 className="text-xl font-semibold">{reseller.name}</h3>
                  <p className="text-gray-400">Expira em: {reseller.expiry}</p>
                  <div className="mt-4 flex justify-between">
                    <Button variant="destructive" onClick={() => removeReseller(reseller.id)}>
                      Remover
                    </Button>
                    <Button variant="secondary" className="flex items-center">
                      <Bell className="mr-2" size={16} /> Notificar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="primary" className="mt-6 flex items-center" onClick={addReseller}>
            <PlusCircle className="mr-2" size={16} /> Adicionar Revendedor
          </Button>
        </div>
      )}
    </div>
  );
}
