import { Calendar, DollarSign, Users, Target } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  goalAmount: number;
  currentAmount: number;
  endDate: string;
  category: string;
  imageUrl?: string;
}

interface EventCardProps {
  event: Event;
  onDonate: (eventId: string) => void;
}

export function EventCard({ event, onDonate }: EventCardProps) {
  const percentage = Math.min((event.currentAmount / event.goalAmount) * 100, 100);
  const daysLeft = Math.ceil(
    (new Date(event.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#F4C145] text-[#333333] px-3 py-1 rounded-full text-sm">
            {event.category}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-[#2E5490] mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>Organized by {event.organizer}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-[#2E5490]">
              ${event.currentAmount.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600">
              of ${event.goalAmount.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#0077A8] h-2.5 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>{percentage.toFixed(0)}% funded</span>
          </div>
        </div>

        <button
          onClick={() => onDonate(event.id)}
          className="w-full bg-[#2D8B3E] hover:bg-[#236a2f] text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <DollarSign className="w-5 h-5" />
          Donate Now
        </button>
      </div>
    </div>
  );
}
