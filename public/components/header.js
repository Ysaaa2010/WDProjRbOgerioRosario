/**
 * Header Component
 * Provides consistent navigation across all pages
 * Includes mobile responsive menu
 */

function Header() {
  try {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const currentPath = window.location.pathname;

    const navItems = [
      { name: 'Home', path: 'index.html' },
      { name: 'Agents', path: 'agents.html' },
      { name: 'Weapons', path: 'weapons.html' },
      { name: 'Maps', path: 'maps.html' },
      { name: 'Esports', path: 'esports.html' }
    ];

    const isActive = (path) => {
      return currentPath.endsWith(path) || (path === 'index.html' && currentPath === '/');
    };

    return (
      <header className="bg-[var(--secondary-color)] border-b border-gray-800 sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--primary-color)] flex items-center justify-center" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                <div className="icon-zap text-xl text-white"></div>
              </div>
              <span className="text-xl font-bold text-[var(--accent-color)]">VALORANT HUB</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-[var(--primary-color)]'
                      : 'text-[var(--accent-color)] hover:text-[var(--primary-color)]'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-[var(--accent-color)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`icon-${mobileMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`block py-2 text-sm font-medium ${
                    isActive(item.path)
                      ? 'text-[var(--primary-color)]'
                      : 'text-[var(--accent-color)]'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}