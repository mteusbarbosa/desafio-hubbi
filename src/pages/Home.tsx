export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-transparent to-slate-300">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-gray-800">
                Desafio Frontend Hubbi
            </h1>
            <p className="text-lg text-gray-600">
                Desenvolvido por
                <a href="https://github.com/mteusbarbosa/" className="text-yellow-500 font-extrabold bg-gray hover:underline"> Mateus Barbosa</a>
            </p>

        </div>
    );
}