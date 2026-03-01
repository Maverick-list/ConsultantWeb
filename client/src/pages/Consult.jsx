import React from 'react';
import ChatInterface from '../components/Consultation/ChatInterface';
import BookingForm from '../components/Consultation/BookingForm';

const Consult = () => {
    return (
        <div className="min-h-full flex flex-col md:flex-row gap-6 p-4">
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-6">AI Consultation</h2>
                <ChatInterface />
            </div>

            <div className="w-full md:w-1/3">
                <h2 className="text-3xl font-bold text-white mb-6">Book an Expert</h2>
                <BookingForm />
            </div>
        </div>
    );
};

export default Consult;
