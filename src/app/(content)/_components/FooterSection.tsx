import React from "react"

export function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2025 TradeTant. All rights reserved.</p>
            <p className="text-xs mt-2">
              Risk disclaimer: Crypto trading involves significant risk. Only trade with funds you can afford to lose.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://docs.tradetant.com" className="hover:text-white">
              Docs
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

