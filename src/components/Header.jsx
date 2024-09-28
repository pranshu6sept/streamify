// streamify/src/components/Header.jsx
function Header() {
    return (
      <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Streamify Dashboard</h1>
          <nav className="space-x-4">
            <a href="/" className="text-white hover:text-gray-300">Home</a>
            <a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a>
            <a href="/analytics" className="text-white hover:text-gray-300">Analytics</a>
            <a href="/settings" className="text-white hover:text-gray-300">Settings</a>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Header;