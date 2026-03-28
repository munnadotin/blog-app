import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  const socialMedia = [
    { name: 'Facebook', icon: <Facebook fill="white" className="h-5 w-5 stroke-1 text-white" />, color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: <Twitter fill="white" className="h-5 w-5 stroke-1 text-white" />, color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: <Instagram fill="white" stroke="pink" className="h-5 w-5 stroke-1" />, color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: <Linkedin fill="white" className="h-5 w-5 stroke-1 text-white" />, color: 'hover:bg-blue-700' }
  ];

  return (
    <footer className="bg-indigo-600 py-10 px-6 text-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xl">B</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">BlogSpace</h1>
            </div>
            <p className="text-indigo-100 leading-relaxed max-w-md">
              Share your thoughts with the world and connect with others through meaningful conversations.
              Join our growing community of passionate writers and readers today!
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Overview', 'Features', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-indigo-100 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Connect With Us
            </h3>

            {/* Social Links with Icons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`flex justify-center-safe items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:${social.color} group`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                  <span className="text-sm text-indigo-100 group-hover:text-white">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-indigo-400/30 my-6" />

        {/* Bottom */}
        <p className="text-sm text-indigo-200 font-light text-center">
          Copyright © {new Date().getFullYear()} BlogSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;