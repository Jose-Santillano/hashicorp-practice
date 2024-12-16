// Imgs
import bg from "../assets/hashicorp-bg.png";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 p-8">
      <div className="max-w-4xl w-full text-center flex flex-col items-center">
        <h1 className="text-4xl font-thin text-gray-800 mb-6">
          Secure Your Secrets with HashiCorp Vault
        </h1>

        <img 
          src={bg}
          alt="Vault Security"
          className="w-[70%] mb-6 animate-float"
        />

        <p className="text-md text-gray-600 mb-8">
          Empower your applications with robust security solutions. By using Vault, you gain a centralized way to manage dynamic secrets, encryption keys, and access control policies.
        </p>
      </div>
    </div>
  );
};

export default Home;
