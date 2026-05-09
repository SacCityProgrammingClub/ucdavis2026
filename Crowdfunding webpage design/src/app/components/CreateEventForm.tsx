import { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface CreateEventFormProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
}

export function CreateEventForm({ onClose, onSubmit }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organizer: '',
    organizerEmail: '',
    goalAmount: '',
    endDate: '',
    category: 'Student Event',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      goalAmount: parseFloat(formData.goalAmount),
      currentAmount: 0,
      imageUrl: undefined,
    };

    onSubmit(newEvent);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#2E5490]">Create Fundraising Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
              placeholder="e.g., Engineering Club Conference Trip"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
              placeholder="Describe your event and what the funds will be used for..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Organizer Name *
              </label>
              <input
                type="text"
                name="organizer"
                required
                value={formData.organizer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                placeholder="Your name or club name"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Student Email (.edu) *
              </label>
              <input
                type="email"
                name="organizerEmail"
                required
                value={formData.organizerEmail}
                onChange={handleChange}
                pattern=".*@.*\.edu$"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                placeholder="student@losrios.edu"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Fundraising Goal ($) *
              </label>
              <input
                type="number"
                name="goalAmount"
                required
                min="1"
                step="0.01"
                value={formData.goalAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
            >
              <option>Student Event</option>
              <option>Club Activity</option>
              <option>Academic Program</option>
              <option>Community Service</option>
              <option>Athletics</option>
              <option>Arts & Culture</option>
              <option>Technology</option>
              <option>Other</option>
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> All events will be reviewed for approval. You will receive a confirmation email at your .edu address.
              Google Workspace integration will sync this event to your calendar upon approval.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#2E5490] text-white rounded-md hover:bg-[#1e3a6d] transition-colors"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
