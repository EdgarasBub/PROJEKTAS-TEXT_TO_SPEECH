import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Speech4You</h1>
      <p className="text-lg mb-4">
        Mūsų Speech4You įrankis leidžia lengvai konvertuoti tekstą į natūraliai skambančią kalbą. Tai puikus sprendimas tiek asmeniniam naudojimui, tiek verslo poreikiams.
      </p>
      <ul className="list-disc list-inside space-y-2 text-base">
        <li>🗣️ Natūralūs balsai įvairiomis kalbomis</li>
        <li>♿ Prieinamumas – padeda regos negalią turintiems vartotojams</li>
        <li>📚 Puikiai tinka edukacijai, tinklaraščiams ir audio turiniui</li>
        <li>⚙️ Lengva integracija į bet kurią svetainę ar aplikaciją</li>
      </ul>
      <p className="mt-6 text-md text-gray-600">
        Pradėkite dabar – suteikite savo tekstui balsą!
      </p>
    </div>
  );
};

export default Home;
