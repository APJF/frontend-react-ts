import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Learning",
      links: [
        { href: "/courses", label: "All Courses" },
        { href: "/hiragana", label: "Hiragana" },
        { href: "/katakana", label: "Katakana" },
        { href: "/kanji", label: "Kanji" },
        { href: "/grammar", label: "Grammar" },
      ],
    },
    {
      title: "Practice",
      links: [
        { href: "/flashcards", label: "Flashcards" },
        { href: "/quizzes", label: "Quizzes" },
        { href: "/speaking", label: "Speaking" },
        { href: "/listening", label: "Listening" },
        { href: "/writing", label: "Writing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/dictionary", label: "Dictionary" },
        { href: "/blog", label: "Blog" },
        { href: "/culture", label: "Culture" },
        { href: "/news", label: "Japanese News" },
        { href: "/community", label: "Community" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/help", label: "Help Center" },
        { href: "/contact", label: "Contact Us" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/faq", label: "FAQ" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">
                <span className="text-red-500">日本語</span>
                <span>Learning</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Master Japanese with our comprehensive learning platform. From beginner to advanced levels.
            </p>
            
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Japanese Learning Web. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
