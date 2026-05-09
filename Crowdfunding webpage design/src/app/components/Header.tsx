import { Menu, Search, Globe } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-[#2E5490] tracking-wide" style={{ fontSize: '14px' }}>
              LOS RIOS COLLEGES
            </div>
            <div className="text-[#2E5490] font-semibold" style={{ fontSize: '24px' }}>
              FOUNDATION
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#2E5490] hover:underline">GIVE TODAY</a>
            <a href="#" className="text-[#2E5490] hover:underline">LOSRIOS.EDU</a>
            <button className="text-[#2E5490]">
              <Globe className="w-5 h-5" />
            </button>
            <button className="text-[#2E5490]">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-[#2E5490] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <a href="#" className="hover:bg-[#1e3a6d] px-4 py-2 rounded transition-colors">
              Why Los Rios?
            </a>
            <a href="#" className="hover:bg-[#1e3a6d] px-4 py-2 rounded transition-colors">
              Areas of Need
            </a>
            <a href="#" className="hover:bg-[#1e3a6d] px-4 py-2 rounded transition-colors">
              How to Give
            </a>
            <a href="#" className="hover:bg-[#1e3a6d] px-4 py-2 rounded transition-colors">
              Students & Alumni
            </a>
            <a href="#" className="hover:bg-[#1e3a6d] px-4 py-2 rounded transition-colors">
              Faculty & Staff
            </a>
            <a href="#" className="hover:bg-[#1e3a6d] px-4 py-2 rounded transition-colors">
              About Us
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
