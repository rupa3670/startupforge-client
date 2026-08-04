import Link from "next/link";
import Image from "next/image";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse startups", href: "/startups" },
  { label: "Browse opportunities", href: "/opportunities" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", Icon: LogoFacebook },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LogoLinkedin },
  { label: "GitHub", href: "https://github.com", Icon: LogoGithub },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0E14] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + tagline */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <Image
              src="/assest/logo.jfif"
              alt="StartupForge logo"
              width={32}
              height={32}
              className="rounded-md object-cover"
            />
            <span className="font-semibold text-lg tracking-tight text-white">
              Startup<span className="text-indigo-500">Forge</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Where founders build teams and collaborators find their next startup.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">Quick links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="mailto:support@startupforge.com" className="hover:text-indigo-400 transition-colors">
                support@startupforge.com
              </a>
            </li>
            <li>
              <a href="tel:+8801000000000" className="hover:text-indigo-400 transition-colors">
                +880 1000-000000
              </a>
            </li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social links */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">Follow us</h3>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 text-center text-xs text-gray-500">
          © {year} StartupForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}