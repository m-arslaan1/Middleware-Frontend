import { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [responseData, setResponseData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://middleware-backend.vercel.app/submit', formData);
            setResponseData(response.data);
        } catch (err) {
            console.error('There was an error submitting the form!', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-500 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl">
                <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Submit Your Details</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-400"
                    >
                        Submit
                    </button>
                </form>

                {responseData && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Response:</h2>
                        <pre className="text-gray-700 whitespace-pre-wrap">{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
