/**
 * Footer Component
 * Displays site information, quick links, social media, and citations
 * Consistent across all pages
 */

function Footer() {
  try {
    return (
      <footer className="bg-black border-t border-gray-800 mt-auto" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[var(--primary-color)] mb-4">VALORANT HUB</h3>
              <p className="text-sm text-gray-400">Your ultimate resource for Valorant gameplay, strategies, and esports coverage.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-[var(--accent-color)] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="index.html" className="hover:text-[var(--primary-color)] transition-colors">Home</a></li>
                <li><a href="agents.html" className="hover:text-[var(--primary-color)] transition-colors">Agents</a></li>
                <li><a href="weapons.html" className="hover:text-[var(--primary-color)] transition-colors">Weapons</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--accent-color)] mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-twitter text-xl text-white"></div>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-youtube text-xl text-white"></div>
                </a>
                <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-twitch text-xl text-white"></div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="text-center text-sm text-gray-400 space-y-2">
              <p>&copy; 2025 Valorant Hub. All rights reserved. | Not affiliated with Riot Games.</p>
              <p className="mt-2">
                <a href="#" className="hover:text-[var(--primary-color)] transition-colors">Privacy Policy</a> | 
                <a href="#" className="hover:text-[var(--primary-color)] transition-colors ml-2">Terms of Service</a>
              </p>
              <div className="mt-4 text-xs">
                <p className="font-semibold mb-2">Image Sources (APA Format):</p>
                <p>Unsplash. (2024). <em>Gaming and esports photography</em>. Retrieved from https://unsplash.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}