import { TodayHero } from '@/components/today-hero/TodayHero';
import { YearCalendar } from '@/components/calendar/YearCalendar';
import { DateConverter } from '@/components/converter/DateConverter';

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-shire-brown/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-heading text-2xl text-shire-ink">
            Shire Calendar
          </h1>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#today" className="text-shire-brown hover:text-shire-green transition-colors">
              Today
            </a>
            <a href="#calendar" className="text-shire-brown hover:text-shire-green transition-colors">
              Calendar
            </a>
            <a href="#convert" className="text-shire-brown hover:text-shire-green transition-colors">
              Convert
            </a>
            <a href="#about" className="text-shire-brown hover:text-shire-green transition-colors">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Today's Date Hero */}
      <div id="today">
        <TodayHero />
      </div>

      {/* Calendar Section */}
      <section id="calendar" className="py-16 px-4 border-t border-shire-brown/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-shire-ink mb-4">
              Full Year Calendar
            </h2>
            <p className="text-shire-brown max-w-2xl mx-auto">
              Browse the complete Shire calendar. Each month has 30 days, starting on Sterday. 
              Note the special days between months and the Shire-reform that keeps weekdays consistent year to year.
            </p>
          </div>
          
          <YearCalendar />
        </div>
      </section>

      {/* Converter Section */}
      <section id="convert" className="py-16 px-4 border-t border-shire-brown/20 bg-shire-parchment/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-shire-ink mb-4">
              Date Converter
            </h2>
            <p className="text-shire-brown max-w-2xl mx-auto">
              Find your Shire birthday or convert any date between Gregorian and Shire reckoning
            </p>
          </div>
          
          <DateConverter />
        </div>
      </section>

      {/* About Section (Coming Soon) */}
      <section id="about" className="py-16 px-4 border-t border-shire-brown/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-shire-ink mb-4">
            About the Shire Calendar
          </h2>
          <p className="text-shire-brown mb-8">
            Learn how Hobbits reckon time, the Shire-reform, and the history of the calendar
          </p>
          <div className="inline-block px-6 py-3 bg-shire-brown/10 rounded-lg border border-shire-brown/30">
            <p className="text-shire-brown font-heading">
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-shire-brown/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-shire-brown/60">
            Based on J.R.R. Tolkien&apos;s The Lord of the Rings, Appendix D
          </p>
          <p className="text-xs text-shire-brown/40 mt-2">
            Made with ❤️ for Middle-earth fans
          </p>
        </div>
      </footer>
    </main>
  );
}
