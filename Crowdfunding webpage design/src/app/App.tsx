import { useState } from 'react';
import { Header } from './components/Header';
import { EventCard, type Event } from './components/EventCard';
import { CreateEventForm } from './components/CreateEventForm';
import { DonationForm } from './components/DonationForm';
import { Plus, Search, Filter, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function App() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Engineering Club Annual Conference Trip',
      description: 'Help our engineering students attend the National Engineering Conference in San Diego. Funds will cover registration, travel, and accommodation for 15 students.',
      organizer: 'ARC Engineering Club',
      goalAmount: 5000,
      currentAmount: 3250,
      endDate: '2026-06-15',
      category: 'Student Event',
    },
    {
      id: '2',
      title: 'Textbook Relief Fund',
      description: 'Support students who need help purchasing required textbooks and course materials. Every dollar goes directly to helping students succeed academically.',
      organizer: 'Student Senate',
      goalAmount: 10000,
      currentAmount: 7800,
      endDate: '2026-08-30',
      category: 'Academic Program',
    },
    {
      id: '3',
      title: 'Community Garden Project',
      description: 'Create a sustainable community garden on campus for students to learn about agriculture, sustainability, and healthy eating. Funds needed for soil, seeds, and tools.',
      organizer: 'Environmental Science Club',
      goalAmount: 2500,
      currentAmount: 1200,
      endDate: '2026-05-30',
      category: 'Community Service',
    },
    {
      id: '4',
      title: 'Theater Department Spring Production',
      description: 'Support our talented theater students in producing "Hamilton". Funds will help with costumes, set design, and technical equipment.',
      organizer: 'Theater Arts Department',
      goalAmount: 8000,
      currentAmount: 5600,
      endDate: '2026-06-01',
      category: 'Arts & Culture',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEventForDonation, setSelectedEventForDonation] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleCreateEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
    alert('Event submitted for review! You will receive a confirmation email at your .edu address once approved.\n\nGoogle Workspace Integration:\n- Event will be added to your calendar\n- Automated email notifications\n- Shared with authorized administrators');
  };

  const handleDonation = (eventId: string, amount: number) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, currentAmount: event.currentAmount + amount }
        : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All Categories', ...Array.from(new Set(events.map(e => e.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-[#F4C145] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#2E5490] mb-4">
            Student Crowdfunding Platform
          </h1>
          <p className="text-xl text-gray-700">
            Support student initiatives and help make campus dreams a reality
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490] bg-white appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-[#2E5490] hover:bg-[#1e3a6d] text-white px-6 py-3 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <strong>{filteredEvents.length}</strong> active event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onDonate={(eventId) => {
                const event = events.find(e => e.id === eventId);
                if (event) setSelectedEventForDonation(event);
              }}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-[#2E5490] mb-3">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-[#2E5490] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">1</div>
              <h3 className="font-semibold mb-2">Create Your Event</h3>
              <p className="text-sm text-gray-600">
                Students can submit fundraising events for review using their .edu email address.
              </p>
            </div>
            <div>
              <div className="bg-[#2E5490] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">2</div>
              <h3 className="font-semibold mb-2">Share & Promote</h3>
              <p className="text-sm text-gray-600">
                Once approved, share your event with the community through Google Workspace integration.
              </p>
            </div>
            <div>
              <div className="bg-[#2E5490] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">3</div>
              <h3 className="font-semibold mb-2">Receive Donations</h3>
              <p className="text-sm text-gray-600">
                Accept secure payments via Stripe and track your progress toward your goal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#2E5490] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-6 mb-8">
            <button className="hover:text-[#F4C145] transition-colors">
              <Facebook className="w-6 h-6" />
            </button>
            <button className="hover:text-[#F4C145] transition-colors">
              <Twitter className="w-6 h-6" />
            </button>
            <button className="hover:text-[#F4C145] transition-colors">
              <Instagram className="w-6 h-6" />
            </button>
            <button className="hover:text-[#F4C145] transition-colors">
              <Linkedin className="w-6 h-6" />
            </button>
            <button className="hover:text-[#F4C145] transition-colors">
              <Youtube className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">STUDENTS</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Apply for Emergency Fund</a></li>
                <li><a href="#" className="hover:underline">Apply for Scholarships</a></li>
                <li><a href="#" className="hover:underline">Scholarship FAQ</a></li>
                <li><a href="#" className="hover:underline">Get Basic Needs Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">FACULTY & STAFF</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Emeriti Associations</a></li>
                <li><a href="#" className="hover:underline">Employee Payroll Deduction</a></li>
                <li><a href="#" className="hover:underline">Department Fundraising</a></li>
                <li><a href="#" className="hover:underline">Mini Grants</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">SUPPORT US</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Where to Give</a></li>
                <li><a href="#" className="hover:underline">How to Give</a></li>
                <li><a href="#" className="hover:underline">Why Los Rios?</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">ABOUT US</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Our Board</a></li>
                <li><a href="#" className="hover:underline">Our Team</a></li>
                <li><a href="#" className="hover:underline">Our Colleges</a></li>
                <li><a href="#" className="hover:underline">Economic Impact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1e3a6d] pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm tracking-wide">LOS RIOS COLLEGES</div>
                <div className="text-lg font-semibold">FOUNDATION</div>
              </div>
              <div className="text-sm text-gray-300">
                <p>American River College | Cosumnes River College | Folsom Lake College | Sacramento City College</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showCreateForm && (
        <CreateEventForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateEvent}
        />
      )}

      {selectedEventForDonation && (
        <DonationForm
          event={selectedEventForDonation}
          onClose={() => setSelectedEventForDonation(null)}
          onDonationComplete={handleDonation}
        />
      )}
    </div>
  );
}
