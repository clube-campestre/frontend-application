const Admin = () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[80%] max-w-[700px] h-[300px] bg-[#F6F6F6] rounded-2xl shadow-md flex flex-col items-center justify-center gap-4 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold text-[#022C81]">Bem-vindo à plataforma</h2>
          <p className="text-gray-600 text-center max-w-[80%]">
            Aqui você pode acessar as funcionalidades disponíveis pelo menu lateral.
          </p>
        </div>
      </div>
    );
  };
  
  export default Admin;
  